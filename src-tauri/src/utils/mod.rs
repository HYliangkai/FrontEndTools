use tauri::Window;
use window_shadows::set_shadow;
/** 设置圆角+阴影 */
#[cfg(any(windows, target_os = "macos"))]
pub fn set_window_shadow(win: &Window) {
    set_shadow(win, false).expect("创建失败");
}
