// SPDX-FileCopyrightText: 2019-2022, The Tauri Programme in the Commons Conservancy
// SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use serde::Serialize;
use sha2::{Digest, Sha256};
use std::fs::{self, File};
use std::io::{BufReader, BufWriter, Cursor, Read, Write};
use std::path::{Path, PathBuf};
use std::time::{SystemTime, UNIX_EPOCH};
use tauri::Manager;
use tauri_plugin_autostart::MacosLauncher;
use tauri_plugin_window_state::StateFlags;

const ASSET_ROOT: &str = "kanri-assets";
const BLOB_ROOT: &str = "kanri-assets/blobs";
const TEMP_ROOT: &str = "kanri-assets/tmp";
const REMOTE_IMAGE_MAX_BYTES: u64 = 100 * 1024 * 1024;

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct AssetBlobInfo {
    absolute_path: String,
    blob_path: String,
    kind: String,
    mime_type: Option<String>,
    name: String,
    sha256: String,
    size: u64,
}

fn sanitize_file_name(name: &str) -> String {
    let sanitized: String = name
        .chars()
        .map(|ch| match ch {
            '<' | '>' | ':' | '"' | '/' | '\\' | '|' | '?' | '*' => '_',
            ch if ch.is_control() => '_',
            ch => ch,
        })
        .collect();

    let trimmed = sanitized.trim().trim_matches('.');
    if trimmed.is_empty() {
        "attachment".to_string()
    } else {
        trimmed.to_string()
    }
}

fn extension_from_name(name: &str) -> Option<String> {
    Path::new(name)
        .extension()
        .and_then(|ext| ext.to_str())
        .map(|ext| ext.to_ascii_lowercase())
        .filter(|ext| !ext.is_empty())
}

fn extension_from_mime(mime_type: Option<&str>) -> Option<&'static str> {
    match mime_type.unwrap_or("").split(';').next().unwrap_or("").trim() {
        "image/jpeg" => Some("jpg"),
        "image/png" => Some("png"),
        "image/gif" => Some("gif"),
        "image/webp" => Some("webp"),
        "image/svg+xml" => Some("svg"),
        "application/pdf" => Some("pdf"),
        "text/plain" => Some("txt"),
        "text/markdown" => Some("md"),
        "text/csv" => Some("csv"),
        "application/json" => Some("json"),
        _ => None,
    }
}

fn infer_mime_type(name: &str, fallback: Option<String>) -> Option<String> {
    if fallback.as_deref().is_some_and(|value| !value.trim().is_empty()) {
        return fallback;
    }

    let ext = extension_from_name(name)?;
    let mime = match ext.as_str() {
        "avif" => "image/avif",
        "csv" => "text/csv",
        "doc" => "application/msword",
        "docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "gif" => "image/gif",
        "jpeg" | "jpg" => "image/jpeg",
        "json" => "application/json",
        "md" => "text/markdown",
        "pdf" => "application/pdf",
        "png" => "image/png",
        "svg" => "image/svg+xml",
        "txt" => "text/plain",
        "webp" => "image/webp",
        "xls" => "application/vnd.ms-excel",
        "xlsx" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        _ => return None,
    };

    Some(mime.to_string())
}

fn infer_kind(name: &str, mime_type: Option<&str>) -> String {
    let mime = mime_type.unwrap_or("");
    if mime.starts_with("image/") {
        return "image".to_string();
    }
    if mime == "application/pdf" || extension_from_name(name).as_deref() == Some("pdf") {
        return "pdf".to_string();
    }

    match extension_from_name(name).as_deref() {
        Some("csv" | "ods" | "xls" | "xlsx") => "spreadsheet".to_string(),
        Some("doc" | "docx" | "md" | "odt" | "rtf" | "txt") => "document".to_string(),
        _ => "other".to_string(),
    }
}

fn app_data_dir(app: &tauri::AppHandle) -> Result<PathBuf, String> {
    app.path()
        .app_data_dir()
        .map_err(|err| format!("Could not resolve app data directory: {err}"))
}

fn safe_app_data_path(app: &tauri::AppHandle, relative_path: &str) -> Result<PathBuf, String> {
    let relative = Path::new(relative_path);
    if relative.is_absolute()
        || relative
            .components()
            .any(|component| matches!(component, std::path::Component::ParentDir))
    {
        return Err("Unsafe asset path".to_string());
    }

    let base = app_data_dir(app)?;
    let full = base.join(relative);
    if !full.starts_with(&base) {
        return Err("Asset path escapes app data directory".to_string());
    }

    Ok(full)
}

fn unique_temp_path(app: &tauri::AppHandle) -> Result<PathBuf, String> {
    let temp_dir = safe_app_data_path(app, TEMP_ROOT)?;
    fs::create_dir_all(&temp_dir).map_err(|err| format!("Could not create temp directory: {err}"))?;
    let nanos = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map_err(|err| format!("System time error: {err}"))?
        .as_nanos();
    Ok(temp_dir.join(format!("kanri-{nanos}.tmp")))
}

fn existing_blob_for_hash(app: &tauri::AppHandle, sha256: &str) -> Result<Option<PathBuf>, String> {
    let prefix = &sha256[0..2];
    let dir = safe_app_data_path(app, &format!("{BLOB_ROOT}/{prefix}"))?;
    if !dir.exists() {
        return Ok(None);
    }

    for entry in fs::read_dir(&dir).map_err(|err| format!("Could not inspect blob directory: {err}"))? {
        let entry = entry.map_err(|err| format!("Could not inspect blob entry: {err}"))?;
        let path = entry.path();
        let Some(stem) = path.file_stem().and_then(|value| value.to_str()) else {
            continue;
        };
        if stem == sha256 {
            return Ok(Some(path));
        }
    }

    Ok(None)
}

fn relative_blob_path(path: &Path) -> Result<String, String> {
    let mut found = false;
    let mut parts = Vec::new();

    for component in path.components() {
        let text = component.as_os_str().to_string_lossy().to_string();
        if text == ASSET_ROOT {
            found = true;
        }
        if found {
            parts.push(text);
        }
    }

    if !found || parts.is_empty() {
        return Err("Could not make blob path relative".to_string());
    }

    Ok(parts.join("/"))
}

fn persist_reader_to_blob<R: Read>(
    app: &tauri::AppHandle,
    reader: &mut R,
    name: &str,
    fallback_mime_type: Option<String>,
    max_bytes: Option<u64>,
) -> Result<AssetBlobInfo, String> {
    let safe_name = sanitize_file_name(name);
    let temp_path = unique_temp_path(app)?;
    let temp_file = File::create(&temp_path).map_err(|err| format!("Could not create temp file: {err}"))?;
    let mut writer = BufWriter::new(temp_file);
    let mut hasher = Sha256::new();
    let mut size = 0_u64;
    let mut buffer = [0_u8; 64 * 1024];

    loop {
        let read = reader
            .read(&mut buffer)
            .map_err(|err| format!("Could not read attachment: {err}"))?;
        if read == 0 {
            break;
        }

        size += read as u64;
        if max_bytes.is_some_and(|max| size > max) {
            let _ = fs::remove_file(&temp_path);
            return Err("Attachment exceeds the configured size limit".to_string());
        }

        hasher.update(&buffer[..read]);
        writer
            .write_all(&buffer[..read])
            .map_err(|err| format!("Could not write attachment blob: {err}"))?;
    }

    writer
        .flush()
        .map_err(|err| format!("Could not flush attachment blob: {err}"))?;

    let sha256 = hex::encode(hasher.finalize());
    let mime_type = infer_mime_type(&safe_name, fallback_mime_type);
    let kind = infer_kind(&safe_name, mime_type.as_deref());

    let existing = existing_blob_for_hash(app, &sha256)?;
    let final_path = if let Some(path) = existing {
        let _ = fs::remove_file(&temp_path);
        path
    } else {
        let ext = extension_from_name(&safe_name)
            .or_else(|| extension_from_mime(mime_type.as_deref()).map(str::to_string));
        let file_name = match ext {
            Some(ext) => format!("{sha256}.{ext}"),
            None => sha256.clone(),
        };
        let blob_relative = format!("{BLOB_ROOT}/{}/{}", &sha256[0..2], file_name);
        let final_path = safe_app_data_path(app, &blob_relative)?;
        if let Some(parent) = final_path.parent() {
            fs::create_dir_all(parent)
                .map_err(|err| format!("Could not create blob directory: {err}"))?;
        }
        fs::rename(&temp_path, &final_path)
            .map_err(|err| format!("Could not move attachment into blob store: {err}"))?;
        final_path
    };

    Ok(AssetBlobInfo {
        absolute_path: final_path.to_string_lossy().to_string(),
        blob_path: relative_blob_path(&final_path)?,
        kind,
        mime_type,
        name: safe_name,
        sha256,
        size,
    })
}

#[tauri::command]
fn kanri_ingest_file(app: tauri::AppHandle, source_path: String) -> Result<AssetBlobInfo, String> {
    let source = PathBuf::from(&source_path);
    let name = source
        .file_name()
        .and_then(|value| value.to_str())
        .unwrap_or("attachment")
        .to_string();
    let file = File::open(&source).map_err(|err| format!("Could not open attachment: {err}"))?;
    let mut reader = BufReader::new(file);
    persist_reader_to_blob(&app, &mut reader, &name, None, None)
}

#[tauri::command]
fn kanri_ingest_bytes(
    app: tauri::AppHandle,
    name: String,
    mime_type: Option<String>,
    bytes: Vec<u8>,
) -> Result<AssetBlobInfo, String> {
    let mut reader = Cursor::new(bytes);
    persist_reader_to_blob(&app, &mut reader, &name, mime_type, None)
}

#[tauri::command]
fn kanri_download_remote_image(app: tauri::AppHandle, url: String) -> Result<AssetBlobInfo, String> {
    let parsed = reqwest::Url::parse(&url).map_err(|err| format!("Invalid URL: {err}"))?;
    if parsed.scheme() != "https" && parsed.scheme() != "http" {
        return Err("Only http and https image URLs are supported".to_string());
    }

    let client = reqwest::blocking::Client::builder()
        .timeout(std::time::Duration::from_secs(20))
        .user_agent("Kanri attachment downloader")
        .build()
        .map_err(|err| format!("Could not create downloader: {err}"))?;

    let response = client
        .get(parsed.clone())
        .send()
        .map_err(|err| format!("Could not download image: {err}"))?
        .error_for_status()
        .map_err(|err| format!("Could not download image: {err}"))?;

    let content_type = response
        .headers()
        .get(reqwest::header::CONTENT_TYPE)
        .and_then(|value| value.to_str().ok())
        .map(|value| value.to_string());

    if !content_type.as_deref().unwrap_or("").starts_with("image/") {
        return Err("Remote URL did not return an image content type".to_string());
    }

    let guessed_name = parsed
        .path_segments()
        .and_then(|segments| segments.last())
        .filter(|segment| !segment.trim().is_empty())
        .unwrap_or("remote-image");
    let mut reader = response;
    persist_reader_to_blob(
        &app,
        &mut reader,
        guessed_name,
        content_type,
        Some(REMOTE_IMAGE_MAX_BYTES),
    )
}

#[tauri::command]
fn kanri_asset_exists(app: tauri::AppHandle, blob_path: String) -> Result<bool, String> {
    Ok(safe_app_data_path(&app, &blob_path)?.exists())
}

#[tauri::command]
fn kanri_delete_blob(app: tauri::AppHandle, blob_path: String) -> Result<(), String> {
    let path = safe_app_data_path(&app, &blob_path)?;
    if path.exists() {
        fs::remove_file(path).map_err(|err| format!("Could not delete attachment blob: {err}"))?;
    }
    Ok(())
}

#[tauri::command]
fn kanri_copy_blob_to(app: tauri::AppHandle, blob_path: String, target_path: String) -> Result<(), String> {
    let source = safe_app_data_path(&app, &blob_path)?;
    if !source.exists() {
        return Err("Attachment blob is missing".to_string());
    }

    let target = PathBuf::from(target_path);
    if let Some(parent) = target.parent() {
        fs::create_dir_all(parent).map_err(|err| format!("Could not create export directory: {err}"))?;
    }
    fs::copy(&source, &target).map_err(|err| format!("Could not copy attachment blob: {err}"))?;
    Ok(())
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
        .invoke_handler(tauri::generate_handler![
            kanri_asset_exists,
            kanri_copy_blob_to,
            kanri_delete_blob,
            kanri_download_remote_image,
            kanri_ingest_bytes,
            kanri_ingest_file,
        ])
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
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
