---
layout:     post
title:      "JS高级-JavaScript继承"
subtitle:   "JavaScript继承"
date:       2020-01-09 18:36
author:     "xutaotao"
header-img: "img/post-bg-js-version.jpg"
tags:

  + Javascript高级

---

### 概述

当谈到继承时，JavaScript只有一种结构：对象。每个实例对象（ object ）都有一个私有属性（称之为 __proto__ ）指向它的构造函数的原型对象（prototype ）。该原型对象也有一个自己的原型对象( __proto__ ) ，层层向上直到一个对象的原型对象为 null。根据定义，null 没有原型，并作为这个原型链中的最后一个环节。几乎所有JavaScript 中的对象都是位于原型链顶端的 Object 的实例。JS中继承可以按照是否使用object函数，将继承分成两部分（Object.create是ES5新增的方法，用来规范化这个函数）。

### 继承属性

js对象是动态的属性“包”，js对象有一个指向一个原型的链。当试图访问一个对象的属性时，它不仅仅在对象上搜寻，还会搜寻改对象的原型以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。

### 继承方案

#### 1. 原型链继承

``` javascript
function parent() {
    this.name = 'taotao';
}

parent.prototype.getName = function() {
    console.log(this.name);
}

function child() {}

child.prototype = new parent();

let child1 = new child();

child1.getName();
```

缺点：1. 引用类型的属性被所有实例共享；2. 在创建 Child 的实例时，不能向Parent传参

#### 2. 借用构造函数(经典继承)

``` javascript
function parent() {
    this.names = ['taotao', 'taotao1'];
}

function child() {
    parent.call(this);
}

child.prototype = new parent();

let child1 = new child();
child1.names.push('taotao2');
console.log(child1.names);

let child2 = new child();
console.log(child2.names);
```

优点：1. 避免了引用类型的属性被所有实例共享；2. 可以在 Child 中向 Parent 传参
缺点：方法都在构造函数中定义，每次创建实例都会创建一遍方法。

#### 3. 组合继承

``` javascript
function parent(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

parent.prototype.getName = function() {
    console.log(this.name);
}

function child(name, age) {
    parent.call(this, name);
    this.age = age;
}

child.prototype = new parent();
child.prototype.constructor = child;

let child1 = new child('taotao', 18);
child1.colors.push('black');
console.log(child1.name);
console.log(child1.age);
console.log(child1.colors);

let child2 = new child('taotao1', 19);
console.log(child2.name);
console.log(child2.age);
console.log(child2.colors);
```

优点：融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。

#### 4. 原型式继承

``` javascript
function createObj(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

// ES5 Object.create 的模拟实现，将传入的对象作为创建的对象的原型.
```

#### 5. 寄生式继承

``` javascript
function createObj(o) {
    let clone = Object.create(o);
    clone.sayName = function() {
        console.log('hello world');
    }
    return clone
}
```

#### 6. 寄生组合式继承

``` javascript
function inheritPrototype(child, parent) {
    let prototype = Object.create(parent.prototype); // 创建对象，创建父类原型的副本
    prototype.constructor = child; // 增强对象，弥补因重写原型而失去的默认的constructor 属性
    child.prototype = prototype; // 指定对象，将新创建的对象赋值给子类的原型
}

function parent(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}
parent.prototype.sayName = function() {
    console.log(this.name)
}

function child(name, age) {
    parent.call(this, name);
    this.age = age;
}

// 将父类原型指向子类
inheritPrototype(child, parent);

child.prototype.sayAge = function() {
    console.log(this.age)
}

let child1 = new child('taotao', 18)
let child2 = new child('taotao1', 19)
child1.colors.push('1')
child2.colors.push('2')
console.log(child1)
console.log(child2)
```

#### 7. ES6类继承extends

计算矩形面积的例子，正方形继承矩形

``` javascript
class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    get area() {
        return this.calcArea();
    }

    calcArea() {
        return this.height * this.width;
    }
}

const rectangle = new Rectangle(10, 20);
console.log(rectangle.area) // 200

class Square extends Rectangle {
    constructor(length) {
        super(length, length);
        this.name = 'Square';
    }

    get area() {
        return this.height * this.width;
    }
}

const square = new Square(10);
console.log(square.area) // 100
```

注意事项：

1. 函数声明和类声明的区别

函数声明会提升，类声明不会。首先需要声明你的类，然后访问它，否则像下面的代码会抛出一个ReferenceError。

``` javascript
let p = new Rectangle();
// ReferenceError

class Rectangle {}
```

2. ES5继承和ES6继承的区别

* ES5的继承实质上是先创建子类的实例对象，然后再将父类的方法添加到this上（Parent.call(this)）.

* ES6的继承有所不同，实质上是先创建父类的实例对象this，然后再用子类的构造函数修改this。因为子类没有自己的this对象，所以必须先调用父类的super()方法，否则新建实例报错。

