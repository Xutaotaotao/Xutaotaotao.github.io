---
id: 83
title: 'Math.random()，function document.onkeydown()，setIntvel'
date: 2017-06-16T16:46:18+00:00
author: xutaotao
layout: post
categories:
  - 前端日记
tags:
  - JavaScript
---
对于一个简单逻辑的网页没想到今天花了我几个小时，问题得不到解决，做出的东西很菜鸡。

第一个问题就是js随机数组的产生方法，为了让每个人有不同的祝福语言，肯定得用随机函数，但是输出形式又得是文字，所以选择了把文字数组化，这是最容易的方法。

_var a = Math.random() + “” //__产生一个随机数_

_var rand1 = a.charAt(5) //__的到这个数的第五个字符(实际还是从0~9的数字)_

_quotes = new Array //__创建消息数组_

_var quote = quotes[rand1] //__由随机数选择一句话_

然后，要在输出的时候加上他的名字，所以选择了如下方法，

_function wish(){_
  
_var x = document.getElementById(“name”).value;_
  
_var y = “__，”;_
  
_var z = quote;_
  
_x = x+y+z;_
  
_document.getElementById(‘wishend’).innerHTML = x;_
  
_}_

最后，再是一个button事件

_<button type=”text” onclick=”wish()” class=”btn btn-primary btn-lg”>__毕业</button>_

逻辑超级简单，但是做出来有几个不满意得地方。

1.每个同学输完名字需要重新刷新网页才能，得到随机的祝福语。

2.每次必须用鼠标点击按钮才能完成操作，没有将button和点击回车键结合。

尝试解决第一个问题的方法，使用setIntvel函数，尝试失败，文字无法刷新，只能刷新一次。

尝试解决第二个问题的方法，使用

_function document.onkeydown()_
  
_{_
  
_if(event.keyCode == 13)_
  
_{_
  
_document.getElementById(“groupbutton”).click();_
  
_event.returnValue = false;_
  
_}_

没有解决，浏览器使劲报错。

&nbsp;

&nbsp;