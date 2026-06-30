---
outline: deep
title: A Brief Analysis of JSBridge
titleTemplate: Frontend Interview Notes
---

# A Brief Analysis of JSBridge

## Why JSBridge exists

On mobile devices, native apps and web apps each have strong advantages and obvious trade-offs.

- Native apps have deep device access and better runtime performance, but they are more expensive to build and maintain.
- Web apps are easier to ship across platforms and update quickly, but they have limited access to native capabilities.

As HTML5 improved, the web became more capable, but it still could not fully replace native access to hardware and operating system features. JSBridge emerged as a key technology in hybrid development because it lets web content call native capabilities and combine the strengths of both worlds.

## Core idea

The core idea behind JSBridge is to build a communication bridge inside a WebView so JavaScript and native code can talk to each other in both directions.

## 1. Establishing the message channel

### Android
- **Method injection**: Android can inject Java objects into a WebView using `WebView.addJavascriptInterface()`. JavaScript can then call the exposed methods directly. These methods must be marked with `@JavascriptInterface`.
- **URL interception**: JavaScript can trigger navigation to a custom scheme such as `myapp://...`, and native code can intercept that request through methods like `shouldOverrideUrlLoading()` or `onJsPrompt()`.

### iOS
- **Message handlers**: In `WKWebView`, native code can register a `WKScriptMessageHandler`, and JavaScript can send data through `window.webkit.messageHandlers.xxx.postMessage(...)`.
- **URL interception**: Similar to Android, iOS can also use custom URL schemes and intercept them on the native side.

## 2. JavaScript calls native code

JavaScript can request native functionality in two common ways:

- call an injected native method directly
- send a structured message through the bridge

Arguments are usually serialized, often as JSON, so that native code can parse them reliably.

## 3. Native code executes the operation

Once the native side receives the command and arguments, it can perform the requested work:

- access hardware
- open a native UI
- store local data
- trigger platform APIs
- run other native business logic

## 4. Return the result back to JavaScript

After the native operation completes, the result usually needs to be sent back to the web layer.

### Common ways to return data
- **Callback execution**: native code runs JavaScript through APIs such as `evaluateJavascript()` on Android or `evaluateJavaScript()` on iOS.
- **URL callback / redirect pattern**: native code loads a specially structured URL that the web side intercepts and interprets.

## Common use cases

JSBridge is widely used in hybrid mobile applications. Typical examples include:

- social sharing
- camera or photo library access
- native payment SDK integration
- synchronizing web state with native app state
- performance-sensitive work delegated to native code

## Security concerns

Security matters a lot when exposing native capabilities to web content.

### Main risks
- **Code injection**: if the WebView executes untrusted JavaScript, an attacker may inject malicious code.
- **Overexposed native interfaces**: if too many native methods are exposed, a malicious page may abuse them.
- **Unsafe input handling**: if native code does not validate bridge parameters carefully, harmful payloads may get through.

### Mitigations
- keep a strict allowlist of trusted pages
- expose only the minimum required native methods
- validate and sanitize all inbound parameters
- load content over HTTPS
- version bridge interfaces so clients and native implementations stay compatible

## Performance concerns

JSBridge also has performance costs.

### Main costs
- frequent back-and-forth communication can become a bottleneck
- bad thread management may cause UI jank
- serialization and deserialization add overhead

### Optimizations
- reduce the number of bridge calls
- batch requests where possible
- run heavy native work asynchronously
- keep payloads compact and predictable

## Summary

JSBridge is the core enabler behind many hybrid mobile experiences. It gives web content access to native capabilities by establishing a structured communication channel inside the WebView.

Done well, it combines the delivery speed of the web with the power of native systems. Done badly, it creates security holes, performance problems, and hard-to-maintain contracts. The real engineering challenge is not just making the bridge work, but making it safe, narrow, and durable.
