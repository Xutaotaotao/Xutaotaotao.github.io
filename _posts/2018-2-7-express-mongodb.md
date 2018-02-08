---
layout: 	post
title: 		"Express+mongoDB+Node.js搭建电影网站教程"
subtitle:   "Array function"
date: 		2018-2-7 21:21
author: 	"xutaotao"
header-img: "img/post-bg-js-version.jpg"
tags:
  - JavaScript
---

引言：很少写教程，特别是象这种项目教程更是少写，当然好久都没有动笔了，写起来可能有点生疏了，正因为如此，我才来用这个小项目来锻炼一下自己的表述能力。

## 项目描述：

### 1

作为网站用户，我想通过导航栏搜索电影，以便快速查看想了解的电影

#### 验收标准：

- 显示导航栏
- 提供搜索功能
- 支持按电影名称搜索

### 2

作为网站用户，我想按分类浏览电影，以便查看特定类型的电影

#### 验收标准：

- 显示分类列表

- 按分类显示电影

- 点击分类可以显示对应类别的电影

### 3

作为网站用户，我想查看电影的详细信息，以便更全面的了解一部电影

#### 验收标准：

- 显示电影详细信息

- 显示影评

### 4

作为网站用户，我想在电影详细页面获得类似电影推荐，以便发掘更多可能喜欢的电影

#### 验收标准：

- 显示类似电影推荐

### 5

作为API调用者，我想获取有关电影分类的信息，以便给网站用户显示电影分类列表

#### 验收标准：

- 提供一个API返回电影分类信息

### 6

作为API调用者，我想获取有关电影的信息，以便在电影浏览页面和电影详细页面给网站用户显示电影

#### 验收标准：
s
- 提供一个API返回多部电影详细信息
- 支持按类别过滤
- 支持按电影名称搜索
- 提供一个API返回一部电影详细信息
- 支持按电影ID查询

## 项目思考
根据需求描述可以知道，此项目就是一个最基本的查寻功能的网站需求设计。当然，其中也有类似电影推荐以及API调用的需求。虽然自己是个垃圾前端，但是对于上述需求的基本查询功能还是可以做的，以及API的调用也是可以做的，由于学习JavaScript的时间很多，这次我选择了基于node.js的一个开发框架express（http://www.expressjs.com.cn/）做服务器，用mongoDB做数据库，此次的项目是在windows的平台上开发的。所以后面的教程都是基于windows平台讲述的。

## 项目环境
- windows操作系统
- node.js，mongoDB,express
- [node.js的安装]:（http://www.runoob.com/nodejs/nodejs-install-setup.html）
- [mogoDB的安装]:（https://www.jianshu.com/p/591b8d63e816）
- express的安装:打开命令行运行：npm install express --save

## 搭建项目
