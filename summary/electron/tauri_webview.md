---
outline: deep
title: Mac Root 模式 Tarui + Eletron 实现 WebView
titleTemplate: Electron实战
---

# Mac Root 模式 Tarui + Eletron 实现 WebView

## 背景

macOS 系统如果在 root 模式下运行某个应用，是无法在 GUI 层面输入中文的，这就导致了很多 GUI 应用无法正常使用。因此，如果要在 root 模式下运行 GUI 应用，就需要使用非 root 模式去运行一个 GUI 程序。即使 Electron 有 webview 模块和 BrowserWindow 模块，但是它们在 root 权限运行，所有的中文输入都是无效的。另外，由于 Node 启动子进程时，会继承父进程的权限，因此所有的中文输入都会无效，不管你在何时打开窗口。

## 需要满足的条件

- 核心目标：可以在 root 模式下运行 GUI 应用，并且可以输入中文。
- 包体积：尽量减小包体积，以便于部署。
- 兼容性：尽量保证兼容性，以便于后续维护

## 方案选择

- 自己写一个 WebView 程序：自己写一个 WebView，可以参考开源项目[WebKit](https://github.com/WebKit/webkit)或者[Chromium](https://github.com/chromium/chromium)，自己编译一个适合的版本，然后使用 C++或者 Objective-C 开发。
- 使用第三方库：使用第三方库，比如[Electron](https://www.electronjs.org/)，[Tauri](https://tauri.studio/)，[Qt](https://www.qt.io/)，[WebKit](https://webkit.org/)，[Chromium](https://www.chromium.org/)等。

## Tauri 方案

经过各方面的比较，最后决定使用 Tauri 方案。首先，第一个自己写一个 WebView 程序太复杂，而且编译太麻烦。第二，第三方库太多，而且不一定适合我们的需求。最后，Tauri 的优点是轻量级，编译快，适合小型应用。

Tauri 的安装和使用，请参考[官方文档](https://tauri.studio/docs/getting-started/intro)。

## Tauri 构建一个 WebView 组件程序

首先是初始化一个 Tauri 项目：请参考[Vite 版快速开始文档](https://tauri.app/zh-cn/v1/guides/getting-started/setup/vite)

然后，我们需要创建一个 WebView 组件，这个组件需要实现的核心功能就是：可以加载指定的 URL 地址，展示页面内容，并且可以输入中文。

在一个全新的项目中其实都不需要改动太多的代码，我们只需要修改`src-tauri/src/main.rs`这个文件，修改成这个样子，这个就是指定加载百度页面的一个 WebView 组件：

```rust
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::fs;

use tauri::Manager;

fn read_json_file(path: &str) -> Result<serde_json::Value, Box<dyn std::error::Error>> {
    let content = fs::read_to_string(path)?;

    let json: serde_json::Value = serde_json::from_str(&content)?;

    Ok(json)
  }

fn main() {
    tauri::Builder::default()
    .setup(|app| {
        let window = app.get_window("main").unwrap();
        let default_url = "https://www.baidu.com";
        let _ = window.eval(&format!("window.location.replace('{}')", url));
        Ok(())
      })
      .run(tauri::generate_context!())
      .expect("error running tauri app");
}
```

当然，为了更加清爽简单，我们可以把`src/App.tsx`返回一个空的`div`，这样初始化就不会显示任何内容。这样一个简单的 WebView 组件就完成了。

## 主应用与 WebView 组件交互联动

在主应用中，我们需要实现一个按钮，点击按钮，就打开一个`WebView`组件程序，并加载指定的 URL 地址。

如何通信是一个问题，因为是不同应用间的通信，可以通过接口的模式，也可以通过本地介质的模式。我们为了方便就直接通过本地介质的方式实现，即本地文件的形式。

另外一个问题是，如何打开`WebView`组件程序，我们不能使用`node`的`spawn`或者`exec`，因为打开后子应用也是 root 权限，无法输入中文。因此，我们需要使用`electron`的`shell`模块，通过`shell.openPath`的方式打开`WebView`组件程序。

主进程的代码如下：

```typescript
import { shell } from "electron";
import fs from "fs";
const webviewMessageData = {
  webViewUrl: "https://www.google.com",
};

// 这里是tarui应用的路径，需要根据实际情况修改
const helloRender =
  import.meta.env.MODE === "dev"
    ? path.resolve(__dirname, "../../macBuildResources/webview.app")
    : path.resolve(__dirname, "../../../buildResources/webview.app");

// 写入本地文件，供webview组件程序读取
fs.writeFile(
  "/Users/Shared/webviewMessage.txt",
  JSON.stringify(webviewMessage),
  () => {
    shell.openPath(helloRender);
  }
);
```

在`WebView`组件程序中，我们需要读取本地文件，然后解析出`webViewUrl`，然后加载这个 URL 地址, 代码如下：

```rust
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::fs;

use tauri::Manager;

fn read_json_file(path: &str) -> Result<serde_json::Value, Box<dyn std::error::Error>> {
    let content = fs::read_to_string(path)?;

    let json: serde_json::Value = serde_json::from_str(&content)?;

    Ok(json)
  }

fn main() {
    tauri::Builder::default()
    .setup(|app| {
        let window = app.get_window("main").unwrap();
        let webview_message_content = read_json_file("/Users/Shared/webviewMessage.txt").expect("读取文件失败");
        let default_url = "https://www.baidu.com";
        let url = webview_message_content["webViewUrl"].as_str().unwrap_or(default_url);
        println!("Message from Rust: {}", webview_message_content);
        println!("{}", url);
        let _ = window.eval(&format!("window.location.replace('{}')", url));
        Ok(())
      })
      .run(tauri::generate_context!())
      .expect("error running tauri app");
}
```

到这里整个流程就完成了，我们可以在主应用中点击按钮，打开`WebView`组件程序，并加载指定的 URL 地址。
