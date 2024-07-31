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
        .invoke_handler(tauri::generate_handler![load_board_from_file, write_to_board_file, get_boards_to_display])
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

#[tauri::command]
fn write_to_board_file(board_path: String, board_content: serde_json::Value) -> String {
    // write to specified board file
    match fs::write(&board_path, board_content.to_string()) {
        Ok(_) => {},
        Err(e) => {
            println!("Error writing to file {} : {:?}", board_path, e);
            return String::from("error writing to file");
        }
    };

    return String::from("success");
}

#[tauri::command]
fn get_boards_to_display(save_path: String) -> Vec<String> {
    // get all files in save_path and put all json files into an array
    let mut boards: Vec<String> = Vec::new();
    let files = fs::read_dir(save_path).unwrap();

    // loop through the files and add them to the boards vector
    for file in files {
        let file = file.ok().unwrap();
        let file_path = file.path();
        let file_extension = file_path.extension().unwrap().to_str().unwrap();

        if file_extension == "json" {
            boards.push(fs::read_to_string(file_path).unwrap());
        }
    }

    // return the boards vector
    return boards;
}
