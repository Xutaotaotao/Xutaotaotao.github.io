---
outline: deep
title: MCP 服务开发教程 — 获取本地电脑里面安装的软件
titleTemplate: MCP 实战
date: 2025-04-09
tags:
  - MCP
  - AI
---

# MCP 服务开发教程 — 获取本地电脑里面安装的软件

大家好，我是徐徐。今天我们来学习一下如何开发一个简单的 MCP 服务。

![](https://cdn.nlark.com/yuque/0/2025/png/277039/1744128719190-ab2c4617-9dcc-46df-887e-6dc5c0913be6.png)

## 前言

在常规的 AI Agent 客户端中一般都是不能进行文件操作、系统操作相关的指令的，但是接入了 MCP 的服务后，这些操作都是可以很容易做到的，今天我们就来做一个简单的 MCP 服务用来获取本地电脑里面安装的软件。

## 环境准备

对于前端开发工程师，我们首选的开发语言当然是 Javascript 或者 Typescript，MCP 官方也出了相应的 Typescript 版本的 SDK，所以我们在这里就用 Node 环境来实现一个简单的 MCP 服务，前提是需要准备好下面的环境：

- Node 16+
- 安装好的 Claude 桌面客户端
- 以 macOS 作为演示环境

## 初始化项目

```bash
# 创建项目目录
mkdir mcp-get-installed-apps
cd mcp-get-installed-apps

# npm 初始化
npm init -y

# 安装依赖
npm install @modelcontextprotocol/sdk zod
npm install -D @types/node typescript

# 创建文件
mkdir src
touch src/index.ts
```

### 更新 package.json 和 tsconfig.json

#### package.json

```json
{
  "type": "module",
  "bin": {
    "weather": "./build/index.js"
  },
  "scripts": {
    "build": "tsc && chmod 755 build/index.js"
  },
  "files": [
    "build"
  ]
}
```

#### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "./build",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

初始化的项目目录和配置准备好之后，我们就可以开始来进行我们的业务逻辑编码了。

## 构建 MCP 服务

非常简单，整体不到 50 行代码，直接献上。

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getInstalledApps } from "get-installed-apps";

const server = new McpServer({
  name: "mcp-get-installed-apps",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  "get-installed-apps",
  "Get my computer's installed apps",
  async () => {
    const apps = await getInstalledApps();
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(apps, null, 2),
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
```

核心就三个步骤：

- 创建一个 `McpServer` 实例，配置服务器的名称、版本和能力。服务命名为 `mcp-get-installed-apps`，版本为 `1.0.0`。
- 使用 `server.tool()` 方法定义一个工具，名称为 `get-installed-apps`，描述为 "Get my computer's installed apps"。
- `main()` 函数是程序的入口点。它创建一个 `StdioServerTransport` 实例作为通信传输，并通过 `server.connect()` 方法将服务连接到这个传输上。

这里的 `get-installed-apps` 是我自己写的一个 npm 库，所以需要安装一下。

```bash
npm install get-installed-apps
```

## 打包服务

服务构建好之后，我们需要把这个服务打包，直接运行下面的命令就可以把服务构建好了。

```bash
npm run build
```

## 与 Claude 桌面客户端结合

如果要运行自己构建的 MCP 服务，我们需要结合 Claude 桌面客户端来验证自己的服务是否可以正常运行。

- 添加或者编辑配置文件 `claude_desktop_config.json`

路径在 `/Users/xxx/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "get-installed-apps": {
      "command": "node",
      "args": [
        "/Users/xxx/Documents/git/mcp-get-installed-apps/build/index.js"
      ]
    }
  }
}
```

其中 `/Users/xxx/Documents/git/mcp-get-installed-apps/build/index.js` 为你刚才构建后的服务的运行路径。

- 重启 Claude 桌面客户端：为了重载相关配置，导入服务。

![](https://cdn.nlark.com/yuque/0/2025/png/277039/1744128646666-12439960-142e-440b-bd96-6e1122e79e0a.png)

![](https://cdn.nlark.com/yuque/0/2025/png/277039/1744128672881-ab9b3ac9-4cdb-4675-b1a7-0cbada643052.png)

正常情况会载入这个 MCP 服务，然后问相应的问题就可以出现如下画面。

![](https://cdn.nlark.com/yuque/0/2025/png/277039/1744128719190-ab2c4617-9dcc-46df-887e-6dc5c0913be6.png)

上面的问题解决核心步骤大概如下：

1. 客户端将您的问题发送给 Claude
2. Claude 分析可用工具并决定使用哪种工具
3. 客户端通过 MCP 服务器执行所选工具
4. 执行结果返回给 Claude
5. Claude 组织自然语言响应

## 结语

在这个教程中我们开发了一个简单的 MCP 的服务，认识到了 MCP 服务的魔力，有了 MCP 服务后，AI Agent 客户端不再是简单的问答了，它可以处理很多特定的、比较复杂的场景，我们可以浅浅期待一下后面大规模的 MCP 的服务的出现和应用。
