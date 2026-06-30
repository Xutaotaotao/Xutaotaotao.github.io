---
outline: deep
title: Build a Floating Desktop Window in Electron
titleTemplate: Electron Practice
---

# Build a Floating Desktop Window in Electron

## Feature description

After the desktop application launches, a floating ball appears on the desktop.

The floating element should:

- be draggable
- stay visible above other windows
- bring the main application to the front when clicked

## Core implementation idea

1. Start a renderer page with Vite in development.
2. Create a dedicated floating window from the main process.
3. Build the floating UI in the renderer and bridge it back to the main app.

## Implementation details

### 1. Start a dedicated renderer page

First, configure Vite:

```typescript
// vite.tool.config.js
import { resolve } from "path";
import { builtinModules } from "module";
import react from "@vitejs/plugin-react";
import { cwd } from "process";
import { chrome } from "../../electron-vendors.config.json";

const PACKAGE_ROOT = resolve(__dirname, "../../packages/tool");

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

Then register that Vite service in your dev startup flow:

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

### 2. Create the floating window in the main process

```typescript
export const creatToolWindow = () => {
  let toolWin: any = new BrowserWindow({
    width: 60,
    height: 60,
    type: "toolbar",
    frame: false,
    resizable: false,
    transparent: true,
    alwaysOnTop: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      preload: join(__dirname, "../preload/main/preload.js"),
    },
  });

  const { left, top } = {
    left: screen.getPrimaryDisplay().workAreaSize.width - 60,
    top: screen.getPrimaryDisplay().workAreaSize.height - 60,
  };

  toolWin.setPosition(left, top);
  toolWin.setVisibleOnAllWorkspaces(true);

  console.log("VITE_TOOL_SERVER_URL", import.meta.env.VITE_TOOL_SERVER_URL);
  if (import.meta.env.MODE === "dev") {
    if (import.meta.env.VITE_TOOL_SERVER_URL) {
      toolWin.loadURL(import.meta.env.VITE_TOOL_SERVER_URL);
    }
  } else {
    toolWin.loadFile(resolve(__dirname, "../toolWindow/index.html"));
  }

  toolWin.once("ready-to-show", () => {
    toolWin.show();
  });

  toolWin.openDevTools();

  toolWin.on("close", () => {
    toolWin = null;
    windowsIds.tool = null;
  });

  windowsIds.tool = toolWin;

  return toolWin;
};
```

Key points here:

- no frame
- transparent background
- always on top
- small fixed size
- visible across all workspaces

That makes it suitable for a floating desktop tool.

### 3. Build the renderer UI

```tsx
// index.tsx
import "./index.scss";
import Img from "../img/icon.png";
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
      window.nativeBridge.setWindowOnTop();
    }
    setIsDragging(false);
    clearTimeout(dragStartTimer.current);
  };

  const handleMouseMove = () => {
    setIsDragging(true);
  };

  return (
    <div className="app">
      <div className="H">
        <img
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{
            width: "50px",
            height: "50px",
            cursor: isDragging ? "move" : "default",
          }}
          src={Img}
          alt="Floating app icon"
        />
      </div>
    </div>
  );
};

export default App;
```

```scss
// index.scss
.app {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: transparent;
  -webkit-app-region: drag;

  .H {
    font-size: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: aliceblue;
    width: 50px;
    height: 50px;

    img {
      -webkit-user-drag: none;
      user-drag: none;
    }
  }
}
```

The core interaction is simple:

- hold briefly to start dragging
- release without dragging to trigger the wake-up action

That is enough to build a practical floating desktop entry point.

