---
layout:     post
title:      "Angular+ionic+cordova实现天气App"
subtitle:   "Ionic"
date:       2018-6-6 21:21
author:     "xutaotao"
header-img: "img/book.jpeg"
tags:
  - Angular
---

**开发环境及工具**
参考教程：Cordova+Vue实现Android APP开发中的环境配置（https://www.jianshu.com/p/fd7448e2985a）

**Angular，ionic，cordova版本**
angualr@5.0.0
ionic@3.16.0
cordova@8.0.0

### 创建项目
1.安装ionic和cordova CLI
 `npm install -g ionic@3.16.0 cordova`
不建议安装最新版的ionic，经过测试有些未知bug
2.生成项目
`ionic start iweather tabs`
tabs为可选项，若不输入tabs命令行会提示安装你想要的app布局。
3.用浏览器运行项目
`cd iweather`
`ionic serve`
运行成功浏览器会出现如下界面![Hello Ionic.png](https://upload-images.jianshu.io/upload_images/8108267-8509760c94629052.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

到这里基本的开发环境都搭建好了，现在开始开发程序。

**开发之前请在阿里云申请天气服务API，天气图片可以通过墨迹天气官方网站抓取数据，并封装成自己的天气服务API。**

### 项目需求及预览效果
**1.显示城市天气情况**
**2.查询全国各地天气**
![预览1.jpg](https://upload-images.jianshu.io/upload_images/8108267-6b80023539089a04.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![预览2.jpg](https://upload-images.jianshu.io/upload_images/8108267-af2ca910fb60635b.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![预览3.jpg](https://upload-images.jianshu.io/upload_images/8108267-02f04fcda87396e9.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

开发三个页面主页，关于，设置，主页面显示天气信息，关于页面显示开发者信息，设置页面通过设置城市名称获取不同城市的天气。

本次主要任务是首页和设置页面的开发以及天气服务数据的开发

### 天气服务数据开发
之所以先开发天气服务数据，是因为首页的数据都依赖于天气服务数据。
**用ionic命令行创建一个获取天气的http服务**
`ionic g provider weather`
创建此服务需要以下几步：
1.引入`HttpClient, HttpHeaders`两个模块，实现获取天气数据的http服务
2.使用 Injectable 装饰器，该服务需要在其他使用此服务的构造函数中注入依赖对象。
3.获取天气的相关数据
![weather.ts](https://upload-images.jianshu.io/upload_images/8108267-1ced46f7d4c8fde1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
此时获取天气的数据服务就完成了,数据获取完毕后就需要将数据渲染到页面上。
### APP首页开发
首页需要显示当前城市的天气数据，包括城市，天气图标，温度，风向等信息。
**用ionic命令行创建一个首页页面。**
`ionic g page home`
构建此页面需要以下几步
1.页面布局的开发。
2.页面数据的展示。
3.页面数据的控制。
页面布局使用ionic提供的UI组件进行布局，页面数据展示主要通过插值表达式显示数据，对页面的数据进行控制主要在angualr的控制器中进行控制。
在`home.html`里面进行代码编写展示组件代码，和HTML标签一样，你也可以理解为一个个ionic封装好的UI组件,使用非常方便。具体参考文档（https://ionicframework.com/docs/components/#overview）这里面基本包括了一些常用的页面控件。（代码：https://github.com/Xutaotaotao/ionic_weather/blob/master/src/pages/home/home.html）
在`home.sass`里面编写页面样式代码来控制页面样式。这部分代码较为简单就不做相应的展示，最后会附上github地址。
在`home.ts`里面编写代码进行对展示数据的控制。
控器主要实现对页面数据进行初始化，根据设置界面设置的城市名从新渲染主页的数据，获取设置城市名通过本地存储的方式获取，以便第二次进入App还是设置时的城市数据。
```
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// 引入WeatherProvider服务
import { WeatherProvider } from '../../providers/weather/weather';
// 引入数据存储
import { Storage } from '@ionic/storage'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // 定义控制器中需要用到的数据及类型
  weatherResult:any;
  weather:any
  weatherImg:string;
  location:{
    city:string,
  };
  // 使用构造注入的方式注入依赖对象
  constructor(
    public navCtrl: NavController,
    private weatherProvider:WeatherProvider,
    private storage:Storage
  ){}
  // 初始化视图数据
  ionViewWillEnter(){
    // 获取本地储存的数据并根据城市名称初始化城市数据
    this.storage.get('location').then((val) => {
      // 如果本地储存的数据不为空
      if(val != null){
        this.location = JSON.parse(val);
      }else{
        this.location = {
          city:'北京',
        }
      }
      // 用天气服务获得当前城市的天气数据
      this.weatherProvider.getWeather(this.location.city)
        .subscribe(weatherResult => {
         this.weatherResult = weatherResult;
         // 天气对象
         this.weather = this.weatherResult.result;
         // 天气图片使用墨迹天气的链接拼接imgurl
         this.weatherImg = 'http://www.moji.com//templets/mojichina/images/weather/weather/w'+this.weather.img+".png";
        }
      )
    })
  }
}
```
### 关于页面开发
**用ionic命令行创建一个关于页面。**
`ionic g page about`
关于页面不涉及逻辑，直接贴代码
```
<!-- 头部 -->
<ion-header>
  <ion-navbar>
    <ion-title>
      关于
    </ion-title>
  </ion-navbar>
</ion-header>

<!-- 页面主体 -->
<ion-content padding>
  <ion-grid>
    <ion-row>
      <ion-col width-100>
        <ion-list>
          <ion-item>
            <strong>应用名称：</strong>涛焘的天气
          </ion-item>
          <ion-item>
            <strong>应用版本：</strong>1.0.0
          </ion-item>
          <ion-item>
            <strong>应用描述：</strong>一个简单的天气
          </ion-item>
        </ion-list>
      </ion-col>
    </ion-row>
  </ion-grid>
</ion-content>
```
### 设置页面开发
**用ionic命令行创建一个设置页面。**
`ionic g page setting`
设置页面的主要功能是设置城市的名称并将设置值存储到本地。

- 设置界面UI控件
主要就是一个输入框和提交按钮
通过表单提交的方式将数据保存在本地存储数据中。

```
<ion-header>
  <ion-navbar>
    <ion-title>设置</ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <ion-grid>
    <ion-row>
      <ion-col width-100>
        <form (ngSubmit)="saveFrom()">
          <ion-item>
            <ion-label fixed>
              城市
            </ion-label>
            <ion-input [(ngModel)]="city" name="city" type="text">   
            </ion-input>
          </ion-item>
          <button ion-button type="submit" class="ion">保存更改</button>            
        </form>
      </ion-col>
    </ion-row>
  </ion-grid>
</ion-content>

```

- 设置组件的控制器


```
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// 引入数据存储
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home'

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  // 初始城市数据类型
  city:string;
  // 使用构造注入的方式注入依赖对象
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage:Storage) {
      // 获取本地储存的数据并根据城市名称初始化城市数据，和主页逻辑一样
      this.storage.get('location').then((val) => {
        if(val != null){
          let location = JSON.parse(val);
          this.city = location.city;
        }else{
          this.city = "北京";
        }
      })
  }
  // 模板中form表单绑定的saveFrom方法
  saveFrom(){
    let location = {
      city:this.city,
    }
     // 保存输入框的数据到本地存储中
    this.storage.set('location',JSON.stringify(location));
    // 设置提交后返回主页
    this.navCtrl.push(HomePage)
  }
}
```

到这里，一个简单的天气APP就完成了。通过此实例你可以学习到，ionic基本的UI控件使用，以及angualr创建一个服务实例的基本过程。

如果需要生成APP
执行一下命令

- Android APP

`ionic cordova platform add android`

`ionic cordova build android`

- IOS APP

`ionic cordova platform add ios`

`ionic cordova build ios`

项目Demo的Github地址：https://github.com/Xutaotaotao/ionic_weather

