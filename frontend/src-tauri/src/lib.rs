use tauri::Manager;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Bonjour, {}! Bienvenue sur AegisScan.", name)
}

// Command to analyze a URL (placeholder - implement with your backend)
#[tauri::command]
async fn analyze_url(url: String) -> Result<String, String> {
    // TODO: Implement actual URL analysis by calling your NestJS backend
    // Example:
    // let client = reqwest::Client::new();
    // let response = client.post("http://localhost:3000/analysis/analyze")
    //     .json(&serde_json::json!({ "url": url }))
    //     .send()
    //     .await
    //     .map_err(|e| e.to_string())?;
    
    Ok(format!("URL analysée: {}", url))
}

// Command to get user stats (placeholder)
#[tauri::command]
async fn get_user_stats() -> Result<String, String> {
    // TODO: Fetch stats from your NestJS backend
    Ok(serde_json::json!({
        "linksAnalyzed": 1245,
        "linksBlocked": 78,
        "threatsDetected": 12
    }).to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_http::init())
        .setup(|app| {
            // Get the main window
            let window = app.get_webview_window("main").unwrap();
            
            // Center the window on screen
            window.center().unwrap();
            
            // Show the window (it starts hidden by default for smooth loading)
            window.show().unwrap();
            
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            analyze_url,
            get_user_stats
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
