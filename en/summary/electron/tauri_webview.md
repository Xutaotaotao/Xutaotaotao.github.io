---
outline: deep
title: Running a WebView Under macOS Root Mode with Tauri and Electron
titleTemplate: Electron Practice
---

# Running a WebView Under macOS Root Mode with Tauri and Electron

## Background

On macOS, if an application runs under root mode, GUI-level Chinese input does not work properly. That makes many GUI applications effectively unusable in that environment.

So if a GUI application must be used while the main context is root, the practical answer is often to launch a separate non-root GUI process.

Even though Electron provides `webview` and `BrowserWindow`, if the application is running with root privileges, Chinese input remains broken. Since Node child processes inherit parent permissions, opening windows from that context does not solve the issue either.

## Requirements

- core goal: run a GUI app while still allowing Chinese input under a root-mode workflow
- package size: keep it as small as possible
- compatibility: keep the solution maintainable across environments

## Choosing a solution

Possible directions:

- build a WebView program yourself
- use a third-party framework such as Electron, Tauri, Qt, WebKit, or Chromium

## Why choose Tauri

After comparing the options, Tauri became the preferred approach:

1. writing a WebView application from scratch is too complex
2. some third-party frameworks are heavier than necessary
3. Tauri is lightweight, fast to compile, and suitable for this kind of small supporting application

For Tauri installation and setup, see the official documentation:

<https://tauri.app>

## Build a WebView helper with Tauri

Start by creating a Tauri project:

<https://tauri.app/v1/guides/getting-started/setup/vite>

The goal of this helper application is simple:

- load a specified URL
- display its content
- allow Chinese input normally

In a fresh Tauri project, most code can remain unchanged. The main work happens in `src-tauri/src/main.rs`.

Example:

```rust
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
        let _ = window.eval(&format!("window.location.replace('{}')", default_url));
        Ok(())
      })
      .run(tauri::generate_context!())
      .expect("error running tauri app");
}
```

For extra simplicity, `src/App.tsx` can just return an empty `div`, so the window shows only the loaded page content.

At that point, a simple WebView helper is ready.

## Communication between the main app and the WebView helper

The main app needs a button that opens the WebView helper and tells it which URL to load.

Because these are separate applications, inter-process communication needs to be handled somehow. One option is an API-based protocol. Another is a local medium such as a shared file.

For simplicity, this implementation uses a local file.

Another key point: you cannot use Node's `spawn` or `exec` here, because the child process would still inherit root privileges and Chinese input would remain broken. Instead, Electron's `shell.openPath()` is used to launch the Tauri helper app externally.

Main-process example:

```typescript
import { shell } from "electron";
import fs from "fs";
import path from "path";

const webviewMessageData = {
  webViewUrl: "https://www.google.com",
};

const webviewAppPath =
  import.meta.env.MODE === "dev"
    ? path.resolve(__dirname, "../../macBuildResources/webview.app")
    : path.resolve(__dirname, "../../../buildResources/webview.app");

fs.writeFile(
  "/Users/Shared/webviewMessage.txt",
  JSON.stringify(webviewMessageData),
  () => {
    shell.openPath(webviewAppPath);
  }
);
```

Then the WebView helper reads that file and loads the URL:

```rust
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
        let webview_message_content =
          read_json_file("/Users/Shared/webviewMessage.txt").expect("Failed to read file");
        let default_url = "https://www.baidu.com";
        let url = webview_message_content["webViewUrl"]
          .as_str()
          .unwrap_or(default_url);
        let _ = window.eval(&format!("window.location.replace('{}')", url));
        Ok(())
      })
      .run(tauri::generate_context!())
      .expect("error running tauri app");
}
```

At that point, the full flow is complete:

1. the main application writes a shared message file
2. it launches the WebView helper through `shell.openPath`
3. the helper reads the file
4. the helper loads the target URL

This provides a workable approach for GUI rendering and Chinese input under a root-driven operational flow on macOS.
