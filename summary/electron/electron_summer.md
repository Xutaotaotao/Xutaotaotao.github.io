---
outline: deep
title: 十年跨平台开发，Electron 凭什么占据一席之地？
titleTemplate: Electron实战
---

# 十年跨平台开发，Electron 凭什么占据一席之地？

![image.png](/img/electron_summer/image1.png)

大家好，我是徐徐。今天我们来认识认识 Electron。

## 前言
其实一直想系统的写一写 Electron 相关的文章，之前在掘金上写过，但是现在来看那些文章都写得挺粗糙的，所以现在我决定系统整理相关的知识，输出自己更多 Electron 开发相关的经验。这一节我们主要是来认识一下 Electron，这个已经有 10 年历史的跨端开发框架。我将从诞生背景，优劣势，生态，案例以及和其他框架的对比这几个方面带大家来认识 Electron。

## Electron 诞生背景
![](/img/electron_summer/image2.png)

Electron 的背景还是很强劲的，下面我们就来看看它是如何诞生的。

### 起源
Electron 的前身 Atom Shell，由 GitHub 的开发者在 2013 年创建的，当时 Atom 需要一个能够在桌面环境中运行的跨平台框架，同时能够利用 web 技术构建现代化的用户界面，于是就有了 Electron 的雏形。

### 需求 & Web 技术的发展
互联网的兴起使得桌面端的需求日益增长，传统的桌面应用开发需要针对每个操作系统（Windows、macOS、Linux）分别编写代码，这增加了开发和维护成本，所以非常需要可以通过一次开发实现多平台支持的框架。

随着 HTML5、CSS3 和 JavaScript 的快速发展，web 技术变得越来越强大和灵活。开发者希望能够利用这些技术构建现代化的用户界面，并且享受 web 开发工具和框架带来的便利。这使得更加需要一款跨端大杀器架来支持开发者，Electron 应运而生。

### 发展历程
![](/img/electron_summer/image3.png)


+ **2013 年**：Atom Shell 诞生，最初用于 GitHub 的 Atom 编辑器。
+ **2014 年 2 月**：Atom 编辑器对外发布，Atom Shell 作为其核心技术。
+ **2015 年 4 月**：Atom Shell 更名为 Electron，并作为一个独立项目发布。随着时间的推移，Electron 的功能和社区支持不断增强。
+ **2016 年**：Electron 的应用开始广泛传播，许多公司和开发者开始使用 Electron 构建跨平台桌面应用。
+ **2020 年**：Electron 发布 10.0 版本，进一步增强了稳定性和性能。
+ **2023 年**：Electron 10 周年

更多可以参考：

[https://www.electronjs.org/blog/electron](https://www.electronjs.org/blog/electron)

## Electron 优势
Electron 的优势非常的明显，大概总结为下面四个方面。

### 跨平台支持
Electron 的最大优势在于其跨平台特性。开发者可以编写一次代码，Electron 会处理不同操作系统之间的差异，使应用能够在 Windows、macOS 和 Linux 上无缝运行。

### 前端技术栈
Electron 应用使用 HTML、CSS 和 JavaScript 构建界面。开发者可以使用流行的前端框架和工具（如 React、Vue.js、Angular）来开发应用，提高开发效率和代码质量。

### Node.js 集成
Electron 将 Chromium 和 Node.js 集成在一起，这使得应用不仅可以使用 web 技术构建界面，还可以使用 Node.js 访问底层系统资源，如文件系统、网络、进程等。

### 强大社区
Electron 拥有丰富的文档、教程、示例和强大的社区支持。开发者可以很容易地找到解决问题的方法和最佳实践，从而加快开发速度。

## Electron 劣势
当然，一个东西都有两面性，有优势肯定也有劣势，劣势大概总结为以下几个方面。

### 性能问题
Electron 应用由于需要运行一个完整的 Chromium 实例，通常会占用较高的内存和 CPU 资源，性能相对较差。这在资源有限的设备上（如老旧计算机）尤为明显。

### 打包体积大
由于需要包含 Chromium 和 Node.js 运行时，Electron 应用的打包体积较大。一个简单的 Electron 应用的打包体积可能达到几十到上百 MB，这对于一些应用场景来说是不小的负担。

### 安全性
Electron 应用需要处理 web 技术带来的安全问题，如跨站脚本（XSS）攻击和远程代码执行（RCE）漏洞。开发者需要特别注意安全性，采取适当的防护措施（如使用 `contextIsolation`、`sandbox`、`Content Security Policy` 等）。

## 生态
上面谈到了 Electron 的优势和劣势，下面我们来看看 Electron 的生态。对于一款开源框架，生态是非常关键的，社区活跃度以及相应的配套工具非常影响框架的生态，如果有众多的开发者支持和维护这个框架，那么它的生态才会越来越好。Electron 的生态依托于 Node.js 发展出了很多很多开源工具，其生态是相当的繁荣。下面可以看看两张图就知道其生态的繁荣之处。

+ **GitHub 情况**

![](/img/electron_summer/image4.png)

+ **NPM 情况**

![](/img/electron_summer/image5.png)


下面是一些常见的相关生态工具。

### 打包和分发工具
+ **electron-packager**：用于将 Electron 应用打包成可执行文件。支持多平台打包，简单易用。
+ **electron-builder**：一个功能强大的打包工具，支持自动更新、多平台打包和安装程序制作。

### 测试工具
+ **Spectron**：基于 WebDriver，用于 Electron 应用的端到端测试。支持模拟用户操作和验证应用行为。
+ **electron-mocha**：用于在 Electron 环境中运行 Mocha 测试，适合进行单元测试和集成测试。

### 开发工具
+ **Electron Forge**：一个集成开发工具，简化了 Electron 应用的开发、打包和分发流程。支持脚手架、插件系统和自动更新。
+ **Electron DevTools**：调试和分析 Electron 应用性能的工具，帮助开发者优化应用性能。

## 案例
![](/img/electron_summer/image6.png)

用 Electron开发的软件非常多，国内外都有很多知名的软件，有了成功的案例才会吸引更多的开发者使用它，下面是一些举例。

### 国内
+ QQ
+ 微信开发者工具  
+ 百度网盘
+ 语雀
+ 网易灵犀办公
+ 网易云音乐

### 国外
+ Visual Studio Code  
+ Slack  
+ Discord  
+ GitHub Desktop  
+ Postman
+ WhatsApp

其他更多可参考：[https://www.electronjs.org/apps](https://www.electronjs.org/apps)

一个小技巧，Mac 电脑检测应用是否是 Electron 框架，在命令行运行如下代码：

```bash
for app in /Applications/*; do;[ -d  $app/Contents/Frameworks/Electron\ Framework.framework ] && echo $app; done
```

## 和其他跨端框架的对比
![](/img/electron_summer/image7.jpg)


一个框架的诞生避免不了与同类型的框架对比，下面是一个对比表格，展示了 Electron 与其他流行的跨端桌面应用开发框架（如 NW.js、Proton Native、Tauri 和 Flutter Desktop）的优缺点和特性：

| 特性 | Electron | NW.js | Proton Native | Tauri | Flutter Desktop |
| --- | --- | --- | --- | --- | --- |
| **开发语言** | JavaScript, HTML, CSS | JavaScript, HTML, CSS | JavaScript, React | Rust, JavaScript, HTML, CSS | Dart |
| **框架大小** | 大（几十到几百 MB） | 中等（几十 MB） | 中等（几十 MB） | 小（几 MB） | 大（几十到几百 MB） |
| **性能** | 中等 | 中等 | 中等 | 高 | 高 |
| **跨平台支持** | Windows, macOS, Linux | Windows, macOS, Linux | Windows, macOS, Linux | Windows, macOS, Linux | Windows, macOS, Linux |
| **使用的技术栈** | Chromium, Node.js | Chromium, Node.js | React, Node.js | Rust, WebView | Flutter Engine |
| **生态系统和社区** | 非常活跃，生态丰富 | 活跃 | 停滞了 | 新兴，快速增长 | 活跃，现阶段更新不频繁 |
| **开发难度** | 易于上手 | 易于上手 | 需要 React 知识 | 需要 Rust 和前端知识 | 需要 Dart 知识 |
| **自动更新支持** | 内置支持 | 需要手动实现 | 需要手动实现 | 需要手动实现 | 需要手动实现 |
| **原生功能访问** | 通过 Node.js 模块访问 | 通过 Node.js 模块访问 | 通过 Node.js 和原生模块访问 | 通过 Rust 原生模块访问 | 通过插件和原生模块访问 |
| **热重载和开发体验** | 支持（需要配置） | 支持（需要配置） | 支持（需要配置） | 支持（需要配置） | 支持（内置支持） |
| **打包和发布** | Electron Builder, Forge | nw-builder | 需要手动配置打包工具 | Tauri 打包工具 | Flutter build tools |
| **常见应用场景** | 聊天应用、生产力工具、IDE | 聊天应用、生产力工具 | 小型工具和实用程序 | 轻量级、性能要求高的应用 | 跨平台移动和桌面应用 |
| **知名应用** | VS Code, Slack, Discord, 知名应用 | WebTorrent, 其他工具 | 小型 React 工具和应用 | 新兴应用和工具 | 仅少数桌面应用，Flutter主打移动应用 |


## 结语
Electron 是一个强大的跨平台开发框架，其诞生对前端开发者的意义非常大，让很多从事前端的开发者也有机会开发桌面客户端，扩大了前端开发工程师的岗位需求。当然，它不一定是最好的框架，因为适合自己的才是最好的，主要还是看自己的业务场景和技术需要，优势和劣势都是需要考虑的，仁者见仁，智者见智。

