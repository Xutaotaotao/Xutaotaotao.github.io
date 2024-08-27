---
outline: deep
title: Tauri 自定义多语言开发
titleTemplate: Tauri应用开发实践指南
---

# Tauri 自定义多语言开发

## 前言
在现代桌面应用程序开发中，自定义菜单不仅是用户界面的重要组成部分，还直接影响用户体验和应用功能的可访问性。Tauri，作为一个轻量级的跨平台桌面应用开发框架，提供了强大而灵活的菜单自定义能力。
我们在上一节中实现了主题 & 多语言设置开发，但是多语言和原生菜单并没有联动处理，本文将探讨如何在 Tauri 应用中创建自定义菜单，并实现多语言支持，以满足国际化需求。
## 背景
Tauri 默认提供了基本的菜单结构，但在许多情况下，开发者需要根据应用的具体需求来定制菜单。自定义菜单允许我们：

1. 提供与应用功能紧密相关的选项
2. 实现多语言支持，提高应用的国际化水平
3. 根据应用状态动态调整菜单项
## 具体实现
### 实现多语言支持
我们已经维护了多语言的 JSON 文件，要想在原生菜单中使用我们需要写一个工具类 Translator，具体代码如下：
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
这段代码实现了一个简单的多语言翻译器 Translator。它使用 Rust 的标准库和 serde_json 库来加载和解析 JSON 文件，将不同语言的翻译文本存储在 HashMap 中。通过 translate 方法，可以根据指定的语言和键值获取对应的翻译文本，如果找不到对应的翻译文本，则返回原始的键值。该翻译器适用于简单的应用程序，能够根据运行环境动态加载正确的翻译资源。
### 创建基本菜单结构
有了多语言类，我就可以创建菜单的基本结构了，可以写一个创建 menu 的方法，具体代码如下：
```rust
use tauri::{Menu, Submenu, CustomMenuItem};
use crate::translator::{Translator, Language};

pub fn create_menu(translator: &Translator, lang: &Language) -> Menu {
    // File Menu
    let file_menu = Submenu::new(translator.translate("file", lang), Menu::new()
        .add_item(CustomMenuItem::new("about".to_string(), translator.translate("about", lang)))
        .add_item(CustomMenuItem::new("quit".to_string(), translator.translate("quit", lang)))
    );

    // Edit Menu
    let edit_menu = Submenu::new(translator.translate("edit", lang), Menu::new()
        .add_item(CustomMenuItem::new("undo".to_string(), translator.translate("undo", lang)))
        .add_item(CustomMenuItem::new("redo".to_string(), translator.translate("redo", lang)))
        .add_item(CustomMenuItem::new("cut".to_string(), translator.translate("cut", lang)))
        .add_item(CustomMenuItem::new("copy".to_string(), translator.translate("copy", lang)))
        .add_item(CustomMenuItem::new("paste".to_string(), translator.translate("paste", lang)))
        .add_item(CustomMenuItem::new("selectAll".to_string(), translator.translate("selectAll", lang)))
    );

    // Window Menu
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
这段代码定义了一个函数 `create_menu`，用于创建一个应用程序菜单。该菜单包含三个子菜单：文件菜单、编辑菜单和窗口菜单。每个子菜单通过 `translator` 对象根据指定语言进行翻译，并包含多个菜单项，如“关于”、“退出”、“撤销”、“重做”等。最终，这些子菜单被添加到主菜单中。
### 在主函数中创建和处理菜单事件
在这个之前我们需要做一下准备工作，即找一个文件存储多语言配置，到底是 zh 还是 en 我们需要读取文件，因为之前的数据库插件在主进程中是没办法使用的，所以我们需要同步一下两边的设置。需要先写三个函数来辅助我们，如下：
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
这三个函数分别是获取数据文件路径，写数据，读数据，有了这三个函数，我们就可以在 main 函数中自由读取多语言的配置，并根据情况创建菜单了，代码如下：
```rust
fn main() {
    let translator = Arc::new(Mutex::new(Translator::new()));
    let mut ctx = generate_context!();
    let config = ctx.config().clone();
    let mut initial_lang: Option<Language> = None;

    // 首先尝试从文件读取语言设置
    match read_data_from_file(&config) {
        Ok(data) => {
            initial_lang = match data.as_str() {
                "zh" => Some(Language::Chinese),
                "en" => Some(Language::English),
                // 可以添加其他语言
                _ => None,
            };
        }
        Err(e) => {
            eprintln!("Error reading file: {}", e);
        }
    }

    // 如果文件中没有有效的语言设置，则尝试使用系统语言
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

    // 如果仍然没有设置语言，使用默认语言（这里设置为英语）
    let initial_lang = initial_lang.unwrap_or(Language::English);

    let menu = create_menu(&translator.lock().unwrap(), &initial_lang);
    Builder::default()
        .menu(menu)
        .on_menu_event(|event| {
            let window = event.window();
            match event.menu_item_id() {
                "about" => {
                    tauri::api::dialog::message(Some(&window), "关于", "XTools, 完全本地化工具。");
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
这段代码主要完成以下任务：

1. 初始化翻译器：创建一个 Translator 实例并用 Arc 和 Mutex 包装。
2. 读取语言设置：尝试从配置文件读取语言设置，如果失败则尝试使用系统语言，若仍无效则默认使用英语。
3. 创建菜单：调用 create_menu 函数，根据翻译器和初始语言创建应用程序菜单。
4. 处理菜单事件：设置菜单事件处理函数，处理各种菜单项事件，如“关于”、“退出”、“撤销”、“重做”等。

最终，代码通过 Builder 构建应用，并管理翻译器实例。
## 总结
通过以上步骤，我们成功地在 Tauri 应用中实现了自定义菜单，并支持多语言切换。这种方法不仅提高了应用的可用性，还增强了其国际化能力。关键点包括：

1. 使用 Tauri 提供的 API 构建菜单结构
2. 实现简单的翻译器以支持多语言
3. 在菜单创建过程中应用翻译
4. 处理菜单事件以响应用户操作

自定义菜单为 Tauri 应用提供了更大的灵活性，允许开发者创建与应用紧密集成、符合用户需求的界面。通过添加多语言支持，我们进一步提升了应用的全球适用性。
在实际开发中，您可能需要根据具体需求进行更复杂的菜单设计和事件处理。此外，考虑使用更强大的国际化库来处理大型应用的翻译需求。
## 源码
[https://github.com/Xutaotaotao/XTools/tree/feature-menu](https://github.com/Xutaotaotao/XTools/tree/feature-menu)
