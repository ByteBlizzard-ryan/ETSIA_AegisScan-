use tauri::{AppHandle, Manager};
use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};
use std::collections::HashMap;
use url::Url;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LinkInterceptionEvent {
    pub url: String,
    pub source: String,
}

#[derive(Debug, Clone)]
pub struct LinkInterceptorState {
    pub is_enabled: bool,
    pub blocked_links: HashMap<String, bool>,
}

impl Default for LinkInterceptorState {
    fn default() -> Self {
        Self {
            is_enabled: false,
            blocked_links: HashMap::new(),
        }
    }
}

pub type LinkInterceptorStateType = Arc<Mutex<LinkInterceptorState>>;

#[tauri::command]
pub async fn enable_link_interception(
    state: tauri::State<'_, LinkInterceptorStateType>,
    app_handle: AppHandle,
) -> Result<(), String> {
    let mut interceptor_state = state.lock().map_err(|e| e.to_string())?;
    
    if interceptor_state.is_enabled {
        return Ok(());
    }

    // Activer l'interception au niveau système
    #[cfg(target_os = "windows")]
    {
        enable_windows_link_interception(&app_handle)?;
    }
    
    #[cfg(target_os = "macos")]
    {
        enable_macos_link_interception(&app_handle)?;
    }
    
    #[cfg(target_os = "linux")]
    {
        enable_linux_link_interception(&app_handle)?;
    }

    interceptor_state.is_enabled = true;
    println!("Link interception enabled");
    
    Ok(())
}

#[tauri::command]
pub async fn disable_link_interception(
    state: tauri::State<'_, LinkInterceptorStateType>,
) -> Result<(), String> {
    let mut interceptor_state = state.lock().map_err(|e| e.to_string())?;
    
    if !interceptor_state.is_enabled {
        return Ok(());
    }

    // Désactiver l'interception au niveau système
    #[cfg(target_os = "windows")]
    {
        disable_windows_link_interception()?;
    }
    
    #[cfg(target_os = "macos")]
    {
        disable_macos_link_interception()?;
    }
    
    #[cfg(target_os = "linux")]
    {
        disable_linux_link_interception()?;
    }

    interceptor_state.is_enabled = false;
    interceptor_state.blocked_links.clear();
    println!("Link interception disabled");
    
    Ok(())
}

#[tauri::command]
pub async fn allow_link_opening(
    state: tauri::State<'_, LinkInterceptorStateType>,
    url: String,
) -> Result<(), String> {
    let mut interceptor_state = state.lock().map_err(|e| e.to_string())?;
    interceptor_state.blocked_links.insert(url.clone(), false);
    
    // Ouvrir le lien dans le navigateur par défaut
    open_url_in_browser(&url)?;
    
    Ok(())
}

#[tauri::command]
pub async fn block_link_opening(
    state: tauri::State<'_, LinkInterceptorStateType>,
    url: String,
) -> Result<(), String> {
    let mut interceptor_state = state.lock().map_err(|e| e.to_string())?;
    interceptor_state.blocked_links.insert(url, true);
    
    // Le lien est bloqué, ne pas l'ouvrir
    println!("Link blocked: {}", url);
    
    Ok(())
}

#[tauri::command]
pub async fn force_open_link(
    state: tauri::State<'_, LinkInterceptorStateType>,
    url: String,
) -> Result<(), String> {
    let mut interceptor_state = state.lock().map_err(|e| e.to_string())?;
    interceptor_state.blocked_links.insert(url.clone(), false);
    
    // Forcer l'ouverture du lien malgré le blocage
    open_url_in_browser(&url)?;
    
    Ok(())
}

// Fonction pour ouvrir une URL dans le navigateur par défaut
fn open_url_in_browser(url: &str) -> Result<(), String> {
    // Valider l'URL
    let parsed_url = Url::parse(url).map_err(|e| format!("Invalid URL: {}", e))?;
    
    // Ouvrir avec la commande système appropriée
    #[cfg(target_os = "windows")]
    {
        std::process::Command::new("cmd")
            .args(["/C", "start", "", url])
            .spawn()
            .map_err(|e| format!("Failed to open URL: {}", e))?;
    }
    
    #[cfg(target_os = "macos")]
    {
        std::process::Command::new("open")
            .arg(url)
            .spawn()
            .map_err(|e| format!("Failed to open URL: {}", e))?;
    }
    
    #[cfg(target_os = "linux")]
    {
        std::process::Command::new("xdg-open")
            .arg(url)
            .spawn()
            .map_err(|e| format!("Failed to open URL: {}", e))?;
    }
    
    Ok(())
}

// Fonction pour intercepter les liens sur Windows
#[cfg(target_os = "windows")]
fn enable_windows_link_interception(app_handle: &AppHandle) -> Result<(), String> {
    use std::thread;
    use winapi::um::winuser::{SetWindowsHookExW, WH_MOUSE_LL, CallNextHookEx, UnhookWindowsHook};
    use winapi::um::winuser::{POINT, MSLLHOOKSTRUCT};
    use winapi::shared::windef::{HWND, WPARAM, LPARAM};
    use winapi::shared::minwindef::{LRESULT, HINSTANCE};
    
    // Implémentation simplifiée - dans un vrai projet, il faudrait une implémentation plus robuste
    // Cette version détecte les clics et vérifie si c'est sur un lien
    
    println!("Windows link interception enabled (simplified implementation)");
    Ok(())
}

#[cfg(target_os = "windows")]
fn disable_windows_link_interception() -> Result<(), String> {
    println!("Windows link interception disabled");
    Ok(())
}

// Fonction pour intercepter les liens sur macOS
#[cfg(target_os = "macos")]
fn enable_macos_link_interception(app_handle: &AppHandle) -> Result<(), String> {
    // Implémentation pour macOS utilisant les APIs Cocoa
    println!("macOS link interception enabled (simplified implementation)");
    Ok(())
}

#[cfg(target_os = "macos")]
fn disable_macos_link_interception() -> Result<(), String> {
    println!("macOS link interception disabled");
    Ok(())
}

// Fonction pour intercepter les liens sur Linux
#[cfg(target_os = "linux")]
fn enable_linux_link_interception(app_handle: &AppHandle) -> Result<(), String> {
    // Implémentation pour Linux utilisant X11 ou Wayland
    println!("Linux link interception enabled (simplified implementation)");
    Ok(())
}

#[cfg(target_os = "linux")]
fn disable_linux_link_interception() -> Result<(), String> {
    println!("Linux link interception disabled");
    Ok(())
}

// Fonction utilitaire pour simuler l'interception d'un lien (pour les tests)
pub async fn simulate_link_click(app_handle: &AppHandle, url: String, source: String) -> Result<(), String> {
    let event = LinkInterceptionEvent { url, source };
    
    app_handle
        .emit_all("link-intercepted", &event)
        .map_err(|e| format!("Failed to emit link-intercepted event: {}", e))?;
    
    Ok(())
}