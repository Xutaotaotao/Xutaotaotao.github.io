---
layout: 	post
title: 		"HTML实现canvas画板"
subtitle:   "杂碎笔记"
date: 		2018-02-28 17:42:33
author: 	"xutaotao"
header-img: "img/HTML5.png"
tags:
  - HTML
---

## 步骤及方法

### 1.首先建立canvas画板
    <canvas id="draw" width="800" height="800"></canvas>
<canvas> 元素创造了一个固定大小的画布，它公开了一个或多个渲染上下文，其可以用来绘制和处理要展示的内容。

### 2.渲染上下文
    const canvas = document.querySelector('#draw');
    const ctx = canvas.getContext('2d');

canvas起初是空白的。为了展示，首先脚本需要找到渲染上下文，然后在它的上面绘制。<canvas> 元素有一个叫做 getContext() 的方法，这个方法是用来获得渲染上下文和它的绘画功能。getContext()只有一个参数，上下文的格式,参数现在唯一的合法值为2d。
#### （1）document.querySelector()方法来为<canvas>元素得到DOM对象。

##### 返回值
返回文档中匹配指定的选择器组的第一个元素(使用深度优先先序遍历文档的节点 | 并且通过文档标记中的第一个元素，并按照子节点数量的顺序迭代顺序节点)。
##### 语法
    element = document.querySelector(selectors);
element 是一个 element 对象（DOM 元素）。
selectors 是一个字符串，包含一个或是多个 CSS 选择器 ，多个则以逗号分隔。
#### （2）getContext()方法来访问绘画上下文
##### 返回值
返回一个用于在画布上绘图的环境。
##### 语法
    Canvas.getContext(contextID)；
参数 contextID 指定了您想要在画布上绘制的类型。当前唯一的合法值是 "2d"，它指定了二维绘图，并且导致这个方法返回一个环境对象，该对象导出一个二维绘图 API。
提示：在未来，如果 <canvas> 标签扩展到支持 3D 绘图，getContext() 方法可能允许传递一个 "3d" 字符串参数。

### 3.初始画板

    //声明canvas画板的宽度和高度
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //strokeStyle属性设置笔触颜色
    ctx.strokeStyle = '#BADA55';
    //设置或返回两条线相交时，所创建的拐角类型为圆
    ctx.lineJoin = 'round';
    //设置或返回线条的结束端点样式为圆
    ctx.lineCap = 'round';
    //设置或返回当前的线条宽度
    ctx.lineWidth = 50;

    let isDrawing = false;
    //初始化起始点位置
    let lastX = 0;
    let lastY = 0;
    //初始HSL色彩模式的H值为0
    let hue = 0;
    let direction = true;

### 4.设置画笔的方法

    function draw(e){
        if(!isDrawing){
        return;
        }
        console.log(e);
        //利用HSL色彩模式设置触笔颜色
        ctx.strokeStyle = `hsl(${hue},100%,50%)`;
        // 起始一条路径
        ctx.beginPath();
        // 起始点
        ctx.moveTo(lastX,lastY);
        // 结束点
        ctx.lineTo(e.offsetX,e.offsetY);
        //绘制已定义的路径
        ctx.stroke();
        //更新lastX和lastY的值
        [lastX,lastY] = [e.offsetX,e.offsetY];

        // 因为H的值是从0到360的变化，超过360时恢复到0重新累加
        hue++;
        if(hue >= 360){
        hue = 0;
        }
    // 控制笔触的宽度在1到50之间
        if(ctx.lineWidth >= 50 || ctx.lineWidth <= 1){
        direction = !direction;
        }
        if(direction){
        ctx.lineWidth++;
        }else{
        ctx.lineWidth--;
        }
    }

### 5.给canvas添加监听事件

    canvas.addEventListener('mousedown',(e) => {
        isDrawing = true;
        [lastX,lastY] = [e.offsetX,e.offsetY];
    });

    canvas.addEventListener('mousemove',draw);
    canvas.addEventListener('mouseup',() => isDrawing = false);
    canvas.addEventListener('mouseout',() => isDrawing = false);