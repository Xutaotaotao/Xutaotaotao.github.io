---
outline: deep
title: Electron 实现一个桌面悬浮窗
titleTemplate: Electron实战
---

# Electron 实现一个桌面悬浮窗

## 功能描述

打开客户端软件后，可以在桌面上显示一个悬浮球，悬浮球可以随意拖拽，点击悬浮球可以唤起客户端软件。

## 核心实现步骤思路

- 1.开发环境下 Vite 启动一个渲染进程页面。
- 2.主进程创建一个窗口，窗口里面可以自定义渲染内容。
- 3.对渲染进程页面做一些开发，桥接唤起客户端软件。

## 具体实现步骤

### 1.开发环境下 Vite 启动一个渲染进程页面

首先是 vite 的配置

```typescript
// vite.tool.config.js
import { resolve } from "path";
import { builtinModules } from "module";
import react from "@vitejs/plugin-react";
import { cwd } from "process";
import { chrome } from "../../electron-vendors.config.json";

const PACKAGE_ROOT = resolve(__dirname, "../../packages/tool");

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */

const config = {
  root: PACKAGE_ROOT,
  base: "./",
  envDir: cwd(),
  resolve: {
    alias: {
      "@": resolve(__dirname, "../../packages"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3007,
  },
  build: {
    outDir: resolve(__dirname, "../../dist/tool"),
    target: `chrome${chrome}`,
    minify: true,
    assetsInlineLimit: 1048576,
    rollupOptions: {
      external: [...builtinModules, "electron"],
    },
    emptyOutDir: true,
    brotliSize: false,
    chunkSizeWarningLimit: 2048,
  },
  plugins: [react()],
};

export default config;
```

然后是注册启动这个 vite 配置服务

```typescript
const setupToolPackageWatcher = () =>
  new Promise((resolved) => {
    const preloadPath = resolve(__dirname, "../../packages/tool");
    const distPreload = resolve(distPath, "tool");
    if (ensureDirSync(distPreload)) {
      mkdirpSync(distPreload);
    }
    copySync(preloadPath, distPreload, { overwrite: true });
    resolved();
  });

const toolDevServer = await createServer({
  ...sharedConfig,
  configFile: resolve(__dirname, "../vite-config/vite.tool.config.js"),
});

await toolDevServer.listen();
```

### 2.主进程创建一个窗口，窗口里面可以自定义渲染内容

```typescript
export const creatToolWindow = () => {
  let toolWin:any = new BrowserWindow({
    width: 60, 
      height: 60,
      type: 'toolbar',    //创建的窗口类型为工具栏窗口
      frame: false,   //要创建无边框窗口
      resizable: false, //禁止窗口大小缩放
      transparent: true,  //设置透明
      alwaysOnTop: true,
      show: false,
      webPreferences: {
        nodeIntegration: true,
        preload: join(__dirname, "../preload/main/preload.js"),
      }
  })
  const { left, top } = { left: screen.getPrimaryDisplay().workAreaSize.width - 60, top: screen.getPrimaryDisplay().workAreaSize.height - 60 }
  toolWin.setPosition(left, top) // 设置悬浮球位置
  toolWin.setVisibleOnAllWorkspaces(true)  // 显示在所有工作区

  console.log('VITE_TOOL_SERVER_URL',import.meta.env.VITE_TOOL_SERVER_URL)
  if (import.meta.env.MODE === "dev") {
    if (import.meta.env.VITE_TOOL_SERVER_URL) {
      toolWin.loadURL(import.meta.env.VITE_TOOL_SERVER_URL);
    }
  } else {
    toolWin.loadFile(resolve(__dirname, "../toolWindow/index.html"));
  }
  toolWin.once('ready-to-show', () => {
    toolWin.show()
  });

  toolWin.openDevTools()

  toolWin.on('close', () => {
    toolWin = null;
    windowsIds.tool = null
  })
  
  windowsIds.tool = toolWin

  return toolWin
}
```

### 3.对渲染进程页面做一些开发

```tsx
// index.tsx
import "./index.scss";
import Img from '../img/icon.png'
import { useRef, useState } from "react";
const App = () => {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartTimer = useRef(null);

  const handleMouseDown = () => {
    setIsDragging(false);
    dragStartTimer.current = setTimeout(() => {
      setIsDragging(true);
    }, 200);
  };

  const handleMouseUp = () => {
    if (!isDragging) {
      window.nativeBridge.setWindowOnTop() // 通过桥接唤起客户端软件
    }
    setIsDragging(false)
    clearTimeout(dragStartTimer.current);
  };

  const handleMouseMove = () => {
    setIsDragging(true)
  }

  return (
    <div className="app">
      <div className="H">
        <img 
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{width:'50px',height:'50px',cursor: isDragging ? 'move' : 'default'}} src={Img} alt="icon" />
      </div>
    </div>
  );
};

export default App;
```

```scss
// index.scss
.app{
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    background-color: transparent;
    -webkit-app-region:drag; // 允许拖动
    .H{
        font-size: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: aliceblue;
        width: 50px;
        height: 50px;
        img{
            -webkit-user-drag: none;
            user-drag: none; 
        }
    }
}
```