---
layout:     post
title:      "JS高级-call, apply, bind模拟实现"
subtitle:   "JavaScript call, apply, bind"
date:       2020-01-11 18:36
author:     "xutaotao"
header-img: "img/post-bg-js-version.jpg"
tags:

  - Javascript高级

---

### call实现

`**call()**`  方法使用一个指定的  `this`  值和单独给出的一个或多个参数来调用一个函数。

``` javascript
// 原函数
function.call(thisArg, arg1, arg2, ...)

/* 
thisArg可选的。在 function 函数运行时使用的 this 值。请注意，this可能不是该方法看到的实际值：如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装
arg1, arg2, ...
指定的参数列表。
*/
```

``` javascript
/*
模拟实现
1.将函数设为对象的属性
2.执行该函数
3.删除该函数
*/
Function.prototype.testCall = function(thisArg) {
    thisArg = thisArg || window;
    thisArg.fn = this;
    var args = [];
    for (var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']')
    }
    var result = eval('thisArg.fn(' + args + ')');
    delete thisArg.fn
    return result;
}

// 测试
var value = 2;
var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}
bar.testCall(null); // 2
var barTest = bar.testCall(obj, 'taotao', '18')
console.log(barTest) // 1, {value: 1, name: "taotao", age: "18"}
```

### apply实现

**`apply()`** 方法调用一个具有给定 `this` 值的函数，以及作为一个数组（或[类似数组对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#Working_with_array-like_objects)）提供的参数。

``` javascript
// 原函数
func.apply(thisArg, [argsArray])

/*
thisArg必选的。在 func 函数运行时使用的 this 值。请注意，this可能不是该方法看到的实际值：如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。
argsArray可选的。一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 func 函数。如果该参数的值为 null 或  undefined，则表示不需要传入任何参数。从ECMAScript 5 开始可以使用类数组对象。 浏览器兼容性 请参阅本文底部内容。
*/
```

``` javascript
// 模拟实现
Function.prototype.testApply = function(thisArg, argsArray) {
    thisArg = Object(thisArg) || window;
    thisArg.fn = this;

    var result;
    if (!argsArray) {
        result = thisArg.fn();
    } else {
        var args = [];
        for (var i = 0, len = argsArray.length; i < len; i++) {
            argsArray.push('argsArray[' + i + ']');
        }
        result = eval('thisArg.fn(' + args + ')');
    }

    delete thisArg.fn;
    return result;
}

// 测试
var array = ['a', 'b'];
var elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]
```

``` javascript
// call模拟实现apply
Function.prototype.testApply = function(thisArg, argArray) {
    const _this = this
    const arg = argArray.join()
    return _this.call(thisArg, arg)
}
```

### bind实现

`**bind()**`  方法创建一个新的函数，在  `bind()`  被调用时，这个新函数的  `this`  被指定为  `bind()`  的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

``` javascript
// 原函数
function.bind(thisArg[, arg1[, arg2[, ...]]])

/*
thisArg调用绑定函数时作为 this 参数传递给目标函数的值。 如果使用new运算符构造绑定函数，则忽略该值。当使用 bind 在 setTimeout 中创建一个函数（作为回调提供）时，作为 thisArg 传递的任何原始值都将转换为 object。如果 bind 函数的参数列表为空，执行作用域的 this 将被视为新函数的 thisArg。
arg1, arg2, ...
当目标函数被调用时，被预置入绑定函数的参数列表中的参数。
*/
```

``` javascript
// 模拟实现
Function.prototype.testBind = function(thisArg, args) {
    var slice = Array.prototype.slice;
    var _this = this,
        _thisArg = arguments[0];
    var args = slice.call(arguments, 1);
    if (typeof _this !== 'function') {
        throw new Error("Function.prototype.bind - what is trying to be bound is not callabl");
    }
    return function() {
        var funcArgs = args.concat(slice.call(arguments))
        return _this.apply(_thisArg, funcArgs)
    }
}

// 测试
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}
var bindFoo = bar.testBind(foo);
bindFoo() // 1
```

