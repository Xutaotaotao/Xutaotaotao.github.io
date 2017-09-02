---
title: '重学CSS&#8211;代码结构的重要性'
date: 2017-07-14T21:31:39+00:00
author: xutaotao
layout: post
categories:
  - 前端日记
tags:
  - css
---
最近开始重新恶补css的相关知识，每天写读书笔记正式开始，注意事项和要点依次开始罗列。

1.结构良好且有效的HTML文档在基于标准的css开发中非常重要。真的非常重要。

2.有意义的标记（语义标记）可以将元素调整为你所需的样式，在文档中添加结构并且创建底层框架。

3.ID和类

  * ID用于标识页面上的特定元素，而且必须唯一，一个id名只能应用于页面的一个元素。
  * 同一个类名可以应用于页面上任意多个元素，类适合标识内容的类型或其他相似的条目。
  * 在分配ID和class名时，一定尽量保持名称与表现方式无关，根据他们的本质来命名，即“他们是什么”，而不是“他们外观如何”来命名。
  * 在写类名和ID名时，需要注意区分大小写，浏览器认为大小写是不同的类名，统一命名约定，完全小写，多个单词之间连字符号分隔，andy-budd。
  * 不要犯“多类症”。

4.不要犯&#8221;多div症&#8221;。

&nbsp;