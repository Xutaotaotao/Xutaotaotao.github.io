---
outline: deep
title: 环境&工程搭建
titleTemplate: Electron实战
---

# 环境&工程搭建


## 为什么用 Vite

<https://cn.vitejs.dev/guide/why.html>已经说得非常清楚了，这里不做过多赘述，在开始用 Vite 构建 Electorn 的项目之前，我也用过 Webpack 来构建，但是从开发体验来说，Vite 给人的感觉就是爽，没啥说的，爽就完了 😊。

## 创建一个 Vite+React 的项目

用 Vite 官方的指引创建一个 vite+react 的项目

```bash
pnpm create vite
```

选择 React，选择 Typescript + SWC，SWC 是什么——>[https://swc.rs](https://swc.rs/)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e1d2f7d942684e3f81e935f584921480~tplv-k3u1fbpfcp-zoom-1.png)

## 修改项目结构

我们把 src 下创建一个 render 目录和 main 目录，故名思义就是渲染进程和主进程，然后改变 index.html 中 script 的引入`<script type="module" src="/src/render/main.tsx"></script>`，这样极简的项目结构就出现了

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f8a68f86b0be4a5fb62eea691fe86ea2~tplv-k3u1fbpfcp-zoom-1.png)

## 自定义开发脚本

到现在为止，我们还是一个普通的 web 项目，现在我们需要自定义开发脚本来融合主进程和渲染进程的启动。

首先实现 render 进程的启动，删除`vite.config.ts`,添加`scripts`目录，然后加入`dev.js`，用来启动开发服务，第一阶段我们先完成渲染进程的启动配置，添加`config/vite`文件目录，加入`render.js`，然后在`dev.js`中使用`config/vite/render.js`作为配置文件，用来启动服务，核心代码如下

```js
import path from "path";
import electronPath from "electron";
import { spawn } from "child_process";
import { createServer, build } from "vite";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const sharedOptions = {
  mode: "dev",
  build: {
    watch: {},
  },
};

const renderDev = {
  async createRenderServer() {
    const options = {
      ...sharedOptions,
      configFile: path.resolve(__dirname, "../config/vite/render.js"),
    };
    this.server = await createServer(options);
    await this.server.listen();
    this.server.printUrls();
    return this.server;
  },
};

const initDev = async () => {
  try {
    await renderDev.createRenderServer();
  } catch (err) {
    console.error(err);
  }
};

initDev();
```

现阶段的目录结构如下：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6583f518a9024909a09b05bd1ff4a32b~tplv-k3u1fbpfcp-zoom-1.png)

现在`render`进程的脚本基本差不多了，下一步就是要把 Electron 集成进去。

## 集成 Electorn 进程

下面对`config/vite/main.js`和`src/main/index.ts`以及`scripts/dev.js`进行编码。`config/vite/main.js`主要是为了给主进程使用的 Vite 配置文件，`src/main/index.ts`主要是 Electron 进程的入口文件，最后在`scripts/dev.js`中去启动服务。

编写代码之前我们先下载一下 Electron 的依赖。

_tips:如果下载 Electron 慢的话，可以进行一下下载源的配置。_

```bash
pnpm config set registry https://registry.npm.taobao.org

pnpm config set electron_mirror https://npm.taobao.org/mirrors/electron/
```

主要是需要改造`scripts/dev.js`使其支持启动 electron 进程服务，然后将渲染进程和 Electron 进程合并，这样就可以构造一个最基础的 Electron 开发环境了，现在我们来尝试启动 Electron 进程。

核心代码如下

```js
let spawnProcess = null;

const mainDev = {
  async createMainServer(renderDevServer) {
    const protocol = `http${renderDevServer.config.server.https ? "s" : ""}:`;
    const host = renderDevServer.config.server.host || "localhost";
    const port = renderDevServer.config.server.port;
    process.env.VITE_DEV_SERVER_URL = `${protocol}//${host}:${port}/`;
    process.env.VITE_CURRENT_RUN_MODE = "main";
    const options = {
      ...sharedOptions,
      configFile: path.resolve(__dirname, "../config/vite/main.js"),
    };
    return build({
      ...options,
      plugins: [
        {
          name: "reload-app-on-main-package-change",
          writeBundle() {
            if (spawnProcess !== null) {
              spawnProcess.kill("SIGINT");
              spawnProcess = null;
            }

            spawnProcess = spawn(String(electronPath), ["."]);

            spawnProcess.stdout.on("data", (d) => {
              const data = d.toString().trim();
              console.log(data);
            });

            spawnProcess.stderr.on("data", (data) => {
              console.error(`stderr: ${data}`);
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
    await mainDev.createMainServer(renderDevServer);
  } catch (err) {
    console.error(err);
  }
};

initDev();
```

注意几个点

1.我们这里利用了`writeBundle`，就是等`chunk`都写入文件后，再启动 Electron 进程。

2.这里没有利用 Electron 的命令启动，而是通过 Node.js 的`child_process`模块的`spawn`方法启动 Electron 子进程，主要是因为我们需要依赖开发环境的渲染进程。

3.另外就是`config/vite/main.js`中需要对`rollupOptions`的`external`进行 electron 的配置，把导入包转成外部依赖，不然在启动 Electron 会找不到 Electron 的路径。

4.在`createMainServer`中我们注入了全局可使用的变量，以便 Electorn 加载页面的时候可以使用这些变量

现阶段的代码结构如下：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c010fb4ec044b2bab414661f339e416~tplv-k3u1fbpfcp-zoom-1.png)

不出意外`pnpm dev`会出现下面的界面。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c8e0bf6461464173883bc7cc5a4d9051~tplv-k3u1fbpfcp-zoom-1.png)

到现在，一个最简单的 Electron 开发环境搭建好了。
