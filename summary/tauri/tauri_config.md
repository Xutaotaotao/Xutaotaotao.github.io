---
outline: deep
title: Tauri 配置介绍
titleTemplate: Tauri应用开发实践指南
---

# Tauri 配置介绍

这里主要是讲解一下 package.json 、Cargo.toml、tauri.conf.json这三个文件的配置。其中tauri.conf.json最为复杂，配置项非常多。
## package.json
这是Node.js使用的软件包文件。 如果使用节点开发了Tauri应用的前端。 基于node.js的技术(例如 npm, yarn, 或者 pnpm) 此文件用于配置前端依赖关系和脚本。
一个 Tauri 项目的 package.json 文件的示例可能看起来像这样一些东西：
```json
{
  "scripts": {
    "dev": "command-for-your-framework", # 您的框架命令
    "tauri": "tauri"
  },
  "dependencies": {
    "@tauri-apps/api": "^1.0",
    "@tauri-apps/cli": "^1.0"
  }
}
```
通常使用 "scripts" 部分来存储用于启动您的 Tauri 应用程序所使用的前端的命令，这个跟传统的前端项目的配置几乎没有什么差别。
## Cargo.toml
Cargo 清单文件用于声明您的应用程序依赖、应用元数据和其他 Rust 相关功能。 若您不需要 Rust 进行原生开发，您可能不需要修改此文件。但了解它的存在意义及其功能还是很重要的。
```javascript
[package]
name = "xtools"
version = "0.0.0"
description = "A Tauri App"
authors = ["you"]
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[build-dependencies]
tauri-build = { version = "1", features = [] }

[dependencies]
tauri = { version = "1", features = ["shell-open"] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"

[features]
# This feature is used for production builds or when a dev server is not specified, DO NOT REMOVE!!
custom-protocol = ["tauri/custom-protocol"]

```
需要注意的最重要部分是 tauri-build 和 tauri 依赖项。通常,它们都必须与 Tauri CLI 保持最新的次要版本,但这不是绝对必要的。如果您在运行应用程序时遇到问题,您应该检查 tauri 和 tauri-cli 是否为最新的次要版本。
Cargo 版本号使用语义化版本(SemVer)控制。运行 cargo update 命令将拉取最新可用的语义版本依赖项。例如,如果您将 tauri-build 的版本指定为 1.0.0,Cargo 将检测并下载版本 1.0.4,因为它是最新的兼容语义版本。当出现重大更改时,Tauri 将更新主版本号。您可以安全地升级到最新的次要版本和补丁版本,而无需担心代码中会有破坏性更改。
如果您想使用特定的crate版本,可以在依赖项的版本号前加上 = 来使用确切的版本:
```
Copy code

tauri-build = { version = "=1.0.0" }
```
另一个需要注意的是 tauri 依赖项中的 features=[] 部分。执行 tauri dev 和 tauri build 时,会根据您在 tauri.conf.json 中的 "allowlist" 属性自动启用所需的功能。
当您构建应用程序时,会生成 Cargo.lock 文件。这个文件主要用于确保在开发过程中跨机器使用相同的依赖项(类似于 Node.js 中的 yarn.lock 或 package-lock.json)。由于您正在开发一个 Tauri 应用程序,这个文件应该提交到您的源代码存储库(只有 Rust 库才应该忽略提交此文件)。
## tauri.conf.json
Tauri 配置的默认格式为 .json。 对 .json5 或 .toml 格式的支持可通过在 Cargo.toml 的 tauri 和 tauri-build 依赖中分别添加 config-json5 或 config-toml 的方式开启。
Tauri配置对象。它从一个文件中读取,您可以在其中定义前端资源、配置捆绑器、启用应用程序更新器、定义系统托盘、通过允许列表启用API等。
配置文件由位于Tauri应用程序源目录(src-tauri)中的tauri init命令生成。
生成后,您可以随意修改它来定制您的Tauri应用程序。
文件格式 默认情况下,配置被定义为名为tauri.conf.json的JSON文件。
Tauri还支持通过config-json5和config-toml Cargo特性分别使用JSON5和TOML文件。JSON5文件名必须为tauri.conf.json或tauri.conf.json5。TOML文件名为Tauri.toml。
平台特定配置 除了默认配置文件外,Tauri还可以从tauri.linux.conf.json、tauri.windows.conf.json和tauri.macos.conf.json(或者如果使用Tauri.toml格式,则为Tauri.linux.toml、Tauri.windows.toml和Tauri.macos.toml)读取平台特定配置,该配置将与主配置对象合并。
配置结构 配置由以下对象组成:

- package: 包设置
- tauri: Tauri配置
- build: 构建配置
- plugins: 插件配置

下面是初始化项目的配置相关解释，有更加详细的配置可参考：[https://tauri.app/v1/api/config/](https://tauri.app/v1/api/config/)
```javascript
{
  "build": {
    // 在开发模式下运行的命令,比如启动开发服务器
    "beforeDevCommand": "pnpm dev",
    // 在构建生产版本之前运行的命令,比如构建前端资源
    "beforeBuildCommand": "pnpm build",
    // 开发模式下前端资源的路径,可以是文件路径或URL
    "devPath": "http://localhost:1420",
    // 构建后生成的前端资源目录
    "distDir": "../dist"
  },
  "package": {
    // 应用程序名称
    "productName": "XTools",
    // 应用程序版本号
    "version": "0.0.0"
  },
  "tauri": {
    "allowlist": {
      // 是否允许所有APIs,false则必须单独列出
      "all": false,
      // 配置shell API权限
      "shell": {
        "all": false,
        // 允许使用shell.open API
        "open": true
      }
    },
    // 应用程序主窗口配置
    "windows": [
      {
        "title": "XTools",
        "width": 800,
        "height": 600
      }
    ],
    // 安全设置
    "security": {
      "csp": null
    },
    // 应用程序打包配置
    "bundle": {
      "active": true, // 是否进行打包
      "targets": "all", // 生成所有目标平台的安装包
      "identifier": "com.xtool", // 应用程序bundleId
      // 应用程序图标文件
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
由于配置项非常多，在开发的时候可能会根据不同场景然后修改相应的配置，在后面的实践章节会修改一些配置来配合我们的项目。
