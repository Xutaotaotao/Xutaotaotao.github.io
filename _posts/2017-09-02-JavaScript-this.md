---
layout:     post
title:      "js中this引用的指向问题"
subtitle:   "这么多this你说到底指谁呢"
date:       2017-09-02 19:51:00
author:     "xutaotao"
header-img: "img/post-bg-js-version.jpg"
tags:
    - JavaScript
---

## 前言 ##

在javascript的函数中，除了函数声明时定义的形参之外，每个函数还可以接收另一个隐藏的参数：this，又称this引用。对于this的值的指向一定需要弄明白，这样才会清晰明了的知道改什么时候，什么地方引用this。

## 正文 ##

**对于this的指向问题大概有如下四种**

1. 无任何前缀的函数调用时，this指向顶层对象或者叫全局对象，浏览器里是window（nodejs里是global）。

	function fn(){
    	console.log(this);
	}
	fn();                //打印结果为window{...}

2. 方法调用的时候，this指向方法所在的对象。

	var robot = {
            name:"cup",
            say:function(){
                   console.log(this.name)
                }
            };
	robot.say();        //打印结果为'cup'

3. 构造函数里，this指向新生成的实例。

	function Robot(name){
    this.name = name;
    this.say = function(){
                console.log(this.name)
             }
	}
	var robot_1 = new Robot('bower');
	robot_1.say()        //  打印结果为'bower'
	var robot_2 = new Robot('cup');
	robot_2.say()        //  打印结果为'cup'

4. apply/call调用的时候，this指向apply/call方法中的第一个参数

	var robot_1 = {name:'cup'}
	var robot_2 = {name:'bower'}

	function say(){
  	console.log(this.name)
	}
	say.call(robot_1)     //  打印结果为'cup'
	say.call(robot_2)     //  打印结果为'bower'

/*对于apply/call这个js里面的特殊用法注意一下。*/

说了this的指向问题不得不说一下，this在什么时候来调用的问题。

1. 方法内的this调用

	var robot = {
    name : "cup",
    say : function() { console.log( "Hi, I'm " + this.name + "."); }
	}
	robot.say()            // 打印结果为 Hi, I'm cup.

2. 函数内的this调用

	var robot = {
    name : "cup",
    say : function() { console.log( "Hi, I'm " + this.name + "."); }
	}
	var fn = robot.say;			// 将robot.say引用的函数赋值给全局变量 fn.
	fn()                        // 打印结果为 Hi, I'm .

## 后记 ##

this在JavaScript里面用的频率极高，所以一定要小心，一定要明白this到底该指向谁。这样在运用this的时候才会手到擒来。