---
outline: deep
title: 前端研发链路之包管理器
titleTemplate: 前端知识图谱
---

# 前端研发链路之包管理器

<ClientOnly>
<Graph  type="packageManager" />
</ClientOnly>

大家好，我是徐徐。今天和大家一起聊聊前端研发链路之包管理器。

## 前言
在现代前端开发中，包管理工具是不可或缺的一部分。随着前端研发链路的不断演进，项目变得愈发复杂，对高效管理依赖项的需求也日益增加。包管理工具的出现，极大地简化了对外部库、框架和依赖项的管理和安装过程，使开发者能够专注于核心业务逻辑的实现。

本文将探讨当前前端开发中最常用的三种包管理工具：Npm、Yarn 和 Pnpm。通过分析它们的背景、优缺点和使用场景，帮助开发者在前端研发链路中选择最适合自己项目的包管理工具，以提升开发效率和项目的稳定性。

## 什么是包管理器？
包管理器是简化管理和安装 Web 应用所需的外部库、框架和依赖项的工具。它自动化了这些包的获取、安装和版本控制，从而让开发者能够专注于构建应用，而不是手动管理依赖项。

在前端开发生态系统中，常用的包管理器包括 Npm（Node Package Manager）、Yarn 和 Pnpm。

## 它们解决的问题
+ **依赖管理**：自动安装外部库。解析和管理依赖项，提升开发效率。
+ **版本控制**：确保一致的依赖版本。允许轻松更新，同时保持向后兼容性。
+ **集中仓库**：提供在线的包目录。简化包的发现、文档访问和社区评分。
+ **包脚本**：定义构建、测试和部署等自动化任务，优化开发工作流。
+ **自定义配置**：通过配置文件定制包管理器的行为。
+ **生态系统和社区支持**：访问大量开源包。社区驱动的维护、更新和支持。

## 包管理器的组成部分
包管理器是前端开发中用于管理依赖、自动化任务和简化工作流的重要工具。下面是组成包管理器的关键组件。

+ **package.json**：包配置文件定义项目的元数据、依赖项和脚本。它包含项目信息如名称、版本、描述以及所需的依赖列表。可以查看 Npm 的 [package.json 文档](https://docs.npmjs.com/files/package.json) 了解详细信息。
+ **依赖管理**：package.json 中的依赖部分指定了项目所需的外部库和框架，包括每个包的名称和相应的版本范围或特定版本。
    - **dependencies**：应用运行所需的依赖。它们在生产环境中安装。例如，一个使用 Express 框架的 Web 应用需要 express 包来处理服务器端路由。
    - **devDependencies**：开发过程中使用的依赖，不在生产环境中必需。通常包括工具、测试框架和其他开发相关的依赖。例如，Jest 测试库被列为 devDependency，用于在开发过程中进行单元测试。
    - **peerDependencies**：消费者项目必须安装的依赖。当一个包期望在消费者环境中存在特定版本的另一个包时使用。例如，一个库 my-library 需要消费者项目中安装特定版本的 react。通过在 package.json 中列出 react 作为 peerDependency，my-library 确保安装正确版本的 react，从而保证兼容性和正常运行。

## 语义化版本控制
语义化版本控制（SemVer）是一种版本控制方案，遵循 MAJOR.MINOR.PATCH 格式，分别表示向后兼容的变化、新特性和错误修复。SemVer 允许开发者定义版本范围或指定精确版本，以确保兼容性和有效地管理更新。  
例如：

+ `^1.2.3`：允许从 1.2.3 到但不包括 2.0.0 的任何兼容版本。
+ `~1.2.3`：允许从 1.2.3 到但不包括 1.3.0 的任何兼容版本。
+ `1.2.3`：指定精确版本，确保项目使用该特定版本的依赖。

SemVer 帮助包管理器准确解析依赖，确保安装兼容的版本，避免破坏性更改或冲突。

## 脚本功能
package.json 中的 scripts 部分允许开发者定义自定义命令，用于自动化各种任务。这些脚本可以通过包管理器的 CLI 执行，方便构建、测试、代码检查和部署过程。

## 依赖解析
包管理器处理依赖解析，以确保项目中包的版本一致且兼容。通过有效利用依赖树和锁文件，包管理器确保依赖解析的可靠性和一致性，从而实现稳定且可重复的开发环境。

+ **依赖树**：依赖树表示项目依赖及其相互依赖的层次结构。它可视化包之间的依赖关系，有助于管理冲突和版本约束。  例如：

```plain
- Project
  - Package A@1.0.0
    - Package B@^2.0.0
      - Package C@^1.1.0
  - Package D@~2.5.0
    - Package E@^3.0.0
```

+ **锁文件**：锁文件（如 Npm 的 package-lock.json，Pnpm 的 Pnpm-lock.yaml 或 Yarn 的 yarn.lock）在依赖解析中起关键作用。它们记录了已安装包及其依赖的确切版本，确保可重复性，防止后续安装过程中发生意外更改。  例如：

```json
{
  "name": "project-name",
  "version": "1.0.0",
  "lockfileVersion": 2,
  "dependencies": {
    "package-a": {
      "version": "1.0.0",
      "requires": {"package-b": "^2.0.0"}
    },
    "package-b": {
      "version": "2.1.1",
      "requires": {"package-c": "^1.1.0"}
    },
    "package-c": {"version": "1.2.3"}
  }
}
```

锁文件确保项目依赖的后续安装基于相同版本，避免由于版本变化引起的不一致和意外行为。

## 包安装
包管理器处理包的安装和从中央仓库的获取。

+ **注册表**：包管理器的注册表作为包的集中仓库。它包含大量开源库和框架，开发者可以访问并将其包含在项目中。注册表允许包管理器获取和下载包，解析依赖并管理版本。  例如：
    - Npm 使用默认的 Npm 注册表（registry.Npmjs.org）。
    - Yarn 使用默认的 Yarn 注册表（registry.yarnpkg.com）。
    - Pnpm 使用默认的 Npm 注册表（registry.Npmjs.org）。
+ **缓存**：包管理器通常维护已下载包的本地缓存。缓存加快后续安装速度，减少对网络请求的依赖，通过本地存储包实现。

## 命令行界面
包管理器的 CLI 提供命令行界面与工具功能进行交互。

+ **CLI命令**：包管理器提供多种命令执行常见任务，如安装包、更新依赖、执行脚本和管理包管理器配置。例如，`Npm install` 或 `yarn upgrade`。
+ **自定义**：CLI 允许开发者通过配置文件自定义包管理器行为。这些文件使开发者能够定义设置，如包来源、认证凭据和代理配置。  例如，Npm 使用 `.Npmrc` 文件自定义配置。开发者可以在此文件中指定设置，如注册表 URL、认证令牌和代理配置。类似地，Yarn 使用 `.yarnrc` 文件配置各种选项。  例如：

```plain
# .Npmrc
# Custom registry source
registry=https://my-custom-registry.com/
 
# Authentication token
//my-custom-registry.com/:_authToken=1234567890
 
# Proxy settings
https-proxy=http://proxy.example.com/
http-proxy=http://proxy.example.com/
```

通过修改这些配置文件，可以根据项目要求定制包管理器行为，例如使用自定义注册表、应用认证令牌或配置代理设置。

## Npm、Yarn 和 Pnpm 对比
包管理器在软件项目的开发和管理中发挥了重要作用。下面是对三个流行的包管理器——Npm、Yarn 和 Pnpm 的简要历史和演变的探索。

### Npm
Npm（Node Package Manager）于 2010 年作为 Node.js 的默认包管理器创建。它是前端社区中使用最广泛的包管理器。Npm 附带在 Node.js 中，并提供了一个庞大的包生态系统。使用 Npm 安装依赖项非常简单，只需运行 `Npm install`。

Npm 因 Node.js 作为流行的 JavaScript 运行时环境的兴起而迅速流行。Npm 注册表成为开源包的首选来源，促成了庞大库和框架生态系统的增长。

**优点**：

+ 广泛采用的包管理器，具有庞大的包生态系统。
+ Node.js 的默认包管理器，在前端社区中广泛使用。
+ 活跃的社区支持和频繁的包更新。

### Yarn
Yarn 由 Facebook 于 2016 年开发（虽然现在不再由 Facebook 运营），作为对 Npm 某些限制和挑战的回应。  
Yarn 引入了并行包安装，显著提高了安装速度。通过锁文件（yarn.lock）实现了确定性的依赖解析，确保不同环境中的一致安装。

它还引入了缓存依赖项，使 Yarn 能够进行离线安装，允许开发者在没有互联网连接的情况下安装包。最后，它带来了即插即用功能，使包在不显式安装的情况下使用，减少磁盘空间占用，加快开发过程。

**优点**：

+ 通过并行安装和全局包缓存优化性能。
+ 支持在单个仓库中管理多个包的工作区。
+ 即插即用（PnP）功能使包在不显式安装的情况下使用，减少磁盘空间占用。

### Pnpm
Pnpm 于 2016 年推出，通过优化磁盘空间使用和安装时间与众不同。它还提供了对 monorepos 和工作区的优秀支持，使得在单个仓库中管理多个包变得高效。与 Npm 和 Yarn 不同，Pnpm 是注册表无关的，允许开发者配置和使用任何兼容的注册表作为包来源。

Npm 和 Yarn 的早期版本将依赖项存储在项目特定的 node_modules 目录中。这意味着当多个项目具有相同或重叠的依赖项时，每个项目最终都会有这些依赖项的副本，导致包的显著重复。  
Yarn 的更新版本通过其即插即用功能解决了这个问题。

**优点**：

+ 通过共享依赖的独特方法减少磁盘空间使用。
+ 通过使用硬链接和符号链接加快安装时间。
+ 对 monorepos 和工作区提供出色支持。
+ 注册表无关，允许配置和使用任何兼容的注册表作为包来源。

### 整体对比表
| 名称 | Npm | Yarn | Pnpm |
| --- | --- | --- | --- |
| 普及度 | 高 | 高 | 增长中 |
| 生态系统 | 大 | 大 | 扩展中 |
| 依赖管理 | package.json | package.json | package.json |
| CLI | 全面 | 类似于 Npm | 类似于 Npm |
| 包脚本 | ✅ | 不特定 | 不特定 |
| 注册表 | Npm registry | Yarn registry | 可自定义 |
| 速度 | 中等 | 快 | 非常快 |
| 锁文件 | package-lock.json | yarn.lock | Pnpm-lock.yaml |
| 性能 | 中等 | 快 | 非常快 |
| 磁盘空间 | 中等 | 中等 | 低 |
| 离线支持 | 有限（通过 Npm ci） | ✅ | ✅ |
| 并行安装 | ❌ | ✅ | ✅ |
| 工作区 | ✅（自 Npm 7） | ✅ | ✅ |
| 即插即用（PnP） | ❌ | ✅ | ❌ |
| Monorepo 支持 | ❌ | ✅ | ✅ |
| 社区支持 | 活跃 | 活跃 | 增长中 |


## 结语
 选择合适的包管理工具对于前端开发的高效性和项目的稳定性至关重要。Npm 作为历史最悠久的包管理器，拥有庞大的社区和丰富的包资源，适合大多数开发者。Yarn 通过并行安装、确定性依赖解析和离线支持等特性，显著提升了开发效率。而 Pnpm 以独特的依赖共享方法和对 monorepos 的优异支持，进一步优化了磁盘空间使用和安装速度。

无论是选择 Npm、Yarn 还是 Pnpm，都需要根据项目的具体需求和开发团队的习惯来做出最佳决策。通过了解各包管理工具的特点和优势，开发者可以更好地管理项目依赖，提升开发效率，确保项目的稳定运行。
