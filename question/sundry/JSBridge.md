---
outline: deep
title: JSBridge原理简析
titleTemplate: 小徐前端手记
---

# JSBridge原理简析

## 产生背景

在移动设备上，原生应用（Native App）与网页应用（Web App）各有优劣。原生应用访问设备功能强大，运行流畅，但开发成本高，更新维护复杂；网页应用跨平台性好，更新快，但访问设备能力有限，性能相对较弱。随着HTML5的兴起，Web能力不断增强，但依然无法完全替代原生能力。因此，JSBridge作为一种混合开发模式（Hybrid）的关键技术出现，它允许网页应用调用原生能力，结合了两者的优点。

## 核心原理

JSBridge的核心原理是在WebView中构建一个通信桥梁，使得JavaScript和原生代码可以双向通信。

### 1. 消息通道的建立

- **Android：**
   - **方法注入:** Android平台可以使用WebView.addJavascriptInterface()方法向WebView中注入Java对象，JavaScript可以直接通过这个对象调用其公开的方法。这些方法必须使用@JavascriptInterface注解来标记，以便可以被WebView识别。
   - **URL拦截:** 另一种方式是通过拦截URL请求。JavaScript可以通过修改window.location或创建一个iframe的src属性为特定scheme的URL（如myapp://），Android原生端通过WebViewClient.shouldOverrideUrlLoading()或WebChromeClient.onJsPrompt()等方法拦截这些URL，然后解析URL中的信息来执行对应的原生操作。
- **iOS：**
   - **消息处理器:** 在iOS的WKWebView中，可以通过WKScriptMessageHandler添加消息处理器，这允许JavaScript通过window.webkit.messageHandlers>.postMessage()发送消息给原生端。
   - **URL拦截:** 类似Android的URL拦截方法，iOS也可以通过拦截URL scheme来实现。

### 2. JavaScript调用原生方法

- **方法调用:** JavaScript通过调用事先注入的对象的方法或者通过发送消息的方式来请求原生功能的执行。
- **参数传递:** 调用时可以传递参数，这些参数通常需要被序列化（比如转换为JSON字符串），以便原生代码可以解析并获取所需信息。

### 3. 原生代码执行操作

- 原生代码解析从JavaScript传递过来的命令和参数，然后执行相应的原生操作，如访问硬件、修改设置、存储数据等。

### 4. 结果回传给JavaScript

- **回调函数:** 原生操作完成后，通常需要将结果回传给JavaScript。这可以通过回调函数实现，原生代码可以调用WebView.evaluateJavascript()（Android）或WKWebView.evaluateJavaScript()（iOS）来执行JavaScript代码，从而触发JavaScript中的回调函数。
- **URL重定向:** 另一种方法是原生代码构造一个结果数据的URL，然后加载这个URL，JavaScript端通过拦截URL来获取数据。

## 应用场景举例

JSBridge的使用场景非常广泛，例如：

- 社交分享：用户在WebView中点击分享，JSBridge调用原生的分享对话框，分享到不同的社交网络。
- 设备功能：通过JSBridge访问用户的相册或相机来上传或处理图片。
- 支付集成：在Web页面中集成原生的支付SDK，提供更加流畅的支付体验。
- 数据同步：JSBridge可以用来同步网页数据和原生应用的数据，保持用户数据的一致性。
- 性能优化：对于复杂的数据处理或动画，可以通过JSBridge调用更高效的原生代码实现。

## 安全性考量

在使用JSBridge时，安全是一个重要的考虑因素。因为不当的使用可能会导致安全漏洞，比如：

- 注入漏洞：如果WebView允许执行任意的JavaScript代码，攻击者可能会注入恶意代码，这可能导致跨站脚本攻击（XSS）等安全问题。
- 接口暴露：通过JSBridge暴露给JavaScript的原生方法如果没有适当的权限控制，可能被恶意网页滥用，导致数据泄露或者不安全的操作。
- 输入验证：原生方法在处理从JavaScript接收到的数据时，如果没有进行严格的输入验证和清理，可能会被注入恶意数据。

为了提高安全性，可以采取以下措施：

- 接口白名单：确保只有预定义的、受信任的Web内容可以调用JSBridge接口。
- 方法限制：只暴露必要的方法给JavaScript，避免提供太宽泛的API接口。
- 参数校验：在原生端对所有从JavaScript传入的数据进行严格的验证和清洗，以避免注入攻击。
- 使用HTTPS：确保WebView中加载的内容是通过HTTPS传输的，减少中间人攻击的风险。
- 版本控制：对于JSBridge的接口，实现版本控制，确保前后端兼容性和安全性。

## 性能考量

JSBridge的使用也会对应用的性能产生影响，尤其是在以下方面：

- 多次交互：频繁的JavaScript与原生代码之间的通信可能会导致性能瓶颈。
- 线程管理：JavaScript通常在UI线程执行，而原生操作可能在不同的线程中执行，不当的线程管理可能会造成UI卡顿。
- 序列化开销：在JSBridge通信过程中，需要对传递的数据进行序列化和反序列化，这个过程可能会影响性能。

为了优化性能，可以采取以下措施：

- 减少通信：尽量减少JavaScript和原生代码之间的通信次数，可以通过合并请求或者批量处理来实现。
- 异步执行：对于耗时的原生操作，采用异步执行的方式，避免阻塞UI线程。
- 优化数据传输：简化传递给原生代码的数据结构，减少不必要的数据序列化开销。

