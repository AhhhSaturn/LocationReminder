use std::collections::HashMap;
use tauri::{AppHandle, Manager, Runtime};

#[macro_use]
extern crate dotenv_codegen;

#[tauri::command]
fn get_key() -> String {
    let secret = dotenv!("MAPS_KEY");
    format!("{}", secret)
}

struct TaskHandler;
impl<R: Runtime> tauri_plugin_schedule_task::ScheduledTaskHandler<R> for TaskHandler {
    fn handle_scheduled_task(
        &self,
        task_name: &str,
        _parameters: HashMap<String, String>,
        app: &AppHandle<R>,
    ) -> tauri_plugin_schedule_task::Result<()> {
        println!("Executing scheduled task: {}", task_name);

        match task_name {
            "send_notif" => {
                println!("Running send_notif task...");
                send_notification(app.app_handle(), "meow", "meow");
            }
            _ => {
                println!("Unknown task: {}", task_name);
                return Err(tauri_plugin_schedule_task::Error::Generic(format!(
                    "Unknown task: {}",
                    task_name
                )));
            }
        }

        Ok(())
    }
}

pub fn send_notification<R: Runtime>(app: &AppHandle<R>, title: &str, body: &str) {
    use tauri_plugin_notification::NotificationExt;
    app.notification()
        .builder()
        .title(title)
        .body(body)
        .show()
        .expect("Failed to send notification");
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_geolocation::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_schedule_task::init_with_handler(TaskHandler))
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_key])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
