---
layout: 	post
title: 		"Javascript数组方法总结"
subtitle:   "Array function"
date: 		2017-12-22 15:42:33
author: 	"xutaotao"
header-img: "img/post-bg-js-version.jpg"
tags:
  - Javascript
---

### filter方法
`filter()`方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。

#### 参数
`callback`

用来测试数组的每个元素的函数。调用时使用参数 (element, index, array)。返回true表示保留该元素（通过测试），false则不保留。

`thisArg`

可选。执行 callback 时的用于 this 的值。

#### 返回值
一个新的通过测试的元素的集合的数组

#### 注意事项
`filter`不会改变原数组。
`filter`遍历的元素范围在第一次调用`callback `之前就已经确定了。在调用`filter`之后被添加到数组中的元素不会被`filter` 遍历到。如果已经存在的元素被改变了，则他们传入`callback`的值是`filter`遍历到它们那一刻的值。被删除或从来未被赋值的元素不会被遍历到
