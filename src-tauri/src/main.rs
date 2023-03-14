mod commands;

extern crate dotenv;
use commands::translate::translate::TranslateResponseBody;
use dotenv::dotenv;
use std::env;
use tauri::{
    api::shell::open, AppHandle, CustomMenuItem, Manager, Menu, MenuItem, Submenu, SystemTray,
    SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem, SystemTraySubmenu,
};

#[macro_use]
extern crate dotenv_codegen;

#[cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn translate(text: String) -> TranslateResponseBody {
    // println!("{}", dotenv!("SECRET_ID"));
    println!("{}", text);
    // String::from("authorization")
    commands::translate::translate::trnalslate(text.as_str())
        .await
        .unwrap()
    // commands::authorization::authorization::get_authorization()
}

const links: [(&str, &str, &str); 5] = [
    // social links
    (
        "open-social-netlify",
        "Netlify",
        "https://app.netlify.com/teams/christopherbiscardi/overview",
    ),
    (
        "open-social-youtube",
        "YouTube",
        "https://www.youtube.com/@chrisbiscardi",
    ),
    ("open-social-twitter", "Twitter", "https://twitter.com/"),
    // github links
    (
        "open-github-rust-adventure",
        "Rust Adventure",
        "https://github.com/rust-adventure",
    ),
    (
        "open-github-bevy",
        "Bevy",
        "https://github.com/bevyengine/bevy",
    ),
];

fn main() {
    //init menu bar
    // let sub_menu_social = {
    //     let mut menu = SystemTrayMenu::new();
    //     for (id, label, _url) in links
    //         .iter()
    //         .filter(|(id, label, _url)| id.starts_with("open-social"))
    //     {
    //         menu = menu.add_item(CustomMenuItem::new(id.to_string(), label.to_string()));
    //     }

    //     SystemTraySubmenu::new("Social", menu)
    // };
    // let sub_menu_github = {
    //     let mut menu = SystemTrayMenu::new();
    //     for (id, label, _url) in links
    //         .iter()
    //         .filter(|(id, label, _url)| id.starts_with("open-github"))
    //     {
    //         menu = menu.add_item(CustomMenuItem::new(id.to_string(), label.to_string()));
    //     }

    //     SystemTraySubmenu::new("GitHub", menu)
    // };
    let tray_menu = SystemTrayMenu::new()
        .add_item(CustomMenuItem::new("open".to_string(), "Open"))
        .add_item(CustomMenuItem::new("quit".to_string(), "Quit"))
        // .add_submenu(sub_menu_social)
        // .add_submenu(sub_menu_github)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("visibility-toggle".to_string(), "Hide"));

    let tray = SystemTray::new().with_menu(tray_menu);

    //init menu
    // 这里 `"quit".to_string()` 定义菜单项 ID，第二个参数是菜单项标签。
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let close = CustomMenuItem::new("close".to_string(), "Close");
    let submenu = Submenu::new("File", Menu::new().add_item(quit).add_item(close));
    let menu = Menu::new()
        .add_native_item(MenuItem::Copy)
        .add_item(CustomMenuItem::new("hide", "Hide"))
        .add_submenu(submenu);

    tauri::Builder::default()
        .setup(|app| {
            // let local_window =
            //     tauri::WindowBuilder::new(app, "local", tauri::WindowUrl::App("index.html".into()))
            //         .build()?;
            Ok(())
        })
        .system_tray(tray)
        .on_system_tray_event(on_system_tray_event)
        .menu(menu)
        .invoke_handler(tauri::generate_handler![greet, translate])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn on_system_tray_event(app: &AppHandle, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::MenuItemClick { id, .. } => {
            let item_handle = app.tray_handle().get_item(&id);
            dbg!(&id);
            match id.as_str() {
                "visibility-toggle" => {
                    let window = app.get_window("main").unwrap();
                    match window.is_visible() {
                        Ok(true) => {
                            window.hide().unwrap();
                            item_handle.set_title("Show").unwrap();
                        }
                        Ok(false) => {
                            window.show();
                            item_handle.set_title("Hide").unwrap();
                        }
                        Err(e) => unimplemented!("what kind of errors happen here?"),
                    }
                }
                "open" => {
                    println!("open");
                    let window = app.get_window("theUniqueLabel");
                    match window {
                        Some(window) => {
                            window.show().unwrap();
                            app.get_window("theUniqueLabel")
                                .unwrap()
                                .set_focus()
                                .unwrap();
                        }
                        None => {
                            let handle = app.app_handle();
                            tauri::WindowBuilder::new(
                                app,
                                "theUniqueLabel",
                                tauri::WindowUrl::App("translate.html".into()),
                            )
                            .build();
                        }
                    }
                    // .unwrap().show().unwrap();
                    // app.get_window("theUniqueLabel").unwrap().set_focus().unwrap();
                }
                "quit" => app.exit(0),
                s if s.starts_with("open-") => {
                    if let Some(link) = links.iter().find(|(id, ..)| id == &s) {
                        open(&app.shell_scope(), link.2, None).unwrap();
                    }
                }
                _ => {}
            }
        }
        _ => {}
    }
}
