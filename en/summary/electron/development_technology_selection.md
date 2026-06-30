---
outline: deep
title: Technology Choices in the Electron Ecosystem
titleTemplate: Electron Practice
---

# Technology Choices in the Electron Ecosystem

## Scaffold selection

There are quite a few scaffold choices for Electron.

Official options include:

- [Electron Forge](https://www.electronforge.io/)
- [Electron Fiddle](https://www.electronjs.org/fiddle)
- [electron-quick-start](https://github.com/electron/electron-quick-start)

If the application is not very complex, an official starter can be enough to get moving quickly.

There are also open-source scaffolds such as:

- [electron-vue](https://github.com/SimulatedGREG/electron-vue)
- [vue-cli-plugin-electron-builder](https://nklayman.github.io/vue-cli-plugin-electron-builder/)

These can generate a working template quickly, then you fill in your own business logic.

My own view is:

- official scaffolds are good for learning and experimentation
- tools like `electron-vue` are convenient early on, but not always ideal for long-term enterprise-scale expansion
- many of these older tools are Webpack-based, and the daily compile speed can feel noticeably slower than Vite

If you want to build your own project scaffold, that is also worthwhile. It helps you understand Electron's build process, learn through actual pitfalls, and gain deeper control over the architecture.

That is why my own scaffold choice is to build an Electron project structure from scratch with:

- Vite
- Electron
- React

## HTTP module selection

There are several ways to make HTTP requests in Electron.

### Option 1: split between renderer and main process

- renderer process uses tools like `axios` or `fetch`
- main process uses Node-side APIs such as `net`

**Pros**

- renderer and main process responsibilities stay clear
- renderer requests are easy to debug in the Network panel

**Cons**

- unified request encapsulation becomes more awkward

### Option 2: centralize everything behind one request layer

You can wrap all requests around `net` or another single tool, call it directly in the main process, and let the renderer go through bridge methods.

**Pros**

- fully unified request abstraction

**Cons**

- request debugging becomes less convenient
- logs often need to be inspected from the main process

### Option 3: use Axios everywhere

Axios supports both Node and browser environments, so the request layer can feel very natural to frontend developers.

**Pros**

- simplest mental model
- very similar to normal web application request encapsulation

**Cons**

- you need to be careful about cross-origin behavior
- some teams end up disabling `webSecurity`, which Electron does not recommend from a security perspective

Electron security reference:

<https://www.electronjs.org/docs/latest/tutorial/security>

Each option has trade-offs, so the right choice depends on the project.

## Local database selection

Electron also has many local data storage options:

- plain file read/write
- structured local database libraries
- key-value stores

Here is a useful comparison reference:

<https://www.npmtrends.com/electron-store-vs-lokijs-vs-lowdb-vs-nedb-vs-realm>

![Simplified comparison of Electron local database options](/images/i18n/electron-tech-choice-en-databases.svg)

After comparing the options, I prefer [lowdb](https://github.com/typicode/lowdb). One practical reason is that it supports synchronous access, which helps avoid race conditions when later logic depends on local data being written already.

## Logging tool selection

Logging is extremely important in Electron development. It helps uncover issues that are difficult to locate from surface UI behavior alone.

Two common choices are:

- [electron-log](https://github.com/megahertz/electron-log)
- [log4js-node](https://github.com/log4js-node/log4js-node)

Trend comparison:

<https://npmtrends.com/electron-log-vs-express-winston-vs-log4js-vs-logging>

![Simplified comparison of Electron logging libraries](/images/i18n/electron-tech-choice-en-logging.svg)

From direct usage experience:

- both are easy to start with
- `log4js-node` exposes a richer API
- `electron-log` is simpler, but its log file path can be less convenient to control
- `log4js-node` gives you more flexibility over file destinations and log structure

So my recommendation is `log4js-node`.

## System information collection

For collecting system information from Node, I recommend:

**[systeminformation](https://github.com/sebhildebrandt/systeminformation)**

Why:

1. it is very powerful
2. it can collect system, process, CPU, and many other categories of machine information
3. it already solves many cross-platform differences internally
4. it is also a good tool for learning the system commands behind the scenes

## Build tool selection

Three common Electron packaging tools:

- [electron-builder](https://github.com/electron-userland/electron-builder)
- [electron-forge](https://github.com/electron/forge)
- [electron-packager](https://github.com/electron/electron-packager)

![Simplified comparison of Electron packaging tools](/images/i18n/electron-tech-choice-en-packaging.svg)

From both ecosystem usage and actual experience, `electron-builder` remains a strong choice. It integrates packaging, updating, signing, and distribution into one larger solution.

That is the packaging tool I chose in practice.

## Summary

Technology selection matters a lot when starting an Electron project. The comparisons above are not absolute rules, but they help narrow down a practical stack.

Once the core stack is chosen, the next step is to build a project structure that fits your own needs and development habits.
