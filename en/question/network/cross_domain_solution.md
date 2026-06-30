---
outline: deep
title: Cross-Origin Solutions
titleTemplate: Frontend Interview Notes
---

# Cross-Origin Solutions

<img src="/question/network/cross_domain_solution.jpg" width="500" height="520" alt="Comparison diagram of cross-origin solutions">

## What cross-origin means
Cross-origin access refers to a situation where JavaScript running under one origin tries to access resources from another origin. An origin is defined by three parts:

1. protocol
2. host
3. port

Only when all three are identical do two URLs count as the same origin.

Browsers enforce the Same-Origin Policy for security reasons. It prevents one origin from freely reading or manipulating resources from another origin, which helps reduce risks such as data theft and malicious cross-site attacks.

## JSONP
JSONP, or JSON with Padding, is an older cross-origin technique based on the fact that `<script>` tags are not restricted in the same way as XMLHttpRequest.

### How it works
1. The client creates a `<script>` tag and points it to a target URL.
2. The server returns a JavaScript snippet that wraps JSON data in a callback function.
3. The browser executes that script immediately, which invokes the callback and exposes the data.

### Trade-offs
+ simple and compatible
+ only supports `GET`
+ weaker from a security perspective

## CORS
CORS, or Cross-Origin Resource Sharing, is the standard modern solution.

### How it works
1. The browser automatically sends an `Origin` header with a cross-origin request.
2. The server checks whether that origin is allowed.
3. If allowed, the server returns headers such as `Access-Control-Allow-Origin`.
4. The browser then decides whether the response can be exposed to JavaScript.

The server can also define allowed methods, headers, and whether credentials are permitted.

## postMessage
`postMessage` is an HTML5 API for secure communication between windows, tabs, and iframes, including cross-origin ones.

### How it works
1. The sending window calls `postMessage(data, targetOrigin)`.
2. The receiving window listens for the `message` event.
3. The receiver reads `event.data` and validates `event.origin`.

This is especially useful for iframe communication and embedded widgets.

## WebSocket
WebSocket can also be used in cross-origin scenarios and is well suited for real-time communication.

### How it works
1. The client sends an HTTP upgrade request with `Upgrade: websocket`.
2. The server replies with status `101` if it accepts the protocol upgrade.
3. The browser and server then communicate over a persistent full-duplex connection.

This is commonly used for chat, collaboration tools, live dashboards, and games.

## `document.domain` + iframe
This is an older technique that only works for subdomains under the same top-level domain.

### How it works
1. The parent page and child iframe both set `document.domain` to the same top-level domain.
2. Once the effective origin matches, the parent can access the iframe window object directly.

This approach is limited and rarely recommended in modern systems.

## `window.name`
`window.name` survives full page navigations within the same tab, which makes it usable for a legacy cross-origin data handoff pattern.

### How it works
1. One page sets `window.name`.
2. The browser navigates to a different origin in the same tab.
3. The new page reads the preserved `window.name` value.

This technique is simple but outdated and limited.

## `location.hash`
The `hash` portion of the URL can also be used for lightweight cross-page messaging.

### How it works
1. One page writes data into `location.hash`.
2. Another page in the same browsing context reads the hash.

This is only suitable for very small payloads and narrow use cases.

## Node.js proxy
Using a Node.js server as a proxy is a common and practical server-side solution.

### How it works
1. The browser sends the request to your Node server.
2. The Node server forwards that request to the target origin.
3. The target server returns the response to Node.
4. Node sends that response back to the browser.

Because the browser is now talking to your own server, the request no longer violates the Same-Origin Policy.

## Nginx proxy
Nginx can solve the same problem at the reverse-proxy layer.

### How it works
1. The browser sends a request to Nginx.
2. Nginx forwards it according to its proxy rules.
3. The target server responds to Nginx.
4. Nginx returns the response to the browser.

This is often easier to operate in production than maintaining a custom proxy service.

## CORS Anywhere
CORS Anywhere is an open-source reverse proxy that adds CORS headers to forwarded responses.

### How it works
1. The browser sends a request to the CORS Anywhere service.
2. The service forwards the request to the target server.
3. The service returns the target response with permissive CORS headers attached.

It is convenient for quick experiments, but you should not treat it as a long-term architecture by default.

## Comparison and summary
1. **JSONP**
   - Pros: simple, broad compatibility
   - Cons: only `GET`, weaker security
2. **CORS**
   - Pros: standard, secure, supports all HTTP methods
   - Cons: requires server support
3. **postMessage**
   - Pros: secure and explicit for window or iframe communication
   - Cons: both sides must implement the contract
4. **WebSocket**
   - Pros: great for real-time communication
   - Cons: requires WebSocket-capable infrastructure
5. **document.domain + iframe**
   - Pros: simple for same top-level domain cases
   - Cons: very limited and outdated
6. **window.name**
   - Pros: easy to understand, decent compatibility
   - Cons: tiny payloads, legacy pattern
7. **location.hash**
   - Pros: simple and lightweight
   - Cons: limited payload, awkward to maintain
8. **Node.js proxy**
   - Pros: flexible, shifts the problem to the server side
   - Cons: requires backend infrastructure
9. **Nginx proxy**
   - Pros: operationally clean, strong production fit
   - Cons: needs proxy server setup and configuration
10. **CORS Anywhere**
   - Pros: fast to try
   - Cons: another service to deploy and trust

In most modern applications, prefer CORS when you control the server. Use a reverse proxy when you do not want the browser talking to the target origin directly. Reach for WebSocket when the workload is real-time. The older techniques are mostly interview knowledge or historical context now.
