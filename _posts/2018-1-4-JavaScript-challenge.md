---
layout: 	post
title: 		"JavaScript Challenge 知识点总结"
subtitle:   "Array function"
date: 		2018-1-4 15:42:33
author: 	"xutaotao"
header-img: "img/post-bg-js-version.jpg"
tags:
  - JavaScript
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

# 2.JS Clock
## 涉及知识点
- document.querySelector()方法
- js获取时间的方法
- transform的相关方法

## document.querySelector()方法
querySelector(CSS selectors) 方法返回文档中匹配指定 CSS 选择器的一个元素。

参数遵循CSS的选择器的规则

注意： querySelector() 方法仅仅返回匹配指定选择器的第一个元素。如果需要返回所有的元素，使用 querySelectorAll() 方法替代。

## js获取时间的方法
    let nowTime = new Data();//获取现在的时间
    let seconds = nowTime.getSeconds();//获取现在时间的秒数
    let mins = nowTime.getMinutes();//获取现在时间的分钟数
    let hours = nowTime.getHours();//获取现在时间的小时数

## transform方法

`transform:none|transform-functions`Transform属性应用于元素的2D或3D转换。这个属性允许你将元素旋转，缩放，移动，倾斜等。

none    定义不进行转换。
matrix(n,n,n,n,n,n) 定义 2D 转换，使用六个值的矩阵。
matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n)   定义 3D 转换，使用 16 个值的 4x4 矩阵。
translate(x,y)  定义 2D 转换。
translate3d(x,y,z)  定义 3D 转换。
translateX(x)   定义转换，只是用 X 轴的值。
translateY(y)   定义转换，只是用 Y 轴的值。
translateZ(z)   定义 3D 转换，只是用 Z 轴的值。
scale(x[,y]?)   定义 2D 缩放转换。
scale3d(x,y,z)  定义 3D 缩放转换。
scaleX(x)   通过设置 X 轴的值来定义缩放转换。
scaleY(y)   通过设置 Y 轴的值来定义缩放转换。
scaleZ(z)   通过设置 Z 轴的值来定义 3D 缩放转换。
rotate(angle)   定义 2D 旋转，在参数中规定角度。
rotate3d(x,y,z,angle)   定义 3D 旋转。
rotateX(angle)  定义沿着 X 轴的 3D 旋转。
rotateY(angle)  定义沿着 Y 轴的 3D 旋转。
rotateZ(angle)  定义沿着 Z 轴的 3D 旋转。
skew(x-angle,y-angle)   定义沿着 X 和 Y 轴的 2D 倾斜转换。
skewX(angle)    定义沿着 X 轴的 2D 倾斜转换。
skewY(angle)    定义沿着 Y 轴的 2D 倾斜转换。
perspective(n)  为 3D 转换元素定义透视视图。