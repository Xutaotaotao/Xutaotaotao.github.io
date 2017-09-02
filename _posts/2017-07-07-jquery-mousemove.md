---
title: jQuery中mousemove和css中的position搭配使用更配
date: 2017-07-07T12:51:20+00:00
author: xutaotao
layout: post
categories:
  - 前端日记
tags:
  - jquery
---
&nbsp;

上面的代码实现提示框跟随鼠标一起移动的效果，看原理当然是这样，但是在实际操作中却是如下效果。

提示效果不会跟随鼠标的移动而移动，书上代码是这样的。我想肯定是样式部分会对其效果有影响，果不其然，看了作者的源代码发现的确对tooltip加了样式，

很明显，肯定是position对其产生了效果。

总结：要使用mouse move方法，一定要对对象的position属性进行设置，设置的值根据实际情况定，最好使用absolute属性值。

&nbsp;