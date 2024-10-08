---
outline: deep
title: 前端研发链路之脚手架
titleTemplate: 前端知识图谱
---

# 前端研发链路之脚手架

<ClientOnly>
<Graph  type="scaffold" />
</ClientOnly>

大家好，我是徐徐。<font style="color:rgb(0, 0, 0);">今天我们来聊聊前端研发链路中的脚手架。</font>

## 前言
在前端开发中，研发链路的流畅与高效直接关系到项目的成败。一个好的研发链路不仅能提升开发效率，还能确保代码质量和项目的一致性。而在这个链路中，脚手架工具扮演着至关重要的角色，它能帮助开发者快速搭建项目结构，简化复杂的配置，甚至提供最佳实践的指导。



我们几乎每个项目都会用到脚手架这个玩意，但是很多时候就停留在使用的层面，没有去了解它的整个面貌，这篇文章就带你了解一下脚手架的方方面面。

## 什么是脚手架
脚手架，顾名思义，是搭建在建设中的建筑外部的临时结构，在前端开发中，脚手架工具同样是一种辅助工具。它能帮助开发者快速初始化项目，生成必要的文件和目录结构，配置开发环境。



脚手架工具在前端开发中已经成为不可或缺的一部分，尤其是在项目初期，它能大大减少重复劳动，让开发者专注于业务逻辑的实现。

## 脚手架的发展历史
可以大概看一下前端构建的发展历史，大概如下图所示。

![画板](/img/scaffold1.jpg)

从上面这张图不仅仅展示了前端构建的发展使，也可以展现出前端脚手架工具的历史的演变。

+ 早期的 Web 开发

在 Web 开发的早期阶段，开发者通常手动创建和配置项目。由于没有标准化的工具，每个项目的配置和结构都不一样，这导致了开发效率低下和代码不一致的问题。

+ 脚手架的雏形

在Node构建的时代就有脚手架的雏形了，开发者们会写一些自定义脚本去初始化一个项目，只是当时npm的生态还不够繁荣，没办法工程化的去做一些事情。

+ 脚手架工具的诞生

随着 Web 应用的复杂性增加，开发者开始寻求更高效的解决方案。于是，脚手架工具应运而生。最早的脚手架工具之一是 Yeoman，它通过生成器帮助开发者快速创建项目结构并自动配置开发环境。

+ 现代脚手架工具

随着 JavaScript 框架和库的发展，针对特定框架的脚手架工具也逐渐出现。例如，Create React App、Vue CLI 和 Angular CLI。这些工具不仅简化了项目初始化，还提供了一系列开发工具和最佳实践，极大地提升了开发效率。

## 脚手架的工作原理
![](/img/scaffold2.png)

这张图是一个脚手架的基本的工作原理，其中核心部分有以下几个：

+ **模板系统**

脚手架工具通常内置了多种项目模板。模板系统的核心在于提供预定义的文件结构和代码片段，这些模板通常基于最佳实践编写。通过模板系统，开发者可以快速生成一个初始项目，而无需从头开始编写基础代码。  
**例子**：Create React App 内置了一个标准的 React 项目模板，包括 `src` 目录、`public` 目录、以及基础的 Webpack 和 Babel 配置。



+ **命令行交互**

大多数脚手架工具通过命令行界面（CLI）与开发者进行交互。CLI 提供了一系列命令和选项，开发者可以通过输入特定命令来执行各种操作，如创建项目、添加依赖、启动开发服务器等。  
**例子**：使用 Vue CLI 创建一个新项目的命令：

```javascript
vue create my-project
```



+ **依赖管理**

脚手架工具会自动为项目安装必要的依赖库。这通常通过包管理工具（如 npm 或 yarn）来实现。脚手架工具会读取模板中的依赖配置文件（如 `package.json`），并自动安装所有列出的依赖项。  
**例子**：在创建 React 项目时，Create React App 会自动安装 React、React-DOM 等依赖库。



+ **配置文件生成**

根据开发者的选择和模板的预设，脚手架工具会生成相应的配置文件。这些配置文件通常包括打包工具（如 Webpack）、编译器（如 Babel）、代码检查工具（如 ESLint）等的配置。  
**例子**：使用 Angular CLI 创建项目时，会生成一个包含 Angular CLI 配置的 `angular.json` 文件。



+ **代码生成与自定义脚本**

脚手架工具不仅限于生成初始项目结构，还能在开发过程中通过命令生成特定的代码片段或文件。例如，Angular CLI 可以生成组件、服务等代码，Create React App 支持添加自定义脚本。  
**例子**：使用 Angular CLI 生成一个新组件的命令：

```javascript
ng generate component my-component
```



+ **插件和扩展机制**

现代脚手架工具通常支持插件和扩展，允许开发者根据项目需求添加额外的功能或修改默认配置。这种机制极大地提高了脚手架工具的灵活性和可扩展性。  
**例子**：Vue CLI 的插件系统，开发者可以通过命令添加如 Vue Router、Vuex 等插件：

```javascript
vue add router
```

## 脚手架解决的问题
在谈到一个东西的时候，我们必须会想到这个东西产生的意义，也就是解决的实际的问题，下面简单总结了几点：

+ 项目初始化效率低下

一个新的前端项目，从无到有的过程往往需要花费大量时间在环境搭建和配置上。脚手架工具通过预设模板和自动化配置，能够在几分钟内完成这些繁琐的工作，大大提升了开发效率。

+ 项目结构不一致

在团队协作中，不同开发者可能会有不同的项目结构和命名习惯，导致代码难以维护。脚手架工具通过统一的项目模板，确保了项目结构的一致性，方便团队协作和代码管理。

+ 配置复杂且易出错

现代前端开发需要配置各种工具和库，如打包工具、编译器、代码检查工具等，配置过程复杂且易出错。脚手架工具通过自动生成配置文件，减少了人为错误的可能性，让开发者更加安心。

+ 技术选型困难

在众多前端技术栈中做出选择并不是一件容易的事。脚手架工具通常会提供多种技术选项，并根据项目需求推荐最佳实践，帮助开发者快速做出决策。



当然除了上面所提到的一些前端工程上的问题，其实它也可以解决一些实际的问题，比如：

+ JS 压缩和合并
+ 转译 ECMA6、ES2015、CoffeeScript 等
+ 图像压缩
+ 文件版本控制
+ 本地开发服务器（包括文件监听用于实时重载）
+ 测试运行
+ 代码检查
+ 依赖注入
+ CSS 供应商前缀

## 常见的前端脚手架工具
现在再说说我们常见的一些脚手架工具吧。

+ Create React App

这是 React 官方提供的脚手架工具，旨在快速创建一个配置好的 React 项目，支持热更新、代码分割等功能。

+ Vue CLI

Vue.js 官方的脚手架工具，支持 Vue 的各种特性，并且提供了插件机制，可以灵活扩展。

+ Angular CLI

Angular 官方的脚手架工具，支持 Angular 项目的创建、构建、测试等一站式解决方案。

+ Yeoman

一个强大的脚手架工具，可以通过社区提供的各种生成器创建不同类型的项目。

+ Vite

<font style="color:rgb(0, 0, 0);">下一代的前端工具链, 现阶段前端界的明星。</font>

+ 自定义脚手架

对于有特定需求的项目，开发者可以创建自己的脚手架工具，定制化地满足项目需求。

## 如何使用脚手架
基本上每个脚手架文档都会有相应的说明，但是大概不会逃出以下三个范围：

+ **基本使用步骤**

使用脚手架工具通常分为以下几个步骤：

1. 安装脚手架工具（通常通过 npm 或 yarn）。
2. 通过命令行界面选择项目模板并初始化项目。
3. 根据项目需求配置必要的选项和依赖。
+ **常见命令和选项**

每个脚手架工具都有自己的一套命令和选项，通常包括项目创建、依赖安装、开发服务器启动、项目构建等。

+ **自定义配置**

大多数脚手架工具都支持自定义配置，开发者可以根据项目需求修改配置文件，满足特定的需求。

## 脚手架的优势
说到优势，其实跟上面提到的解决的问题有点类似，但是出发点不太一样，不得不说在现代前端开发的过程中，脚手架的确非常有优势，帮我们节省了很多时间，这里总结了下面几个优点：

+ 提高开发效率

脚手架工具能极大地缩短项目初始化时间，让开发者更快进入开发状态。

+ 保持项目结构一致性

通过统一的项目模板和配置，确保了项目结构的一致性，方便团队协作。

+ 促进最佳实践

脚手架工具通常会内置一些最佳实践的配置和代码，帮助开发者遵循最佳实践。

+ 降低学习曲线

新手开发者可以通过使用脚手架工具，快速上手项目开发，减少学习成本。

## 脚手架的潜在问题
不过一个东西的产生肯定会带来两面性，只是它的优点往往大于了其潜在的一些问题，这里总结了几个小小的问题供大家参考。

+ 过度依赖的风险

过度依赖脚手架工具可能导致开发者忽视底层原理，难以解决复杂问题。建议在使用脚手架的同时，多了解底层技术和原理，提升自身能力。

+ 缺乏底层理解的问题

脚手架工具自动生成的配置文件和代码可能不易理解，开发者需要花时间去学习和理解这些配置，以便在出现问题时能及时解决。

+ 如何平衡使用脚手架和理解原理

合理使用脚手架工具的同时，不要忽视对底层技术的学习。可以通过阅读官方文档、源码和相关书籍，提升对底层技术的理解。

  
上面说到的三个问题其实大部分人都是非常容易忽视的，大家都习惯了唾手可得的东西，然后忘记了去了解事物的本质，当然如果你只是想当个使用者，其实也无需去了解这些底层的逻辑，但是如果你想成为专家级别的人物，那肯定是需要去了解内部原理的，因为在日常的开发中，非常有可能随着业务的发展，为了解决一些特定的场景，会自研脚手架。

## 脚手架在前端研发链路中的未来发展
其实下面三个点大部分脚手架都在朝他们发展，这里只是简单提一下。

+ 与其他工具的集成

未来的脚手架工具将会更加注重与其他开发工具的集成，如持续集成、测试工具等，提供一站式解决方案。

+ 智能化和个性化趋势

随着人工智能的发展，脚手架工具也将变得更加智能化，能够根据项目需求自动推荐最佳配置和实践。同时，个性化定制将更加灵活，满足不同项目的特殊需求。

+ 跨平台开发支持

未来的脚手架工具将不仅限于 Web 开发，还会支持移动端、桌面端等多平台开发，提供全方位的解决方案，其实现在已经有这样的脚手架了，但是相对来说还不够完善。

## 结语
脚手架工具在前端开发中起着至关重要的作用，它不仅提高了开发效率，还确保了项目结构的一致性，促进了最佳实践的应用。在使用脚手架工具的过程中，开发者也要注意提升对底层技术的理解，做到工具和技术双管齐下。希望这篇文章能帮助你更好地理解和使用前端脚手架工具，在实际项目中充分发挥它们的优势。

