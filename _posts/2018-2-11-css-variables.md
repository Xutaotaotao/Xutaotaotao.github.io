---
layout: 	post
title: 		关于CSS Variables
subtitle:   "CSS变量"
date: 		2018-1-11 20:42:33
author: 	"xutaotao"
header-img: "img/CSS.jpg"
tags:
  - CSS Variables
---

### 什么是CSS变量
CSS 变量当前有两种形式：

- 变量，就是拥有合法标识符和合法的值。可以被使用在任意的地方。可以使用var()函数使用变量。例如：var(--example-variable)会返回--example-variable所对应的值

- 自定义属性。这些属性使用--*where*的特殊格式作为名字。例如--example-variable: 20px;即使一个css声明语句。意思是将20px赋值给--example-varibale变量。

/*注意：在之前的标准中，自定义属性以var-作为前缀，后来才改成--前缀。Firefox 31和以后的版本遵循新标准。(bug 985838)*/

自定义属性和常规属性一样，作用在当前的层级，若没有定义，则从其父元素继承其值。

### CSS变量声明
	:root{
		--base:#ffc600;
		--spacing:10px;
		--blur:10px;	}

:root 这个 CSS 伪类匹配文档树的根元素。对于 HTML 来说，:root 表示 <html> 元素，除了优先级更高之外，与 html 选择器相同。在声明全局 CSS 变量时 :root 会很有用。

--base,--spacing,--blur都是变量，而且都是全局变量。

### CSS变量的使用
	img{
      padding: var(--spacing);
      background: var(--base);
      filter:blur(var(--blur));
    }

var()函数用于读取变量，var()函数还可以使用第二个参数，表示变量的默认值，如果该变量不存在，就会使用这个默认值。
	img{
		padding:var(--spacing,20px);
	}
