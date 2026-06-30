---
outline: deep
title: Understanding Tauri Configuration
titleTemplate: Tauri Application Development Guide
---

# Understanding Tauri Configuration

This article focuses on the three main configuration files in a Tauri project:

- `package.json`
- `Cargo.toml`
- `tauri.conf.json`

Among them, `tauri.conf.json` is usually the most complex one.

## `package.json`

This is the standard Node.js package file. If the frontend of your Tauri app is built with Node-based tooling such as npm, yarn, or pnpm, this file is where frontend dependencies and scripts are configured.

A minimal Tauri-oriented example might look like this:

```json
{
  "scripts": {
    "dev": "command-for-your-framework",
    "tauri": "tauri"
  },
  "dependencies": {
    "@tauri-apps/api": "^1.0",
    "@tauri-apps/cli": "^1.0"
  }
}
```

In practice, the `scripts` section mostly stores the commands used to start your frontend and call Tauri CLI.

## `Cargo.toml`

`Cargo.toml` is the Rust manifest file. It declares Rust dependencies, package metadata, and other Rust-related features.

If you are not doing much native Rust development, you may rarely edit it, but it is still important to understand what it controls.

```toml
[package]
name = "xtools"
version = "0.0.0"
description = "A Tauri App"
authors = ["you"]
edition = "2021"

[build-dependencies]
tauri-build = { version = "1", features = [] }

[dependencies]
tauri = { version = "1", features = ["shell-open"] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"

[features]
custom-protocol = ["tauri/custom-protocol"]
```

The most important parts are usually the `tauri-build` and `tauri` dependencies. In general, they should stay aligned with the Tauri CLI minor version.

Cargo uses semantic versioning. If you specify:

```toml
tauri-build = { version = "1.0.0" }
```

Cargo may still resolve a later compatible patch release automatically. If you want to pin an exact version, add `=`:

```toml
tauri-build = { version = "=1.0.0" }
```

Another important area is the `features = []` configuration in the `tauri` dependency. When you run `tauri dev` or `tauri build`, features are enabled automatically according to the allowlist declared in `tauri.conf.json`.

When you build the app, Cargo also generates a `Cargo.lock` file. This is similar in purpose to `yarn.lock` or `package-lock.json` and should generally be committed for application projects.

## `tauri.conf.json`

By default, Tauri configuration uses JSON.

It can also support JSON5 or TOML if you enable the corresponding Cargo features:

- `config-json5`
- `config-toml`

Tauri reads this config object to define:

- frontend resources
- bundling behavior
- updater support
- tray configuration
- API allowlist permissions
- and more

The file is created by `tauri init` and lives under `src-tauri`.

### Supported file formats

By default, the config file is:

- `tauri.conf.json`

Alternative formats:

- `tauri.conf.json5`
- `Tauri.toml`

### Platform-specific configuration

Tauri can also merge platform-specific files such as:

- `tauri.linux.conf.json`
- `tauri.windows.conf.json`
- `tauri.macos.conf.json`

or the TOML equivalents.

### Main config sections

The config structure generally contains:

- `package`
- `tauri`
- `build`
- `plugins`

Here is a simple example:

```json
{
  "build": {
    "beforeDevCommand": "pnpm dev",
    "beforeBuildCommand": "pnpm build",
    "devPath": "http://localhost:1420",
    "distDir": "../dist"
  },
  "package": {
    "productName": "XTools",
    "version": "0.0.0"
  },
  "tauri": {
    "allowlist": {
      "all": false,
      "shell": {
        "all": false,
        "open": true
      }
    },
    "windows": [
      {
        "title": "XTools",
        "width": 800,
        "height": 600
      }
    ],
    "security": {
      "csp": null
    },
    "bundle": {
      "active": true,
      "targets": "all",
      "identifier": "com.xtool",
      "icon": [
        "icons/32x32.png",
        "icons/128x128.png",
        "icons/128x128@2x.png",
        "icons/icon.icns",
        "icons/icon.ico"
      ]
    }
  }
}
```

### What these settings mean

- `beforeDevCommand`: command to run before dev mode starts
- `beforeBuildCommand`: command to run before production packaging
- `devPath`: frontend resource location in development
- `distDir`: built frontend directory
- `productName`: application name
- `version`: application version
- `allowlist`: which native APIs are enabled
- `windows`: main window settings
- `security`: security-related config such as CSP
- `bundle`: packaging config including identifier and icons

Because Tauri has many configuration options, you will often adjust these settings based on the specific scenario of the project. The later practice articles in this series use configuration changes quite a bit.

Detailed reference:

[https://tauri.app/v1/api/config/](https://tauri.app/v1/api/config/)
