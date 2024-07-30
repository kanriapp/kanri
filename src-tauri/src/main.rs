// SPDX-FileCopyrightText: 2019-2022, The Tauri Programme in the Commons Conservancy
// SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::fs;

use tauri_plugin_autostart::MacosLauncher;
use tauri_plugin_log::LogTarget;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs_watch::init())
        .plugin(tauri_plugin_log::Builder::default().targets([
            LogTarget::LogDir,
            LogTarget::Stdout
        ]).build())
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_persisted_scope::init())
        .plugin(tauri_plugin_autostart::init(
        MacosLauncher::LaunchAgent,
        None,
        ))
        .invoke_handler(tauri::generate_handler![load_board_from_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn load_board_from_file(board_path: String) -> String {
    //load file at location
    let data = match fs::read_to_string(board_path) {
        Ok(data) => data,
        Err(e) => {
            println!("error reading file: {}", e);
            return String::from("error reading file");
        }
    };

    return data;
}
