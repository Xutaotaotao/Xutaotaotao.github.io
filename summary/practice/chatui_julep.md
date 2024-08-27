---
outline: deep
title: 教你一步步用 Julep + ChatUI 构建 AI 应用
titleTemplate: Julep ChatUI AI 实战
---

# 教你一步步用 Julep + ChatUI 构建 AI 应用

## 前言

从头开始创建一个 AI 应用程序可能是一项非常具有挑战性的任务。无论您是想构建一个简单的聊天机器人还是一个先进的智能虚拟助手，成功开发出理想的应用程序可能需要数周的时间。但是，这正是 Julep 能帮助我们的地方。
Julep 是一个帮助构建具备状态功能和功能性 LLM 驱动应用的平台。使用 Julep，您只需几行代码就可以构建一个功能齐全的 AI 应用程序。

像 OpenAI 的 GPT-3、微软的 Azure Bot Service 和谷歌的 Dialogflow 这样的平台都可以构建 AI 应用程序。然而，Julep 因其优势脱颖而出，例如能够跟踪对话历史和上下文的状态功能、与多种 LLM 的轻松集成以及用于管理用户、代理和会话的用户友好界面。

在这篇文章中，我们将创建一个 MovieCompanion，一个 AI 驱动的电影伴侣应用程序，它可以提供用户所询问的任何电影的推荐和信息。我们将逐步了解如何在您的项目中使用 Julep。让我们开始吧！

## 前置条件

确保您的设备上已安装 Node.js，从 Node.js 官方网站下载并安装 Node.js。

Node.js 官网：<https://nodejs.org/en>

了解 Julep：<https://github.com/julep-ai/julep/blob/dev/README-CN.md>

## 创建一个前端项目

要创建一个 React 应用程序，请在终端中运行以下命令：

```bash
pnpm create vite
```

你可以查看 Vite 文档来创建一个 React 应用。
安装 ChatUI 依赖：

```bash
pnpm add @chatui/core -D
```

在 App.tsx 文件中创建基本结构。添加一个 `<Chat>` 组件，允许用户输入问答：

```tsx
 <Chat
    navbar={{ title: "电影伴侣" }}
    messages={messages}
    renderMessageContent={renderMessageContent}
    quickReplies={defaultQuickReplies}
    onQuickReplyClick={handleQuickReplyClick}
    onSend={handleSend}
/>
```

有了整体的结构只需要完善几个方法就行：
首先是 `renderMessageContent`：

```tsx
function renderMessageContent(msg: MessageProps) {
    const { type, content } = msg;

    // 根据消息类型来渲染
    switch (type) {
      case "text":
        return <Bubble content={content.text} />;
      case "image":
        return (
          <Bubble type="image">
            <img src={content.picUrl} alt="" />
          </Bubble>
        );
      default:
        return null;
    }
  }
```

主要是利用 ChatUI 的方法，根据不用的消息渲染不同的消息展示。
然后是 `defaultQuickReplies`：

```tsx
// 默认快捷短语，可选
const defaultQuickReplies: Array<QuickReplie> = [
  {
    icon: "message",
    name: "来一部喜剧电影",
    isNew: true,
    isHighlight: true,
  },
  {
    name: "随便推荐一部电影",
    isNew: true,
  },
];
```

这是快捷回复选项，可以让用户进入应用就直接快速询问。
最核心的 `handleQuickReplyClick`：

```tsx
// 发送回调
  function handleSend(type: string, val: string) {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right",
      });

      setTyping(true);

      axios
        .post("http://127.0.0.1:3000/chat", {
          query:val
        })
        .then((res) => {
          const agentResponse = res.data.response;
          appendMsg({
            type: "text",
            content: { text: agentResponse },
          });
        })
        .catch(() => {
          appendMsg({
            type: "text",
            content: { text: "请求出了点问题，请重试～" },
          });
        });
    }
  }

  // 快捷短语回调，可根据 item 数据做出不同的操作，这里以发送文本消息为例
  function handleQuickReplyClick(item: QuickReplie) {
    handleSend("text", item.name);
  }
```

这里是输入的处理，然后和后端服务交互。
以下是完整的 App.tsx 代码：

```jsx
import Chat, { Bubble, useMessages, MessageProps } from "@chatui/core";
import axios from "axios";

const initialMessages = [
  {
    type: "text",
    content: { text: "主人好，我是您的贴心电影伴侣~" },
    user: {
      avatar: "//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg",
    },
  },
];

interface QuickReplie {
  icon?: string;
  name: string;
  isNew?: boolean;
  isHighlight?: boolean;
}

// 默认快捷短语，可选
const defaultQuickReplies: Array<QuickReplie> = [
  {
    icon: "message",
    name: "来一部喜剧电影",
    isNew: true,
    isHighlight: true,
  },
  {
    name: "随便推荐一部电影",
    isNew: true,
  },
];

const App = () => {
  // 消息列表
  const { messages, appendMsg, setTyping } = useMessages(initialMessages);

  // 发送回调
  function handleSend(type: string, val: string) {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right",
      });

      setTyping(true);

      axios
        .post("http://127.0.0.1:3000/chat", {
          query:val
        })
        .then((res) => {
          const agentResponse = res.data.response;
          appendMsg({
            type: "text",
            content: { text: agentResponse },
          });
        })
        .catch(() => {
          appendMsg({
            type: "text",
            content: { text: "请求出了点问题，请重试～" },
          });
        });
    }
  }

  // 快捷短语回调，可根据 item 数据做出不同的操作，这里以发送文本消息为例
  function handleQuickReplyClick(item: QuickReplie) {
    handleSend("text", item.name);
  }

  function renderMessageContent(msg: MessageProps) {
    const { type, content } = msg;

    // 根据消息类型来渲染
    switch (type) {
      case "text":
        return <Bubble content={content.text} />;
      case "image":
        return (
          <Bubble type="image">
            <img src={content.picUrl} alt="" />
          </Bubble>
        );
      default:
        return null;
    }
  }

  return (
    <Chat
      navbar={{ title: "电影伴侣" }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      quickReplies={defaultQuickReplies}
      onQuickReplyClick={handleQuickReplyClick}
      onSend={handleSend}
    />
  );
};

export default App;

```

下面是前端页面效果：
![FireShot Capture 068 - Vite + React + TS - 127.0.0.1.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b7bfdc4c36b484bb1f050ab3b6a4b4d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=860\&h=1864\&s=64636\&e=png\&b=f0f0f0)
客户端做好了，我们需要将 Julep 集成到我们的项目中，并能够对话，让我们开始集成吧。

## 安装依赖

为了完成电影伴侣应用程序，我们需要安装一些必要的库。这些库包括：

**express**- 用于创建和管理您的 Web 服务器

**julep SDK**- 用于与 Julep 提供的特定服务或 API 进行交互

**body-parser**- 用于解析传入的请求体，使处理客户端发送的数据更加容易

**cors**- 用于启用跨源请求，允许您的服务器处理来自不同域的请求

**dotenv**- 用于检索存储在`.env`文件中的值

**axios**- 一个基于 Promise 的 HTTP 客户端，用于 node.js 和浏览器

运行以下命令来安装这些库：

```bash
pnpm add express @julep/sdk cors body-parser dotenv axios -D
```

## 集成 Julep

要集成 Julep，我们需要一个 API 密钥。
访问 platform.julep.ai 并使用 Google 账号登录。复制位于右上角的 "YOUR API TOKEN"。
![下载 (2).png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9ebd3bc7bdc480cb77187d95bde82b4~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=4074\&h=1906\&s=286569\&e=png\&b=ffffff)
这个 API 令牌将作为你的 API 密钥。
在你的项目目录中创建一个 `.env` 文件，并粘贴以下代码：

    JULEP_API_KEY = "api_key"

将 `api_key` 替换为复制的 API 令牌。
在 `src` 目录中创建一个名为 `server.js` 的文件。所有 Julep 的代码都将在此文件中编写。
首先，我们将导入所需的库。

```javascript
import express from "express";
import julep from "@julep/sdk";
import bodyParser from "body-parser";
import cors from "cors";
import { fileURLToPath } from "url"; // 导入 fileURLToPath 函数
import path from "path";
import dotenv from "dotenv";
```

使用 Julep SDK 的 `Client` 类创建一个新客户端。此客户端与 Julep API 交互，并初始化代理、用户、会话、文档、记忆和工具的管理器。

```javascript
const apiKey = process.env.JULEP_API_KEY;
const client = new julep.Client({ apiKey });
```

现在，我们将创建一个 Express 应用实例作为后台服务器。使用 `bodyParser.json()` 配置应用自动解析传入的 JSON 请求，并使用 `cors()` 启用跨源资源共享 (CORS)，允许来自多个源的请求。

```javascript
const app = express();
app.use(bodyParser.json());
app.use(cors());
```

为 Express 应用的 `/chat` 端点设置一个异步的 POST 请求处理器。

```javascript
app.post("/chat", async (req, res) => {
  try {
    const query = req.body.query;
    // 现在，让我们创建用户、代理和会话以与 Julep API 进行交互。
  } catch (error) {
    res.status(500).send(error.message);
  }
});
```

在 `try` 块内，创建一个存储用户输入查询的 `query` 变量。

```javascript
try {
  const query = req.body.query;
  // 接下来，创建用户、代理和会话以与 Julep API 进行交互。
} catch (error) {
  res.status(500).send(error.message);
}
```

请根据需要继续完成与 Julep API 的交互代码。

#### 创建用户

用户对象代表与应用程序交互的实体，可以是真实的人或系统。每个使用 Julep 开发的 AI 应用程序都支持多个用户，每个用户都能够与代理进行交互。每个用户都是独立的，意味着他们有自己独特的身份和分配的角色。

用户是一个可选的实体，应用程序在没有定义用户的情况下也能正常运行。然而，建议为每个与代理交互的个人或系统创建用户档案，以便更好地组织和跟踪。特别是，添加一些关于用户的基本信息可以帮助应用程序更好地理解他们的行为，从而提供个性化的结果，以满足用户的偏好和需求。

在创建用户时，Julep 提供了 `users.create()` 方法，我们可以在客户端上使用该方法来创建用户。创建用户需要4个属性：

*   **Name**- 用户的姓名
*   **About**- 用户的简短描述
*   **Documents**- 按照用户需求格式化的文本形式的重要文件（可选）
*   **Metadata**- 应用程序中与用户相关的附加数据，超出 ID 范围（可选）

例如：

```javascript
const user = await client.users.create({
  name: "xiaohong",
  about: "Machine Learning Developer and AI Enthusiast",
  docs: [{"title": "AI Efficiency Report", "content": "...", "metadata": {"page": 1}}],  // 可选
  metadata: {"db_uuid": "1234"}, // 可选
});
```

现在，让我们为我们的电影伴侣应用程序创建一个用户：

```javascript
const user = await client.users.create({
   name: "Xiaoxu",
   about: "前端开发工程师",
});
```

在这里，我们创建了一个名为 xiaoxu 的用户，并且描述为前端开发工程师。

#### 创建 Agent

代理是用户与应用程序之间的智能接口，负责处理所有交互并增强用户体验。代理被编程为处理用户提出的查询，并提供定制的结果或建议。

代理包含了你希望在 AI 应用程序中使用的 LLM 模型的所有配置和设置。这使得应用程序能够执行特定任务，并满足用户的个人偏好。

这些代理可以简单到只是一个聊天机器人，也可以复杂到能够理解自然语言并执行复杂任务的高度智能助手。
与用户类似，Julep 包括 `agents.create()` 方法来创建代理。创建代理需要一组属性：

*   **Name**- 代理的名称
*   **About**- 代理的简短描述（可选）
*   **Instructions**- 代理需要遵循的指令列表（可选）
*   **Tools**- 代理执行任务的函数列表（可选）
*   **Model Name**- 代理将使用的 LLM 模型（可选）
*   **Settings**- LLM 模型的配置（可选）
*   **Documents**- 代理使用的重要文本格式文件，以改善其角色（可选）
*   **Metadata**- 除 ID 之外的附加信息，用于识别用户或代理（可选）

例如：

```javascript
const agent = client.agents.create(
  (name = "Cody"),
  (about =
    "Cody is an AI powered code reviewer. It can review code, provide feedback, suggest improvements, and answer questions about code."),
  (instructions = [
    "On every new issue, Review the issue made in the code. Summarize the issue made in the code and add a comment",
    "Scrutinize the changes very deeply for potential bugs, errors, security vulnerabilities. Assume the worst case scenario and explain your reasoning for the same.",
  ]),
  (tools = [
    {
      type: "function",
      function: {
        name: "github_comment",
        description:
          "Posts a comment made on a GitHub Pull Request after every new commit. The tool will return a boolean value to indicate if the comment was successfully posted or not.",
        parameters: {
          type: "object",
          properties: {
            comment: {
              type: "string",
              description:
                "The comment to be posted on the issue. It should be a summary of the changes made in the PR and the feedback on the same.",
            },
            pr_number: {
              type: "number",
              description:
                "The issue number on which the comment is to be posted.",
            },
          },
          required: ["comment", "pr_number"],
        },
      },
    },
  ]),
  (model = "gpt-4"),
  (default_settings = {
    temperature: 0.7,
    top_p: 1,
    min_p: 0.01,
    presence_penalty: 0,
    frequency_penalty: 0,
    length_penalty: 1.0,
  }),
  (docs = [{ title: "API Reference", content: "...", metadata: { page: 1 } }]),
  (metadata = { db_uuid: "1234" })
);
```

现在，让我们为我们的 Movio 应用程序创建一个代理：

```javascript
const agent = await client.agents.create({
  name: "Movie suggesting assistant",
  model: "gpt-4-turbo",
});
```

如你所见，在这个代理中我们使用了 gpt-4-turbo LLM 模型，但 Julep 支持多种 LLM 模型，你可以用它们来创建 AI 应用程序。查看文档以了解更多信息。

#### 创建会话

会话是用户与代理之间进行互动的实体。这是用户与代理之间互动的时间段。它作为整个互动的框架，包括来回的消息查询和其他相关细节。
会话记录了用户和代理之间交换的所有消息。这些记录帮助 AI 更好地理解正在进行的对话，并提供更个性化的回答。
要创建会话，我们可以使用 `sessions.create()` 方法。让我们来看一下它所需的属性：

*   **Agent ID**- 创建的代理的 ID
*   **User ID**- 创建的用户的 ID（可选）
*   **Situation**- 描述互动背景的提示
*   **Metadata**- 用于标识会话的除 ID 之外的附加信息

`situation` 属性在会话中起着至关重要的作用，因为它为互动或对话提供了上下文。这个情境帮助代理更好地理解和计算用户的查询，并提供更个性化的回复。
例如：

```javascript
// 假设 'client' 是一个包含 'sessions' 属性和 'create' 方法的对象
let session = client.sessions.create({
  agent_id: agent.id,
  user_id: user.id,
  situation: `
        You are James, a Software Developer, public speaker & renowned educator.
        You are an educator who is qualified to train students, developers & entrepreneurs.
        About you:
        ...
        Important guidelines:
        ...
    `,
  metadata: { db_uuid: "1234" },
});
```

现在，让我们为我们的 Movio 应用程序创建一个会话：

```javascript
const session = await client.sessions.create({
  agentId: agent.id,
  userId: user.id,
  situation: "你是一个电影伴侣。告诉人们他们想要的电影，并向用户推荐电影。",
});
```

在这里，`agentId` 和 `userId` 是我们之前创建的代理和用户的 ID，而 `situation` 是为互动提供的小上下文。

#### 获取响应消息

在创建用户、代理和会话之后，我们需要处理互动。我们将使用 `sessions.chat()` 方法来处理聊天互动并获取响应消息。
该方法需要两个属性才能运行——`session.id` 和一个包含 `messages` 数组的对象。

```javascript
const chatParams = {
  messages: [
    {
      role: "user",
      name: "Ayush",
      content: query,
    },
  ],
};
const chatResponse = await client.sessions.chat(session.id, chatParams);
const responseMessage = chatResponse.response[0][0].content;

res.json({ response: responseMessage });
```

这里，`chatParams` 对象包含 `messages` 数组，其中包括一个具有三个属性的对象：

*   **role**: 消息发送者的角色，"user"。
*   **name**: 用户的名字，"Ayush"。
*   **content**: 用户的查询，存储在变量`query`中。

然后，在 `client` 上调用 `sessions.chat()` 方法，传入 `session.id` 和 `chatParams` 作为参数。结果对象存储在 `chatResponse` 中。
从 `chatResponse` 中提取 `content` 属性的值，并将其存储在 `responseMessage` 中。

#### 处理错误

为了处理错误，我们将使用 `catch` 块来捕获错误并显示它。

```javascript
catch (error) {
  res.status(500).json({ error: error.message });
}
```

#### 启动服务器

要在本地启动服务器，我们使用 `app` 上的 `listen()` 方法指定端口号。

```javascript
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

这将在 `localhost:3000` 上托管服务器，并在控制台窗口中打印定义的字符串。
恭喜！你的 AI 应用程序已经成功创建。

#### 运行应用程序

项目已完成，我们将运行它并进行尝试。
要运行应用程序，首先，我们需要运行 `server.js` 文件以启动 Julep API，然后运行 React 应用以启动用户界面。
运行以下命令以启动服务器：

    node src/server.js

要运行 React 应用程序，运行以下命令：

    npm run dev

这将使你的项目在本地主机上运行。以下是项目的演示：
![FireShot Capture 070 - MovieCompanion - 127.0.0.1.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e86371832a624270a09ff2c804df35f9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=860\&h=1864\&s=148992\&e=png\&b=f2f1f1)
![截屏2024-06-26 10.02.05.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84c7ac94219747d084c73fd3cabca5cd~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=662\&h=1436\&s=232073\&e=png\&b=f5f4f4)


## 源码

<https://github.com/Xutaotaotao/movie-companion-app>

## 结语

通过结合使用 ChatUI 和 Julep，开发者可以快速构建一个具有交互式界面和强大 AI 后端支持的应用。这一过程涉及前端界面的设计和后端 AI 服务的集成，并通过 API 实现前后端的交互。

完成后，可以将应用部署到云端，方便用户访问和使用。这篇文章只是一个简单的入门教程，如果正式生产环境还需要一些调整和优化，希望大家可以通过本篇文章去创建一个属于自己的 AI 小应用。


