---
title: '关于CSS中BACKGROUND-IMAGE: URL()的问题'
date: 2017-06-14T13:42:33+00:00
author: xutaotao
layout: post
categories:
  - 前端日记
tags:
  - css
---
今天做网页发现一个问题。当在css中用background-image: url（）属性时，无法在页面的相应位置显示出背景图片。

开始以为是没有引用CSS的原因但是检查发现，CSS引用无误。

的确没错哇，然后通过浏览器调试发现，

找不到图片，那么肯定是引入图片的地方出了问题。

嗯，的确，我用的是相对路径background-image: url(“./img/1.jpg”)。所以它的链接会在css里面去找/img/1.jpg，但是我的图片在根目录的img里面。所以应该将其改为background-image: url(“../img/1.jpg”),这样就有背景图片了。

&nbsp;