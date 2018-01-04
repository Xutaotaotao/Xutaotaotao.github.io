---
layout: 	post
title: 		"JavaScript Challenge 知识点总结"
subtitle:   "Array function"
date: 		2018-1-4 15:42:33
author: 	"xutaotao"
header-img: "img/post-bg-js-version.jpg"
tags:
  - Javascript
---

# 1.JavaScript Drums

## 涉及知识点
- 获取键盘事件
- js控制音频播放
- js控制样式变换

## jQuery的键盘响应事件

### keydown()方法
- 定义和用法

完整的 key press 过程分为两个部分：1. 按键被按下；2. 按键被松开。当按钮被按下时，发生 keydown 事件。keydown()方法触发 keydown 事件，或规定当发生 keydown 事件时运行的函数。
- 触发keydown事件`$(selector).keydown()`
- 将函数绑定到keydown事件`$(selector).keydown(function)`
### keypress()方法
- 定义和用法

keypress 事件与 keydown 事件类似。当按钮被按下时，会发生该事件。它发生在当前获得焦点的元素上。不过，与 keydown 事件不同，每插入一个字符，就会发生 keypress 事件。keypress() 方法触发 keypress 事件，或规定当发生 keypress 事件时运行的函数。
- 触发keypress事件`$(selector).keypress()`
- 将函数绑定到keypress事件`$(selector).keypress(function)`

### keyup()方法
- 定义和用法

完整的 key press 过程分为两个部分，按键被按下，然后按键被松开并复位。当按钮被松开时，发生 keyup 事件。它发生在当前获得焦点的元素上。keyup() 方法触发 keyup 事件，或规定当发生 keyup 事件时运行的函数。
- 触发keyup事件`$(selector).keyup()`
- 将函数绑定到keypress事件`$(selector).keyup(function)`

## js控制音频播放
    var x = document.getElementById("myAudio"); 
    
    function playAudio()
    { 
         x.play(); 
    } 
    
    function pauseAudio()
    { 
        x.pause(); 
    }
    
## jQuery通过自定义属性选取元素
例子：`data-key='65'`

选取方法：`$("[data-key='65']")`

## js控制样式变换
`$("selector").css("style1","style2","style3"...)`