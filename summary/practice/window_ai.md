---
outline: deep
title: Google 浏览器中的 AI 魔法 — window.ai （本地运行 AI 程序）
titleTemplate: Google AI 实战
---

# Google 浏览器中的 AI 魔法 — window.ai （本地运行 AI 程序）

## 前言
在浏览器中运行的设备端 AI 已经到来，它目前在 Chrome 的 Canary 版本中，这意味着不久之后它就会到来。在这篇文章中，我将向你展示如何在你的设备上运行它，这样你就可以尝试一下，并看看你能想到哪些应用场景。

我只想说：在没有互联网连接的情况下，从 DevTools 运行 window\.ai 非常有趣，哈哈哈哈🤣，让我们来玩玩看！

## 准备设置工作

### 下载 Chrome Canary

前往 Chrome Canary 网站并下载最新的Chrome Canary。
下载地址：<https://www.google.com/chrome/canary/>

### 启用 Gemini Nano 和 Prompt API

#### 1.打开Prompt API for Gemini Nano

打开 Chrome Canary 并在地址栏中输入“chrome://flags/”，然后按回车。
然后在顶部的搜索框中输入“prompt API”。
你应该看到“Prompt API for Gemini Nano”是唯一的选项。
将开关设置为“Enabled”，然后重启一下 Chrome。
![截屏2024-07-03 14.32.52.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/d7632f064d1a4e88a25e6438d5a7a570~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5b6Q5b6Q:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE0MDA0OTM5MjU1Njc4In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1725116115&x-orig-sign=ISOm9A2iKra%2BTC9wuDU76vo1we4%3D)

#### 2.打开optimization guide on device

在“chrome://flags”页面上，你需要启用第二个选项。
清除你之前的搜索，然后搜索“optimization guide on”。
你应该看到“Enables optimization guide on device”这个唯一选项。你需要启用它，选择“Enabled ByPassPerfRequirement”选项。然后再重新启动 Chrome。
这样就可以了，现在我们可以开始本地使用 AI 了！

![截屏2024-07-03 14.37.08.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/30f4ef826dcb4ee0aaec8673d62ef312~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5b6Q5b6Q:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE0MDA0OTM5MjU1Njc4In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1725116115&x-orig-sign=a%2BxP2oTVqF%2F60P14KG%2FUzmKGFh0%3D)

### 确认 Gemini Nano 可用性步骤如下：

1.  打开 Chrome 浏览器的开发者工具（DevTools）。
2.  在控制台（Console）中输入 `await window.ai.canCreateTextSession();` 并执行。如果返回 "readily"，则说明 Gemini Nano 可用。

如果返回结果不是 "readily"，则需要强制 Chrome 认可你要使用此 API：

1.  继续在 DevTools 控制台中输入 `await window.ai.createTextSession();` 并执行。这很可能会失败，这是预期的情况。
2.  重新启动 Chrome 浏览器。

接下来，确认 Gemini Nano 是否可用或正在下载：

1.  打开 Chrome 浏览器，输入 chrome://components 进入组件页面。
2.  确认在列表中看到 "Optimization Guide On Device Model"，其版本号应大于或等于 2024.5.21.1031。
3.  如果没有显示版本号，请点击 "Check for update" 强制下载更新。
4.  下载完成后，确认 Gemini Nano 的版本号大于指定版本。

有的可能打开没有这个选项，可以尝试登录Google账户，然后多重启几次浏览器，另外就是检查一下自己的电脑是否满足相应的要求。基本要求如下图所示：
![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/3b99b4d4dc1d4fd396b3980c90173b25~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5b6Q5b6Q:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE0MDA0OTM5MjU1Njc4In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1725116115&x-orig-sign=GUGHtgwq1ydJ0YaPVImqHn%2BHPcg%3D)
最后，在确认 Gemini Nano 下载和版本更新后，再次打开 DevTools 控制台，输入 `await window.ai.canCreateTextSession(); `进行确认。如果返回 "readily"，则表示 Gemini Nano 已经准备就绪。
![截屏2024-07-03 14.45.03.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/05c26838e6cc4f0daca3e54efeaba0dc~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5b6Q5b6Q:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE0MDA0OTM5MjU1Njc4In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1725116115&x-orig-sign=qCiTpdZIc2ebYN87TFYhT5RDmj4%3D)

## 使用 window\.ai

如果一切按预期进行，现在应该可以打开开发者工具（F12），进入“控制台”标签并开始操作了！
最简单的检查方法是输入 `window.` 并查看是否有 `ai` 作为选项。如果没有，请回去检查你是否遗漏了某个步骤！

### 创建我们的第一个会话

只需要一个命令就可以启动与 AI 模型的会话。

```javascript
const chatSession = await window.ai.createTextSession()
```

提示：不要忘记加上 `await`。
还有一个 `createGenericSession()` 的选项，但我还没搞清楚它们之间的区别！
现在我们可以使用该会话来提问。

### 发送提示

我们只需在 `chatSession` 对象上使用 `.prompt` 函数！

```javascript
const result = await chatSession.prompt("hi, 你的名字是什么")
```

再次强调，所有都是异步的，不要忘记 `await`。
根据提示的复杂性和硬件配置，这可能需要几毫秒到几秒钟，但最终你应该在控制台看到 `undefined` 表示完成。

### 获取响应

现在我们只需输出 `result` 即可！

```javascript
console.log(result)
```

然后我们得到：
![截屏2024-07-03 14.47.25.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/ebe4e659fb11463ea865d01b58bbdf51~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5b6Q5b6Q:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE0MDA0OTM5MjU1Njc4In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1725116115&x-orig-sign=p1InniGrJldooJ1pBkrklMSHn6o%3D)
虽然有点令人失望，但至少它工作了！

### 快速可复用示例

显然，你不想每次都发送多个命令，所以你可以将此函数复制并粘贴到控制台中以简化操作：

```javascript
async function askLocalGPT(promptText){
  if(!window.chatSession){
    console.log("starting chat session") 
    window.chatSession = await window.ai.createTextSession()
    console.log("chat session created") 
  }
  return console.log(await window.chatSession.prompt(promptText)) 
}
```

现在你只需在控制台中输入 `askLocalGPT("提示文本")` 即可。
我个人将其保存为 Sources > snippets 中的一个片段，以便快速访问。

### 真的不好用吗？

这取决于你的标准。如果你将其与 Claude 或 ChatGPT 进行比较，那它确实很糟糕。但是，对于本地玩耍和实验来说，它非常棒！还要记住，每次提问时，它不会自动记住你之前的问题。
所以，如果你想进行一个模型“记住”之前对话的对话，你需要将之前的问题和答案与新问题一起输入。

### 好玩吗？

还可以吧。我可以在浏览器中本地运行它，这非常酷。它还能处理简单的编码问题等，它可以结合前端做一些事情。比如下面的例子，可以输出一些内容，但是感觉表达还是不够流畅，总结也不够全面，但是真的很好玩，哈哈哈。

```javascript
askLocalGPT(`帮我总结一下下面这些内容:${document.querySelector('main').textContent.toString()}`)
```

![截屏2024-07-03 15.10.08.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/3496ef51442548edbe0cd077fef144b7~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5b6Q5b6Q:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE0MDA0OTM5MjU1Njc4In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1725116115&x-orig-sign=KXOs8Sz21kuBruTOoMYRkdfPlX4%3D)

### 你会创建什么？

我刚刚触及了新 API 的表面，但我能看到它在创建“自定义 GPT”方面的巨大便利。在未来，当 AI 在浏览器中对所有人开放时，谁知道会创造出什么惊人的东西，比如和前端应用深度结合做一些开发，或者一些数据的处理，文本的处理，图片的处理都交给AI库，谁知道呢？

## 结语

在浏览器中本地使用人工智能确实是一种令人兴奋的新应用场景。这种能力的开放为开发者带来了无限可能，特别是在处理前端业务逻辑方面。尽管目前在浏览器中使用人工智能还面临一些流畅性和性能方面的挑战，但这无疑是未来发展的一个重要方向。

随着技术的进步和浏览器厂商的持续努力，我们有理由期待将来更多浏览器将提供AI底层能力给应用层调用。这种趋势不仅为开发者创造了更多创新的空间，也为用户带来了更加智能和个性化的在线体验。未来，随着AI技术的进一步成熟和普及，我们有望看到浏览器成为一个强大的AI应用平台，为各种业务场景提供智能化的解决方案。
