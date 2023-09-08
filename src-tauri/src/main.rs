// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod setup;
mod picture;
mod system;
use picture::base_image;
#[tauri::command]
fn greet_ee(name: &str) -> String {
  format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn greetcc(name: &str) -> String {
  format!("Hello, {}! ", name)
}

fn main() {
  tauri::Builder
    ::default()
    .invoke_handler(
      tauri::generate_handler![
        greet_ee,
        base_image::image_to_base64,
        base_image::read_image_info,
        base_image::save_as_txt,
        system::get_system_info,
        greetcc
      ]
    ) //在invoke_handler函数内注册外部调用函数
    .setup(setup::init) //初始化函数
    .run(tauri::generate_context!()) //run🚀
    .expect("程序运行失败");
  //原始tauri只内置了 truri 和 serder 两个库
}
