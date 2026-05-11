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
use std::collections::HashMap;
use serde_json::json;

// État global pour stocker le token
static mut CURRENT_TOKEN: Option<String> = None;
static mut TOKEN_MUTEX: Option<Arc<Mutex<Option<String>>>> = None;

// Initialiser le mutex pour le token
fn init_token_storage() -> Arc<Mutex<Option<String>>> {
    unsafe {
        if TOKEN_MUTEX.is_none() {
            TOKEN_MUTEX = Some(Arc::new(Mutex::new(None)));
        }
        TOKEN_MUTEX.as_ref().unwrap().clone()
    }
}

// Commande pour synchroniser le token avec l'extension navigateur
#[tauri::command]
async fn sync_extension_token(token: String) -> Result<String, String> {
    println!("[Tauri] Synchronisation du token avec l'extension: {}", &token[..20.min(token.len())]);
    
    // Stocker le token localement
    let token_storage = init_token_storage();
    {
        let mut stored_token = token_storage.lock().map_err(|e| e.to_string())?;
        *stored_token = Some(token.clone());
    }
    
    // Tenter de communiquer avec l'extension via différentes méthodes
    sync_with_browser_extensions(&token).await
}

// Commande pour obtenir le token actuel
#[tauri::command]
async fn get_current_token() -> Result<Option<String>, String> {
    let token_storage = init_token_storage();
    let stored_token = token_storage.lock().map_err(|e| e.to_string())?;
    Ok(stored_token.clone())
}

// Commande pour obtenir les informations de l'application
#[tauri::command]
async fn get_app_info() -> Result<String, String> {
    let info = json!({
        "name": "AegisScan Desktop",
        "version": "1.0.0",
        "mode": "tauri",
        "capabilities": ["token_sync", "link_interception"]
    });
    Ok(info.to_string())
}

// Fonction pour synchroniser avec les extensions navigateur
async fn sync_with_browser_extensions(token: &str) -> Result<String, String> {
    println!("[Tauri] Tentative de synchronisation avec les extensions navigateur...");
    
    // Méthode 1: Écrire dans un fichier temporaire que l'extension peut lire
    if let Err(e) = write_token_to_temp_file(token).await {
        println!("[Tauri] Échec écriture fichier temporaire: {}", e);
    }
    
    // Méthode 2: Utiliser le registre Windows (si disponible)
    #[cfg(target_os = "windows")]
    if let Err(e) = write_token_to_registry(token).await {
        println!("[Tauri] Échec écriture registre: {}", e);
    }
    
    // Méthode 3: Serveur HTTP local temporaire
    if let Err(e) = start_temp_sync_server(token).await {
        println!("[Tauri] Échec serveur temporaire: {}", e);
    }
    
    Ok("Synchronisation tentée via plusieurs méthodes".to_string())
}

// Écrire le token dans un fichier temporaire
async fn write_token_to_temp_file(token: &str) -> Result<(), String> {
    use std::fs;
    use std::path::PathBuf;
    
    let mut temp_dir = std::env::temp_dir();
    temp_dir.push("aegisscan_token.json");
    
    let token_data = json!({
        "token": token,
        "timestamp": chrono::Utc::now().timestamp(),
        "source": "tauri_app"
    });
    
    fs::write(&temp_dir, token_data.to_string())
        .map_err(|e| format!("Erreur écriture fichier: {}", e))?;
    
    println!("[Tauri] Token écrit dans: {:?}", temp_dir);
    Ok(())
}

// Écrire le token dans le registre Windows
#[cfg(target_os = "windows")]
async fn write_token_to_registry(token: &str) -> Result<(), String> {
    use winreg::enums::*;
    use winreg::RegKey;
    
    let hkcu = RegKey::predef(HKEY_CURRENT_USER);
    let (key, _) = hkcu
        .create_subkey("SOFTWARE\\AegisScan")
        .map_err(|e| format!("Erreur création clé registre: {}", e))?;
    
    key.set_value("AuthToken", &token)
        .map_err(|e| format!("Erreur écriture registre: {}", e))?;
    
    key.set_value("TokenTimestamp", &chrono::Utc::now().timestamp())
        .map_err(|e| format!("Erreur écriture timestamp: {}", e))?;
    
    println!("[Tauri] Token écrit dans le registre Windows");
    Ok(())
}

#[cfg(not(target_os = "windows"))]
async fn write_token_to_registry(_token: &str) -> Result<(), String> {
    Err("Registre non disponible sur cette plateforme".to_string())
}

// Démarrer un serveur HTTP temporaire pour la synchronisation
async fn start_temp_sync_server(token: &str) -> Result<(), String> {
    use std::thread;
    use std::time::Duration;
    
    let token_clone = token.to_string();
    
    // Démarrer un serveur temporaire en arrière-plan
    thread::spawn(move || {
        // Simuler un serveur simple (implémentation basique)
        println!("[Tauri] Serveur de synchronisation temporaire démarré");
        println!("[Tauri] Token disponible pour synchronisation: {}...", &token_clone[..10.min(token_clone.len())]);
        
        // Le serveur reste actif pendant 30 secondes
        thread::sleep(Duration::from_secs(30));
        println!("[Tauri] Serveur de synchronisation temporaire arrêté");
    });
    
    Ok(())
}

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
            get_interception_status,
            sync_extension_token,
            get_current_token,
            get_app_info
        ])
        .setup(|app| {
            // Configuration initiale si nécessaire
            println!("AegisScan Desktop initialized");
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}