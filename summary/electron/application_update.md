---
outline: deep
title: 应用升级
titleTemplate: Electron实战
---

# 应用升级

## 前言

在Electron开发的过程中，升级流程也是一个很重要的环节，本文主要介绍升级开发的一些基本操作以及一些注意事项。

## electron-builder.config 配置

添加
```
publish: {
  provider: 'generic',
  url: "<http://127.0.0.1:8089/>"
}
```
`url`为你的升级文件存放的地址，必须要加`publish`的配置项，不然无法生成相应的`latest-mac.yml`文件

## 开发update服务

src/main/update/index.ts文件

```typescript
import { autoUpdater } from "electron-updater";
import logger from "@/log";
import { mainWindow } from "..";

// 定义更新链接地址
const updateUrl = 'http://127.0.0.1:8089'

// 设置日志输出
autoUpdater.logger = logger;

// 初始化更新
export const initUpadate = () => {  
  autoUpdater.forceDevUpdateConfig = true // 强制使用开发环境进行更新
  autoUpdater.autoDownload = true // 设置自动下载更新
  autoUpdater.setFeedURL(updateUrl) // 设置更新地址
  autoUpdater.checkForUpdates(); // 检查更新
  autoUpdater.checkForUpdatesAndNotify() // 检查更新并通知

  // 注册更新过程中的各种事件
  autoUpdater.on("error", function (error:Error) {
    printUpdaterMessage('error')
    console.log(error)
  });
  
  autoUpdater.on("checking-for-update", function () {
    printUpdaterMessage('checking-for-update')
  });
  
  autoUpdater.on("update-available", function (info) {
    printUpdaterMessage('update-available')
    logger.info(info)
  });
  
  autoUpdater.on("update-not-available", function (info) {
    printUpdaterMessage('update-not-available')
    logger.info(info)
  });
  
  autoUpdater.on("download-progress", function (info) {
    printUpdaterMessage('download-progress')
    logger.info(info)
  });
  
  autoUpdater.on("update-downloaded", function (info) {
    printUpdaterMessage('update-downloaded')
    setTimeout(() => {
      // 触发更新/向渲染进程发消息
      mainWindow.webContents.send("app-update-downloaded", true);
    },3000)
    logger.info(info)
  });
}

// 打印更新过程中的消息
function printUpdaterMessage(key:string) {
  let message:any = {
    'error': "更新出错",
    'checking-for-update': "正在检查更新",
    'update-available': "检测到新版本",
    'download-progress': "下载中",
    'update-not-available': "无新版本",
    'update-downloaded': "新版本下载完成"
  };
  logger.info("printUpdaterMessage", message[key])
}

// 安装更新
export const intsallUpdateApp = () => {
  logger.info('update','intsallUpdateApp')
  autoUpdater.quitAndInstall() // 退出并安装更新
}

```

在这里我们需要强制使用开发环境进行更新，开启forceDevUpdateConfig，这样可以在开发环境验证其效果。不过本地开发环境只能验证所有的生命周期，不能真正的安装，因为需要验证你的程序签名，所以验证安装

src/main/index.ts文件注入升级服务

```typescript
    app.whenReady().then(() => {
      createWindow();
      creatMenu();
      initIpc(mainWindow, workWindow);
      app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
      });
      // 升级服务
      initUpadate()
    });
```

## 添加ipc通信

src/main/ipc/index.ts

```typescript
    ipcMain.handle('intsallUpdateApp',() => {
        intsallUpdateApp()
      })
```

src/preload/index.ts

```typescript
    intsallUpdateApp: () => {
        ipcRenderer.invoke('intsallUpdateApp')
    }
```

## 渲染进程提醒通知

```typescript
    useEffect(() => {
        window.nativeBridge.onAppUpdateDownloaded((e: any, value: any) => {
          console.log(e, value);
          if (value) {
            Modal.confirm({
              title: "提示",
              content: "新版本已经下载完成，去更新吧",
              okText: "确定",
              cancelText: "取消",
              onOk: () => {
                window.nativeBridge.intsallUpdateApp();
              },
            });
          }
        });
      }, []);
```

![png.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0729ccab22af41d68b32049f4754b0c7~tplv-k3u1fbpfcp-watermark.png?)

## 小技巧

你可以使用live-server工具<https://www.npmjs.com/package/live-server>，本地起一个文件存储服务，这样就可以本地测试更新了。
```
    npm i live-server
```
进入你存放更新的目录
```
    live-server ./ --port=8089
``` 
即可获得一个本地存储文件服务来验证更新

![png.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2efae90a69e74721a1c51b898e3d8f1f~tplv-k3u1fbpfcp-watermark.png?)

到这里基本的核心更新逻辑就完成了。