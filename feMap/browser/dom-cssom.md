---
outline: deep
title: 浏览器渲染的基石：DOM Tree 与 CSSOM
titleTemplate: 前端知识图谱
---

# 浏览器渲染的基石：DOM Tree 与 CSSOM

<ClientOnly>
<Graph  type="domAndCssom" />
</ClientOnly>

大家好，我是徐徐。今天我们聊聊浏览器渲染的基石：DOM Tree 与 CSSOM 。

## 前言
在现代 Web 开发中，理解浏览器如何解析和渲染网页至关重要。这个过程的核心就是 DOM（Document Object Model）树和 CSSOM（CSS Object Model）的构建和交互。本文将探讨这两个关键概念，揭示它们如何共同工作以创建我们在屏幕上看到的网页。

## DOM 树（Document Object Model Tree）
### 定义和基本概念
DOM 树是 HTML 文档的内存表示，它将文档结构化为一个逻辑树。每个 HTML 元素、属性和文本片段都成为树中的一个节点。DOM 提供了一个编程接口，允许开发者通过脚本语言（如 JavaScript）动态地访问和操作网页内容和结构。

### DOM 树的形成过程
![](https://cdn.nlark.com/yuque/0/2024/png/277039/1725033475856-16bf53e7-e266-45d5-813e-84bd5b185f00.png#averageHue=%23fcfcfc&clientId=u2e228c52-f402-4&from=paste&height=1010&id=u35ea6486&originHeight=1262&originWidth=615&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=99869&status=done&style=none&taskId=uc419d35d-6deb-4654-9b35-423c18990cb&title=&width=492)

1. **字节流解析** ：浏览器从服务器接收 HTML 文件的字节流。
2. **字符识别**：将字节流转换为字符。
3. **令牌化**：将字符串转换为定义的令牌（如 、 等）。
4. **节点生成**：根据令牌创建节点。
5. **DOM 树构建**：将节点连接成一个树状结构。

例如，考虑以下 HTML：

```html
<html>
  <head>
    <title> 示例页面 </title>

  </head>

  <body>
    <h1> 欢迎 </h1>

    <p> 这是一个段落。</p>

  </body>

</html>

```

这段 HTML 将被解析成如下的 DOM 树结构：

```plain
Document
└── html
    ├── head
    │   └── title
    │       └── #text: 示例页面
    └── body
        ├── h1
        │   └── #text: 欢迎
        └── p
            └── #text: 这是一个段落。
```

### DOM 树的内部结构
每个 DOM 节点通常包含以下信息：

+ nodeType（节点类型，如元素、文本、注释等）
+ nodeName（节点名称）
+ nodeValue（节点值）
+ parentNode（父节点）
+ childNodes（子节点列表）
+ attributes（属性列表，仅适用于元素节点）

### DOM 操作的性能考虑
频繁的 DOM 操作可能导致性能问题，因为每次修改都可能触发重排（reflow）或重绘（repaint）。为提高性能，可以：

+ 使用文档片段（DocumentFragment）批量操作 DOM。
+ 离线操作 DOM（如先从 DOM 树上移除元素，修改后再插入）。
+ 使用虚拟 DOM 技术（如 React 和 Vue 采用的方法）。

## CSSOM（CSS Object Model）
### CSSOM 的定义和作用
CSSOM 是 CSS 的对象表示，它将样式信息转换为浏览器可以理解和处理的结构。CSSOM 与 DOM 树并行构建，最终合并形成渲染树。

### CSSOM 的构建过程
![](https://cdn.nlark.com/yuque/0/2024/png/277039/1725033650616-835e00f9-3186-4924-a2ba-adde30d726b2.png#averageHue=%23f3f2f7&clientId=u2e228c52-f402-4&from=paste&height=842&id=u74e89d9f&originHeight=1052&originWidth=365&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=73536&status=done&style=none&taskId=u94c0c797-b0c3-4859-91c7-4682770c285&title=&width=292)

1. **字节流解析** ：与 HTML 类似，CSS 文件首先被解析为字节流。
2. **字符识别**：将字节流转换为字符。
3. **令牌化** ：将字符串转换为定义的令牌（如选择器、属性、值等）。
4. **节点生成** ：根据令牌创建 CSSOM 节点。
5. **CSSOM 树构建** ：将节点连接成树状结构，计算样式。

### CSSOM 的内部结构
CSSOM 以树状结构组织样式信息，类似于 DOM 树。每个节点包含对应元素的计算样式。例如：

```css
body {font-size: 16px;}
h1 {color: blue;}
p {margin: 10px;}
```

可能形成如下 CSSOM 结构：

```plain
CSSOM
└── body
    ├── font-size: 16px
    ├── h1
    │   └── color: blue
    └── p
        └── margin: 10px
```

### CSSOM 对渲染性能的影响
CSSOM 的构建是渲染阻塞的，意味着在 CSSOM 完全构建之前，页面不会被渲染。为优化性能：

+ 精简 CSS，移除未使用的样式。
+ 使用媒体查询，使非关键 CSS 异步加载。
+ 考虑内联关键 CSS。

## DOM 树和 CSSOM 的关系
![](https://cdn.nlark.com/yuque/0/2024/png/277039/1725034830749-07ba0247-c188-4b96-a650-f77dc9e341bb.png#averageHue=%23d0d4eb&clientId=u2e228c52-f402-4&from=paste&id=u07f5fb32&originHeight=591&originWidth=1181&originalType=url&ratio=1.25&rotation=0&showTitle=false&status=done&style=none&taskId=u8cf98316-91ba-4833-9357-c7bae9c2d3a&title=)

### 并行构建
DOM 树和 CSSOM 是并行构建的，但它们相互依赖以创建最终的渲染输出。

### 渲染树（Render Tree）的形成
渲染树结合了 DOM 树和 CSSOM：

1. 遍历 DOM 树中的可见节点。
2. 对每个可见节点，从 CSSOM 中找到对应的样式规则并应用。
3. 输出包含内容和样式的渲染树。

### JavaScript 对 DOM 和 CSSOM 的影响
JavaScript 可以动态修改 DOM 和 CSSOM，但这可能导致额外的回流和重绘，影响性能。现代框架（如 React）通过虚拟 DOM 等技术优化了这一过程。

## 结语
深入理解 DOM 树和 CSSOM 不仅有助于我们编写更高效的 Web 应用，还能帮助我们更好地理解和优化 Web 性能。随着 Web 技术的不断发展，保持对这些核心概念的深入理解将使我们能够更好地适应未来的变化和挑战。

虽然我们在日常的开发中可能不会去深入探究它们，但是如果遇到一些棘手的问题也是可以朝着这个方向去研究的。如果你有其他的想法欢迎和我交流。

