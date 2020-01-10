---
layout:     post
title:      "JS高级-New关键字模拟实现"
subtitle:   "JavaScript New"
date:       2020-01-09 18:36
author:     "xutaotao"
header-img: "img/post-bg-js-version.jpg"
tags:

  + Javascript高级

---

## 1. 概述

new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例或具有构造函数的内置对象的实例。new关键字会进行如下操作:

1. 创建一个空的简单JavaScript对象；

2. 链接该对象（即设置该对象的构造函数）到另一个对象；

3. 将步骤1新建的对象作为 `this` 的上下文；

4. 如果该函数没有返回对象，则返回 `this` ；

## 2. 原代码

``` javascript
function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
}

const car1 = new Car('taotao', 'Audi', 1998)

console.log(car1.make) // taotao
```

## 3. 模拟实现

``` javascript
function mockNew() {
    // 1.创建一个空对象
    var obj = {};

    // 2.链接该对象（即设置该对象的构造函数）到另一个对象

    // 2.1取出第一个参数（传入的构造函数）
    var Constructor = [].shift.call(arguments);
    // 2.2链接
    obj.__proto__ = Constructor.prototype;

    // 3.将步骤1新建的对象作为 `this` 的上下文
    var res = Constructor.apply(obj, arguments);

    // 4.如果该函数没有返回对象，则返回 `this` 
    return typeof res === 'object' ? res : obj;

}
```

## 4. 验证

``` javascript
function mockNew() {
    var obj = {};
    var Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    var res = Constructor.apply(obj, arguments);
    return typeof res === 'object' ? res : obj;
}

function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
}

const car1 = mockNew(Car, 'taotao', 'Audi', 1998)

//{make: "taotao", model: "Audi", year: 1998}
```

