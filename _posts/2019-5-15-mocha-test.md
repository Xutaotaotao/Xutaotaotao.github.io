---
layout:     post
title:      "Mocha+Travis-CI实现自动化前端单元测试"
subtitle:   "Mocha"
date:       2019-5-15 23:36
author:     "xutaotao"
header-img: "img/book.jpeg"
tags:
  - Mocha
---

# Mocha+Travis-CI实现自动化前端单元测试

* [1.基本工程初始化](#1)
* [2.美化测试报告](#2)


<h2  id="1">1.基本工程初始化</h2>

### VUE项目初始化
安装vue/cli脚手架
[https://cli.vuejs.org/guide/installation.html](https://cli.vuejs.org/guide/installation.html)

```
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```
初始化项目
```
vue create mocha-test
```

### 安装测试相关依赖

`npm i chai mocha babel-core babel-preset-es2015 babel-polyfill babel-register --save`

- chai是断言库

- mocha是测试框架

- node中并不支持某些es6语法，需要通过babel编译，所以需要下载依赖

`babel-preset-es2015  babel-polyfill  babel-register `

### 修改配置文件

在主目录添加.babelrc, .gitignore文件

.babelrc 辅助将es6转化为es5
```
{
  "presets": [ "es2015" ]
}
```

.gitignore,忽略git提交的文件配置

```
node_modules/
```

### 编写测试用例

在主目录文件夹新建test文件夹，新建test.js文件

数组的includes方法示例

```

// 引入断言库

import chai from 'chai'

let expect = chai.expect

describe('Array',function(){

  describe('includes()',function(){

    it('should return false when the value does not include',function(){

      expect([1,2,3].includes(4)).to.equal(false);

    })

  })

})

```

在package.json文件中加入测试构建命令
```
"test": "mocha --recursive --require babel-core/register test"
```
运行 npm run test
![image.png](https://upload-images.jianshu.io/upload_images/8108267-950d005a8bc3d1a3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

到这一步基本的测试环境就搭建起来了，然后可以开始进阶了。

<h2 id="2">2.美化测试报告</h2>
基本的测试脚本已经开始生效了，但是测试结果并不是很直观，所以需要生产好看的测试报告。
### 使用mochawesome,istanbul

`npm i mochawesome istanbul@1.0.0-alpha.2 babel-cli babel-register babel-plugin-istanbul babel-preset-env cross-env nyc --save-dev`

安装Babel相关的依赖主要是为了让mochawesome,istanbul支持es6

安装依赖后对nyc进行相应的配置，nyc的相关配置可参考:https://www.npmjs.com/package/nyc
```
"nyc": {
    "require": [
      "babel-register"
    ],
    "reporter": [
      "lcov",
      "text"
    ],
    "sourceMap": false,
    "instrument": false
  }
```
然后再对.babelrc进行相应的配置
```
{
  "presets": [
    "env"
  ],
  "env": {
    "test": {
      "plugins": [
        "istanbul"
      ]
    }
  }
}
```
对package.json的test脚本在进行配置
```
"scripts": {
    "test":"cross-env NODE_ENV=test nyc mocha --reporter mochawesome"
  },
```

