---
title: js中的函数（方法）基础知识回顾
date: 2017-08-07T21:33:41+00:00
author: xutaotao
layout: post
categories:
  - 前端日记
tags:
  - JavaScript
---
1.函数（方法）：封装执行一项专门任务的步骤的代码序列。

2.定义方法的方式

1）使用function关键字声明方式定义方法

`function function_name（arg1,arg2,...,argn）{<br />
function_body;<br />
}`

2）使用Function对象方式定义方法

`var function_name=new Function("arg1","arg2",...,"argn","fuction_body;");`

3)使用匿名函数赋值的方式定义方法
  
`<br />
var function_name=function(arg1,arg2,...,argn){<br />
function_body;<br />
}<br />
` 

注：以上两种方式只有第一种使用function关键字声明方式定义方法才会被提前解析。

3.方法调用时的细节问题

1）调用：方法名（参数值列表）

2）参数：方法内独有的变量，接收传入函数，在方法内处理。方法参数和外部定义了哪些变量没有任何关系。

3）参数何时被创建：只要方法被调用时才自动创建。

4）返回值：方法执行完成后，由方法返回的一个数据。

4.关于作用域的问题

1）作用域的简单理解：一个变量的可用范围。

2）全局变量：直接声明在全局作用域中的变量叫做全局变量。window对象是整个网页的全局作用域对象。

3）局部变量：声明在方法内部的变量或方法的参数变量。

4）函数作用域和变量作用域完全一样。用一张图说明全局变量和局部变量的关系。

<img class="size-medium wp-image-468 aligncenter" src="http://www.xutaotao.cn/wp-content/uploads/2017/08/type-conversion-1-300x210.png" alt="" width="300" height="210" srcset="http://www.xutaotao.cn/wp-content/uploads/2017/08/type-conversion-1-300x210.png 300w, http://www.xutaotao.cn/wp-content/uploads/2017/08/type-conversion-1-386x270.png 386w, http://www.xutaotao.cn/wp-content/uploads/2017/08/type-conversion-1.png 684w" sizes="(max-width: 300px) 100vw, 300px" />

注：局部（函数）作用域在调用方法时创建，方法执行完立刻销毁。