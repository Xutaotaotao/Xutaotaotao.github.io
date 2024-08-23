---
outline: deep
title: Tauri 日志记录功能开发
titleTemplate: Tauri应用开发实践指南
---

# Tauri 日志记录功能开发

## 前言
日志记录是任何应用程序的关键部分，它能够提供宝贵的行为洞察并帮助调试。在本文中，我们将探讨如何为您的 Tauri 应用程序配置日志记录。Tauri 是一个强大的框架，允许您使用 Web 技术构建桌面应用程序。我们将介绍设置日志记录、将其集成到您的 Rust 和 JavaScript 代码中以及控制日志输出的步骤。
## 配置日志记录
首先，我们需要将 log crate 添加到 Rust 项目中。
```toml
[dependencies]
tauri = { version = "1", features = ["shell-open"] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"
log = "0.4.21"
```
log 插件只允许使用 log 宏（例如 log::info!(), log::error!() 等）。与之配套的是日志处理程序。在 Rust 生态系统中有许多日志处理程序，但幸运的是，Tauri 社区已经构建了一个定制的日志处理程序，可以让您从 Rust 或 JavaScript 中记录日志，并将这些日志语句合并到相同的一组定义的日志目标中（例如 STDOUT、文件甚至开发者控制台）。

安装和配置默认的 Tauri 日志处理程序只需几个步骤。

目前插件是从 Github 安装的，因此最简单的方法是将以下行添加到您的 Cargo.toml 文件中（根据它们的文档）。
```toml
[dependencies]
tauri = { version = "1", features = ["shell-open"] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"
log = "0.4.21"
tauri-plugin-log = { git = "https://github.com/tauri-apps/plugins-workspace", branch = "v1" }
```
完成 Cargo 设置后，根据您的包管理器，需要以一种方式安装。
```bash
pnpm add https://github.com/tauri-apps/tauri-plugin-log#v1
## 或者
npm add https://github.com/tauri-apps/tauri-plugin-log#v1
## 或者
yarn add https://github.com/tauri-apps/tauri-plugin-log#v1
```
接下来，我们需要在 main.rs 文件中配置日志记录器，并将插件添加到 Tauri Builder 中。
```rust
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri_plugin_log::{LogTarget}; //### 添加此 use 语句

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        //### 添加此插件语句
        .plugin(tauri_plugin_log::Builder::default().targets([
            LogTarget::Stdout,
            LogTarget::Webview,
        ]).build())
        // ##
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```
LogTarget 是日志语句将出现的位置：

- LogTarget::Stdout：控制台
- LogTarget::Webview：Tauri 窗口中的开发者控制台

此外，您还可以添加 LogTarget::LogDir：基于操作系统的指定日志文件夹，如下表所示。


- bundleIdentifier 可以在 tauri.conf.json 文件的 tauri->bundle->identifier 下找到

| OS | 格式 | 例子 |
| --- | --- | --- |
| **macOS** | {homeDir}/Library/Logs/{bundleIdentifier} | /Users/Alice/Library/Logs/com.tauri.dev |
| **Linux** | {configDir}/{bundleIdentifier} | /home/alice/.config/com.tauri.dev |
| **Windows** | {configDir}/{bundleIdentifier} | C:\\Users\\Alice\\AppData\\Roaming\\com.tauri.dev |


## 调用打印
在 main.rs 调用，这是我们之前的 change_menu_language 函数，之前是打印的模式，我们现在换成 log::info! 的方法。
```rust
fn change_menu_language(config: tauri::State<'_, Config>, lang: &str) {
    log::info!("change_menu_language: {}", lang);
    if let Err(e) = write_data_to_file(&config, lang) {
        eprintln!("Error writing file: {}", e);
    }
}
```

为了在 Webview 控制台中查看日志（LogTarget::Webview），您需要从 JavaScript 调用 attachConsole，初始化的时候就调用。
```rust
import ReactDOM from "react-dom/client";
import { I18nextProvider } from 'react-i18next';
import { attachConsole } from "tauri-plugin-log-api";
import i18n from '../src-tauri/locales/index';
import App from "./App";

attachConsole();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
);

```

我们在页面中调用就用下面的方式。
```rust
import {info} from "tauri-plugin-log-api";

const changeLangAction = async (lang: string) => {
    info('changeLangAction in render')
    setStore("lang", lang);
    setCurrentLang(lang);
    i18n.changeLanguage(lang);
    if (IS_TAURI) {
      invoke("change_menu_language", { lang }).then(() => {
        relaunch();
      });
    }
  };
```

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/25dd911eeb7c47b788b55a3a3fe0517e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5b6Q5b6Q:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE0MDA0OTM5MjU1Njc4In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1724757980&x-orig-sign=p%2BNiD%2FClid4KK42QY9qS5EwhxCw%3D)

设置日志级别

从上面的输出可以看到，由于所有的跟踪输出，输出内容相当多。通常，更适合只记录 info 级别及以上的日志。Tauri 日志器有一个 LevelFilter 机制来实现这一点。
在 main.rs 中，可以通过在插件构建器中添加 .level(LevelFilter::Info) 来过滤只显示 info 级别及以上的日志语句。
```rust
use log::LevelFilter;

 .plugin(
            tauri_plugin_log::Builder::default()
            .targets([LogTarget::LogDir, LogTarget::Stdout, LogTarget::Webview])
            .level(LevelFilter::Info)
            .build()
        )
```
这样配置之后，TRACE 语句会消失。

注意⚠️：仍然有可能在应用程序启动时看到一些 TRACE 日志，因为它们可能在 Logger 插件构建之前发生。

到这里，日志记录的功能就基本完成了。
## 结语
Tauri 应用程序配置日志记录是一个简单的过程，可以极大地提升开发体验。通过使用 log 和 tauri-plugin-log，可以轻松地将日志记录集成到您的 Rust 和 JavaScript 代码中，日志记录在客户端的开发中是必不可少的，有一个规范的日志记录能力可以提高整个程序的稳定性。
## 源码
[https://github.com/Xutaotaotao/XTools/tree/feature-log](https://github.com/Xutaotaotao/XTools/tree/feature-log)
