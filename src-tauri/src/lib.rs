// SPDX-FileCopyrightText: 2019-2022, The Tauri Programme in the Commons Conservancy
// SPDX-FileCopyrightText: Copyright (c) 2022-2025 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::Manager;
use tauri_plugin_autostart::MacosLauncher;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_persisted_scope::init())
        .plugin(tauri_plugin_autostart::init(
            MacosLauncher::LaunchAgent,
            None,
        ))
        .setup(|app| {
            #[cfg(desktop)]
            let _ = app.handle().plugin(tauri_plugin_single_instance::init(|app, _args,_cwd| {
                let _ = app.get_webview_window("main")
                       .expect("no main window")
                       .set_focus();
            }));
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
