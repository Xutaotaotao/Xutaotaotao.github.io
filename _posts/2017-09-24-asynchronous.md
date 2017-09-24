---
layout: 	post
title: 		"js代码片段二"
subtitle:   "一些杂碎笔记"
date: 		2017-09-24 13:42:33
author: 	"xutaotao"
header-img: "img/post-bg-js-version.jpg"
tags:
  - JavaScript
---


### 什么是异步

	console.log(100);
	setTimeout(function() {
	    console.log(200);
	}, 1000);
	console.log(300);

### 对比同步

	console.log(100);
	alert(200);
	console.log(300);

### 何时需要异步

1)在可能发生等待的情况

2）等待过程中不能像alert一样阻塞程序运行

3）因此，所有的“等待的情况”都需要异步



### 前端使用异步的场景

1）定时任务：setTimeout,setIneverval
2）网络请求：ajax请求，动态`<img>`加载
3）事件绑定


**ajax请求代码示例**

	console.log("start");
	$.get("./data1.json", function(data1) {
	    console.log(data1);
	});
	console.log("end");

**`<img>`加载示例**

	console.log("start");
	var img = doucument.createElement("img");
	img.onload = function() {
	    console.log("loaded");
	}
	img.src = "/xxx.png";
	console.log("end");

**事件绑定示例**

	console.log("start");
	doucument.getElementById('btn1').addEventListener('click', function() {
	    alert("click")
	});
	console.log("end");

**异步和单线程**

	console.log(100);
	setTimeout(function() {
	    console.log(200);
	});
	console.log(300);

上述程序执行过程

1）执行第一行，打印100

2）执行setTimeout后，传入setTimeout的函数会被暂存起来，不会立即执行

3）执行最后一行，打印300

4）待所有程序执行完，处于空闲状态时，会立马看有没有暂存起来的要执行

5）发现暂存起来的setTimeout中的函数无需等待时间，就立即执行


### 同步和异步的区别是什么

同步会阻塞代码执行，而异步不会

alert是同步，setTimeout是异步


### 一个关于setTimeout的笔试题
console.log(1);
setTimeout(function() {
    console.log(2);
}, 0);
console.log(3);
setTimeout(function() {
    console.log(4);
}, 1000);
console.log(5);

### 日期API

	Date.now(); //获取当前时间毫秒数
	var dt = new Date();
	dt.getTime(); //获取毫秒数
	dt.getFullYear(); //年
	dt.getMonth(); //月（0——11）
	dt.getDate(); //日（0-31）
	dt.getHours(); //小时（0——23）
	dt.getMinutes(); //分钟（0-59）
	dt.getSeconds(); //秒（0-59）

### 数组API

1）forEach 遍历数组所有的元素

2）every 判断所有元素是否都符合条件

3）some 判断是否有至少一个元素符合条件

4）sort 排序

5）map 对元素重新组装，生成新数组

6）filter 过滤符合条件的元素


**forEach**

	var arr = [1, 2, 3];
	arr.forEach(function(item, index) {
	    console.log(index, item); //item是数组中的元素，index是数组中元素的位置,item和index不能交换位置
	});

**every**

	var arr = [0, 1, 2];
	var result = arr.every(function(item, index) {
	    //用来判断所有的数组元素，都满足一个条件
	    if (item < 4) {
	        return true;
	    }
	});
	console.log(result);

**some**

	var arr = [1, 2, 3];
	var result = arr.some(function(item, index) {
	    //用来判断所有的数组元素，只要有一个满足条件即可
	    if (item < 2) {
	        return true;
	    }
	});
	console.log(result);

**sort**

	var arr = [1, 4, 2, 3, 5];
	var arr2 = arr.sort(function(a, b) {
	    //从小到大排序
	    return a - b;

	    //从大到小排序
	    // return b-a;
	});

**map**

	var arr = [1, 2, 3, 4];
	var arr2 = arr.map(function(item, index) {
	    //将元素重新组装，并返回。
	    return "<b>" + item + "</b>";
	});
	console.log(arr2);

**filter**

	var arr = [1, 2, 3];
	var arr2 = arr.filter(function(item, index) {
	    if (item >= 2) {
	        return true;
	    }
	});
	console.log(arr2);


### 对象API

	var obj = {
	    x: 100,
	    y: 200,
	    z: 300
	}
	var key;
	for (key in obj) {
	    if (obj.hasOwnProperty(key)) {
	        console.log(key, obj[key]);
	    }
	}

###  获取yyyy-mm-dd的日期格式

	function formatDate(dt) {
	    if (!dt) {
	        dt = new Date();
	    }
	    var year = dt.getFullYear();
	    var month = dt.getMonth();
	    var date = dt.getDate();
	    if (month < 10) {
	        month = "0" + month;
	    }
	    if (date < 10) {
	        date = "0" + date;
	    }
	    return year + "-" + month + "-" + date;
	}
	var dt = new Date();
	var formatDate = formatDate(dt);
	console.log(formatDate);

### 获取随机数，要求是长度一直的字符串格式
	var random = Math.random();
	var random = random + "0000000000";
	var random = random.slice(0, 10);
	console.log(random);

### 写一个能够遍历对象和数组的forEach函数

	function forEach(obj, fn) {
	    var key;
	    if (obj instanceof Array) {
	        //准确判断是不是数组
	        obj.forEach(function(item, index) {
	            fn(index, item);
	        });
	    } else {
	        for (key in obj) {
	            fn(key, obj[key]);
	        }
	    }
	}
	// 使用
	var arr = [1, 2, 3];
	// 注意:下面的参数顺序和原本的forEach调换了位置,为了和对象的遍历格式一致
	forEach(arr, function(index, item) {
	    console.log(index, item);
	});

	var obj = { x: 100, y: 200 };
	forEach(obj, function(key, value) {
	    console.log(key, value);
	});