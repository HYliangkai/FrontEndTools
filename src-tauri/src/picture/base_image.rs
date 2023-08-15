use std::{ fs::{ self }, collections::HashMap, path::Path };

/** 图片转base64 */
#[tauri::command]
pub fn image_to_base64(path: &str) -> String {
    let file = fs::read(path).unwrap();
    base64::encode(file)
}
/** 获取图片信息 */
#[tauri::command]
pub fn read_image_info(path: &str) -> Result<HashMap<String, String>, &str> {
    let mut hm: HashMap<String, String> = HashMap::new();
    let img = image::open(Path::new(path)).expect("文件读取失败");
    hm.insert("heigth".to_string(), img.height().to_string());
    hm.insert("width".to_string(), img.width().to_string());
    return Ok(hm);
}

/** 将base64保存为txt文件 */
#[tauri::command]
pub fn save_as_txt(path: &str, b64: &str, name: &str) -> Result<(), String> {
    if let Ok(_meta) = fs::metadata(path) {
        println!("存在");
        //如果存在同名文件需要加上后缀
        for i in 1..=100 {
            if let Ok(_mate) = fs::metadata(format!("{}/({})-{}", path, i, name)) {
                continue;
            } else {
                fs::write(format!("{}/({})-{}", path, i, name), b64).expect("写入失败");
                break;
            }
        }
    } else {
        println!("不存在");
        fs::write(format!("{}/{}", path, name), b64).expect("写入失败");
    }
    return Ok(());
}
