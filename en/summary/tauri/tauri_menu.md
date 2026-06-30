---
outline: deep
title: Custom Multilingual Menus in Tauri
titleTemplate: Tauri Application Development Guide
---

# Custom Multilingual Menus in Tauri

## Introduction

In desktop application development, custom menus are an important part of the user interface. They affect both discoverability and overall user experience.

Tauri provides flexible menu APIs, but if you want menus that match your application closely and support multiple languages, you usually need to build some of the structure yourself.

In the previous article, theme and language switching were already implemented, but the native menu was not yet linked to that language system. This article fills that gap.

## Why customize the menu?

Tauri provides a default menu structure, but many applications need their own layout. A custom menu lets you:

1. expose options that are tightly aligned with application behavior
2. add multilingual support for better internationalization
3. adjust menu items dynamically based on application state

## Implementation

### Build a translation helper

Assume that language JSON files already exist. To use them from the native menu layer, create a small `Translator` helper:

```rust
use std::{env, fs};
use std::collections::HashMap;
use std::path::PathBuf;
use serde_json::Value;

#[derive(Clone, serde::Serialize, serde::Deserialize, Eq, PartialEq, Hash)]
pub enum Language {
    English,
    Chinese,
}

pub struct Translator {
    translations: HashMap<Language, Value>,
}

impl Translator {
    pub fn new() -> Self {
        let mut translations = HashMap::new();

        let resource_path = Self::get_resource_path();

        let en_us: Value = serde_json::from_str(
            &fs::read_to_string(resource_path.join("locales/en-us.json"))
                .expect("Unable to read en-us.json")
        ).expect("Invalid JSON");

        let zh_cn: Value = serde_json::from_str(
            &fs::read_to_string(resource_path.join("locales/zh-cn.json"))
                .expect("Unable to read zh-cn.json")
        ).expect("Invalid JSON");

        translations.insert(Language::English, en_us);
        translations.insert(Language::Chinese, zh_cn);

        Translator { translations }
    }

    fn get_resource_path() -> PathBuf {
       PathBuf::from("./")
    }

    pub fn translate(&self, key: &str, lang: &Language) -> String {
        self.translations
            .get(lang)
            .and_then(|json| json.get(key))
            .and_then(|v| v.as_str())
            .unwrap_or(key)
            .to_string()
    }
}
```

This helper loads translation JSON files into a `HashMap` and provides a `translate()` method. If a key is missing, it falls back to the original key string.

### Create the base menu structure

With the translator in place, create a menu builder:

```rust
use tauri::{Menu, Submenu, CustomMenuItem};
use crate::translator::{Translator, Language};

pub fn create_menu(translator: &Translator, lang: &Language) -> Menu {
    let file_menu = Submenu::new(translator.translate("file", lang), Menu::new()
        .add_item(CustomMenuItem::new("about".to_string(), translator.translate("about", lang)))
        .add_item(CustomMenuItem::new("quit".to_string(), translator.translate("quit", lang)))
    );

    let edit_menu = Submenu::new(translator.translate("edit", lang), Menu::new()
        .add_item(CustomMenuItem::new("undo".to_string(), translator.translate("undo", lang)))
        .add_item(CustomMenuItem::new("redo".to_string(), translator.translate("redo", lang)))
        .add_item(CustomMenuItem::new("cut".to_string(), translator.translate("cut", lang)))
        .add_item(CustomMenuItem::new("copy".to_string(), translator.translate("copy", lang)))
        .add_item(CustomMenuItem::new("paste".to_string(), translator.translate("paste", lang)))
        .add_item(CustomMenuItem::new("selectAll".to_string(), translator.translate("selectAll", lang)))
    );

    let window_menu = Submenu::new(translator.translate("window", lang), Menu::new()
        .add_item(CustomMenuItem::new("minimize".to_string(), translator.translate("minimize", lang)))
        .add_item(CustomMenuItem::new("zoom".to_string(), translator.translate("zoom", lang)))
        .add_item(CustomMenuItem::new("close".to_string(), translator.translate("close", lang)))
    );

    Menu::new()
        .add_submenu(file_menu)
        .add_submenu(edit_menu)
        .add_submenu(window_menu)
}
```

This creates a `File`, `Edit`, and `Window` menu, and translates each title and menu item based on the chosen language.

### Load language and wire menu events in `main`

Before building the menu, the app needs a place to store the selected language. In this example, a local file is used because the database plugin is not being read directly from the main process here.

Helper functions:

```rust
fn get_data_file_path(config: &tauri::Config) -> PathBuf {
    app_data_dir(config).unwrap().join("lang.data")
}

fn write_data_to_file(config: &tauri::Config, data: &str) -> Result<(), io::Error> {
    let file_path = get_data_file_path(config);
    fs::write(file_path, data)
}

fn read_data_from_file(config: &tauri::Config) -> Result<String, io::Error> {
    let file_path = get_data_file_path(config);
    fs::read_to_string(file_path)
}
```

Then use them in `main`:

```rust
fn main() {
    let translator = Arc::new(Mutex::new(Translator::new()));
    let mut ctx = generate_context!();
    let config = ctx.config().clone();
    let mut initial_lang: Option<Language> = None;

    match read_data_from_file(&config) {
        Ok(data) => {
            initial_lang = match data.as_str() {
                "zh" => Some(Language::Chinese),
                "en" => Some(Language::English),
                _ => None,
            };
        }
        Err(e) => {
            eprintln!("Error reading file: {}", e);
        }
    }

    if initial_lang.is_none() {
        if let Some(locale) = tauri::api::os::locale() {
            initial_lang = if locale.starts_with("zh") {
                Some(Language::Chinese)
            } else if locale.starts_with("en") {
                Some(Language::English)
            } else {
                None
            };
        }
    }

    let initial_lang = initial_lang.unwrap_or(Language::English);

    let menu = create_menu(&translator.lock().unwrap(), &initial_lang);
    Builder::default()
        .menu(menu)
        .on_menu_event(|event| {
            let window = event.window();
            match event.menu_item_id() {
                "about" => {
                    tauri::api::dialog::message(Some(&window), "About", "XTools, fully local-first tools.");
                }
                "quit" => {
                    process::exit(0);
                }
                "undo" => {
                    window.eval("document.execCommand('undo')").unwrap();
                }
                "redo" => {
                    window.eval("document.execCommand('redo')").unwrap();
                }
                "cut" => {
                    window.eval("document.execCommand('cut')").unwrap();
                }
                "copy" => {
                    window.eval("document.execCommand('copy')").unwrap();
                }
                "paste" => {
                    window.eval("document.execCommand('paste')").unwrap();
                }
                "selectAll" => {
                    window.eval("document.execCommand('selectAll')").unwrap();
                }
                "close" => {
                    window.close().unwrap();
                }
                "minimize" => {
                    window.minimize().unwrap();
                }
                "zoom" => {
                    if window.is_maximized().unwrap() {
                        window.unmaximize().unwrap();
                    } else {
                        window.maximize().unwrap();
                    }
                }
                _ => {}
            }
        })
        .manage(translator.clone())
}
```

This does four main things:

1. initializes the translator
2. loads the saved language, or falls back to system locale, or finally to English
3. creates the translated menu
4. handles menu item events such as about, quit, undo, redo, cut, copy, paste, and window actions

## Summary

With this approach, a Tauri application can have a custom native menu that also participates in the app's language system.

Key ideas:

1. use Tauri's native menu APIs to build the structure
2. add a lightweight translation helper
3. apply translation at menu creation time
4. respond to menu events through `on_menu_event`

This gives the application more flexibility and makes the native menu feel like part of the same internationalized product rather than a separate hardcoded layer.

## Source code

[https://github.com/Xutaotaotao/XTools/tree/feature-menu](https://github.com/Xutaotaotao/XTools/tree/feature-menu)
