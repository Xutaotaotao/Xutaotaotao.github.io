---
outline: deep
title:  从架构到API，你真的掌握了Electron的全貌吗？
titleTemplate: Electron实战
---

# 从架构到API，你真的掌握了Electron的全貌吗？
大家好，我是徐徐。今天我们来浅析一下 Electron 的原理。

## 前言
Electron 的原理是每个开发 Electron 应用的开发者都需要了解的知识内容，因为知道整个原理全貌后你才能在设计一个应用的时候更加的合理，遇到问题才知道从哪个方面去分析。这篇文章将主要从架构层面，协作方式，底层支持，源码层面，API设计等方面来剖析 Electron 的原理。

## 架构层面
### 两个组件
![](/img/electron_frame/image11.png)

Electron 的核心架构是基于 Chromium 和 Node.js 两个主要组件，各自扮演不同的角色。

#### Chromium
Chromium 是一个开源的浏览器项目，Google Chrome 就是基于它构建的。Electron 使用 Chromium 作为其渲染引擎，这意味着 Electron 应用可以利用现代 web 标准和技术，如 HTML5、CSS3 和 JavaScript 来构建用户界面。

Chromium 提供了以下主要功能：

+ 渲染引擎：负责将 HTML、CSS 和 JavaScript 转换为用户界面。
+ 多进程架构：每个页面（窗口）通常运行在独立的渲染进程中，提高了应用的稳定性和安全性。

#### Node.js
Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时，Electron 使用 Node.js 提供系统级别的 API，允许开发者在应用中使用服务器端的功能。

Node.js 主要提供以下功能：

+ 文件系统访问：允许读写文件、创建目录等操作。
+ 网络通信：支持 HTTP/HTTPS 请求、WebSocket 等网络协议。
+ 进程管理：可以创建和管理子进程，执行系统命令等。

### 两种进程


Electron 应用通常包含主进程和渲染进程两种进程类型，每一种进程都有自己的属性和职责，另外还包含预加载脚本，他们相互协作构建出一个应用。

#### 主进程（Main Process）
主进程是 Electron 应用的入口点，通常负责以下任务：

+ 应用生命周期管理：包括启动、退出等。
+ 创建和管理窗口：通过 `BrowserWindow` 对象创建和管理应用中的各个窗口（渲染进程）。
+ 与操作系统交互：可以使用 Node.js API 进行文件操作、打开本地文件对话框等。
+ 进程间通信：主进程和渲染进程之间通过 `ipcMain` 和 `ipcRenderer` 模块进行通信。

#### 渲染进程（Renderer Process）
渲染进程负责 web 页面的渲染，每个 `BrowserWindow` 对象通常对应一个独立的渲染进程。渲染进程具有以下特点：

+ 独立性：每个窗口有自己独立的渲染进程，崩溃时不会影响其他窗口。
+ 安全性：由于渲染进程通常运行不具备完全访问 Node.js API 的权限，因此可以增强应用的安全性。
+ UI 渲染：渲染进程使用 Chromium 提供的渲染引擎来显示 HTML、CSS 和 JavaScript 构建的用户界面。

#### 预加载脚本（Preload Scripts）(可选)
预加载脚本在渲染进程中运行，但可以访问部分 Node.js API。它们的主要作用是：

+ 安全桥梁：在渲染进程和主进程之间建立一个安全的桥梁，提供受控的 Node.js API 访问。
+ 初始化任务：在 web 页面加载之前进行一些必要的初始化任务，如注入全局变量、设置事件监听等。

## Chromium 和 Node.js 的协作
![](/img/electron_frame/13.png)

Electron 通过进程隔离、上下文桥接和 IPC 机制，实现了 Chromium 和 Node.js 的高效协作，确保应用的稳定性、安全性和功能性。

### 进程隔离
进程隔离是 Electron 实现稳定性和安全性的重要机制。Electron 通过将应用分为主进程（Node.js运行）和多个渲染进程（Chromium运行），来确保即使一个渲染进程崩溃，也不会影响到其他部分的运行。这种隔离使得应用能够同时利用 Node.js 强大的系统级 API 和 Chromium 先进的浏览器技术，同时也提高了应用的健壮性和安全性。

### 上下文桥接
上下文桥接通过`contextBridge` API，使得Node.js的功能可以安全地暴露给渲染进程。通过这种机制，可以在不直接暴露Node.js环境的情况下，将必要的功能提供给渲染进程。

### IPC（进程间通信）
进程间通信（IPC）是 Electron 中主进程和渲染进程之间进行协作的重要机制。Electron 提供了`ipcMain` 和 `ipcRenderer` 模块，通过 IPC 机制，主进程和渲染进程可以相互发送消息，从而实现数据的传递和事件的触发。例如，当渲染进程需要访问文件系统时，可以通过发送消息给主进程，由主进程来执行实际的文件操作，并将结果返回给渲染进程。

## 底层支持
一款客户端框架，仅仅是有炫酷的界面是不行的，必须要有一些强劲的底层能力支持才能让这个桌面客户端框架完整，Electron 的底层支持主要涉及以下几个方面：

### libchromiumcontent
libchromiumcontent 是 Chromium 内容模块的封装。它提供了一个独立于 Chromium 浏览器的内容渲染引擎。它具有以下功能****：

1. **Web标准支持**：libchromiumcontent 实现了现代Web标准，包括HTML5、CSS3、ES6等。
2. **多进程架构**：利用 Chromium 的多进程架构，渲染进程和主进程分离，提升了应用的稳定性和安全性。
3. **渲染能力**：负责将 HTML、CSS 和 JavaScript 渲染为可视内容。

libchromiumcontent 作为一个共享库，被集成到 Electron 中，为 Electron 应用提供浏览器功能。Electron 的主进程启动时，会启动 Chromium 的多个子进程（包括渲染进程），来处理网页的加载和渲染。

### Node.js
Node.js 是一个基于 V8 引擎的 JavaScript 运行环境。它使得 JavaScript 可以在服务器端运行，并且能够进行 I/O 操作。

它具有以下功能：

1. **系统级API**：通过 Node.js 的模块系统，Electron 应用可以访问文件系统、网络、进程等系统级 API。
2. **异步编程**：Node.js 提供了异步 I/O 操作，可以高效地处理并发任务。
3. **模块化**：利用 Node.js 丰富的模块生态系统，开发者可以快速集成第三方库。

在 Electron 中，Node.js 被嵌入到主进程和渲染进程中。主进程负责管理应用生命周期和原生窗口，渲染进程负责网页内容的渲染和交互。通过 Node.js，开发者可以在 Electron 应用中使用 `require` 引入 Node.js 模块，直接调用底层系统 API

### V8引擎
V8 是 Google 开发的开源 JavaScript 引擎，最初用于 Chrome 浏览器，现在也被 Node.js 和 Electron 使用。

它具有以下功能：

1. **JavaScript 执行**：将 JavaScript 代码编译为本地机器码，从而提升执行速度。
2. **内存管理**：提供垃圾回收机制，自动管理内存分配和释放。
3. **性能优化**：通过即时编译（JIT）和内联缓存（inline caching）等技术，优化 JavaScript 执行性能。

V8 引擎在 Electron 中同时被 Chromium 和 Node.js 共享使用。渲染进程中的 JavaScript 代码（包括前端代码）和主进程中的 JavaScript 代码（包括 Node.js 代码）都通过 V8 引擎执行。

### 操作系统API
操作系统API 是指 Electron 应用通过 Node.js 和自定义的 native 模块与操作系统进行交互的接口。

它具有以下功能：

1. **文件系统操作**：访问和操作文件和目录。
2. **网络通信**：进行网络请求和套接字编程。
3. **进程管理**：创建和管理子进程。
4. **GUI控制**：通过 native 模块，控制窗口、菜单、通知等 GUI 元素。

Electron 应用可以使用 Node.js 的原生模块（如 `fs`、`net` 等）来直接与操作系统交互。此外，Electron 还提供了一些特定于 Electron 的模块（如 `electron` 模块），进一步封装了与操作系统的交互逻辑。这些模块通过 Node.js 的 C++ 插件机制（Node-API）与底层系统 API 进行通信。

Electron 通过整合 Chromium 的渲染能力、Node.js 的系统 API、共享的 V8 引擎以及操作系统 API，提供了一个非常强劲的底层支持能力，几乎可以做你任何想做的事情。

## 源码层面
![](/img/electron_frame/14.png)

对于源码的话，这块看自己的研究深度，大部分时候，使用一个框架是不太需要知道源码的，只要知道 API 和一些配置就行，但是如果遇到一些棘手的问题，看源码绝对可以解决你的很多问题，下面是核心源码目录的大概解释。

具体源码可以在这里在线预览：

[https://github1s.com/electron/electron/tree/main](https://github1s.com/electron/electron/tree/main)

```typescript
Electron
├── build/ - 构建脚本和配置文件
├── buildflags/ - 条件编译时可选的 Features
├── chromium_src/ - 包含 Chromium 的构建配置
├── default_app/ - Electron 默认程序，在未提供应用程序时启动
├── docs/ - Electron 文档
├── lib/ - JavaScript/TypeScript 源码
│   ├── browser/ - 主进程相关代码
│   ├── common/ - 主进程和渲染进程共享的代码
│   ├── isolated_renderer/ - 隔离渲染器相关代码
│   ├── node/ - Node.js 集成相关代码
│   ├── renderer/ - 渲染进程相关代码
│   ├── sandboxed_renderer/ - 沙箱化渲染器相关代码
│   ├── utility/ - 实用工具函数
│   └── worker/ - Web Worker 相关代码
├── npm/ - npm 相关配置和脚本
├── patches/ - 补丁文件
├── script/ - 开发和构建脚本
├── shell/ - Electron 壳层相关 C++ 代码
│   ├── app/ - 应用程序核心代码
│   ├── browser/ - 浏览器进程相关代码
│   ├── common/ - 共享代码
│   ├── renderer/ - 渲染器进程相关代码
│   ├── services/ - 服务相关代码
│   └── utility/ - 实用工具
├── spec/ - Electron 测试规范
├── spec-chromium/ - Chromium 相关测试
├── typings/ - TypeScript 类型定义文件
```

整体看 Electron 源码的结构是非常精巧的，不愧是大工程。这种结构设计允许 Electron 在保持灵活性的同时，有效管理其复杂的多进程架构和跨平台特性。它将高层 JavaScript API 与底层 C++ 实现分离，同时通过 common/ 目录实现了不同进程间的代码共享，这反映了 Electron 的核心设计理念。

### 应用入口源码简析
Electron 的源码很多，不过我们可以简单分析一下应用入口源码，就可大概理解整个 Electron 应用的启动过程了。

入口源码在：`\shell\app\electron_main_delegate.cc`，大概解读一下，在这个文件里面定义了 `ElectronMainDelegate` 类，这个类在 Electron 的启动过程中起着关键作用。下面是这个文件的主要内容和功能:

1. 基本启动流程:
    - `BasicStartupComplete()` 方法处理基本的启动任务,如设置命令行开关、注册路径提供者等。
2. 沙箱初始化:
    - `PreSandboxStartup()` 在沙箱启动之前执行一些初始化工作,如设置用户数据目录、初始化日志系统等。
3. 内容客户端创建:
    - 创建各种客户端对象,如 `CreateContentBrowserClient()`, `CreateContentRendererClient()` 等,这些对象负责管理 Electron 的不同进程。
4. 资源加载:
    - `LoadResourceBundle()` 函数负责加载本地化资源。
5. 进程类型处理:
    - `RunProcess()` 方法根据不同的进程类型执行相应的启动逻辑。
6. 特性列表和 Mojo 初始化:
    - `ShouldCreateFeatureList()` 和 `ShouldInitializeMojo()` 控制特性列表和 Mojo 系统的初始化。
7. 崩溃报告:
    - 包含了崩溃报告相关的初始化代码,尤其是在非 MAS (Mac App Store) 构建中。
8. 平台特定代码:
    - 包含了针对 Windows、macOS 和 Linux 的特定代码处理。

这个文件的作用是协调 Electron 应用的启动过程,设置必要的环境,初始化各种组件,并为不同类型的进程(如主进程、渲染进程等)准备运行环境。它是连接 Chromium 内容模块和 Electron 特定功能的桥梁,确保 Electron 应用能够正确启动并运行。

## API设计
一个框架的 API 设计决定了它使用的上手难易度和开发者接受的程度，好在 Electron 的 API 设计也是非常巧妙的，所以开发起来也会比较顺手，它大概遵循以下原则：

### 模块化
Electron 的模块化设计允许开发者只使用他们需要的功能，提高了代码的可维护性和可读性。

+ 实现细节：
    - 每个模块通常对应一个 C++ 类，如 `app` 模块对应 `App` 类。
    - JavaScript API 通过 V8 引擎与这些 C++ 类进行绑定。
    - 模块间保持低耦合，高内聚，允许独立更新和维护。
+ 优势：
    - 便于理解和使用：开发者可以专注于所需的特定功能。
    - 性能优化：只加载必要的模块，减少内存占用。
    - 可扩展性：易于添加新模块或扩展现有模块。

### 事件驱动
事件驱动模型使得 Electron 应用能够高效地响应各种系统和用户事件。

+ 实现细节：
    - 使用 Node.js 的 `EventEmitter` 模式。
    - C++ 层面的事件通过 V8 引擎转换为 JavaScript 事件。
    - 广泛应用于生命周期管理、IPC 通信等场景。
+ 优势：
    - 非阻塞：事件处理不会阻塞主线程。
    - 松耦合：事件发送者和接收者之间无需直接依赖。
    - 灵活性：允许多个监听器响应同一事件。

### 异步优先
异步 API 设计确保了 Electron 应用的高性能和响应性。

+ 实现细节：
    - 大量使用 Promise 和 async/await 语法。
    - 在 C++ 层面，使用 libuv 实现异步操作。
    - 对于可能耗时的操作，如文件 I/O 或网络请求，总是提供异步版本。
+ 优势：
    - 提高应用响应性：避免长时间阻塞主线程。
    - 更好的错误处理：通过 Promise 链或 try-catch 结构处理异步错误。
    - 符合现代 JavaScript 实践：与 Node.js 和前端开发模式一致。

### 跨平台抽象
Electron 提供统一的 API 接口，大大简化了跨平台开发。

+ 实现细节：
    - 在 C++ 层面为不同平台实现具体功能。
    - 使用条件编译和平台特定代码来处理平台差异。
    - JavaScript API 层保持一致，底层根据平台调用不同的实现。
+ 优势：
    - 开发效率：开发者只需学习一套 API，就能开发跨平台应用。
    - 代码复用：大部分应用逻辑可以在不同平台间共享。
    - 维护简化：平台特定的问题被封装在底层，简化了上层应用的维护。

通过这些设计原则，Electron 成功地将 Web 技术与原生桌面功能结合，创造了一个强大而灵活的桌面应用开发平台。这不仅简化了开发过程，也为创新的桌面应用提供了可能性。

## 结语
这里我们大概简单地从几个方面剖析了 Electron 的原理，通过这些剖析了解了 Electron 的整体架构和设计思想，这对我们开发 Electron 应用是非常有帮助的，特别是在一些实战场景，如果对其原理了解得更加透彻，那么设计出来的应用应该也会很棒！

