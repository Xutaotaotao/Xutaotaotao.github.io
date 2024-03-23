---
outline: deep
title: Electron跨进程通信
titleTemplate: Electron实战
---
# Electron跨进程通信

## 前言

进程间通信 (IPC) 是在 Electron 中构建功能丰富的桌面应用程序的关键部分之一。

在日常的开发中，Electron的跨进程通信是经常会用到的，一般包括几种情况，**渲染进程向主进程发送消息** **，** **主进程向渲染进程发送消息，不同渲染进程间的通信。**

在实现进程通信的方法之前，我们需要先了解一下Electron的上下文隔离。这里就不做过多的解释了，Electron的官方网站有相应的解释：<https://www.electronjs.org/zh/docs/latest/tutorial/context-isolation>

了解上下文隔离主要是为了在开始进行跨进程通信之前实现preload脚本打下基础，不然不会了解[Electron中的流程模型](https://www.electronjs.org/zh/docs/latest/tutorial/process-model#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E6%98%AF%E4%B8%80%E4%B8%AA%E5%8D%95%E4%B8%80%E7%9A%84%E8%BF%9B%E7%A8%8B)，这些知识点都是一个个窜起来的，所以在开始之前都学习了解一下总没有坏处，后面实现跨进程通信思路就清晰了。

下面我们就一个个实现相应的通信场景，在实现之前，我们需要先实现**预加载脚本**。

## 预加载脚本实现

默认情况下，渲染器进程没有权限访问 Node.js 和 Electron 模块。 作为应用开发者，您需要使用 `contextBridge` API 来选择要从预加载脚本中暴露哪些 API，可以理解为它是一个渲染进程和原生模块的桥接。我们在`scr/preload`中添加`index.ts`文件，暴露一个简单的打开默认浏览器的方法

```ts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('nativeBridge', {
  openUrlByDefaultBrowser: (url:string) => ipcRenderer.send('openUrlByDefaultBrowser', url)
})

```

另外我们还需要在`src/main/index.ts`中添加如下代码

```ts
preload: join(__dirname, "../preload/index.js")
```

现在整体目录如下

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31cfa95604fe41a4b9dfe4ba8800efb4~tplv-k3u1fbpfcp-zoom-1.png)

启动开发环境你会发现以下错误

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4340125f71af4b07a975140e44184465~tplv-k3u1fbpfcp-zoom-1.png)

因为启动开发环境后，Electron进程读取的build后的目录，所以我们需要对`preload`目录做`build`处理，先前我们已经构建过渲染进程和`main`进程了，`preload`开发环境的build其实也是类似的思路，配置`config/vite/preload.js`文件，在`scripts/dev.js`脚本中做相应的构建方法。

`config/vite/preload.js`

```js
import { builtinModules } from 'module'
import path from "path";

const config = {
  root: process.cwd(),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../../src"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "../../dist/preload"),
    minify: false,
    target: `node16`,
    lib: {
      entry: path.resolve(__dirname, '../../src/preload/index.ts'),
      formats: ['cjs']
    },
    rollupOptions: {
      external: ['electron',...builtinModules],
      output: {
        entryFileNames: '[name].cjs',
      },
    },
    emptyOutDir: true,
    brotliSize: false,
    chunkSizeWarningLimit: 2048,
  },
};
export default config;

```

`scripts/dev.js`

```js
const preloadDev = {
  async createRenderServer(viteDevServer) {
    const options = {
      ...sharedOptions,
      configFile: path.resolve(__dirname, "../config/vite/preload.js"),
    };
    return build({
      ...options,
      plugins: [
        {
          name: 'reload-page-on-preload-package-change',
          writeBundle() {
            viteDevServer.ws.send({
              type: 'full-reload',
            })
          },
        },
      ],
    });
  },
}

const initDev = async () => {
  try {
    const renderDevServer = await renderDev.createRenderServer();
    await preloadDev.createRenderServer(renderDevServer)
    await mainDev.createMainServer(renderDevServer);
  } catch (err) {
    console.error(err);
  }
};

initDev();
```

***

注意这里由于改造了文件的输出格式为cjs，所以在 `src/main/index.ts`中也要改造一下代码 

```ts
preload: join(__dirname, "../preload/index.cjs")
```

到这里`preload`加载脚本就完成了。

## 渲染进程向主进程发送消息

这里会有两种情况，单向通信和双向通信。我们以此用一个简单的例子来演示相应的实现。

### 单向通信

一个简单的需求，点击渲染进程上的按钮打开默认浏览器。

在预加载脚本实现的时候我们已经在`preload`中注入了`openUrlByDefaultBrowser`这个方法，现在我们可以从渲染层出发逐级向下让Electron触发打开浏览器的行为。

我们在`src/render/App.tsx`中

添加如下代码

```tsx
const openUrlByDefaultBrowser = () => {
    window.nativeBridge.openUrlByDefaultBrowser("https://www.baidu.com");
};

<button onClick={openUrlByDefaultBrowser}>openUrlByDefaultBrowser</button>
```

这里的`window.nativeBridge.openUrlByDefaultBrowser`就是我们渲染层调用preload的暴露出来的方法的方式，当渲染层触发这个方法后，preload就会发送一个`openUrlByDefaultBrowser`的消息给主进程，主进程用`ipcMain.on`接受消息，然后触发相应的调用方法，整个单向通信的流程就结束了。

`src/main/index.ts`

```ts
const openUrlByDefaultBrowser = (e:IpcMainEvent, args: any) => {
  shell.openExternal(args)
}

app.whenReady().then(() => {
  createWindow()
  ipcMain.on('openUrlByDefaultBrowser', openUrlByDefaultBrowser)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
```

### 双向通信

分三步

preload中添加一个`communicateWithEachOtherSendMsg`,然后监听`communicateWithEachOtherReply`

```ts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('nativeBridge', {
  openUrlByDefaultBrowser: (url:string) => ipcRenderer.send('openUrlByDefaultBrowser', url),
  communicateWithEachOtherSendMsg: (msg: string) => ipcRenderer.send('communicateWithEachOtherSend',msg)
})

ipcRenderer.on('communicateWithEachOtherReply', (_event, arg) => {
  console.log(arg)
})
```

在主进程中`main/index.ts`中监听发来的消息并处理

```ts
ipcMain.on('communicateWithEachOtherSend', (event, arg) => {
    event.reply('communicateWithEachOtherReply', `I got ${arg},ok`)
  })
```

界面上触发

```tsx
const communicateWithEachOtherSendMsg = () => {
   window.nativeBridge.communicateWithEachOtherSendMsg("Hello");
};
<button onClick={communicateWithEachOtherSendMsg}>
  communicateWithEachOtherSendMsg
</button>
```

当然如果这里要细分的话，其实应该分为三种情况：

#### 渲染进程 => 主进程（异步）

上面我们演示的就是异步的通信场景

#### 渲染进程 => 主进程（同步）

```js
// preload
communicateWithEachOtherSendMsgSendSync: (msg: string) =>
  ipcRenderer.sendSync("communicateWithEachOtherSendSync", msg)
```

```ts
// 主进程
ipcMain.on("communicateWithEachOtherSendSync", (event, arg) => {
    event.returnValue = `I got ${arg},ok`
  });

```

```js
// 渲染进程
const communicateWithEachOtherSendMsgSendSync = () => {
   const msg = window.nativeBridge.communicateWithEachOtherSendMsgSendSync("Hello sync");
   console.log(msg)
  }

```

#### 渲染进程 => 主进程（Promise）

```js
// preload
co#mmunicateWithEachOtherSendMsgPromise: (msg: string) =>
   ipcRenderer.invoke('communicateWithEachOtherSendPromise',msg)
```

```ts
// 主进程
ipcMain.handle("communicateWithEachOtherSendPromise",async (event, arg) => {
    return `I got ${arg},ok`
  });
```

```js
// 渲染进程
const communicateWithEachOtherSendMsgPromise = () => {
    window.nativeBridge.communicateWithEachOtherSendMsgPromise("Hello Promise").then((msg:any) => {
      console.log(msg)
    })
  }

```

## 主进程向渲染进程发送消息

我们现在做一个小功能来演示这个发送消息的过程，在menu上点击一个按钮让渲染进程的数据变化。

主进程

```ts
const menu = Menu.buildFromTemplate([
  {
    label: app.name,
    submenu: [
      {
        click: () => {
          mainWindow.webContents.send("update-counter", 1);
        },
        label: "IncrementNumber",
      },
    ],
  },
]);

Menu.setApplicationMenu(menu);
```

preload中添加一个监听方法

```js
onUpdateCounterByMain: (callback: any) => {
    ipcRenderer.on("update-counter", (e, value) => {
      callback(e, value);
    });
  },
```

渲染进程中获取数据并改变页面上的数据

```tsx
useEffect(() => {
    window.nativeBridge.onUpdateCounterByMain((e: Event, value: any) => {
      setCount((pre) => {
        return pre + value
      })
    });
  },[]);
```

*此处在react18下需要去除严格模式，不然useEffect的方法会执行两遍*

## 不同渲染进程间通信

没有直接的方法可以使用 `ipcMain` 和 `ipcRenderer` 模块在 Electron 中的渲染器进程之间发送消息。现阶段提供了两种方法：渲染进程间的通信通过主进程进行转发,利用MessagePort,下面我们就开始来用这两种方式来实现不同渲染进程间的通信。

在这之前，我们需要构建一个不可见的渲染进程，你可以理解为一个背后工作的进程，我们暂且称为work进程。其实构建的方式跟之前的render进程的构建步骤差不多。

主要步骤是：在config/vite/work.js配置vite构建的配置——>scripts/dev.js启动服务——>src/main主进程中添加一个不可见的窗口，核心代码如下

```js
// config/vite/work.js
import { builtinModules } from 'module'
import path from "path";

const config = {
  root: path.resolve(__dirname, '../../src/work'), // root设置要正确
  envDir:process.cwd(),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../../src"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "../../dist/work"),
    assetsDir: '.',
    minify: false,
    target: `node16`,
    lib: {
      entry: path.resolve(__dirname, '../../src/work/index.ts'),
      formats: ['cjs']
    },
    rollupOptions: {
      external: ['electron',...builtinModules],
      output: {
        entryFileNames: '[name].cjs',
      },
    },
    emptyOutDir: true,
    brotliSize: false,
    chunkSizeWarningLimit: 2048,
  },
};
export default config;

```

```js
// scripts/dev.js
const workDev = {
  async createRenderServer(viteDevServer) {
    const options = {
      ...sharedOptions,
      configFile: path.resolve(__dirname, "../config/vite/work.js"),
    };
    return build({
      ...options,
      plugins: [
        {
          name: "reload-page-on-work-package-change",
          writeBundle() {
            viteDevServer.ws.send({
              type: "full-reload",
            });
          },
        },
      ],
    });
  },
};

const initDev = async () => {
  try {
    const renderDevServer = await renderDev.createRenderServer();
    await preloadDev.createRenderServer(renderDevServer);
    await workDev.createRenderServer(renderDevServer);
    await mainDev.createMainServer(renderDevServer);
  } catch (err) {
    console.error(err);
  }
};
```

work进程

![截屏2023-02-25 18.59.12.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd8327e0dd3a4a588af8a28920cabc99~tplv-k3u1fbpfcp-watermark.png?)

主进程

```ts
  const workWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      preload: join(__dirname, "../work/index.cjs"),
    },
  });

  workWindow.hide();

  if (import.meta.env.MODE === "dev") {
    workWindow.webContents.openDevTools();
  }

  workWindow.loadFile(resolve(__dirname, "../work/index.html"));
```

不出意外，`pnpm run dev`会出现这样的情况

![截屏2023-02-25 19.04.39.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84adfe7b48b2403e9d4aa73ab1aaf020~tplv-k3u1fbpfcp-watermark.png?)

这样，我们的work进程就好了，下面我们开始尝试两种通信方式吧！

### 通过主进程进行转发

我们要实现渲染进程向work进程发送消息，整体思路如下：

1.渲染进程定义发送信息的钩子

```ts
// src/preload/index.ts
renderSendMsgToWork: (msg: any) => {
    ipcRenderer.send("renderSendMsgToWork", msg);
},
```

```tsx
// src/render/App.tsx
const sendMsgToWork = () => {
  window.nativeBridge.renderSendMsgToWork("I am render");
}
<div className="div-shape">
  <button onClick={sendMsgToWork}>
     sendMsgToWork
  </button>
</div>
```

2.主进程接收渲染进程的消息&发送消息给work进程

```ts
// src/main/index.ts
ipcMain.on('renderSendMsgToWork',(event:Event,msg:any) => {
    workWindow && workWindow.webContents.send('msgFormRender', msg)
 })
```

3.work进程接收主进程的消息

```ts
// src/work/index.ts
ipcRenderer.on('msgFormRender',(event:Event,msg:any) => {
  console.log('msgFormRender:',msg)
})
```

`pnpm run dev`后点击渲染进程的按钮，查看work进程的打印

![截屏2023-02-25 19.34.38.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/52706652e41742c5a1f0f5fac8a30e07~tplv-k3u1fbpfcp-watermark.png?)

当然你也可以做work进程的消息回执处理，思路跟渲染进程发送消息到work进程的思路一样。

### 利用MessagePort

关于MessagePort：
<https://developer.mozilla.org/en-US/docs/Web/API/MessagePort>

在渲染器中， `MessagePort` 类的行为与它在 web 上的行为完全一样。 但是，主进程不是网页（它没有 Blink 集成），因此它没有 `MessagePort` 或 `MessageChannel` 类。 为了在主进程中处理 MessagePorts 并与之交互，Electron 添加了两个新类： [`MessagePortMain`](https://www.electronjs.org/zh/docs/latest/api/message-port-main) 和 [`MessageChannelMain`](https://www.electronjs.org/zh/docs/latest/api/message-channel-main)。

整体思路如下：

1.在主进程中设置MessageChannel让两个渲染进程产生联系

```ts
// src/main/index.ts
const { port1, port2 } = new MessageChannelMain()
  mainWindow.once('ready-to-show', () => {
    mainWindow.webContents.postMessage('port', null, [port1])
  })

  workWindow.once('ready-to-show', () => {
    workWindow.webContents.postMessage('port', null, [port2])
  })
```

2.在各自的进程中设置自己的MessagePort

```ts
// src/preload/index.ts

renderSendMsgToWorkByMessagePort: (msg:any) => {
    window.electronMessagePort && window.electronMessagePort.postMessage(msg)
}

ipcRenderer.on('port', e => {
  window.electronMessagePort = e.ports[0]
})
```

```ts
// src/work/index.ts
ipcRenderer.on('port', e => {
  const electronMessagePort = e.ports[0]
  electronMessagePort.onmessage = (msg:any) => {
    console.log('window.electronMessagePort.onmessage work:',msg.data)
  }
})
```

3.进程间通过prot通信

```tsx
// src/render/App.tsx
const sendMsgToWorkByMessagePort = () => {
    window.nativeBridge.renderSendMsgToWorkByMessagePort("I am render, sendMsgToWorkByMessagePort");
  }

<div className="div-shape">
   <button onClick={sendMsgToWorkByMessagePort}>
       sendMsgToWorkByMessagePort
   </button>
</div>
```

![截屏2023-02-25 20.51.14.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0f0c477fa24e42d9b9cecd6e2765260e~tplv-k3u1fbpfcp-watermark.png?)

# 总结

上面所罗列的各种通信模式在Electron的开发中会经常用到，如何快速高效的运用就看相应的业务场景了，如果能将这些进程通信的模式统一封装，会在日常的开发中大幅度的提升你的开发效率。

