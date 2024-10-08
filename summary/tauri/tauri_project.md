---
outline: deep
title: Tauri 工程搭建
titleTemplate: Tauri应用开发实践指南
---

# Tauri 工程搭建
_⚠️注意：此工程搭建，演示环境为macOS。_

## 终端环境要求
在开始开发tarui的项目之前，你需要安装Rust和系统依赖项。
具体可参考：

- [https://www.rust-lang.org/zh-CN/learn/get-started](https://www.rust-lang.org/zh-CN/learn/get-started)

- [https://tauri.app/zh-cn/v1/guides/getting-started/prerequisites](https://tauri.app/zh-cn/v1/guides/getting-started/prerequisites)

## 命令行初始化项目
```bash
pnpm create tauri-app
```
按照命令行提示依次输入项目名称，包名，前端语言，包管理工具，前端UI框架库以及编程语言
![截屏2024-06-03 14.29.47.png](/img/截屏2024-06-0314.29.47.png)
现在如果你的vscode安装了[rust-analyzer](https://code.visualstudio.com/docs/languages/rust)和[Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)这两个插件，在打开此项目的时候，会自动下载rust相关的依赖。按照提示可以进入项目根目录安装前端相关依赖并启动项目。首次启动会下载编译一些文件，可能会比较慢，建议使用科学上网。
如果一切顺利，你会出现这个界面，我这里选择的是Vite + React 的模式所以会出现这个界面，你如果选择其他的将会出现对应的界面。
![截屏2024-06-03 14.49.56.png](/img/截屏2024-06-0314.49.56.png)
## 项目结构
```bash
[tauri-app] # 项目名称
├─ [node_modules] # 前端依赖
├─ [src] # 前端程序源
├─ [src-tauri] # Tauri 程序源
│    ├─ [icons] # 应用程序图标
│    ├─ [src] # Tauri App 程序源，例如系统菜单，托盘，插件配置等
│    ├─ [target] # 构建的产物会被放入此文件夹中，target 目录的结构取决于是否使用 --target 标志为特定的平台构建
│    ├─ build.rs # Tauri 构建应用
│    ├─ Cargo.lock # 包含了依赖的精确描述信息
│    ├─ Cargo.toml # Tauri (Rust) 项目清单
│    └─ tauri.conf.json # 自定义 Tauri 应用程序的配置文件，例如应用程序窗口尺寸，应用名称，权限等
├─ index.html # 项目主界面
├─ package.json # 前端package.json配置
├─ tsconfig.json # typescript 配置文件
├─ vite.config.ts # vite 配置文件
└─ ... # 其他
```
## 打包构建
这里我们只是最简单的打包构建，并没有涉及到签名等操作，只是为了根据直观的学习整个流程，后面的教程会有专门的章节来讲打包构建。
直接运行构建命令
```bash
pnpm tauri build
```
会出现如下错误，需要修改一下`src-tauri/tauri.conf.json`中的`"identifier"为"com.xtool"`，可根据自身的项目来确定identifier。第一次构建也会比较费时间，依然建议使用科学上网。
![截屏2024-06-03 15.09.58.png](/img/截屏2024-06-0315.09.58.png)
打包构建完成之后，安装包会出现在如下目录，到此就可以安装和使用了。
![截屏2024-06-03 15.19.43.png](/img/截屏2024-06-0315.19.43.png)
