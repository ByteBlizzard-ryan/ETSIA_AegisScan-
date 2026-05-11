// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod link_interceptor;

use link_interceptor::{
    LinkInterceptorStateType, LinkInterceptorState,
    enable_link_interception, disable_link_interception,
    allow_link_opening, block_link_opening, force_open_link,
    simulate_link_click
};
use std::sync::{Arc, Mutex};
use tauri::{Manager, AppHandle};

// Commande de test pour simuler un clic sur un lien
#[tauri::command]
async fn test_link_interception(app_handle: AppHandle, url: String) -> Result<(), String> {
    simulate_link_click(&app_handle, url, "Test".to_string()).await
}

// Commande pour obtenir le statut de l'interception
#[tauri::command]
async fn get_interception_status(
    state: tauri::State<'_, LinkInterceptorStateType>,
) -> Result<bool, String> {
    let interceptor_state = state.lock().map_err(|e| e.to_string())?;
    Ok(interceptor_state.is_enabled)
}

fn main() {
    let interceptor_state: LinkInterceptorStateType = Arc::new(Mutex::new(LinkInterceptorState::default()));

    tauri::Builder::default()
        .manage(interceptor_state)
        .invoke_handler(tauri::generate_handler![
            enable_link_interception,
            disable_link_interception,
            allow_link_opening,
            block_link_opening,
            force_open_link,
            test_link_interception,
            get_interception_status
        ])
        .setup(|app| {
            // Configuration initiale si nécessaire
            println!("AegisScan Desktop initialized");
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}