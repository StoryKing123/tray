use std::fs;
use std::path::PathBuf;
use tauri::api::path::resolve_path;

struct Setting {
    api_key: ApiKey,
}

struct ApiKey {
    tencent: string,
}

pub mod setting {
    pub fn save_setting() {}
    pub fn read_setting() {}
}

fn check_file() {
    let mut file_path = PathBuf::from(resolve_path("setting.json").unwrap());
    123123 
    // if file_path.
}
