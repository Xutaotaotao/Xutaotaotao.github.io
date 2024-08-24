---
outline: deep
title: JS 模块化
titleTemplate: 前端面试题
---
# JS 模块化

<img src="/question/javascript/js_modularization.jpg" width="500" height="520">

## JavaScript 模块化发展历史

无模块化-->CommonJS 规范-->AMD 规范-->CMD 规范-->ES6 模块化

## CommonJS

### 概述

CommonJS 规范是为了解决 JavaScript 的作用域问题而定义的模块形式，可以使每个模块它自身的命名空间中执行。每个模块就是一个模块，有自己的作用域。在一个文件里面定义的变量，函数，类都是私有的，对其他文件不可见。在服务器端，模块的加载是运行时同步加载的；在浏览器端，模块需要提前编译打包处理。

### 特点

- 所有代码都运行在模块作用域，不会污染全局作用域。
- 模块可以多次加载，但是只会在第一次加载的时运行一次，然后运行结果就被缓存了，以后再加载就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
- 模块加载的顺序，按照其在代码中出现的顺序。

### 基本语法

```javascript
// 导出
module.exports = value;
exports.xxx = value;

// 引入
require(xxx);
```

### 注意点

- require 命令的基本功能是，读入并执行一个 JavaScript 文件，然后返回该模块的 exports 对象。如果没有发现指定模块，会报错。
- CommonJS 模块的加载机制是，输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。这点与 ES6 模块化有重大差异（下文会介绍）

## AMD

### 概述

[AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。

### 特点

- 它的模块定义的方法非常清晰，不会污染全局环境，能够清楚地显示依赖关系。
- AMD 模式可以用于浏览器环境，并且允许非同步加载模块，也可以根据需要动态加载模块。

### 基本语法

- 导出：

```javascript
// 定义没有依赖的模块
define(function () {
  return "";
});

// 定义有依赖的模块
define(["module1", "module2"], function (m1, m2) {
  // dosomething by m1,m2
});
```

- 引入

```javascript
require(["module1", "module2"], function (m1, m2) {
  // dosomething by m1,m2
});
```

## CMD

### 概述

CMD 规范专门用于浏览器端，模块的加载是异步的，模块使用时才会加载执行。CMD 规范整合了 CommonJS 和 AMD 规范的特点。在 Sea.js 中，所有 JavaScript 模块都遵循 CMD 模块定义规范。

### 基本语法

- 导出

```javascript
// 定义没有依赖的模块
define(function (require, exports, module) {
  exports.xxx = value;
  module.exports = value;
});

// 定义有依赖的模块
define(function (require, exports, module) {
  var module2 = require("./module2");
  require.async("./module3", function (m3) {});
  exports.xxx = value;
});
```

- 引入

```javascript
define(function (require) {
  var m1 = require("./module1");
  var m4 = require("./module4");
  m1.show();
  m4.show();
});
```

## ES6 模块化

### 概述

ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，旨在成为浏览器和服务器通用的模块解决方案。ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。

### 基本语法

_export 导出模式_

- 导出

```javascript
let basicNum = 0;
let add = function (a, b) {
  return a + b;
};
export { basicNum, add };
```

- 引入

```javascript
import { basicNum, add } from "./math";
function test(ele) {
  ele.textContent = add(99 + basicNum);
}
```

export default 导出模式

- 导出

```javascript
// export-default.js
export default function () {
  console.log("foo");
}

// 上面代码是一个模块文件export-default.js，它的默认输出是一个函数。
// 其他模块加载该模块时，import命令可以为该匿名函数指定任意名字。
```

- 引入

```javascript
// import-default.js
import customName from "./export-default";
customName(); // 'foo'
// 上面代码的import命令，可以用任意名称指向export-default.js输出的方法，这时就不需要知道原模块输出的函数名。
// 需要注意的是，这时import命令后面，不使用大括号。
```

_export 和 export default 差异_

- export、import 可以有多个，而 export default 只能有一个
- export 导出的对象在导入时需要加{},而 export default 则不需要
- export 能直接导出变量表达式

## ES6 模块与 CommonJS 模块的差异

区分 ES6 和 CommonJs<br />凡是带有 “s” 的都是 CommonJS 规范，如 `exports`、`module.exports` 等<br />而不带 “s” 的则是 ES6 Moudule。比如 `export`、`export default`。

### CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用

- CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值
- ES6 模块的运行机制和 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令`import`，就会生成一个制度引用。等到脚本真正执行的时候，再根据这个制度引用，到被加载的那个模块里面去取值。换句话说，ES6 的`import`有点像 Unix 系统的“符号连接”，原始值变了，`import`加载的值也会跟着变。
  - 这也就是热部署的原理。而由于配置文件，如`vue.config.js`之类的，用的是 commonJS 规范，所以更改后需要重启服务重新读入

### CommonJS 模块是运行时加载，ES6 模块是编译时输出接口

- 运行时加载
  - CommonJS 模块就是对象；即，在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法。这种加载称为“运行时加载”。
- 编译时加载
  - ES6 模块不是对象，而是通过`export`命令显式指定输出的代码。`import`时采用静态命令的形式。即在`import`时可以指定加载某个输出值，而非整个模块，此即为“编译时加载”。

CommonJS 加载的是一个对象（即`module.exports`属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。
