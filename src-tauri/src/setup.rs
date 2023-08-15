use tauri::{ App, Manager };
use window_vibrancy::{ self, NSVisualEffectMaterial };

/// setup
pub fn init(app: &mut App) -> std::result::Result<(), Box<dyn std::error::Error>> {
    // 获取窗口
    let win = app.get_window("main").unwrap();

    //进行窗口设置

    front_end_tools::utils::set_window_shadow(&win);

    // 仅在 windows 下执行-设置透明背景
    #[cfg(target_os = "windows")]
    window_vibrancy
        ::apply_blur(&win, Some((18, 18, 18, 125)))
        .expect("Unsupported platform! 'apply_blur' is only supported on Windows");

    // 仅在 macOS 下执行-设置透明背景
    #[cfg(target_os = "macos")]
    window_vibrancy
        ::apply_vibrancy(&win, NSVisualEffectMaterial::FullScreenUI, None, None)
        .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

    //设置圆角

    Ok(())
}
