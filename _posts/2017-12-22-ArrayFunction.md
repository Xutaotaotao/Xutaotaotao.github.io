---
layout: 	post
title: 		"Javascript数组方法总结"
subtitle:   "Array function"
date: 		2017-12-22 15:42:33
author: 	"xutaotao"
header-img: "img/post-bg-js-version.jpg"
tags:
  - JavaScript
---

### filter方法（ES5 Way）
`filter()`方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。

#### 参数
`callback`
用来测试数组的每个元素的函数。调用时使用参数 (element, index, array)。返回true表示保留该元素（通过测试），false则不保留。

`thisArg`
可选。执行 callback 时的用于 this 的值。

#### 返回值
一个新的通过测试的元素的集合的数组

#### 示例
	function isBigEnough(value) {
	  return value >= 10;
	}
	var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
	// filtered is [12, 130, 44]

#### 注意事项
`filter`不会改变原数组。
`filter`遍历的元素范围在第一次调用`callback `之前就已经确定了。在调用`filter`之后被添加到数组中的元素不会被`filter` 遍历到。如果已经存在的元素被改变了，则他们传入`callback`的值是`filter`遍历到它们那一刻的值。被删除或从来未被赋值的元素不会被遍历到

### includes方法（ES6 Way）
`includes()` 方法用来判断一个数组是否包含一个指定的值，如果是，酌情返回true或false。

#### 参数
`searchElement`
需要查找的元素值。

`fromIndex`可选
从该索引处开始查找 searchElement。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜索。默认为 0。

#### 返回值
一个Boolean值。

#### 示例
	[1, 2, 3].includes(2);     // true
	[1, 2, 3].includes(4);     // false

#### 注意事项
includes() 方法有意设计为通用方法。它不要求this值是数组对象，所以它可以被用于其他类型的对象 (比如类数组对象)。