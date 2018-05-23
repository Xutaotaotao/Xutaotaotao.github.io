---
layout:     post
title:      "Cordova+Vue实现Android APP开发"
subtitle:   "Cordova+vue"
date:       2018-5-21 21:21
author:     "xutaotao"
header-img: "img/book.jpeg"
tags:
  - Vue.js
---


Cordova是使用HTML,CSS，JavaScript构建的混合移动应用程序的平台。此篇教程的目的是将Vue项目融合到Cordova，正文开始。

## 开发环境及工具
- 操作系统：Windows 10 Pro,1709
- node.js：v8.11.2 （https://nodejs.org/dist/latest-v8.x/）
- Java环境：
1.下载安装JDK
(http://www.oracle.com/technetwork/java/javase/downloads/index.html)
2.设置JAVA_HOME环境变量，指定为JDK安装路径（自行百度）
- 安卓环境：
1.下载安装Android SDK([installer_r24.4.1-windows.exe](https://dl.google.com/android/installer_r24.4.1-windows.exe?utm_source=androiddevtools&utm_medium=website))
2.安装必要的API,我的安装如下：
![安装的API.png](https://upload-images.jianshu.io/upload_images/8108267-bd63e54a3f3f721a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
3.配置ANDROID_HOME环境变量，指定为Android SDK安装路径。（自行百度）

- 工具

1.VS code
2.Android Studio（可选）
3.Genymotion 模拟器

当准备好上述的开发环境和工具之后，你就可以开发了。可能环境搭建会出现各种问题，耐心解决了就成功一半了。

## 教程
### 一、安装cordova框架生成APP

**1.用npm安装cordova**
 `npm install -g cordova`

**2.创建cordova项目**
`cordova create cordova-vue`

自此，cordova项目的基本骨架完成了，下面的所有操作都需要在cordova-vue目录下进行。

**3.添加android平台**
`cd cordova-vue`

`cordova platform add android --save`

**4.检查构建APP的条件**
`cordova requirements`

若满足下面的条件，说明你可以构建APP了
![构建先决条件.png](https://upload-images.jianshu.io/upload_images/8108267-89ac1f90ba2e1c52.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**5.构建APP，并运行demo**
`cordova build android`

出现如下的界面表示你的app构建成功了
![构建成功.png](https://upload-images.jianshu.io/upload_images/8108267-10c38517ad43b8b8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**6.找到APP文件用Genymotion 模拟器打开**

APP文件的路径如构建成功的图片所示，根据个人情况而定
我的为：`D:\cordova-vue\platforms\android\app\build\outputs\apk\debug\app-debug.apk`
![Demo APP运行界面.png](https://upload-images.jianshu.io/upload_images/8108267-9f838c78e8c82aaa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如果你以上步骤都完成了，恭喜你已经成功了80%，接下来的步骤就是将vue项目整合到Cordova项目里面。

###二、vue项目整合到Cordova项目里面

**1.构建vue项目**
在cordova-vue目录下安装vue项目
安装脚手架（3.0.0）：`npm install -g @vue/cli-init`
创建项目：`vue init webpack vue-app`
运行vue项目：`npm run dev`
![vue-app.png](https://upload-images.jianshu.io/upload_images/8108267-e2df9734e552a145.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**2.修改配置项，将静态文件打包到cordova项目**
此时的项目结构为：![项目结构.png](https://upload-images.jianshu.io/upload_images/8108267-b8d78f9a28e9a09c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
然后修改vue-app文件中config下的index.js的build配置项。
修改如下：
![修改配置项.png](https://upload-images.jianshu.io/upload_images/8108267-ae18941b908b0fa7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
修改完成后build一下项目`npm run build`

**3.返回cordova-vue项目目录重新构建app**
`cordova build android`
此时构建的APP就如下所示了。![Cordova-vue APP.png](https://upload-images.jianshu.io/upload_images/8108267-a049c16d409341f1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

到这里基本的cordova-app框架结构就搭建好了，然后就可以专注于vue项目的开发了。另外，# **[vue-cordova](https://github.com/kartsims/vue-cordova)**这个插件可以结合vue进行开发，实现安卓的文件存储，地理定位，照相等功能，完成js控制手机硬件的功能。