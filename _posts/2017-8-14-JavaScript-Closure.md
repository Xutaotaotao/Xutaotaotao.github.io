---
layout: 	post
title: 		"js中的闭包（坑）"
subtitle:   "js中的闭包总结"
date: 		2017-08-14 13:42:33
author: 	"xutaotao"
header-img: "img/post-bg-js-version.jpg"
tags:
  - JavaScript
---

## 前言

*闭包这个玩意真的很好玩，要是玩得好，那就是利器，玩得不好的话，那就是凶器。每次遇到闭包的问题都会复习一下闭包。*

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

额，炸眼一看，点击时，会依次输出0，1，2，3，恭喜你，错了！会始终输出4，我开始也错了，想得很美好，结果很糟糕。调试了几遍都不对，怎么回事？幡然醒悟，好像忽略了闭包与变量的关系。什么？闭包？这个哪里是闭包哇？明明是个匿名函数。闭包的官方定义：

`A closure is the combination of a function and the lexical environment within which that function was declared.`

即有权访问另一个函数作用域中的变量的函数。按照官方定义来看这里的确不是一个正真的闭包。这里的function虽然有权访问访问它上层作用域的变量，但是并不是访问的另一个函数作用域的变量。

那对于这个问题怎么理解呢？

理解一：可以将其当作一个闭包来理解，如果按闭包来理解，就会有如下问题，即作用域链在闭包的情况下会产生一个奇怪的副作用，这个副作用就是闭包只能取得包含函数中任何变量的最后一个值，所以`alert(i)`只会输出上层作用域的最后一个值4。

理解二：从作用域来看，本身onclick绑定的function的作用域中没有变量i，i为undefined,则解析引擎会寻找父级作用域，发现父级作用域中有i，且for循环绑定事件结束后，i已经赋值为4，所以每个li标签的onclick事件执行时，alert的都是父作用域中的i，也就是4。

理解完了，所以就来改个代码试试

	var elements = document.getElementsByTagName('li');
	var length = elements.length;
	for (var i = 0; i < length; i++) {
    elements[i].onclick = function(num) {
        return function() {
            alert(num); //此处输出出0，1，2，3
            return num;
       		 };
    	}(i);
	}

这里就是创建了另一个匿名函数，调用匿名函数时，传入变量i,由于函数参数会按值传递，所以就会将变量i的**当前值**复制给num。而这个匿名函数的内部，又创建并返回了一个访问num的闭包。这样，每次调用函数都会有自己num变量的一个副本，于是就可以按期望返回0，1，2，3。

## 后记

对于闭包这个概念的理解是一个循序渐进的过程，不同场景理解不一样，要将其运用得灵活自如，必须得从理解函数被调用的时候都会发生什么入手。