#[macro_use]
extern crate dotenv_codegen;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn get_key() -> String {
    let secret = dotenv!("MAPS_KEY");
    format!("{}", secret)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_geolocation::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_key])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
