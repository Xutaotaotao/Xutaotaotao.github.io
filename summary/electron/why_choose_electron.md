---
outline: deep
title: 为什么选择Electron
titleTemplate: Electron实战
---

# 为什么选择Electron

## Electron的诞生
Electron（原名为Atom Shell）是GitHub开发的一个开源框架。它通过使用Node.js（作为后端）和Chromium的渲染引擎（作为前端）完成跨平台的桌面GUI应用程序的开发。Electron现已被多个开源Web应用程序用于前端与后端的开发，著名项目包括GitHub的Atom和微软的Visual Studio Code。

大概历史

- 2013年4月11日，Electron以Atom Shell为名起步。
- 2014年5月6日，Atom以及Atom Shell以MIT许可证开源。
- 2015年4月17日，Atom Shell改名为Electron。
- 2016年5月11日，1.0版本发布。
- 2016年5月20日，允许向Mac应用商店提交软件包。
- 2016年8月2日，支持Windows商店。
## 为什么学习桌面软件开发
现阶段基本上很多的日常工作都可以在浏览器上完成，浏览器提供了大家很多工作的便利机会，所以可以看到很多桌面端的软件都逐渐被Web替代，但是通过浏览器为用户提供服务的模式太被动了，用户主动来找你，你才可以为他提供服务；用户不找你，你就没有机会，也没有能力为用户提供服务，虽然浏览器也提供了部分原生Gui的能力， 但是这些能力都是非常有限的，如果想要更快捷多样的输入输出接口、更强劲的性能支持硬件、更加底层的接触操作系统，还是得靠桌面端的应用来为用户提供服务。

目前众多大厂都在开发桌面端，对于前端工程师，如果即会Web端开发又会桌面端开发，相对于自己来说又拓宽了一条路，如果深耕桌面端开发，将越来越接触底层的相关知识，日后跳槽，如果有桌面端开发经验，将是加分项。

## 为什么选择Electron
### 前端开发者入门快
Electron是一个使用 JavaScript、HTML 和 CSS 构建桌面应用程序的框架。 嵌入 Chromium 和 Node.js 到 二进制的 Electron 允许您保持一个 JavaScript 代码代码库并创建 在Windows上运行的跨平台应用 macOS和Linux——不需要本地开发经验，有了它，前端开发者就可以使用前端开发技术来开发桌面应用了。
![An image](/summary/electron/eletron-frame.png)


### 支持跨端&开发效率高
作为一个跨平台的桌面应用开发框架，Electron 的迷人之处在于，它是建立在 Chromium 和 Node.js 之上的 —— 二位分工明确，一个负责界面，一个负责背后的逻辑。虽然系统间还是会有很大的差异，需要相应地做一些额外处理，使得打包出的应用在不同系统下都能正常运转，但相比于 80% 都能完全复用的代码，这些时间和成本都是可以忽略的，开发效率直接翻倍，如果你开发一个不需要太关注底层的桌面端应用，基本不需要做底层的抹平逻辑。另外，Electron 是基于 Node.js 的，这就意味着，Node 这个大生态下的模块，Electron 都可以用。同时，跨平台也让 Electron 可同时开发 Web 应用和桌面应用，无论是 UI，还是代码，很多资源都可以共享，大幅减少了开发者的工作量。

![An image](/summary/electron/framework.jpeg)

一些跨端平台方案的比较：

![An image](/summary/electron/comparison.png)


生态繁荣&案例成熟
Electron生态的确很强大，各种库和工具包都为你构建一个桌面端应用提供了很多方案。看图，绝对的生态优势。

![An image](/summary/electron/github.jpeg)

![An image](/summary/electron/npm.jpeg)

当然，不止如此，现在用Electron做桌面的案例也非常成熟了。谁在用Electron：https://www.electronjs.org/apps

![An image](/summary/electron/apps.jpeg)


上面的图已经说明了Electron应用是有多广泛了，这其中不乏大名鼎鼎、如雷贯耳的应用，例如 Postman、Skype、VScode 等，而且我敢打赌，各位看官的电脑上一定安装过用 Electron 开发的应用，如果你用的是 Mac 电脑，请在命令行运行下面的命令来检测本地采用 Electron 技术开发的桌面软件：

```bash
for app in /Applications/*; do;[ -d  $app/Contents/Frameworks/Electron\ Framework.framework ] && echo $app; done
```

![An image](/summary/electron/command.jpeg)

果然Electron很火🔥，此时不用，更待何时？

## 总结
个人认为，如果有一种提高生产力的技术来解放双手，让你有额外的时间去学习更加炫酷的技能，何乐不为呢？对于前端工程师来说，掌握一项桌面端开发应用的技能也是一件可喜可贺的事情，为自己的职业生涯多一条选择的路。如果你想更加深入操作系统底层，其实Electron也是一个不错的选择，你可以利用Node来完成C++的扩张，也可以用Rust写一些底层的工具库供Node调用，这样你知识的深度和广度都会有相应的提升。

综上所述，可以给你为什么选择Electorn的原因了。
