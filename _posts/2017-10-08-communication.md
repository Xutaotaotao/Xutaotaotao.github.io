---
layout: 	post
title: 		"前端中通信类,安全类问题小结"
date: 		2017-10-08 11:42:33
author: 	"xutaotao"
header-img: "img/post-bg-js-version.jpg"
tags:
  - JavaScript
---

## 通信类

### 什么是同源策略及限制

同源策略限制从一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的关键的安全机制。

* Cookie,LocalStorage和IndexDB无法读取

* DOM无法获取

* AJAX请求不能发送

### 前后端如何通信

* Ajax ,同源下面的通信方式。

* WebSocket ,不受同源策略的限制。

* CORS ,支持同源通信，也支持跨域通信。

### 如何创建Ajax

* XMLHttpRequest对象的工作流程

* 兼容性处理

* 事件的触发条件

* 事件的触发顺序

### 跨域通信的几种方式

* JSONP

* Hash

* postMessage

* WebSocket

* CORS

## 安全类

### CSRF

* 基本概念和缩写

CSRF，通常称为跨站请求伪造，英文名Cross-site request forgery

* CSRF攻击原理

![CSRF](/Xutaotaotao.github.io/img/in-post/post-jsversion/csrf1.png)

* CSRF防御措施

1)Token 验证

2）Referer验证

3）隐藏令牌

### XSS

* 基本概念和缩写

XSS——cross-site scirpting,跨域脚本攻击。

* XSS攻击原理

* XSS防御措施
