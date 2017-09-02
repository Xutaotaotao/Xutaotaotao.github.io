---
title: 重学CSS-圆角，投影，不透明度，图像替换
date: 2017-07-17T22:59:46+00:00
author: xutaotao
layout: post
categories:
  - 前端日记
tags:
  - css
---
**创建圆角框的几种方法**

1.创建固定宽度的圆角框。

  * 需要两个图像，一个底部曲线图像用于框的底部，一个顶部曲线图像用于框的顶部。此方法对于单色而且没有边框的简单框是有效的。
  * /\*box1\*/
  
    .box1{
  
    width: 418px;
  
    background: #effce7 url(../img/bottom.gif) no-repeat left bottom;
  
    padding-bottom: 1px;
  
    }
  
    .box1 h2{
  
    background: url(../img/top.gif) no-repeat left top;
  
    margin-top: 0;
  
    padding: 20px 20px 0 20px;
  
    }
  
    .box1 p{
  
    padding: 0 20px;
  
    }
  * 上述方法改进：使用相同的方式，不在框上设置背景颜色，而是设置一个重复显示的背景图像。然后将底部曲线图像应用到另一个元素上。特点：因为框未设置高度，所以它会随着文本尺寸的增加进行垂直扩展。
  * /\*box2\*/
  
    .box2{
  
    width: 424px;
  
    background: url(../img/tile2.gif) repeat-y;
  
    }
  
    .box2 h2{
  
    background: url(../img/top2.gif) no-repeat left top;
  
    padding-top: 20px;
  
    }
  
    .box2 .last{
  
    background: url(../img/bottom2.gif) no-repeat left bottom;
  
    padding-bottom: 20px;
  
    }
  
    .box2 h2, .box2 p{
  
    padding-left: 20px;
  
    padding-right: 20px;
  
    }

2.滑动门技术。

  * 需要四个图像，两个顶部图像组成顶部曲线，两个底部图像组成底部曲线和框的主体，底部图像的高度必须与框的最大高度相同。
  * /\*box3\*/
  
    .box3{
  
    width: 20em;
  
    background: #effce7 url(../img/bottom-left.gif) no-repeat left bottom;
  
    }
  
    .box-outer1{
  
    background: url(../img/bottom-right.gif) no-repeat right bottom;
  
    padding-bottom: 1em;
  
    }
  
    .box-inner1{
  
    background: url(../img/top-left.gif) no-repeat left top;
  
    }
  
    .box3 h2{
  
    background: url(../img/top-right.gif) no-repeat right top;
  
    padding-top: 1em;
  
    font-size: 30px;
  
    }
  
    .box3 h2, .box3 p{
  
    padding-left: 1em;
  
    padding-right: 1em;
  
    }

3.山顶角。

  * 不用创建有颜色的角图像，而是创建曲线形的位图角蒙板，主框div添加背景颜色。
  * 缺点：添加太多非语义性标记。
  * /\*box4\*/
  
    .box4{
  
    width: 20em;
  
    background: #effce7 url(../img/bottom-left.gif) no-repeat left bottom;
  
    }
  
    .box-outer2{
  
    background: url(../img/bottom-right.gif) no-repeat right bottom;
  
    padding-bottom: 5%;
  
    }
  
    .box-inner2{
  
    background: url(../img/top-left.gif) no-repeat left top;
  
    }
  
    .box4 h2{
  
    background: url(../img/top-right.gif) no-repeat right top;
  
    padding-top: 5%;
  
    }
  
    .box4 h2, .box4 p{
  
    padding-left: 5%;
  
    padding-right: 5%;
  
    }
  * 改进：用css3实现多个背景图像。
  * /\*box5\*/
  
    .box5 {
  
    width: 30em;
  
    background: #89ac11 url(../img/mtop-left.gif) left top no-repeat;
  
    color: #fff;
  
    padding: 2em 2em 1em 2em;
  
    margin-top: 2em;
  
    }</p> 
    .box5 h2 {
  
    margin-top: 0;
  
    font-size: 1.6em;
  
    }
  
    .box5{
    
    background-image: url(../img/mtop-left.gif),url(../img/mtop-right.gif),url(../img/mbottom-left.gif),url(../img/mbottom-right.gif);
  
    background-repeat: no-repeat,no-repeat,no-repeat,no-repeat;
  
    background-position: top left,top right,bottom left,bottom right;
  
    }</li> </ul> 
    
    4.border-radius。
    
      * 设置边框角半径。
      * /\*box6\*/
  
        .box6 {
  
        width: 30em;
  
        background-color: #89ac11;
  
        color: #fff;
  
        padding: 2em 2em 1em 2em;
  
        margin-top: 2em;
  
        }
  
        .box6 h2 {
  
        margin-top: 0;
  
        font-size: 1.6em;
  
        }
  
        .box6{
  
        -moz-border-radius:1em;
  
        -webkit-border-radius:1em;
  
        border-radius: 1em;
  
        }
    
    5.border-image。
    
      * 背景图像为有四边曲线的图像，图像平铺。
      * .box7 {
  
        width: 30em;
  
        background-color: #89ac11;
  
        color: #fff;
  
        padding: 2em 2em 1em 2em;
  
        margin-top: 2em;
  
        }
  
        .box7 h2 {
  
        margin-top: 0;
  
        font-size: 1.6em;
  
        }
  
        .box7{
  
        -webkit-border-image:url(../img/corners.gif) 25% 25% 25% 25% / 25px round ;
  
        }
    
    **投影方法**
    
    1.简单投影。
    
      * 将一个大的投影图像应用于容器div的背景，然后使用负的外边距偏移此图像，从而显示出投影。
      * /\*shadow1\*/
  
        .img-wrapper1{
  
        background: url(../img/shadow.gif);
  
        clear: right;
  
        float: left;
  
        }
  
        .img-wrapper1 img{
  
        background-color: #fff;
  
        border: 1px solid #a9a9a9;
  
        padding: 4px;
  
        margin:-5px 5px 5px -5px;
  
        }
    
    2.clagnut投影法。
    
      * 与上一方法相似，但是使用相对定位来偏移图像。
      * /\*shadow2\*/
  
        .img-wrapper2{
  
        background: url(..img/shadow.gif) no-repeat bottom right;
  
        float: left;
  
        line-height: 0;
  
        }
  
        .img-wrapper2 img{
  
        background: #fff;
  
        padding: 4px;
  
        border: 1px solid #a9a9a9;
  
        position: relative;
  
        left:-5px;
  
        top:-5px;</p> 
        }</li> </ul> 
        
        3.box-shadow方法。
        
          * /\*shadow3\*/
  
            .img-wrapper3 img{
  
            -webkit-box-shadow:3px 3px 6px #666;
  
            -moz-box-shadow:3px 3px 6px #666;
  
            box-shadow: 3px 3px 6px #666;
  
            }
        
        **不透明度**
        
        1.css不透明度。
        
          * .box {
  
            background-color: #000;
  
            opacity: 0.8;
  
            filter: alpha(opacity=50); /\*proprietary IE code\*/
  
            }
          * 缺点：除对背景生效外，应用它的元素的内容也会继承它。
        
        2.RGBa。
        
          * .box {
  
            background-color: rgba(0,0,0,0.8);
  
            }
        
        3.png透明度。
        
          * png的最大优点是png格式支持alpha透明度。
          * 稍微麻烦，每个透明png都要复用代码。
        
        **图像替换**
        
        1.FIR。
        
          * 把要替换的文本放在span标签中，然后将要替换的图像作为背景图像应用于标题元素，然后span的display设为none。
        
        2.Phark。
        
          * 将标题进行非常大的扶植文本缩进。
        
        3.SIRF。
        
        &nbsp;
        
        &nbsp;