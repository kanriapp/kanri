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

use photon_rs::effects::adjust_brightness;
use photon_rs::conv::gaussian_blur;
use photon_rs::native::open_image;
use photon_rs::native::save_image;


/// Reads an image from the source path, applies blur and brightness, then writes it into the destination path.
///
/// # Arguments
/// * `brightness` - A float that has to be between 0 and 1, where 1 will leave the brightness unchanged and 0 will produce a black image
/// * `blur` - Blur radius to apply to the image
/// * `src_path` - Filepath where the original image is stored
/// * `dest_path` - Filepath where the edited image will be stored
#[tauri::command]
fn filter_bg(
    brightness: f32,
    blur: i32,
    src_path: String,
    dest_path: String,
) -> Result<(), String> {
    if brightness < 0f32 || brightness > 1f32 {
        return Err(format!(
            "Brightness must be between 0 and 1 but was {brightness}"
        ));
    }

    let mut img = match open_image(src_path) {
        Err(e) => return Err(e.to_string()),
        Ok(img) => img,
    };

    if brightness < 1f32 {
        let brightness_val: i16 = -255 + ((255f32 * brightness) as i16);
        adjust_brightness(&mut img, brightness_val);
    }

    if blur > 0 {
        gaussian_blur(&mut img, blur);
    }

    match save_image(img, dest_path) {
        Err(e) => return Err(e.to_string()),
        Ok(()) => return Ok(()),
    };
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
        .invoke_handler(tauri::generate_handler![filter_bg])
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
