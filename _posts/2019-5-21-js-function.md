---
layout:     post
title:      "JavaScript函数-函数参数"
subtitle:   "JavaScript function"
date:       2019-5-21 23:36
author:     "xutaotao"
header-img: "img/book.jpeg"
tags:
  - Javascript
---

# JavaScript函数-函数参数

## 1.概念
函数运行时有时需要提供外部数据，不同的外部数据会得到不同的结果，这种外部数据称为参数（形参）
```
function add(x,y){
	return x+y;
}

add(1,2) // 3
```
上面方法中的x,y就是函数的两个参数。
## 2.参数的省略
函数参数不是必需的，Javascript 允许省略参数。
```
function fun(x,y){
  return x;
}

fun(1,2,3) // 1
fun(1) // 1
fun() // undefined
fun( , 1) // SyntaxError: Unexpected token ,没有办法只省略靠前的参数，而保留靠后的参数
fun(undefined,2) // undefined
fun.length // 2
```
## 3.参数的默认值（ES6）
函数默认参数允许在没有值或undefined被传入时使用默认形参。
```
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
```
**注意事项：**

- 参数变量是默认声明的，所以不能用let或const再次声明。

```
function fun(x = 5) {
  let x = 1; // error
  const x = 2; // error
}
```

- 使用参数默认值时，函数不能有同名参数

```
// 不报错
function fun(x, x, y) {
  // ...
}

// 报错
function fun(x, x, y = 1) {
  // ...
}
// SyntaxError: Duplicate parameter name not allowed in this context
```

- 参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。

```
var x = 99;
function fun(p = x + 1) {
  console.log(p);
}

fun() // 100

x = 100;
fun() // 101
```

上面代码中，参数p的默认值是x + 1。这时，每次调用函数foo，都会重新计算x + 1，而不是默认p等于 100。

## 4.参数的传递方式
函数参数如果是原始类型的值(数值，字符串，布尔值)，传递方式是传值传递。此传递方式在函数体内改变参数值不会影响到函数外部。

```
var p = 2;

function fun(p) {
  p = 3;
  console.log(p)
}
fun(p); // 3
console.log(p) // 2
```

上面代码中，变量p是一个原始类型的值，传入函数fun的方式是传值传递。因此，在函数内部，p的值是原始值的拷贝，无论怎么修改，都不会影响到原始值。

但是，如果函数参数是复合类型的值（数组、对象、其他函数），传递方式是传址传递。也就是说，传入函数的原始值的地址，因此在函数内部修改参数，将会影响到原始值。

```
var obj = { p: 1 };

function fun(o) {
  o.p = 2;
  console.log(o)
}
fun(obj); // {p:2}
console.log(obj.p) // 2
```

## 5.同名参数
如果有同名的参数，则取最后出现的那个值。

```
function fun(a, a) {
  console.log(a);
}
fun(1, 2) // 2
```

上面代码中，函数fun 有两个参数，且参数名都是a。取值的时候，以后面的a为准，即使后面的a没有值或被省略，也是以其为准。调用函数fun的时候，没有提供第二个参数，a的取值就变成了undefined。

```
function fun(a, a) {
  console.log(a);
}
fun(1) // undefined
```

## 6.arguments对象
arguments对象是所有（非箭头）函数中都可用的局部变量。你可以使用arguments对象在函数中引用函数的参数。此对象包含传递给函数的每个参数，第一个参数在索引0处。

```
var fun = function (one) {
  console.log(arguments[0]);
  console.log(arguments[1]);
  console.log(arguments[2]);
}

fun(1, 2, 3)
// 1
// 2
// 3
```

正常模式，arguments对象可以修改

```
var fun = function(a, b) {
  arguments[0] = 3;
  arguments[1] = 2;
  return a + b;
}

fun(1, 1) // 5
```

严格模式下，arguments对象是一个只读对象，修改它是无效的，但不会报错。

```
var fun = function(a, b) {
  'use strict'; // 开启严格模式
  arguments[0] = 3; // 无效
  arguments[1] = 2; // 无效
  return a + b;
}

fun(1, 1) // 2
```