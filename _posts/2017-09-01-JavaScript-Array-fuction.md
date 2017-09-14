---
layout:     post
title:      "js中Array类型的方法"
subtitle:   " 操作数组的各种方法"
date:       2017-08-30 19:51:00
author:     "xutaotao"
header-img: "img/post-bg-js-version.jpg"
tags:
    - JavaScript
---


## 前言 ##

js里面对数组的操作很多，只有熟记相关的方法才能更快的处理数据，并得到自己想要的结果，所以总结一下自己学习到的对数组的相关操作。

## 正文 ##

**一、检测数组**

1. `value instanof Array`

2. `Array.isArray(value)`

以上两种方法返回值都是boolean类型。

**二、数组的转换**

1. `arr.toString()`

2. `arr.toLocaleString()`

以上两种方法返回值都为string类型。

**三、栈方法**

1. `arr.push(value)`，添加值到数组末尾。

2. `arr.pop()`，移除数组中末尾项的值并返回该值。

**四、队列方法**

1. `arr.shift()`，取得数组的第一项并返回该项。

2. `arr.unshift(value)`，在数组前端添加任意个项并返回新数组的长度。

**五、排序方法**

1. `arr.reverse()`，对数组反转排序，在原数组上进行修改。

2. `arr.sort()`，升序排列数组，在原数组上进行修改。

**六、操作方法**

1. `arr.concat(value)`，创建一个当前数组的一个副本，然后将接收到的参数添加到这个副本的末尾，返回新构建的数组，不改变原数组值。

2. `arr.slice(value1,value2)`，从某位置截断一个数组，将截断的数组组成一个新的数组。记住含头不含尾的规则，此方法参数可为负数，负数表示从数组尾端开始。此方法不不改变原数组的值。

3. `splice()`，删除，插入，替换。

删除：`splice(value1,value2)`，两个参数代表要删除的第一项位置和要删除的项数。

插入：`splice(value1,0,value3)`，三个参数代表：起始位置，0，要插入的项。

替换：`splice(value1,value2,value3)`,三个参数代表：起始位置，要删除的项数，要插入的任意数量的项。

三种方法都会改变原数组的值，并返回新的数组。

**七、位置方法**

1. `indexOf(value1，value2)`,从数组开头位置向后查找。

2. `lastIndexof(value1，value2)`,从数组的末尾开始向前查找。

两个方法都接收两个参数，要查找的项和查找起点的索引(可选)。

**八、迭代方法**

1. `every(function())`,对数组每一项运行给定函数，函数每一项返回true，才返回true。

2. `filter(function())`,对数组每一项运行给定函数,返回该函数会返回true的项组成的数组。

3. `forEach(function())`,对数组每一项运行给定函数,没有返回值。

4. `map(function())`,对数组每一项运行给定函数,返回每次函数调用的结果组成的数组。

5. `some(function())`,对数组每一项运行给定函数,函数任意一项返回true，则返回true。

**九、归并方法**

1. `reduce(function())`,从第一个数组遍历到最后。

2. `reduceRight(function())`,从数组最后一项遍历到第一项。

##后记##

js中对数组的方法非常多，每个操作方法都有自己不同的返回值，需要牢记才能快速应用。