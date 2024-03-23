---
outline: deep
title: 应用打包
titleTemplate: Electron实战
---

# 应用打包

## 前言

在 Electron 的开发中，打包升级是非常重要的一个环节，因为在传统的前端开发中是没有升级的概念的，刷新浏览器就是更新，但是客户端程序不一样，它需要持续的迭代和优化，然后将新的功能推送给用户，在这打包升级的开发中，笔者也遇到了很多坑，在这里给大家分享一下。

## 准备工作

<https://www.electron.build/>

其实也没什么需要准备的，把这个官方的文档搞清楚了，就很好上手了。

## 关于打包

### 打包脚本配置

在我们的项目中，前面都是在开发环境开发，现在我们需要把一些打包的配置项准备起来。首先我们要构建开发环境的代码，所以我们需要配置 vite，然后把代码打包构建出来。我们在 script 目录下创建一个`build.js`,主要目的就是构建我们需要的应用程序的代码。

```javascript
    #!/usr/bin/node
    import pkgJson from "../package.json" assert { type: "json" };
    import { build } from 'vite'
    import { dirname, resolve } from 'path'
    import { fileURLToPath } from "url";

    const __dirname = fileURLToPath(new URL(".", import.meta.url));
    const processArgv = process.argv.splice(2);
    const mode = processArgv && processArgv.length > 0 ? processArgv[0] :  "production";
    const packagesConfigs = [
      resolve(__dirname, '../config/vite/main.js'),
      resolve(__dirname, '../config/vite/preload.js'),
      resolve(__dirname, '../config/vite/render.js'),
      resolve(__dirname, '../config/vite/work.js'),
    ]


    // 设置环境变量
    process.env.VITE_CURRENT_RUN_MODE = 'render'

    // 设置版本号
    process.env.VITE_CURRENT_VERSION = pkgJson.version

    // 设置mode
    process.env.MODE = mode

    // 当前运行平台
    process.env.VITE_CURRENT_OS = process.platform


    const buildByConfig = (configFile) => build({ configFile, mode })

    ;(async () => {
      try {
        const totalTimeLabel = 'Total bundling time'
        console.time(totalTimeLabel)

        for (const packageConfigPath of packagesConfigs) {
          if(packageConfigPath.includes('main')) {
            process.env.VITE_CURRENT_RUN_MODE = 'main'
          }
          if(packageConfigPath.includes('render')) {
            process.env.VITE_CURRENT_RUN_MODE = 'render'
          }
          if(packageConfigPath.includes('preload')) {
            process.env.VITE_CURRENT_RUN_MODE = 'preload'
          }
          if(packageConfigPath.includes('work')) {
            process.env.VITE_CURRENT_RUN_MODE = 'work'
          }
          const consoleGroupName = `${dirname(packageConfigPath)}/`
          console.group(consoleGroupName)

          const timeLabel = 'Bundling time'
          console.time(timeLabel)
          await buildByConfig(packageConfigPath)

          console.timeEnd(timeLabel)
          console.groupEnd()
          console.log('\n') // Just for pretty print
        }
        console.timeEnd(totalTimeLabel)
      } catch (e) {
        console.error(e)
        process.exit(1)
      }
    })()
```

上面的代码主要的作用就是把所有的进程(渲染进程，主进程，work 进程，preload 脚本)进行打包。

然后我们在 package.json 的 script 脚本中加入
`"build": "node ./scripts/build",`,就可以通过`pnpm run build`来构建我们的源码了。打包后的源码是为了后面打包 Electron 的应用程序使用。

### electron-builder 配置

上面我们虽然完成了源码文件的打包，但是它还不是一个可执行的文应用程序文件，我们需要利用 electron-builder 来构建我们的可执行应用程序，下面就是一个基本的应用配置

```javascript
const config = {
  productName: "ViteReactElectronApp", // 应用程序名称
  appId: "mac.vite.react.electron.com", // 应用程序唯一标识
  publish: false, // 是否发布到 GitHub 上
  copyright: "Copyright © 2023",
  asar: false, // 是否将应用程序打包为asar文件
  files: ["dist/**", "package.json"], // 将要打包的文件或目录
  directories: {
    output: "release", // 打包输出目录
    buildResources: "buildResources", // 构建资源目录
  },
  extraResources: {
    from: "buildResources", // 额外的静态资源目录
    to: "buildResources",
  },
  mac: {
    hardenedRuntime: true, // 是否启用硬化运行时
    gatekeeperAssess: false, // 是否允许运行未签名的应用程序
    target: ["dmg", "zip"], // 打包的目标类型
    entitlements: "./scripts/entitlements.mac.plist", // macOS 应用程序权限配置文件的路径
    entitlementsInherit: "./scripts/entitlements.mac.plist", // 操作系统将继承的权限配置文件的路径
    identity: "", // 应用程序签名的证书 ID
    icon: "./buildResources/icon/icon.icns", // 应用程序图标
    bundleVersion: 100, // 应用程序的捆绑版本
    extendInfo: {
      // 额外的 macOS 应用程序属性
      LSUIElement: true, // 启用macOS的无界面模式
      SUFeedURL: "", // 升级检查的 URL
      SUPublicEDKey: "", // 允许升级的公钥
    },
  },
  dmg: {
    backgroundColor: "#ffffff", // 创建 dmg 文件时窗口的背景颜色
    window: { width: 540, height: 380 }, // 创建 dmg 文件时窗口大小
    icon: "./buildResources/icon/icon.icns", // dmg 文件所带的图标
    iconSize: 128, // 图标大小
    contents: [
      { x: 410, y: 190, type: "link", path: "/Applications" }, // dmg 文件中的可执行文件路径
      { x: 130, y: 190, type: "file" }, // dmg 文件中的文件路径
    ],
    title: "ViteReactElectronApp", // dmg 文件的标题
  },
  win: {
    icon: "./buildResources/icon/icon.ico", // 可执行文件的图标
    target: "nsis", // 打包的目标类型
    requestedExecutionLevel: "requireAdministrator", // 请求管理员权限时用的系统口令
    verifyUpdateCodeSignature: false, // 是否验证更新时的签名，默认为false
    signingHashAlgorithms: [
      // 当签署时，使用的摘要算法列表，支持 sha256 和 sha1。默认使用 sha256。
      "sha256",
      "sha1",
    ],
    rfc3161TimeStampServer: "http://timestamp.digicert.com", // 向 RFC 3161 时间戳服务器注册时使用的 URL。默认情况下，不占用服务。
    certificateFile: "", // 打包时所用的证书文件路径
    certificatePassword: "", // 打包时所用的证书的密码
  },
  nsis: {
    oneClick: true, // 是否一键安装
    language: "2052", // 安装向导语言
    perMachine: true, // 是否在每台机器上安装，需要管理员权限
    createDesktopShortcut: true, // 是否在桌面上创建快捷方式
    createStartMenuShortcut: true, // 是否在开始菜单上创建快捷方式
    guid: "ViteReactElectronApp", // 安装程序的 GUID
    shortcutName: "ViteReactElectronApp", // 创建快捷方式的名称
    artifactName: "ViteReactElectronApp@${version}.${ext}", // 生成安装文件时的文件名
    include: "./build/install/installer.nsh", //包含其他脚本文件的路径
  },
};

module.exports = config;
```

上面的配置就是一个基础的 electron-builder 的配置，已经给出了相应的注释，这里我们需要注意几个配置项。

- 第一个是 directories 和 extraResources，我们需要这种一下自己的静态资源目录，这个目录就是一些不需要编译，但是程序里面会用到的文件，和渲染进程里面的静态资源目录不太一样，它主要是整个程序应用的静态资源，这些静态资源大部分会被主进程用到，例如 dll，dylib,node 文件等。由于这个配置，我们引用静态资源的地方可能要做下变动，主要是调用底层 dll，dylib,node 的地方需要区分生产和开发环境`src/main/native/index.ts`

```typescript
const resolveBuildResourcesPath = (pathData: string) => {
  return import.meta.env.MODE === "dev"
    ? path.resolve(__dirname, pathData)
    : path.resolve(__dirname, `../${pathData}`);
};

const rsNative = require(resolveBuildResourcesPath(
  "../../buildResources/rs-native.darwin-x64.node"
));

const sumLib = koffi.load(
  resolveBuildResourcesPath("../../buildResources/sum.dylib")
);
```

- 第二个是 mac 下的 identity，这个值就是你的 Apple 证书的名称
- 第三个是 win 下的 certificateFile 和 certificatePassword，这个地方值就是你 windows 证书相关的信息，certificateFile 可用 pfx 格式的，密码也就是你证书的密码。

将上面两步做好之后你就可以配置打包应用的脚步了。

```
"scripts": {
  "dev": "node ./scripts/dev",
  "build": "node ./scripts/build",
  "compile": "electron-builder build --config electron-builder.config.cjs"
},
```

### 一些打包注意事项

- 如果你的应用需要使用不用打包的 node_modules 的依赖，如 koffi，你需要将其添加至 package.json 下的 dependencies，不然打包的时候不会打进程序里面，到时候启动生产的应用会报错。
- 如果你感觉打包的时候很慢，大部分情况是因为首次下载 electron 的依赖慢导致的，在 package.json 下添加

```
  "electronDownload": {
    "mirror": "<https://npm.taobao.org/mirrors/electron/>"
  }
```

即可加快下载速度

- 如果依然无法下载，可以前往https://registry.npmmirror.com/binary.html?path=electron/ 去下载你对应环境的 Electron 版本到你的电脑缓存目录下

mac 为：`/Users/xxxxxx/Library/Caches/electron`

windows: `$LOCALAPPDATA/electron/Cache`或`~/AppData/Local/electron/Cache/`
