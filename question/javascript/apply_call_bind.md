---
outline: deep
title: apply、call、bind 比较
titleTemplate: 徐涛焘的博客
---
# apply、call、bind 比较

<img src="/question/javascript/apply_call_bind.jpg" width="500" height="520">

## apply

### 概念

`apply() `方法调用一个具有给定`this`值的函数，以及以一个数组（或一个类数组对象）的形式提供的参数。

```javascript
func.apply(thisArg);
func.apply(thisArg, argsArray);
```

**thisArg**<br />在 `func` 函数运行时使用的 `this `值。请注意，`this` 可能不是该方法看到的实际值：如果这个函数处于非严格模式下，则指定为 `null` 或 `undefined` 时会自动替换为指向全局对象，原始值会被包装。<br />**argsArray （可选）**<br />一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 `func` 函数。如果该参数的值为 `null` 或 `undefined`，则表示不需要传入任何参数。从 ECMAScript 5 开始可以使用类数组对象。浏览器兼容性请参阅本文底部内容。<br />**返回值**<br />调用有指定 `this` 值和参数的函数的结果。

### 使用

1. 改变函数内`this`的指向

```javascript
const person = {
  name: "John",
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
};

const greetFunc = person.greet;
greetFunc(); // Hello, my name is undefined

greetFunc.apply(person); // Hello, my name is John
```

2. 将数组作为参数传递给函数

```javascript
function sum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];

sum.apply(null, numbers); // 6
```

3. 结合函数的剩余参数使用

```javascript
const numbers = [1, 2, 3, 4, 5];

Math.max(...numbers); // 5

Math.max.apply(null, numbers); // 5
```

4. 绑定回调函数的`this`指向

```javascript
const handler = {
  message: "Hello World",
  printMessage() {
    console.log(this.message);
  },
};

document.body.addEventListener("click", handler.printMessage); // Unable to print message

document.body.addEventListener("click", handler.printMessage.bind(handler)); // Bind this

document.body.addEventListener(
  "click",
  handler.printMessage.apply.bind(handler.printMessage, handler)
); // Apply bind
```

### 手动实现

🏅 关键点：apply 的两个参数是函数运行的上下文 this 和参数数组

```javascript
Function.prototype.myApply = function (context, args) {
  // 判断
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  // 唯一key/防止context对象有key/不能随便定义
  const symbolKey = Symbol();
  // 处理边界情况
  context = context || window;
  context[symbolKey] = this;
  const result = args ? context[symbolKey](...args) : context[symbolKey]();
  // 执行完借用的函数后，删除掉
  delete context[symbolKey];
  return result;
};
```

## call

### 概念

`call() `方法使用一个指定的`this`值和单独给出的一个或多个参数来调用一个函数。

```javascript
func.call(thisArg, arg1, arg2, ...)
```

**thisArg**<br />可选的。在 `func` 函数运行时使用的`this`值。请注意，this 可能不是该方法看到的实际值：如果这个函数处于非严格模式下，则指定为 `null` 或 `undefined` 时会自动替换为指向全局对象，原始值会被包装。<br />**arg1, arg2, ...**<br />指定的参数列表。<br />**返回值**<br />使用调用者提供的 `this` 值和参数调用该函数的返回值。若该方法没有返回值，则返回 undefined。

### 使用

在 JavaScript 中,`call()`方法和`apply()`方法很相似,也有一些常见的使用场景:

1. 改变函数内`this`的指向

```javascript
const person = {
  name: "John",
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
};

const greetFunc = person.greet;
greetFunc(); // Hello, my name is undefined

greetFunc.call(person); // Hello, my name is John
```

2. 借用其他对象的方法

```javascript
const person1 = {
  name: "John",
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
};

const person2 = {
  name: "Sarah",
};

person1.greet.call(person2); // Hello, my name is Sarah
```

这里 person2 借用了 person1 的`greet`方法。

3. 应用函数,指定参数

```javascript
function greet(lang) {
  if (lang === "en") {
    console.log("Hello World");
  } else if (lang === "fr") {
    console.log("Bonjour le monde");
  }
}

greet.call(null, "fr"); // Bonjour le monde
```

`call()`允许直接传递函数参数。

4. 结合函数的剩余参数使用

```javascript
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

const nums = [1, 2, 3, 4, 5];
sum.call(null, ...nums); // 15
```

### 手动实现

🏅 关键点：call 接收多个参数,第一个为上下文 this,后面为函数参数

```javascript
Function.prototype.myCall = function (context, ...args) {
  // 判断
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  // 唯一key/防止context对象有key/不能随便定义
  const symbolKey = Symbol();
  // 处理边界情况
  context = context || window;
  context[symbolKey] = this;
  const result = args ? context[symbolKey](...args) : context[symbolKey]();
  // 执行完借用的函数后
  delete context[symbolKey];
  return result;
};
```

## bind

### 概念

`bind()`  方法创建一个新的函数，在  `bind()`  被调用时，这个新函数的  `this`  被指定为  `bind()`  的第一个参数，而其余参数将作为新函数的参数，供调用时使用。<br />**thisArg**<br />调用绑定函数时作为 `this` 参数传递给目标函数的值。如果使用`new`运算符构造绑定函数，则忽略该值。当使用 `bind` 在 `setTimeout` 中创建一个函数（作为回调提供）时，作为 `thisArg` 传递的任何原始值都将转换为 `object`。如果 `bind` 函数的参数列表为空，或者`thisArg`是`null`或`undefined`，执行作用域的 `this` 将被视为新函数的 `thisArg`。<br />**arg1, arg2, ...**<br />当目标函数被调用时，被预置入绑定函数的参数列表中的参数。<br />[**返回值**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#%E8%BF%94%E5%9B%9E%E5%80%BC)<br />返回一个原函数的拷贝，并拥有指定的 `this` 值和初始参数。

### 使用

1. 保存函数上下文

在回调函数中使用`bind`来绑定`this`,以免丢失函数上下文。

```javascript
function log() {
  console.log(this.name);
}

const obj = { name: "Jack" };

setTimeout(log.bind(obj), 1000);
```

2. 部分应用函数

通过`bind()`可以绑定函数的部分参数,返回一个新的函数。

```javascript
function mul(a, b) {
  return a * b;
}

const double = mul.bind(null, 2);

double(3); // 6
double(4); // 8
```

3. 创建高阶函数

`bind()`允许你通过给一个函数绑定作用域来定制它的行为。

```javascript
function greet(prefix, name) {
  console.log(prefix + " " + name);
}

const greetHello = greet.bind(null, "Hello");

greetHello("John"); // Hello John
```

4. 箭头函数没有`this`,可以通过`bind()`来获取外层`this`

```javascript
const person = {
  name: "Jack",
  sayName: () => {
    console.log(this.name); // undefined

    setTimeout(() => {
      console.log(this.name); // undefined
    }, 100);
  },
};

person.sayName();

// 解决方案
const person = {
  name: "Jack",
  sayName: function () {
    console.log(this.name);

    setTimeout(
      function () {
        console.log(this.name);
      }.bind(this),
      100
    );
  },
};

person.sayName();
```

### 手动实现

🏅 关键点：bind 不会立即执行函数,需要返回一个改变了上下文的函数

```javascript
Function.prototype.myBind = function (context, ...bindArgs) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  // 处理边界条件
  context = context || {};
  const symbolKey = Symbol();
  target[symbolKey] = this;
  return function (...innerArgs) {
    // 返回一个函数
    // bindArgs和innerArgs都是一个数组，解构后传入函数
    const res = context[symbolKey](...bindArgs, ...innerArgs);
    // 这里千万不能销毁绑定的函数，否则第二次调用的时候，就会出现问题
    return res;
  };
};
```

## 三者的比较

`apply`、`call` 和 `bind` 这三个方法都可以改变函数内部的 this 指向,但有以下区别:

1. 传参方式不同

- `apply` 接收两个参数,第一个是指定的 `this` 值,第二个是数组或类数组对象。
- `call` 接收多个参数,第一个是指定的 `this` 值,后面的是函数的参数。
- `bind` 传参方式和 call 一样,只是它返回一个绑定了 `this` 的函数。

2. 是否立即执行函数

- `apply` 和 `call` 会立即执行函数。
- `bind` 不会立即执行,而是返回一个改变了 `this` 指向的函数。

3. 是否返回结果

- `apply` 和 `call` 会立即执行,所以会有返回结果。
- `bind` 只是绑定 `this`,不会执行,所以不会有返回结果,调用绑定后的函数才会返回结果。

4. 独有功能

- `apply` 可以把数组作为函数的参数。
- `bind` 可以绑定函数的 `this` 和部分参数,返回绑定后的函数。

所以主要区别是:

- `call` 和 `apply` 立即执行,`bind` 返回绑定后的函数
- `call` 和 `bind` 接收参数列表,apply 接收数组
- `bind` 可以绑定 `this` 和部分参数

**彩蛋 🤩**

- 利用 apply 来实现 call

```javascript
Function.prototype.myCall = function (context, ...args) {
  context = context || window;
  // 使用 apply 来调用函数
  args = args ? [...args] : [];
  return this.apply(context, args);
};
```

- 利用 call 实现 apply

```javascript
Function.prototype.myApply = function (context, args) {
  // 判断 args 是否为数组
  if (!Array.isArray(args)) {
    throw new TypeError("Second argument must be an array");
  }
  // 展开数组为参数
  args = [...args];
  // 使用 call 实现 apply
  return this.call(context, ...args);
};
```

- 利用 apply 实现 bind

```javascript
Function.prototype.myBind = function (context, ...bindArgs) {
  const fn = this;
  return function (...callArgs) {
    // 合并 bind 参数和调用参数
    const args = [...bindArgs, ...callArgs];
    // 使用 apply 改变 this 指向并传入参数
    return fn.apply(context, args);
  };
};
```
