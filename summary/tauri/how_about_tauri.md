---
outline: deep
title: Tauri 怎么样
titleTemplate: Tauri应用开发实践指南
---

# Tauri 怎么样

## Tarui是什么
Tauri 是一个用于构建针对所有主要桌面和移动平台的小型、高速二进制文件的框架。开发人员可以集成任何能编译为 HTML、JavaScript 和 CSS 的前端框架来构建用户体验,同时在需要时利用诸如 Rust、Swift 和 Kotlin 等语言进行后端逻辑开发。
官网： [https://tauri.app](https://tauri.app/zh-cn/)
## Tarui架构
Tauri 的整体架构，自顶向下可以分为三层：

1. tauri-app：整合所有模块，读取项目配置，完成最终 APP 产物的打包；主要负责初始化 Web APP 与底层系统 API 的通信环境，注入全局 API，管理应用更新等。
2. [WRY](https://github.com/tauri-apps/wry)：一个跨平台 Webview 渲染库，会根据各平台选择特定的浏览器引擎启动 Webview，抹平平台差异，暴露统一的上层 API。
3. [TAO](https://github.com/tauri-apps/tao)：跨平台应用窗口管理器，主要用于构建各平台下的应用主窗口。

![image.png](https://cdn.nlark.com/yuque/0/2024/png/277039/1717393816609-002a56d9-0fc9-43f9-b59a-ddab66432477.png#averageHue=%23f6e9e9&clientId=uc16a16b6-ec32-4&from=paste&id=lQ7Pf&originHeight=543&originWidth=1595&originalType=url&ratio=2&rotation=0&showTitle=false&size=214008&status=done&style=none&taskId=u05e96550-e945-4e87-b5b3-5d6627de81a&title=)
Tauri 除了完全使用 rust 开发以外，与 electron 最大的不同之处就在于，没有使用直接为每个应用单独集成一个 chromium 环境，而是直接使用操作系统内置的浏览器引擎执行 Web APP，也就是这里提到的：WRY。

| 操作系统 | 浏览器引擎 | 说明 |
| --- | --- | --- |
| macOS | webkit | 系统内置，理论上表现最好的平台 |
| Linux | WebKitGTK | gtk + webkit |
| Windows | WebView2 | 从win7起，内置edge chromium中的浏览器引擎 |

参考：[https://tauri.app/v1/references/architecture/](https://tauri.app/v1/references/architecture/)
## Tauri可以做什么
基于其优秀的性能和可靠的安全性,Tauri可以用于构建各种类型的桌面应用程序,包括但不限于:

- 本地化工具:如IDE、代码编辑器、文件管理器等。
- 多媒体应用:如音乐播放器、视频播放器、流媒体客户端等。
- 游戏和娱乐应用:如小游戏、电子书阅读器等。
- 办公和生产力工具:如文字处理器、电子表格、任务管理器等。
- 系统工具和实用程序:如系统监视器、备份工具、系统清理工具等。
## 跨端桌面端框架对比
这里我们只比较跨端桌面端框架，因为原生的桌面端开发和这些框架在一个纬度上没有什么可比性。差不多有Tauri，Electron，Flutter，React Native，QT这些框架， 我们将从性能，用户界面，原生集成，社区生态，成功案例，开发经验，开发挑战这些方面去比较。
### 性能

- Tauri:作为一个基于WebView的轻量级框架,Tauri的资源占用极小,能够构建快速、高响应的桌面应用程序。它的性能表现远好于基于Chromium的Electron。
- Electron:因使用了完整的Chromium浏览器渲染进程,Electron应用通常占用较高的内存和CPU资源,在较低配置的设备上可能会表现不佳。
- Flutter:Flutter的性能值得称赞,它使用了Ahead-of-Time(AOT)和Just-In-Time(JIT)编译技术,能够提供流畅的60fps的UI渲染和快速的启动时间。
- React Native:React Native桌面应用的性能通常可以达到中等水平,但在保证跨平台一致性的同时,可能需要一些性能优化工作。
- Qt:作为一个成熟的本地框架,Qt能够提供接近原生应用的卓越性能表现,非常适合开发资源密集型的应用程序。
### 用户界面

- Tauri:前端使用Web技术开发,UI体验类似现代Web应用,后端可渲染原生UI控件。
- Electron:基于Chromium浏览器内核渲染,Electron应用的UI通常不同于原生应用,但提供了强大的Web技术支持。
- Flutter:Flutter拥有自身的modern、流畹的设计语言和丰富的widget库,为跨平台提供了一致的视觉体验。
- React Native:使用了与React相似的组件架构,支持平滑的动画和触摸手势,但需要额外的工作来实现原生体验。
- Qt:作为原生框架,Qt能带来接近本地的UI体验,提供大量的UI控件和动画支持。
### 原生集成

- Tauri:利用Rust语言天生的系统编程特性,Tauri后端可以直接访问操作系统API和硬件资源。
- Electron:通过Node.js的原生模块和一些第三方库,可以实现对系统API和硬件的集成。
- Flutter:Flutter有自身的平台通道接口,可以调用原生代码并实现硬件和系统功能集成。
- React Native:通过内置的桥接机制,可以调用底层平台的原生API和SDK。
- Qt:作为本地框架,Qt可以完全利用平台的原生功能和硬件支持。
### 社区生态

- Tauri:作为新兴框架,Tauri的社区较小但非常活跃,正在快速发展壮大。
- Electron:基于Node.js和Chromium,拥有活跃的开发者社区和大量的第三方库支持。
- React Native:Facebook主导的项目,拥有庞大的社区和大量教程文档支持。
- Flutter:Google全力推动的开源项目,社区生态日益繁荣,拥有丰富的插件和学习资源。
- Qt:作为成熟的框架,Qt拥有完备的文档和培训资源,拥有可观的应用案例。
### 成功案例

- Tauri:虽然较新,但已有多个知名项目基于Tauri,如Blink Shell、Lyo IM等。可参考：[https://github.com/tauri-apps/awesome-tauri](https://github.com/tauri-apps/awesome-tauri)
- Electron:VSCode、Slack、WhatsApp等知名桌面应用均基于Electron构建。可参考：[https://www.electronjs.org/apps](https://www.electronjs.org/apps)
- React Native:Facebook、Instagram、Ubereats等大型应用都采用了React Native。
- Flutter:Google自家多款应用使用Flutter开发,如Google Assistant、Google Stadia等。
- Qt:广泛应用于多媒体、工业控制、电子书等多个领域。
### 开发经验

- Tauri:前端使用Web框架,后端使用Rust语言,两者通过IPC通信。
- Electron:基于Web技术,前端使用HTML/JS/CSS,后端使用Node.js。
- React Native:类React编程范式,JSX语法,可重用React Web代码。
- Flutter:使用Dart语言开发,采用声明式编程风格编写UI。
- Qt:使用C++或QML(类JavaScript)语言,提供完整的IDE和工具链支持。
### 开发挑战

- Tauri:社区生态相对较新是当前的一个挑战，与更成熟的选项相比，Tauri 可能拥有较小的社区和较少的第三方库。
- Electron:提升性能、内存和包大小优化是常见挑战。
- React Native:管理原生依赖,实现跨平台高性能是较大挑战。
- Flutter:实现高度自定义和不同操作系统之间一致性需要额外工作。
- Qt:相对陡峭的学习曲线,深度整合系统功能复杂度较高。
### 总体比较
比较总结，1打10分为每项比较项打分，分越高代表此项越好，这些分数是基于上面的对比和分析打出的主观评分,可以作为参考,但不是绝对评判。不同项目和团队对于框架的需求可能有所不同,需要结合具体情况权衡利弊。

| 框架 | 性能 | 用户界面 | 原生集成 | 社区生态 | 成功案例 | 开发经验 | 开发挑战 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Tauri | 9 | 8 | 9 | 7 | 7 | 8 | 7 |
| Electron | 5 | 8 | 6 | 9 | 9 | 9 | 8 |
| React Native | 6 | 7 | 7 | 9 | 9 | 8 | 7 |
| Flutter | 8 | 8 | 7 | 8 | 7 | 7 | 7 |
| Qt | 9 | 9 | 10 | 6 | 8 | 6 | 5 |

## 总结
Tauri是一个全新的桌面端框架,它采用了一种独特的三层架构,将Web前端与Rust后端相结合。相比传统的桌面应用程序框架,Tauri具有更小的二进制文件大小(仅7.5MB)、更高的性能(CPU使用率仅为14.5%)、更好的安全性(严格的沙箱机制)和更好的与操作系统API的集成能力。
凭借其卓越的性能表现和可靠的安全性,Tauri为开发者提供了一种全新的构建桌面应用程序的方式。它已经被广泛应用于各种类型的应用场景,如本地化工具、多媒体应用、游戏和娱乐应用、办公和生产力工具等。
随着Tauri社区的不断发展和完善,我们可以期待它在未来会有更加广泛的应用和发展前景,为开发者提供更加高效、安全和可靠的桌面应用程序解决方案。
