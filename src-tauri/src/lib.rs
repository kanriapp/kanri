// SPDX-FileCopyrightText: 2019-2022, The Tauri Programme in the Commons Conservancy
// SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use notify::{RecommendedWatcher, RecursiveMode, Watcher};
use std::sync::mpsc::channel;
use std::time::Duration;
use tauri::{AppHandle, Emitter, Manager};
use tauri_plugin_autostart::MacosLauncher;
use tauri_plugin_window_state::StateFlags;

// Watch the data store for external writes (from the kanri-bridge daemon) and
// tell the frontend to reload. The daemon writes `.kanri.dat` atomically via
// rename, which swaps the file's inode — so we watch the parent directory and
// filter, never the file path itself. Bursts are debounced into one event.
fn start_kanri_dat_watcher(app: &AppHandle) {
    let Ok(dir) = app.path().app_data_dir() else {
        return;
    };
    let dat_name = std::ffi::OsString::from(".kanri.dat");
    let handle = app.clone();
    std::thread::spawn(move || {
        let (tx, rx) = channel();
        let Ok(mut watcher) = RecommendedWatcher::new(tx, notify::Config::default()) else {
            return;
        };
        if watcher.watch(&dir, RecursiveMode::NonRecursive).is_err() {
            return;
        }
        // `watcher` is held for the life of this loop; it drops (and the OS
        // closes its fds) when the app exits and the channel closes.
        loop {
            match rx.recv() {
                Ok(Ok(event)) => {
                    if !event.paths.iter().any(|p| p.file_name() == Some(dat_name.as_os_str())) {
                        continue;
                    }
                    // Debounce: swallow follow-up events until 150ms of quiet,
                    // collapsing a burst of writes into a single reload.
                    while rx.recv_timeout(Duration::from_millis(150)).is_ok() {}
                    let _ = handle.emit("kanri-dat-changed", ());
                }
                Ok(Err(_)) => continue,
                Err(_) => break,
            }
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

    tauri::Builder::default()
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
        .setup(|app| {
            #[cfg(desktop)]
            let _ = app
                .handle()
                .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
                    if let Some(window) = app.get_webview_window("main") {
                        let _ = window.unminimize();
                        let _ = window.show();
                        let _ = window.set_focus();
                    }
                }));

            start_kanri_dat_watcher(app.handle());
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
