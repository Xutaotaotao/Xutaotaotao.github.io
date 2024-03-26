---
outline: deep
title: 原生模块调用&开发
titleTemplate: Electron实战
---
# 原生模块调用&开发

## 前言

其实在实际的开发过程中，我们会实现一些 Node.js 或者 Electron 本身无法完成的功能，在这种情况下，我们需要封装一些底层的库，比如 dll、dylib、node 二进制文件，然后供上层调用。在这里我们会着重介绍如何在 Electorn 中调用底层的模块，主要是 dll 和 node 二进制文件的调用。

## dylib、dll 的调用

dll 的调用其实很简单，有些时候环境引来的问题会比较麻烦。在 npm 仓库中也有很多调用 DLL 的库，至于怎么选择其实看自己，现在比较常见，使用最多的应该属[ffi-napi](https://github.com/node-ffi-napi/node-ffi-napi)。在不同平台调用的文件不一样`OS X`就是`.dylib`文件,`Windows`就是`.dll`,`Linux`就是`.so`,但是我们不使用`ffi-napi`,最主要的原因是环境会搞得你很头疼，如果`node-gyp`的安装有问题，就会让你非常烦躁，有的时候解决环境问题会花费大量时间，我踩过坑，所以不推荐。这里推荐使用[Koffi](https://koffi.dev/benchmarks),依赖项少，速度很快，下面有个粗略的对比。

![perf_linux_20220812.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5b0046ba5fe48d5b7643124468f34a7~tplv-k3u1fbpfcp-watermark.png?)

![perf_windows_20220812.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d7871beac3d4f13be13d2be884040be~tplv-k3u1fbpfcp-watermark.png?)

### 构建 dylib、dll 文件

我本地的环境是`OS X`,我们为了演示方便,就以构建`dylib`为例子。我们写一个简单的 C 函数就可以做验证了,我们可以在项目跟目录下新建一个`resources`目录,然后创建一个`sum.c`文件，内容如下

```c
#include <stdint.h>

#if defined(WIN32) || defined(_WIN32)
#define EXPORT __declspec(dllexport)
#else
#define EXPORT
#endif

EXPORT uint64_t sum(int a,int b) {
  return a + b;
}
```

然后你可以执行

```
gcc -dynamiclib -undefined suppress -flat_namespace sum.c -o sum.dylib
```

这样就会构建一个`sum.dylib`文件，下面我们就可以愉快的调用它了。

当然如果你是 windows 的话，可以执行

```
cl.exe /D_USRDLL /D_WINDLL sum.c /link /DLL /OUT:sum.dll
```

### node 调用.dylib

我们先安装`koffi`

```
pnpm i koffi
```

然后就可以很愉快的使用了。在`src`下新建一个`native`的目录，添加`index.ts`,koffi 使用非常简单

```
import koffi from 'koffi'
import path from 'path'

const sumLib = koffi.load(path.resolve(
  __dirname,
  "../../resources/sum.dylib"
))

const nativeSum = sumLib.stdcall('sum','int',['int','int'])

export const callNativeSum = (a:number,b:number) => {
  return nativeSum(a,b)
}
```

这里需要注意一个点，就是我们需要改动一下`config/vite/main.js`中`rollupOptions`的`external`,把 koffi 导入包转成外部依赖，不然在构建的时候会报错。

```js
rollupOptions: {
  external: ['electron','koffi',...builtinModules],
  output: {
    entryFileNames: '[name].cjs',
  },
}
```

到这里 electron 调用 dylib、dll 的简单功能就实现了。当然我们这里还会介绍用 Rust 的方式来让你做底层的功能。

## 桥接 Rust

至于为什么要选择 Rust 实现,其实也不是为了学习 Rust 而 Rust,是因为在开发的过程中的确遇到了瓶颈，然后用 Rust 来处理了一些问题,其实也是多了一种选择，特别是处理耗时任务的时候，Rust 表现非常优异，下面我们就来尝试在 Electron 中通过桥接的方式来调用 Rust 的方法。

### Rust 是什么

两个链接告诉你，环境的搭建步骤和方式也告诉你了：

https://www.rust-lang.org/zh-CN/learn/get-started

https://course.rs/about-book.html

只有把环境搭建好，才可以开始下面的步骤哦。

### 如何让 Rust 和 Node 打通

经过调研，我们最终选择了[@napi-rs/cli](https://napi.rs/docs/introduction/getting-started)

首先全局安装一下@napi-rs/cli 脚手架

```
pnpm add -g @napi-rs/cli
```

然后用`napi new`创建一个新的项目，当然，如果你有成熟的分包管理工具也可以在原项目下创建项目，后面在打包构建的时候整合，我们这个为了方便简单演示其原理我们就新建一个项目。

![截屏2023-02-28 20.03.18.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9328e5a2d5eb4aecb542b5fa5eaa2b9d~tplv-k3u1fbpfcp-watermark.png?)
这里我们就选择所有平台，简直就是跨端大杀器。

创建项目后会这样

![截屏2023-02-28 20.07.47.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31f6653369c34a4586c17f79b4e57882~tplv-k3u1fbpfcp-watermark.png?)

这里我们可以在`sum`的下面加一个减法的函数`subtraction`,测试一下它的易用性

```
#[napi]
pub fn subtraction(a: i32, b: i32) -> i32 {
  a - b
}
```

然后直接

```
pnpm run build
```

首次构建可能有点慢，但是后面就很快了。

构建之后会出现一个你现在构建平台的一个`.node`文件

![20230228202841.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/915d0119640f418f91ffdb4cffa4507a~tplv-k3u1fbpfcp-watermark.png?)

我们将其拷贝至我们原有的`Electron`项目中的`resources`目录下。

现在我们要来引用这个 node 文件，超级简单

```
const rsNative = require(path.resolve(
  __dirname,
  "../../resources/rs-native.darwin-x64.node"
))

export const rsNativeSum = (a:number,b:number) => {
  return rsNative.sum(a,b)
}

export const rsNativeSubtraction = (a:number,b:number) => {
  return rsNative.subtraction(a,b)
}
```

是不是感觉上层调用非常方便，不用关心数据类型。

这是现在的目录结构

![截屏2023-02-28 21.12.33.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d0d56e937984e06bd26563ad969ba4d~tplv-k3u1fbpfcp-watermark.png?)

## 结语

到这里，我们基本就打通了 Electron 调用 dll,dylib,rust 构建的 node 文件的流程了。不过后续相关的构建在这个地方还有相应的改动，我们在构建那一块再细细描述。其实 Electron 打通了底层的逻辑就会非常强大，这样可以做的事情会非常多。
