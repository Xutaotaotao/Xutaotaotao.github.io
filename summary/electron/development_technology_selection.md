---
outline: deep
title: Electron生态开发技术选型
titleTemplate: Electron实战
---

# Electron生态开发技术选型

## 脚手架选型

关于脚手架的选择，其实也很多。

官方提供的有[Electron Forge](https://www.electronforge.io/)，[Electron Fiddle](https://www.electronjs.org/es/fiddle)，[electron-quick-start](https://github.com/electron/electron-quick-start)，其实如果你的应用不复杂，可以用官方的脚手架生成一个快速上手的模版，然后就可以愉快地开发了。

当然也有一些开源的脚手架，比如[electron-vue](https://github.com/SimulatedGREG/electron-vue)或[vue-cli-plugin-electron-builder](https://nklayman.github.io/vue-cli-plugin-electron-builder/)之类的，也可以让你快速的生成一个固定的模版，然后往里面填充你的内容。

个人认为，官方的脚手架工具可以用来尝鲜，学习使用，electron-vue这类工具，如果是在一个企业级的项目中使用，前期会给你带来便利，但是后期扩展不会太友好，另外就是他们是基于webpack构建的工具，在日常的开发和使用中会觉得编译得不够快（相对于Vite）。

另外就是如果你想自己完成一个项目脚手架（项目框架），完全可以凭借自己的经验或者参考开源项目的架构自己来完成一个脚手架，一来是为了更加了解Electron的构建原理，二来是可以在搭建项目的过程中去踩坑，总结经验，学习一门新的技术，我觉得很有必要自己来尝试造轮子，这样才能体会各种心酸历程。

所以我脚手架的选型就是自己来造一个Electron的项目架构，从package.json开始，用Vite+Electron+React构建一个Electron项目。

## HTTP模块选型

Electron发送HTTP请求的方案有很多。

第一种就是渲染进程和主进程分别用相应的请求HTTP请求工具来进行网络请求，比如渲染进程可以使用axios或者fetch,主进程用net模块。这种方案的优点就是可以把渲染进程和主进程的请求分开，各种分工明确，而且调试也方便，渲染进程可以直接看network；缺点就是，如果要对请求进行统一封装的话，比较麻烦。

第二种就是所有的请求统一封装，如果你都使用net模块或者其他的请求工具包对请求进行统一的封装，然后主进程直接使用，渲染进程调用统一的桥接方法。这种方案就是完全可以统一请求封装，但是如果想调试的请求的话，不方便，需要在主进程来日志信息。

第三种就是，直接axios直接一把梭，它既支持node环境，也支持浏览器环境。这种方案非常方便，你就按照之前封装Web应用请求的思路去封装自己的请求模块就行，不过需要注意跨域问题，在webPreferences中将webSecurity设置为false，不过Electron官方不推荐这么做，关于安全性的考虑可以参考（<https://www.electronjs.org/zh/docs/latest/tutorial/security##6-%E4%B8%8D%E8%A6%81%E7%A6%81%E7%94%A8-websecurity>）

对于上面的几种方案，各有各的优缺点，可以根据自己的场景需求来决定使用哪种方案。

## 本地数据库选型

Electron的本地数据存储方式也有很多种，可以直接读写文件，也可以用相关的库，方便数据管理。一些库的对比，详情：<https://www.npmtrends.com/electron-store-vs-lokijs-vs-lowdb-vs-nedb-vs-realm>

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db0eb0cebb8a473c94be3f09f22d2e80~tplv-k3u1fbpfcp-zoom-1.png)

综合来看[lowdb](https://github.com/typicode/lowdb)更胜一筹，所以选择lowdb做本地数据库，非常好的一点是它支持同步，不必担心数据没有写入就进行了下一步需要本地数据的业务操作。

## 日志工具选型

日志工具对Electron的开发也是尤为重要的，可以给你定位到一些表层无法定位的问题，所以一款好的日志工具对开发是非常有帮助的。

比较常见的日志工具就是[electron-log](https://github.com/megahertz/electron-log)和[log4js-node](https://github.com/log4js-node/log4js-node)，这两款日志工具我都有用过。可以看下npm的排行，这里把express-winston和logging也加上看一下，详情：<https://npmtrends.com/electron-log-vs-express-winston-vs-log4js-vs-logging>

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a6550b1659da43a9868d956a04b28f76~tplv-k3u1fbpfcp-zoom-1.png)

这里简单说一下[electron-log](https://github.com/megahertz/electron-log)和[log4js-node](https://github.com/log4js-node/log4js-node)的比较，两者上手都比较简单，log4js-node暴露的API 非常多，electron-log就稍显逊色了，另外最直观的感受就是，electron-log的日志文件路径不好找，暂时没发现自定义日志路径的方法，log4js-node有相应的方法，而且你可以自定义各种文件类型。

根据使用体验，觉得log4js-node更好，推荐log4js-node。

## 系统信息采集工具

在这里推荐一个node采集系统信息的工具库：**[systeminformation](https://github.com/sebhildebrandt/systeminformation)，** 为什么推荐这个库呢，第一是觉得它非常强大，用node把基本的你电脑的信息都能采集到，系统，进程，CPU等，如果开发过程中需要用到这些信息，这个库是一个很好的工具，它的底层其实是用很多命令行来获取信息的，但是它把夸端的问题都解决了，你不需要再进行额外的操作，如果你用它来学习一些命令行也是不错的选择。

## 构建工具选型

三种构建工具[electron-builder](https://github.com/electron-userland/electron-builder),[electron-forge](https://github.com/electron/forge) ,[electron-packager](https://github.com/electron/electron-packager) 对比一下

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5cfccd49c5bc4f078f7fbbfe1ad62228~tplv-k3u1fbpfcp-zoom-1.png)

从这个排行来看[electron-builder](https://github.com/electron-userland/electron-builder)的确很强，electron-forge最近又更新大的版本，不过没有尝鲜，我在[electron-builder](https://github.com/electron-userland/electron-builder)上倒是踩了不少坑，可以分享给大家。所以我在开发的时候选择的构建打包工具是[electron-builder](https://github.com/electron-userland/electron-builder)，它把整套解决方案都集成了，包括打包、更新、签名、分发，基本的钩子和配置都有相应的暴露。

## 总结

在开发一个项目的时候，技术选型还是很重要的，这里通过各种简单的比较，给了一些技术框架的选择，在实际的开发中可以根据情况进行相应的调整。确定了技术框架的选型，就可以开始搭建属于自己的项目了。
