---
outline: [1,2]
title:  CI/CD 自动构建发布 Tauri 桌面端应用
titleTemplate: Tauri应用开发实践指南
---

大家好我是徐徐。今天主题是如何使用 CI/CD  自动构建发布 Tauri 应用。

# 前言

Tauri 是一个跨平台的客户端框架，体积小而且很精悍，如果做个人应用，再合适不过了。不过要想丝滑的发布自己的应用，还需要想想办法，不可能每次发布都依赖自己的本地环境去做打包发布变更，主要原因是你很难做到同时拥有多种操作系统的设备。为了解决这个问题，最近研究了一下如何用 CI/CD 去打包构建和发布 Tauri 应用，让这种桌面客户端的发布如 Web 端的发布一样简单流畅。

# CI/CD 流程概述

这里先简单概述一下 CI/CD 的流程，因为有的小伙伴不一定知道 CI/CD 。
![](/img/yuque_diagram(6).jpg)
上图是一个最简单的CI / CD的流程图，大概逻辑就是开发者提交代码之后版本控制系统（如 Git）触发CI / CD流程，通过代码检出，构建应用等关键动作自动化完成整个发布。当然在一些工程化的体系中还可能加很多其他节点，比如代码分析，各种测试(单元测试、集成测试、性能测试等)，发布卡点设计，发布通知等，不过我们这里只实现最核心的流程节点。

# 选择 CI/CD 工具

上面讲到了 CI/CD 的基本流程，我们现在需要了解几个常见的 CI/CD 工具，然后根据自己的场景去选择合适的工具完成相应的工作，下面几个常见的工具可供大家选择。

## GitHub Actions

*   网址：<https://docs.github.com/en/actions>
*   优点：
    *   与GitHub仓库紧密集成
    *   配置简单，使用YAML文件
    *   免费计划对开源项目很慷慨
    *   支持多种操作系统，适合跨平台应用构建
*   缺点：
    *   私有仓库的免费额度有限
    *   与GitHub绑定，不适合使用其他代码托管平台的项目

## GitLab CI

*   网址：[https://docs.gitlab.com/ee/ci](https://docs.gitlab.com/ee/ci/)
*   优点：
    *   与GitLab平台无缝集成
    *   提供完整的DevOps生命周期工具
    *   可以自托管，也有云服务选项
    *   配置灵活，使用YAML文件
*   缺点：
    *   学习曲线可能比GitHub Actions稍陡
    *   自托管时需要管理自己的运行器

## Jenkins

*   网址：[https://www.jenkins.io](https://www.jenkins.io/)
*   优点：
    *   高度可定制，插件生态系统丰富
    *   可以处理复杂的构建和部署流程
    *   支持各种版本控制系统和构建工具
    *   完全自托管，适合对数据安全性要求高的场景
*   缺点：
    *   设置和维护相对复杂
    *   需要自己管理服务器和资源
    *   用户界面相对陈旧

三个工具我都用过，用得最多的是 GitHub Actions，其余两个有会在工作中用到，企业级的应用基本都会用到Gitlab CI 或者 Jenkins。如果是个人应用或者开源项目，可以无脑选择 GitHub Actions，免费好用，支持的环境多样，而且配置门槛低，所以我选择 GitHub Actions。

# 为 Tauri 应用配置 CI/CD

在进行配置前，我们需要梳理一下整个构建的动作，这里的构建动作就跟我们本地开发一样，但是更加细致化一些，大概的流程如下。
![](/img/yuque_diagram(7).jpg)
上面提到的步骤，我们需要用 GitHub Actions 的脚本来实现，下面我们就来看看具体的实现。

```yaml
name: Build and release
on:
  push:
    branches: [feature-testci]
  workflow_dispatch:

jobs:
  release:
    permissions:
      contents: write
      actions: write
      attestations: write
      deployments: write
      packages: write
      id-token: write
    strategy:
      fail-fast: false
      matrix:
        platform: [macos-latest, windows-latest]
    runs-on: ${{ matrix.platform }}

    steps:
      # 检出存储库
      - name: Checkout repository
        uses: actions/checkout@v4

      # 设置 rust 环境
      - name: Rust setup
        uses: dtolnay/rust-toolchain@stable

      # rust 缓存
      - name: Rust cache
        uses: swatinem/rust-cache@v2
        with:
          workspaces: './src-tauri -> target'
      
      # 设置 node 环境
      - name: Sync node version and setup cache
        uses: actions/setup-node@v4
        with:
          node-version: 'lts/*'

      # 全局安装pnpm
      - name: Install pnpm
        run: npm install -g pnpm
      
      # 安装前端依赖
      - name: Install frontend dependencies
        run: pnpm install

      # 构建应用
      - name: Build the app
        uses: tauri-apps/tauri-action@v0

        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tagName: ${{ github.ref_name }}
          releaseName: 'XTools v__VERSION__'
          releaseBody: 'See the assets to download and install this version.'
          releaseDraft: true
          prerelease: false
```

我大概解释一下整个脚本的意思。

*   名称和触发条件

```yaml
name: Build and release
on:
  push:
    branches: [feature-testci]
  workflow_dispatch:
```

这个工作流的名称是 "Build and release"。它会在两种情况下触发：

1.当推送的分支为 feature-testci 时

2.通过手动触发（workflow\_dispatch）

*   作业定义

```yaml
jobs:
  release:
    permissions:
      contents: write
      actions: write
      attestations: write
      deployments: write
      packages: write
      id-token: write
    strategy:
      fail-fast: false
      matrix:
        platform: [macos-latest, windows-latest]
    runs-on: ${{ matrix.platform }}
```

定义了一个名为 "release" 的作业。权限有6个写的权限，使用矩阵策略在 macOS 和 Windows 最新版本上运行。

*   步骤:
    *   检出仓库：使用 actions/checkout\@v4 action 来获取代码。
    *   设置 Rust 环境：使用 dtolnay/rust-toolchain\@stable 来设置稳定版的Rust。
    *   Rust 缓存：使用 swatinem/rust-cache\@v2 来缓存Rust依赖，加速后续构建。
    *   设置 Node环境：使用 actions/setup-node\@v4 来设置最新的LTS版本Node.js。
    *   安装 pnpm：全局安装pnpm包管理器。
    *   安装前端依赖：使用 pnpm安装项目的前端依赖。
    *   构建应用：使用 tauri-apps/tauri-action\@v0 来构建Tauri应用。这一步也负责创建GitHub release，上传构建的应用作为release资产。
*   发布配置:

```yaml
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
with:
  tagName: ${{ github.ref_name }}
  releaseName: 'XTools v__VERSION__'
  releaseBody: 'See the assets to download and install this version.'
  releaseDraft: true
  prerelease: false
```

这部分配置了发布的详细信息，包括使用的 GitHub 令牌、标签名、发布名称、发布说明等，这里用作测试，创建一个草稿版本，不是预发布版本。

如果一切顺利的话，当你push feature-testci 这个分支的时候会出现如下两张图：
![image.png](/img/imagetauricicd1.png)
![image.png](/img/tauri111.webp)
一张图是Action的构建过程，两个平台都构建完成了；一张图是生成的安装包，两个平台的包都有了。

# 常见问题

## 权限问题

其实这个里面有的时候会遇到一些问题，最主要的问题是权限的问题。GitHub 环境令牌，此令牌默认只有读取权限，在运行工作流时你可能会收到“Resource not accessible by integration”错误。
![image.png](/img/imagetauricicd2.png)
这个需要在设置里面配置相应的权限，在Action—General的最下方
![image.png](/img/imagetauricicd3.png)
![image.png](/img/950bda22996c4015bb8e5048a790cdf3~tplv-73owjymdk6-jj-mark-v1_0_0_0_0_5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5b6Q5b6Q_q75.webp)

## 生成应用的安全问题

CI/CD 生成的开源包一般都会被阻止打开，所以Windows 直接仍要运行就行，Mac 去隐私设置里面尝试再打开软件就可以，原因是没有证书签名的软件都会被拦截。

# 项目源码地址

<https://github.com/Xutaotaotao/XTools/tree/feature-testci>

# 结语

CI/CD 在前端开发中非常重要，本文简单的讲述了使用 CI/CD 自动构建发布 Tauri 桌面端应用的全过程，通过自动化的发布不仅能大大提高我们的发布效率，还能保证不同平台的一致性，如果是个人开发者或者开源项目，非常适合使用这种方式发布。
