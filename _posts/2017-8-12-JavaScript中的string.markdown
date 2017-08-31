---
layout:     post
title:      "JavaScript中的string"
subtitle:   "JavaScript基础回顾"
date:       2017-08-12 21:57:00
author:     "Taotao"
header-img: "img/post-bg-2017-8-30.jpeg"
tags:
    - JavaScript
---

1.String的创建<br>
1)创建原始类型字符串变量<br>
<code>
var gender="man";<br>
var priceString=String(150,5);<br>
</code>

2)创建引用类型字符串对象<br>
<code>
	var carType=new String('');
</code>
<br>
注:字符串内容一旦创建，不可改变，如果修改，都要创建新字符串，保存新结果，替换旧字符串。<br>
2.转义字符:代替字符串中的非打印字符。如果字符串内容中包含和语法冲突的特殊字符可用\转为普通字符。<br>
3.字符串的相关操作<br>
1)<code>Str.length</code> :返回Str字符串中的字符个数<br>
2)大小写转换:
<br>
都转为小写:
<br>
<code>
	Str.toLowerCase();
</code>
<br>
都转为大写:
<code>
	Str.toUpperCase();
</code>
<br>
大小写转换的应用:重名验证，邮箱验证，验证码，密码验证
3)获取指定位置字符:
<br>
<code>
	var char=str.charAt(index);
</code>
<br>
4)获取指定位置字符的Unicode编号:
<code>
	var num=str.charCodeAt(index);
</code>
<br>
5)查找关键字
<code>
	var index=str.indexOf("keyword");
</code>
<br>
	返回关键字所在位置，如果没找到，返回–1
	<br>
	特点:1.懒:只找第一个关键字位置
	<br>
	     2.蠢:默认只能从位置0开始

var index=str.p