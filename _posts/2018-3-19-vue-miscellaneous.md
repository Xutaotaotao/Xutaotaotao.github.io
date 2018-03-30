---
layout:     post
title:      "VUE杂记"
subtitle:   "VUE Miscellaneous"
date:       2018-3-19 21:21
author:     "xutaotao"
header-img: "img/book.jpeg"
tags:
  - Vue.js
---

## 学习总结

### 1. 学习如何创建一个Vue实例
    let vm = new Vue({

    });

### 2.关键指令

- v-model 随表单控件类型不同而不同；在表单空间或者组件上创建双向绑定。
- v-text 更新元素的textContent。如果要更新部分的textContent,需要使用{{Mustache}}插值。
- v-show 根据表达式之真假值，切换元素的display CSS属性，当条件变化时该指令触发过渡效果；带有v-show的元素始终会被渲染并保留在DOM中。
- v-if 根据表达式的值的真假条件渲染元素。在切换时元素及其它的数据绑定/组件被销毁并重建。如果元素时<template>,将提出它的内容作为条件块。
- v-else 可以使用v-else指令来表示v-if的else块；v-else元素必须紧跟在带v-if或者v-else-if的元素的后面，否则它将不会被识别。
- v-bind 
缩写为：：；动态地绑定一个或者多个特性，或者一个组件prop到表达式；在绑定class或者style特性时，支持其它类型的值，如数组或者对象；在绑定prop时，prop必须在子组件中声明；可以用修饰符指定不同的绑定类型；没有参数时，可以绑定到一个 包含键值对的对象，此时的class和style绑定不支持数组和对象。
- v-for 基于源数据多次渲染元素或者模板块，此指令之值，必须使用特定语法alias in expressions，为当前遍历的元素提供别名，另外也可以为数组索引指定别名。
- v-on
缩写为@；绑定事件监听器；事件类型由参数指定；表达式可以是一个方法的名字或者一个内联语句，如果没有修饰符也可以省略；在普通元素上时，只能监听原生DOM事件；用在自定义元素组件上时，也可以监听子组件触发的自定义事件。

### 3.过滤器的使用、computed使用

### 4.结合指令和API

### 5.axios的使用

### 5.经验总结
- 列表使用v-for指令
- 涉及金额，数字，日期等需要格式化的数据运用过滤器
- 各种文本框，下拉框，输入框使用v-model指令进行双向数据绑定
- 涉及事件交互的用v-on进行事件绑定
- 涉及样式动态变化的用v-bind来绑定class

### 6.VUE2

- 数据绑定
- vue文件开发方式
- render方法
- 生命周期方法
- computed

## 不懂的方法：

### main.js
- store.commit();
- localStorage.setItem();
- resolve();
- reject();
- getQueryString();
- window.location.search
- router-view

### JSON.stringify();

JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。
JSON.stringify(value[, replacer[, space]])

    value:

    必需， 要转换的 JavaScript 值（通常为对象或数组）。
    replacer:

    可选。用于转换结果的函数或数组。

    如果 replacer 为函数，则 JSON.stringify 将调用该函数，并传入每个成员的键和值。使用返回值而不是原始值。如果此函数返回 undefined，则排除成员。根对象的键是一个空字符串：""。

    如果 replacer 是一个数组，则仅转换该数组中具有键值的成员。成员的转换顺序与键在数组中的顺序一样。当 value 参数也为数组时，将忽略 replacer 数组。
    space:

    可选，文本添加缩进、空格和换行符，如果 space 是一个数字，则返回值文本在每个级别缩进指定数目的空格，如果 space 大于 10，则文本缩进 10 个空格。space 有可以使用非数字，如：\t。

- require.ensure();
- resovle()方法

- touchstart，当手指放在屏幕上触发。
- touchmove，当手指在屏幕上滑动时，连续地触发。
- touchend，当手指从屏幕上离开时触发。
- touchcancel，当系统停止跟踪时触发，系统什么时候取消，文档没有明确的说明。

## webpack学习
### 概念
#### 入口（Entry）

webpack 将创建所有应用程序的依赖关系图表(dependency graph)。图表的起点被称之为入口起点(entry point)。入口起点告诉 webpack 从哪里开始，并遵循着依赖关系图表知道要打包什么。可以将您应用程序的入口起点认为是根上下文(contextual root)或 app 第一个启动文件。

	webpack.config.js
	module.exports = {
	  entry: './path/to/my/entry/file.js'
	};

#### 出口(Output)

将所有的资源(assets)归拢在一起后，我们还需要告诉 webpack 在哪里打包我们的应用程序。webpack 的 output 属性描述了如何处理归拢在一起的代码(bundled code)。

#### 加载器(Loader)

webpack 的目标是，让 webpack 聚焦于项目中的所有资源(asset)，而浏览器不需要关注考虑这些（这并不意味着资源(asset)都必须打包在一起）。webpack 把每个文件(.css, .html, .scss, .jpg, etc.) 都作为模块处理。而且 webpack 只理解 JavaScript。

webpack loader 会将这些文件转换为模块，而转换后的文件会被添加到依赖图表中。

在更高层面，webpack 的配置有两个目标。
- 识别出(identify)应该被对应的 loader 进行转换(transform)的那些文件
- 由于进行过文件转换，所以能够将被转换的文件添加到依赖图表（并且最终添加到 bundle 中）(use 属性)


