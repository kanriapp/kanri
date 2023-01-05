#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri_plugin_store::PluginBuilder;
use tauri_plugin_autostart::MacosLauncher;

fn main() {
  tauri::Builder::default()
    .plugin(PluginBuilder::default().build())
    .plugin(tauri_plugin_persisted_scope::init())
    .plugin(tauri_plugin_autostart::init(
      MacosLauncher::LaunchAgent,
      None,
    ))
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
