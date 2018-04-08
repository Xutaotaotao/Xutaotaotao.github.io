---
layout:     post
title:      "从零开始用webpack+vue搭建前端工程的基本过程"
subtitle:   "webpack+vue"
date:       2018-3-28 21:21
author:     "xutaotao"
header-img: "img/book.jpeg"
tags:
  - Vue.js,Webpack
---

## webpack+vue 搭建前端工程的基本过程

**目标：**

- 配置开发时的前端工程

**环境**

- win10家庭中文版+node6.13.1

**提示**
- 此教程不适合没有vue和webpack基础的人看，若要自己构建前端工程，请先了解一些vue和webpack的基础知识


### 详细步骤



### 1.初始化项目

#### 1.1创建项目文件
#### 1.2初始化package.json文件

`npm init`

#### 1.3安装webpack vue vue-loader

  `npm i webpack vue vue-loader --save`

#### 1.4安装css-loader vue-template-compiler依赖项

  `npm i css-loader vue-template-compiler --save`

### 2.创建源码文件

#### 2.1在项目目录下创建src目录
#### 2.2 在src目录下创建app.vue文件

```
//vue文件的标准模式
//模板插入html
<template>
    <div id="weather">
        {{text}}}
    </div>
</template>

//script插入js
<script>
    export default{
        data(){
            return{
                text:'天气查询'
            }
        }
    }
</script>

//style 插入样式
<style>
    #weather{
        color: aqua;
        font-size: 20px;
    }
</style>
```

此时的app.vue文件无法直接在页面上展示，需要对webpack进行配置。


### 3.webpack配置实现加载各种静态资源以及CSS处理器

#### 3.1在项目目录下创建webpack.confing.js
#### 3.2 配置出口，入口文件以及相应的文件module

```
const path = require('path');//加载path模块

module.exports = {
//人口文件配置
    entry:path.join(__dirname,'src/index.js'),
//出口文件配置
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
//规则配置
    module: {
        rules: [
            {
                test:/\.vue$/,
                loader: 'vue-loader'
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit:1024,
                            name:'[name]-weather.[ext]'
                        }
                    }
                ]
            }
        ]
    }
};
```

#### 3.3 在src目录下创建index.js

```
// 引入vue,app.vue
import Vue from 'vue'
import App from './app.vue'

//创建html节点
const root = document.createElement('div');
document.body.appendChild(root);

//创建一个vue,并将内容引入到html里面
new Vue({
    render:(h) => h(App)
}).$mount(root);
```

#### 3.4在package.json文件里面加入脚本

`  "build": "webpack --config webpack.config.js" `

#### 3.5安装文件module处理依赖库

`npm i style-loader url-loader file-loader css-loader less less-loader --save`

#### 3.6然后将项目bulid
 `npm run build`

 在这里就已经实现了用webpack加载静态资源的功能。

 ### 4.配置webpack-dev-server

 #### 4.1修改package.json中的script

```
"build": "cross-env NODE_ENV=production webpack --config webpack.config.js",//修改之前的bulid
"dev": "cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js"//添加dev
```

#### 4.2安装依赖项cross-env

`npm i cross-env --save`

#### 4.3再次配置webpack.config.js
```
//引入各种模块
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

//判断是否是dev
const isDev = process.env.NODE_ENV === 'development';

const config = {
    target: 'web',
    entry:path.join(__dirname,'src/index.js'),
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    module: {
        rules: [
            {
                test:/\.vue$/,
                loader: 'vue-loader'
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit:1024,
                            name:'[name]-weather.[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        //判断环境引用插件
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]
};

if(isDev){
    config.devtool = '#cheap-module-eval-source-map';//在浏览器映射源代码
    config.devServer = {
        port:8000,//服务器端口
        host:'0.0.0.0',
        overlay:{
            error:true,//在页面显示错误
        },
        hot:true//只对组件进行修改，不刷新全部页面
    };
//新增插件
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    );
}

module.exports = config;

```

#### 4.4安装重新配置的需要的依赖项

` npm i html-webpack-plugin webpack-dev-server@2.11.2 --save`

到这里基本的项目配置就完成了，然后就可以开始开发了。

下面为开发需要的依赖：
```
"dependencies": {
    "cross-env": "^5.1.4",
    "css-loader": "^0.28.11",
    "file-loader": "^1.1.11",
    "html-webpack-plugin": "^3.1.0",
    "less": "^3.0.1",
    "less-loader": "^4.1.0",
    "style-loader": "^0.20.3",
    "url-loader": "^1.0.1",
    "vue": "^2.5.16",
    "vue-loader": "^14.2.2",
    "vue-template-compiler": "^2.5.16",
    "webpack": "^3.10.0",
    "webpack-dev-server": "^2.11.2"
  }
  
```
项目目录结构

![Contents.png](https://upload-images.jianshu.io/upload_images/8108267-71dfbeec530edbb0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)








