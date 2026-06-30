---
outline: deep
title: Application Packaging
titleTemplate: Electron Practice
---

# Application Packaging

## Introduction

In Electron development, packaging and delivery are a major part of the work. Traditional web applications do not really have an installation or upgrade lifecycle. You refresh the browser and users are on the latest version. Desktop software is different. It needs repeatable packaging, distribution, iteration, and update delivery.

While building real Electron applications, I ran into quite a few packaging pitfalls. This note records the core setup and a few practical details worth paying attention to.

## Preparation

Official documentation:

<https://www.electron.build/>

There is not much to prepare beyond understanding that documentation clearly. Once the overall model makes sense, `electron-builder` is not difficult to use.

## About packaging

### Packaging script configuration

Earlier in the project, everything runs in development mode. Before packaging the application, we first need to build the code for every process. That means configuring Vite and producing the compiled application output.

Create `scripts/build.js`:

```javascript
#!/usr/bin/node
import pkgJson from "../package.json" assert { type: "json" };
import { build } from "vite";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const processArgv = process.argv.splice(2);
const mode = processArgv && processArgv.length > 0 ? processArgv[0] : "production";
const packagesConfigs = [
  resolve(__dirname, "../config/vite/main.js"),
  resolve(__dirname, "../config/vite/preload.js"),
  resolve(__dirname, "../config/vite/render.js"),
  resolve(__dirname, "../config/vite/work.js"),
];

// Environment variables
process.env.VITE_CURRENT_RUN_MODE = "render";

// Version
process.env.VITE_CURRENT_VERSION = pkgJson.version;

// Mode
process.env.MODE = mode;

// Current platform
process.env.VITE_CURRENT_OS = process.platform;

const buildByConfig = (configFile) => build({ configFile, mode });

;(async () => {
  try {
    const totalTimeLabel = "Total bundling time";
    console.time(totalTimeLabel);

    for (const packageConfigPath of packagesConfigs) {
      if (packageConfigPath.includes("main")) {
        process.env.VITE_CURRENT_RUN_MODE = "main";
      }
      if (packageConfigPath.includes("render")) {
        process.env.VITE_CURRENT_RUN_MODE = "render";
      }
      if (packageConfigPath.includes("preload")) {
        process.env.VITE_CURRENT_RUN_MODE = "preload";
      }
      if (packageConfigPath.includes("work")) {
        process.env.VITE_CURRENT_RUN_MODE = "work";
      }
      const consoleGroupName = `${dirname(packageConfigPath)}/`;
      console.group(consoleGroupName);

      const timeLabel = "Bundling time";
      console.time(timeLabel);
      await buildByConfig(packageConfigPath);

      console.timeEnd(timeLabel);
      console.groupEnd();
      console.log("\n");
    }
    console.timeEnd(totalTimeLabel);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
```

The purpose of this script is to build every process:

- renderer
- main
- work
- preload

Then add the script to `package.json`:

```json
"build": "node ./scripts/build"
```

After that, `pnpm run build` will generate the compiled source files needed for the final Electron package.

### `electron-builder` configuration

The source build above still does not produce an installable desktop application. For that, we use `electron-builder`.

Here is a basic example configuration:

```javascript
const config = {
  productName: "ViteReactElectronApp",
  appId: "mac.vite.react.electron.com",
  publish: false,
  copyright: "Copyright © 2023",
  asar: false,
  files: ["dist/**", "package.json"],
  directories: {
    output: "release",
    buildResources: "buildResources",
  },
  extraResources: {
    from: "buildResources",
    to: "buildResources",
  },
  mac: {
    hardenedRuntime: true,
    gatekeeperAssess: false,
    target: ["dmg", "zip"],
    entitlements: "./scripts/entitlements.mac.plist",
    entitlementsInherit: "./scripts/entitlements.mac.plist",
    identity: "",
    icon: "./buildResources/icon/icon.icns",
    bundleVersion: 100,
    extendInfo: {
      LSUIElement: true,
      SUFeedURL: "",
      SUPublicEDKey: "",
    },
  },
  dmg: {
    backgroundColor: "#ffffff",
    window: { width: 540, height: 380 },
    icon: "./buildResources/icon/icon.icns",
    iconSize: 128,
    contents: [
      { x: 410, y: 190, type: "link", path: "/Applications" },
      { x: 130, y: 190, type: "file" },
    ],
    title: "ViteReactElectronApp",
  },
  win: {
    icon: "./buildResources/icon/icon.ico",
    target: "nsis",
    requestedExecutionLevel: "requireAdministrator",
    verifyUpdateCodeSignature: false,
    signingHashAlgorithms: ["sha256", "sha1"],
    rfc3161TimeStampServer: "http://timestamp.digicert.com",
    certificateFile: "",
    certificatePassword: "",
  },
  nsis: {
    oneClick: true,
    language: "2052",
    perMachine: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    guid: "ViteReactElectronApp",
    shortcutName: "ViteReactElectronApp",
    artifactName: "ViteReactElectronApp@${version}.${ext}",
    include: "./build/install/installer.nsh",
  },
};

module.exports = config;
```

This is only a baseline configuration, but it is enough to explain the main ideas. A few fields deserve extra attention.

### Key configuration notes

#### `directories` and `extraResources`

You need to separate application build output from application-level static resources.

The `buildResources` directory is useful for files that should not go through the frontend compilation pipeline, but still need to ship with the application. Typical examples:

- `dll`
- `dylib`
- `.node`
- icons
- extra native assets

Because of this packaging structure, resource lookup code often needs to distinguish between development and production paths. For example:

```typescript
const resolveBuildResourcesPath = (pathData: string) => {
  return import.meta.env.MODE === "dev"
    ? path.resolve(__dirname, pathData)
    : path.resolve(__dirname, `../${pathData}`);
};

const rsNative = require(
  resolveBuildResourcesPath("../../buildResources/rs-native.darwin-x64.node")
);

const sumLib = koffi.load(
  resolveBuildResourcesPath("../../buildResources/sum.dylib")
);
```

#### macOS `identity`

Under the `mac` field, `identity` is the name of your Apple signing certificate.

#### Windows certificate information

Under the `win` field:

- `certificateFile` is the path to the Windows signing certificate, commonly a `.pfx`
- `certificatePassword` is the password for that certificate

### Packaging scripts

Once both the source build and builder configuration are ready, you can add the packaging scripts:

```json
"scripts": {
  "dev": "node ./scripts/dev",
  "build": "node ./scripts/build",
  "compile": "electron-builder build --config electron-builder.config.cjs"
}
```

## Packaging tips

- If your application depends on modules that must stay external during packaging, such as `koffi`, make sure they are placed under `dependencies` in `package.json`. Otherwise they may be missing from the production app and cause runtime startup errors.

- If packaging feels very slow, the first common reason is downloading Electron binaries. You can speed it up by adding:

```json
"electronDownload": {
  "mirror": "https://npm.taobao.org/mirrors/electron/"
}
```

If that still does not work, you can download the matching Electron version manually from:

<https://registry.npmmirror.com/binary.html?path=electron/>

Then place it into the local Electron cache directory:

- macOS: `/Users/xxxxxx/Library/Caches/electron`
- Windows: `$LOCALAPPDATA/electron/Cache` or `~/AppData/Local/electron/Cache/`

