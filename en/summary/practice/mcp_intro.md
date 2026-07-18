---
outline: deep
title: A First Look at MCP
titleTemplate: MCP Practice
date: 2025-04-03
tags:
  - MCP
  - AI
---

# A First Look at MCP

Hi, I'm Terence. Today let's take a quick first look at MCP.

## Introduction

MCP had already been around for a while, but it really started heating up around March. I kept hearing people mention it, so I dug in. My takeaway is simple: with MCP, AI stops being bounded by a chat box. As long as your MCP servers, tools, and clients are strong enough, an AI agent can work with text, speech, images, software, hardware, and more. Let's walk through what MCP is.

## Origin

![Anthropic announces the Model Context Protocol](https://cdn.nlark.com/yuque/0/2025/png/277039/1743677601896-8534c2bf-a1af-4d8d-8cd1-ab0111c99d86.png)

On November 25, 2024, Anthropic announced that MCP was open sourced. Looking at the SDK timeline, the first SDK release came later on December 21, 2024:

![MCP SDK release timeline](https://cdn.nlark.com/yuque/0/2025/png/277039/1743677782016-64021f98-df7f-47d3-9be2-546d76d330c6.png)

The core idea at launch was that large models are limited by data silos. MCP provides a standard protocol so AI agents can connect to data sources and break those silos. In plain terms: the protocol is there; if you follow it, you can connect almost any data source to a model — text, images, video, regular data, software, hardware, and beyond.

That expands agent use cases far past browser-based text work. Agents can operate software and even the operating system through semantic actions. Scenes like "Hey Siri, order takeout on Meituan for me" are getting much closer.

## Core Concepts

At the center of MCP is model context: all external information and tools an LLM needs at runtime. Through standardized interfaces and protocols, MCP lets an LLM dynamically access and integrate:

- External data sources: databases, APIs, document stores, and more, for real-time or historical data
- Tools and services: calculators, search engines, third-party services, and other capability extensions
- Context management: dynamically maintain conversation context for coherence and consistency

## Core Architecture

![MCP client-server architecture diagram](https://cdn.nlark.com/yuque/0/2025/png/277039/1743682983201-3702884a-0844-4c12-9144-a9570281779e.png)

MCP follows a client-server architecture:

- Host: the AI application that wants data from servers, such as an IDE or chatbot. The host initializes and manages clients, handles user authorization, and aggregates context.
- Client: the bridge between host and server. It keeps a one-to-one connection with a server and handles message routing, capability management, protocol negotiation, and subscriptions, keeping communication clear, secure, and efficient.
- Server: the component that exposes external data and tools. Through tools, resources, and prompt templates, it gives the LLM extra context and capabilities — for example API access to Gmail or Slack.
- Base Protocol: defines how hosts, clients, and servers communicate, including message formats, lifecycle management, and transport mechanisms.

MCP is a bit like USB-C: different devices plug into the same interface. Treat it as a common protocol layer — if you want to connect to the host, speak MCP.

![MCP host, client, and server overview](https://cdn.nlark.com/yuque/0/2025/png/277039/1743682761934-3ebd42da-5488-4667-8227-99aeb536abc8.png)

## Ecosystem

![MCP ecosystem server directory screenshot](https://cdn.nlark.com/yuque/0/2025/png/277039/1743681647844-7df34e67-f18d-48cd-9cfc-1bdfe3a44fde.png)

A protocol this hot already has a strong ecosystem: many MCP servers, tools, and clients. Two useful places to browse:

- [https://glama.ai/mcp/servers](https://glama.ai/mcp/servers)
- [https://github.com/punkpeye/awesome-mcp-servers/tree/main](https://github.com/punkpeye/awesome-mcp-servers/tree/main)

Interestingly, most of these services and tools are written in TypeScript / JavaScript or Python. MCP SDKs also exist for Java, Kotlin, and C#, but TypeScript / JavaScript dominate — which is very friendly for frontend developers. TypeScript / JavaScript are easy to pick up, run across platforms, and fit App, desktop, server, web, and extension environments. From another angle, it also raises a question: why are so many frontend engineers moving into AI? Maybe frontend demand is shrinking and people are gradually transforming. Just a guess.

## Closing Thoughts

MCP is reshaping the AI agent ecosystem. Hot products like Manus also have MCP in the picture. OpenAI's Function Calling came earlier, but compared with MCP it feels narrower: Function Calling is small and elegant; MCP is broader and more complete. If the current pace continues, we may soon have MCP services that people can add with one click — almost as easy as installing an app — for increasingly hardcore capabilities.
