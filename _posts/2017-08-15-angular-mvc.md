---
layout: 	post
title: 		"AngularJs学习笔记2"
date: 		2017-08-15 13:42:33
author: 	"xutaotao"
header-img: "img/banner-angularjs.jpg"
tags:
  - AngularJs
---

## MVC

* MVC是一种应用程序的开发思想，不是设计模式

* 主要目的是为了解决应用程序展示结构，业务逻辑之间的紧耦合关系

* 使应用程序的组成分为三个部件，每个部件都有自己的职责，相互之间没有依赖。

## MVC组成 

### 模型（Model）

处理数据和业务逻辑

* AngularJs很重要的一个特性就是实现模块化编程，我们可以通过下面的方式创建一个模块，对页面进行功能业务上的划分

	//创建一个名字叫MyApp的模块，第二个参数指的是该模块依赖哪些模块
	var myApp = angular.module("MyApp",[]);

* 也可以将重复使用的指令或者过滤器之类的做成模块便于复用

* 注意必须指定第二个参数，否则变成找到已经定义的模块

### 控制器（Controller）

调度相应的处理模块

* 调度逻辑的集合

	angular.module('OneApp',[])
		.controller('HelloController',[
			'$scope',
			function($scope){
				cope.p = {
					name:'zhangsan';
				};
			}
		]);

* 控制器的三个主要职责
1）为应用中的模型设置初始状态

2）通过$scope对象把数据模型或函数行为暴露给视图

3）监视模块的变化，做出相应的行动

	//监视购物车内容变化，计算最新结果
	$scope.$watch('totalCart',calculateDiscount);

### $scope(上下文模型)

* 视图和控制器之间的桥梁

* 用于在视图和控制器之间传递数据

* 利用$scope暴露数据模型（数据，行为）

### 表达式（Expression）

* 作用：

-使用表达式把数据绑定到HTML

* 语法：

-表达式写在双大括号内：{{expression}}

* 比较：

-表达式作用类似与ng-blind指令

-建议更多的使用指令

## 指令（Dirctive）

* AngularJs有一套完整的、可扩展的、用来帮助WEB应用开发的指令集

* 在建立DOM期间，和HTML关联的指令会被检测到，并且被执行

* 在AngularJs中将前缀为ng-这种属性称之为指令，其作用就是为DOM元素调用方法、定义行为绑定数据等

* 简单说：当一个Angular应用启动，Angular就会遍历DOM树解析HTML，根据指令不同，完成不同操作。

指令属性小提示

* ng-xxx的属性本身并不是标准中定义的属性

* 很多情况下语法校验无法通过的

* HTML5允许扩展的属性，以data-开头

* 在AngularJS中可以使用data-ng-来让网页对HTML5有效

* 二者效果相同

### ng-app指令

* ng-app指令用来标明一个AngularJs应用程序

* 标记在一个AngularJS的作用范围的根对象上

* 系统执行会自动的执行根对象范围内的其他指令

* 可以在同一页面创建多个ng-app节点（不推荐）

* 标记的范围尽可能小

* 视图（View）以友好的方式向用户展示数据