---
layout: 	post
title: 		"js代码片段"
subtitle:   "一些杂碎笔记"
date: 		2017-09-21 13:42:33
author: 	"xutaotao"
header-img: "img/post-bg-js-version.jpg"
tags:
  - JavaScript
---


// 1.删除数组中与指定数值相等的元素

	a = [1,2,3,4,5,7,8,7,7]
	function removeWithoutCopy(arr, item) {
		for(var i=0;i<arr.length+1;i++){
	        if(arr[i]==item){
				arr.splice(i,1);
				i--;	//此处的i--不能省略，删除一个就少了一个，所以要i--.
	        }
	    }
	    return arr;
	}
	 var b = removeWithoutCopy(a,7);
	 console.log(b);

 //2.给数组添加新的元素，不改变原数组

	function append(arr, item) {
		var newArr = arr.slice(0);
	    newArr.push(item);
	    return newArr;   
	}
	var c = append(a,9);
	console.log(c);

//3.找出数组arr中重复出现过的元素

	var d=[1,2,3,4,2,5,7,9,7]
	function duplicates(arr){
		var result = [];
		arr.forEach(function(elem){
			if (arr.indexOf(elem) != arr.lastIndexOf(elem) && result.indexOf(elem) == -1) {
				result.push(elem)
			}
		});
		return result;
	}
	duplicates(d);
	console.log(duplicates(d));


//4.实现一个打点计时器，要求

1)从 start 到 end（包含 start 和 end），每隔 100 毫秒 console.log 一个数字，每次数字增幅为 1

2)返回的对象中需要包含一个 cancel 方法，用于停止定时操作

3)第一个数需要立即输出


	function count(start, end) {
		console.log(start++);
	    	var timer = setInterval(function(){
	            if(start <= end){
	                console.log(start++);
	            }else{
	                clearInterval(timer);
	            }
	        },100);
	    return{
	        cancel:function(){
	            clearInterval(timer);
	        }
	    };
	}

	function insert_data_to_array( array_a ,insert_index, array_b)
	{
	    //在这里写入代码
	    for (var i = 0; i < array_b.length; i++) {
	        array_a.splice(insert_index,0,array_b[i]);
	        insert_index++;
	    }
	    return array_a;
	}
	var A=[1,4,5,7,9];
	var B=[2,3];
	console.log(insert_data_to_array(A,1,B)) ;

	// 将数组 arr 中的元素作为调用函数 fn 的参数
	function argsAsArray(fn, arr) {
	    return fn.apply(this,arr);
	}



// 5.创建一个可执行对象.既可以当作对象来使用（有原型链），也可以当作函数来直接调用.
	function SuperRobot(data) {
	    var say = function() { return "Hello World!"; };
	    say.__proto__ = data.age;
	    return say;
	}

	var data = { name:"atom", age: 5};
	var super_robot = SuperRobot(data);

	console.log(super_robot());         //Hello World!
	console.log(super_robot.age);       //5
	console.log(typeof super_robot);    //function









