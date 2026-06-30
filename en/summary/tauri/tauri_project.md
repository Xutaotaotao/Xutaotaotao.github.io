---
outline: deep
title: Setting Up a Tauri Project
titleTemplate: Tauri Application Development Guide
---

# Setting Up a Tauri Project

_Note: the example environment used in this article is macOS._

## Terminal prerequisites

Before starting a Tauri project, you need Rust and the required system dependencies.

References:

- [https://www.rust-lang.org/learn/get-started](https://www.rust-lang.org/learn/get-started)
- [https://tauri.app/v1/guides/getting-started/prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites)

## Initialize the project from the CLI

```bash
pnpm create tauri-app
```

Follow the prompts to enter:

- project name
- package name
- frontend language
- package manager
- frontend UI framework
- programming language

![Tauri CLI project creation diagram](/images/i18n/tauri-project-en-create-cli.svg)

If your VS Code has both [rust-analyzer](https://code.visualstudio.com/docs/languages/rust) and the [Tauri extension](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) installed, opening the project will also trigger the download of Rust-related dependencies automatically.

Once that is done, install the frontend dependencies and start the project from the root directory. The first startup may take a while because it needs to download and compile a number of files.

If everything goes well, you should see the starter UI. In this example, the chosen stack is Vite + React, so the default Vite + React screen appears.

![Tauri starter project diagram](/images/i18n/tauri-project-en-starter-app.svg)

## Project structure

```bash
[tauri-app] # project name
├─ [node_modules] # frontend dependencies
├─ [src] # frontend source
├─ [src-tauri] # Tauri source
│    ├─ [icons] # app icons
│    ├─ [src] # native Tauri source such as menus, tray, and plugin config
│    ├─ [target] # build output
│    ├─ build.rs # Tauri build script
│    ├─ Cargo.lock # exact dependency snapshot
│    ├─ Cargo.toml # Rust project manifest
│    └─ tauri.conf.json # Tauri app config such as window size, name, permissions
├─ index.html # main entry page
├─ package.json # frontend package config
├─ tsconfig.json # TypeScript config
├─ vite.config.ts # Vite config
└─ ... # others
```

## Packaging and build

Here we only cover the simplest build flow. This does not involve signing yet. The goal is to understand the overall packaging path first.

Run:

```bash
pnpm tauri build
```

You may hit an error that requires editing `src-tauri/tauri.conf.json` and changing `"identifier"` to something valid such as `"com.xtool"`. You should use an identifier that fits your own project.

The first build can also take a while because of dependency downloads and compilation.

![Tauri build identifier error diagram](/images/i18n/tauri-project-en-identifier-error.svg)

After the build succeeds, the installer package appears in the build output directory and can then be installed and used.

![Tauri build output diagram](/images/i18n/tauri-project-en-build-output.svg)
