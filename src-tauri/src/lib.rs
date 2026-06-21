// SPDX-FileCopyrightText: 2019-2022, The Tauri Programme in the Commons Conservancy
// SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use serde::{Deserialize, Serialize};
use std::{
    io::{Read, Write},
    net::{TcpListener, TcpStream},
    sync::{Arc, Mutex},
    thread,
};
use tauri::{Emitter, Manager};
use tauri_plugin_autostart::MacosLauncher;
use tauri_plugin_window_state::StateFlags;

const QUICK_ADD_BRIDGE_ADDR: &str = "127.0.0.1:47827";

#[derive(Clone, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
struct QuickAddPayload {
    title: String,
    url: String,
    board_id: Option<String>,
}

#[derive(Clone, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
struct QuickAddBoardSummary {
    id: String,
    title: String,
    target_column: String,
}

#[derive(Clone, Default)]
struct QuickAddBridgeState {
    boards: Arc<Mutex<Vec<QuickAddBoardSummary>>>,
}

#[tauri::command]
fn set_quick_add_boards(
    state: tauri::State<'_, QuickAddBridgeState>,
    boards: Vec<QuickAddBoardSummary>,
) {
    if let Ok(mut cached_boards) = state.boards.lock() {
        *cached_boards = boards;
    }
}

fn header_value<'a>(headers: &'a str, name: &str) -> Option<&'a str> {
    headers.lines().find_map(|line| {
        let (key, value) = line.split_once(':')?;
        if key.trim().eq_ignore_ascii_case(name) {
            Some(value.trim())
        } else {
            None
        }
    })
}

fn read_http_request(stream: &mut TcpStream) -> Option<(String, Vec<u8>)> {
    let mut request = Vec::new();
    let mut header_end = None;
    let mut content_length = 0usize;

    loop {
        let mut buffer = [0; 1024];
        let bytes_read = stream.read(&mut buffer).ok()?;
        if bytes_read == 0 {
            break;
        }

        request.extend_from_slice(&buffer[..bytes_read]);

        if header_end.is_none() {
            if let Some(position) = request.windows(4).position(|window| window == b"\r\n\r\n") {
                let headers = String::from_utf8_lossy(&request[..position]).to_string();
                content_length = header_value(&headers, "content-length")
                    .and_then(|value| value.parse::<usize>().ok())
                    .unwrap_or(0);
                header_end = Some(position + 4);
            }
        }

        if let Some(end) = header_end {
            if request.len() >= end + content_length {
                let headers = String::from_utf8_lossy(&request[..end]).to_string();
                let body = request[end..end + content_length].to_vec();
                return Some((headers, body));
            }
        }

        if request.len() > 32 * 1024 {
            return None;
        }
    }

    None
}

fn is_allowed_quick_add_origin(origin: Option<&str>) -> bool {
    origin
        .map(|value| value.starts_with("chrome-extension://"))
        .unwrap_or(true)
}

fn is_supported_source_url(url: &str) -> bool {
    url.starts_with("http://") || url.starts_with("https://")
}

fn focus_main_window(app: &tauri::AppHandle) {
    if let Some(window) = app.get_webview_window("main") {
        let _ = window.unminimize();
        let _ = window.show();
        let _ = window.set_focus();
    }
}

fn write_http_response(
    stream: &mut TcpStream,
    status: &str,
    body: &str,
    origin: Option<&str>,
) {
    let cors_headers = origin
        .filter(|value| value.starts_with("chrome-extension://"))
        .map(|value| {
            format!(
                "Access-Control-Allow-Origin: {value}\r\nAccess-Control-Allow-Methods: GET, POST, OPTIONS\r\nAccess-Control-Allow-Headers: content-type\r\n"
            )
        })
        .unwrap_or_default();

    let response = format!(
        "HTTP/1.1 {status}\r\n{cors_headers}Content-Type: application/json\r\nContent-Length: {}\r\nConnection: close\r\n\r\n{body}",
        body.len()
    );

    let _ = stream.write_all(response.as_bytes());
}

fn handle_quick_add_bridge_stream(
    mut stream: TcpStream,
    app: tauri::AppHandle,
    state: QuickAddBridgeState,
) {
    let Some((headers, body)) = read_http_request(&mut stream) else {
        return;
    };

    let mut request_parts = headers
        .lines()
        .next()
        .unwrap_or_default()
        .split_whitespace();
    let method = request_parts.next().unwrap_or_default();
    let path = request_parts.next().unwrap_or_default();
    let origin = header_value(&headers, "origin");

    if path != "/quick-add" && path != "/boards" {
        write_http_response(&mut stream, "404 Not Found", "{\"ok\":false}", origin);
        return;
    }

    if !is_allowed_quick_add_origin(origin) {
        write_http_response(&mut stream, "403 Forbidden", "{\"ok\":false}", origin);
        return;
    }

    if method == "OPTIONS" {
        write_http_response(&mut stream, "204 No Content", "", origin);
        return;
    }

    if path == "/boards" {
        if method != "GET" {
            write_http_response(
                &mut stream,
                "405 Method Not Allowed",
                "{\"ok\":false}",
                origin,
            );
            return;
        }

        let boards = state
            .boards
            .lock()
            .map(|cached_boards| cached_boards.clone())
            .unwrap_or_default();
        let body = serde_json::json!({ "ok": true, "boards": boards }).to_string();
        write_http_response(&mut stream, "200 OK", &body, origin);
        return;
    }

    if method != "POST" {
        write_http_response(
            &mut stream,
            "405 Method Not Allowed",
            "{\"ok\":false}",
            origin,
        );
        return;
    }

    let Ok(payload) = serde_json::from_slice::<QuickAddPayload>(&body) else {
        write_http_response(&mut stream, "400 Bad Request", "{\"ok\":false}", origin);
        return;
    };

    if !is_supported_source_url(&payload.url) {
        write_http_response(&mut stream, "400 Bad Request", "{\"ok\":false}", origin);
        return;
    }

    focus_main_window(&app);
    let _ = app.emit("quick-add-request", payload);
    write_http_response(&mut stream, "202 Accepted", "{\"ok\":true}", origin);
}

fn start_quick_add_bridge(app: tauri::AppHandle, state: QuickAddBridgeState) {
    thread::spawn(move || {
        let Ok(listener) = TcpListener::bind(QUICK_ADD_BRIDGE_ADDR) else {
            return;
        };

        for stream in listener.incoming().flatten() {
            let app = app.clone();
            let state = state.clone();
            thread::spawn(move || handle_quick_add_bridge_stream(stream, app, state));
        }
    });
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    #[cfg(target_os = "linux")]
    {
        if std::path::Path::new("/dev/dri").exists()
            && std::env::var("WAYLAND_DISPLAY").is_err()
            && std::env::var("XDG_SESSION_TYPE").unwrap_or_default() == "x11"
        {
            std::env::set_var("WEBKIT_DISABLE_DMABUF_RENDERER", "1");
        }
        std::env::set_var("WEBKIT_DISABLE_COMPOSITING_MODE", "1");
    }

    let mut builder = tauri::Builder::default();
    let quick_add_bridge_state = QuickAddBridgeState::default();

    #[cfg(desktop)]
    {
        builder = builder.plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            focus_main_window(app);
        }));
    }

    builder
        .plugin(tauri_plugin_deep_link::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(
            tauri_plugin_window_state::Builder::default()
                // Avoid restoring an accidentally hidden window on startup.
                .with_state_flags(StateFlags::all() & !StateFlags::VISIBLE)
                .build(),
        )
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_persisted_scope::init())
        .plugin(tauri_plugin_autostart::init(
            MacosLauncher::LaunchAgent,
            None,
        ))
        .manage(quick_add_bridge_state.clone())
        .invoke_handler(tauri::generate_handler![set_quick_add_boards])
        .setup(move |app| {
            #[cfg(desktop)]
            {
                use tauri_plugin_deep_link::DeepLinkExt;

                #[cfg(target_os = "macos")]
                let _ = app.deep_link().register("kanri");

                #[cfg(any(windows, target_os = "linux"))]
                let _ = app.deep_link().register_all();
            }
            start_quick_add_bridge(app.handle().clone(), quick_add_bridge_state.clone());
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
