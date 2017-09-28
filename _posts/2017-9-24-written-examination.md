---
layout: 	post
title: 		"秋招鄙视题（不定更新）"
subtitle:   "愿自己走过秋招还能热勇一腔"
date: 		2017-09-22 16:42:33
author: 	"xutaotao"
header-img: "img/post-bg-interview.jpg"
tags:
  - JavaScript
---


## 简答题

### CSS类

#### 一、float布局的优缺点是什么？有没有替代方法，写出方法 

#### 二、垂直居中布局的方法有哪些？

###### 1.使用position：absolute,设置left、top、margin-left、margin-top

	.one{
		position: absolute;
		width:200px;
		height: 200px;
		top:50%;
		left: 50%;
		margin-top:-100px;
		margin-left: -100px;
		background: red;
	}

###### 2.使用position:fixed,同样设置left、top、margin-left、margin-top的属性

	.two{
		position: fixed;
		width: 180px;
		height: 180px;
		top:50%;
		left: 50%;
		margin-top:-90px;
		margin-left: -90px;
		background: orange;
	}

###### 利用position:fixed属性，margin:auto这个必须不要忘记了。

	.three{
		position: fixed;
		width: 160px;
		height: 160px;
		top:0;
		right:0;
		bottom: 0;
		left: 0;
		margin: auto;
		background: pink;
	}

###### 4.利用position:absolute属性，设置top/bottom/right/left

	.four{
		position: absolute;
		width: 140px;
		height: 140px;
		top:0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
		background: black;
	}

###### 5.利用display:table-cell属性使内容垂直居中

	.five{
		display: table-cell;
		vertical-align: middle;
		text-align: center;
		width: 120px;
		height: 120px;
		background: purple;
	}

###### 6.最简单的一种使行内元素居中的方法，使用line-height属性

	.six{
		width: 100px;
		height: 100px;
		line-height: 100px;
		text-align: center;
		background: gray;
	}

###### 7.使用css3的display:-webkit-box属性，再设置-webkit-box-pack:center/-webkit-box-align:center

	.seven{
		width: 90px;
		height: 90px;
		display: -webkit-box;
		-webkit-box-pack:center;
		-webkit-box-align:center;
		background: yellow;
		color: black;
	}

###### 8.使用css3的新属性transform:translate(x,y)属性

	.eight{
		position: absolute;
		width:80px;
		height: 80px;
		top:50%;
		left: 50%;
		transform: translate(-50%,-50%);
		-webkit-transform:translate(-50%,-50%);
		-moz-transform:translate(-50%,-50%);
		-ms-transform:translate(-50%,-50%);
		background: green;
	}

###### 9.使用before元素

	.nine{
		position:fixed;
		display: block;
		top:0;
		right: 0;
		bottom: 0;
		left: 0;
		text-align: center;
		background: rgba(0,0,0,.5);
	}
	.nine:before{
		content: :'';
		display: inline-block;
		vertical-align: middle;
		height: 100%;
	}
	.nine .content{
		display: inline-block;
		vertical-align: middle;
		width: 60px;
		height: 60px;
		line-height: 60px;
		color: red;
		background: yellow;
	}

#### 三、左右两栏布局，左边宽度固定右边自适应的布局方法有哪些？

###### 1.左边左浮动，右边加个overflow:hidden

	#one .left{
		float: left;
		width: 200px;
		height: 200px;
		background: red;
	}
	#one .right{
		overflow: hidden;
		width: auto;
		height: 200px;
		background: yellow;
	}

###### 左边左浮动，右边加个margin-left

#two .left{
	float: left;
	width: 200px;
	height: 200px;
	background: red;
}
#two .right{
	margin-left: 200px;
	height: 200px;
	width: auto;
	background: yellow;
}

###### 左边绝对定位，右边加个margin-left

	#three .left{
		position: absolute;
		top: 0;
		left: 0;
		width: 200px;
		height: 200px;
		background: red;
	}

	#three .right{
		margin-left: 200px;
		height: 200px;
		width: auto;
		background: yellow;
	}

###### 左右两边绝对定位，右边加个width，top,left,right

	#four .left{
		position: absolute;
		top:0;
		left: 0;
		width: 200px;
		height: 200px;
		background: red;
	}
	#four .right{
		position: absolute;
		top:0;
		left: 200px;
		height: 200px;
		width: 100%;
		right: 0;
		background: yellow;
	}

###### flex布局

	#five{
		display: flex;
		align-items:flex-start;
	}

	#five .left{
		flex:0 0 auto;
		width: 200px;
		height: 200px;
		background: red;
	}
	#five .right{
		flex:1 1 auto;
		height: 200px;
		width: auto;
		background: yellow;
	}

###### grid(网格)方案

	#six{
		display: grid;
		grid-template-columns: 120px 1fr;
		align-items: start;
	}
	#six .left,
	#six .right{
		box-sizing: border-box;
	}
	#six .left{
		grid-column: 1;
		height: 200px;
		background: red;
	}
	#six .right{
		grid-column: 2;
		height: 200px;
		background: yellow;
	}
	
#### 四、css中的hack技术有哪些？

### JS类

#### 一、js面向对象有几种方式并用js写出


### 综合类

#### 一、请列出你所知道的浏览器兼容问题，以及相应的解决办法（可包含CSS和JS）

#### 二、列举出所熟悉的性能优化方法

### 编程题

#### 一、用js实现快速排序算法
