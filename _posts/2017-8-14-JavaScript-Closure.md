---
title: 'js中的闭包（坑）'
subtitle:   "js中的闭包总结"
date: 2017-08-14T13:42:33+00:00
author: xutaotao
layout: post
tags:
  - JavaScript
---
## 前言

*闭包这个玩意真的很好玩，要是玩得好，那就是利器，玩得不好的话，那就是凶器。*

## 正文

话不多说，直接代码。

**html代码**

	    <div>
        <ul>
            <li>click me</li>
            <li>click me</li>
            <li>click me</li>
            <li>click me</li>
        </ul>
    </div>

**js代码**

	var elements = document.getElementsByTagName('li');
var length = elements.length;
for (var i = 0; i < length; i++) {
     elements[i].onclick = function() {
         alert(i);
}

额，炸眼一看，输出4，恭喜你，错了