---
layout:     post
title:      "JavaScript-String"
subtitle:   "js中的string总结"
date:       2017-08-05 19:51:00
author:     "xutaotao"
header-img: "img/post-bg-2017-8-30.jpeg"
tags:
    - JavaScript
---





#### String的创建

**1.创建原始类型字符串变量**

    var gender="man";
    var priceString=String(150,5);

**2.创建引用类型字符串对象**

    var carType=new String('');
    
* 注:字符串内容一旦创建，不可改变，如果修改，都要创建新字符串，保存新结果，替换旧字符串。*

#### 转义字符

代替字符串中的非打印字符。如果字符串内容中包含和语法冲突的特殊字符可用\转为普通字符。

#### 字符串的相关操作

**1.Str.length :返回Str字符串中的字符个数**

**2.大小写转换:**

都转为小写:

    Str.toLowerCase();
    
都转为大写:

    Str.toUpperCase();
    
大小写转换的应用:重名验证，邮箱验证，验证码，密码验证 3)获取指定位置字符:

    var char=str.charAt(index);
    
**3.获取指定位置字符的Unicode编号:** 

    var num=str.charCodeAt(index);
    
**4.查找关键字

*第一种：*

    var index=str.indexOf("keyword");
    
返回关键字所在位置，如果没找到，返回–1

特点:

1.懒:只找第一个关键字位置

2.蠢:默认只能从位置0开始 

*第二种：*

    var index=str.indexOf("keyword",from);

from:开始查找的位置，从from开始向后查找。

    var index=str.lastIndexOf("keyword",from);
    
from:从from开始向前查找

**5.获取子字符串**

*第一种：*

    var subStr=str.slice(start,end+1);
    
此方法可以从负数开始

*第二种：*

    substring(start,end+1);
    
此方法不可以用负数

*第三种：*

    sbustr(strart,count); 
    
* 注意：以上三种方法省略第二个参数时，默认都取到末尾*

**6.分割字符串**

    str.split("分割符"，count);

**7.按模式替换关键字**

    str.replace(reg,"新值");