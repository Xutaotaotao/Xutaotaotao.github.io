---
outline: deep
title: Vue 和 React
titleTemplate: 前端徐徐
---

# Vue 和 React

<img src="/question/vue/vue_react.jpg" width="500" height="520">

## 起源

**Vue 的起源**

- Vue.js（简称 Vue）是由尤雨溪（Evan You）创建的。他在 Google 实习期间接触到了 AngularJS，受到了 AngularJS 的启发，但觉得它有些繁琐。后来，他在做一个移动应用项目时，基于自己的想法和需求，开始了 Vue 的原型开发。最初，Vue 只是作为一个个人项目存在。
- 在 2013 年尤雨溪离开 Google 后，他决定将 Vue 开源，并于 2014 年 2 月发布了第一个版本。Vue 很快获得了广泛的关注和认可，成为一个备受欢迎的前端框架。

**React 的起源**

- React 是由 Facebook 团队开发的。它最初是由 Jordan Walke 创建的，当时他是 Facebook 的工程师。React 的起源可以追溯到 2011 年，当时 Facebook 正在开发自己的广告管理系统。为了改善应用性能和用户体验，Facebook 需要一种高效的方式来处理大规模数据变化时的 UI 更新问题。
- Jordan Walke 在尝试了多种方法后，创建了一个用于构建用户界面的新框架。该框架最初被称为 "FaxJS"，后来改名为 React。2013 年 5 月，Facebook 宣布将 React 开源，并于同年 5 月 29 日发布了第一个开源版本。

## 核心思想

**Vue 的核心思想**

渐进式框架：Vue 的设计思想是渐进式的，它允许开发者逐步采用其功能。你可以仅仅把 Vue 当作一个用于处理视图层的库来使用，也可以在现有项目中嵌入 Vue，逐步将其功能应用于更多组件或页面。

**React 的核心思想**

单向数据流：React 强调使用单向数据流来管理组件的状态和数据。组件通过 props（父组件传递的属性）来接收数据，并通过状态（state）来管理自己的数据。当状态或属性发生变化时，React 通过虚拟 DOM 进行高效的 DOM 更新。

## 表现形式

### 写法差异

#### 模板语法

**Vue**<br />Vue 使用模板语法，你可以在 Vue 模板中直接编写类似 HTML 的代码，并使用 Vue 的指令来实现数据绑定和其他功能。

```html
<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="increment">Increment</button>
  </div>
</template>
```

**React**<br />React 使用 JSX，你需要在 JavaScript 中编写类似 HTML 的代码。JSX 允许你在组件中直接嵌入 HTML 标签，并使用 JavaScript 表达式来处理逻辑和数据。

```jsx
import React, { useState } from "react";

function MyComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

#### 组件声明方式

**Vue**<br />Vue 组件可以使用 `Vue.component` 方法全局注册，也可以使用单文件组件方式进行局部注册。单文件组件将模板、样式和逻辑写在同一个文件中，更加方便组织和管理组件代码。

```html
<!-- 全局注册组件 -->
<script>
  Vue.component("my-component", {
    // 组件配置
  });
</script>

<!-- 单文件组件方式 -->
<template>
  <!-- 组件模板 -->
</template>

<script>
  export default {
    // 组件配置
  };
</script>
```

**React**<br />React 组件通常以函数或类的形式进行声明。使用函数组件时，组件本身就是一个函数，接收 `props` 作为参数并返回表示 UI 的 React 元素。使用类组件时，组件继承自 `React.Component`，并实现 `render` 方法来返回 React 元素。

```jsx
// 函数组件
function MyComponent(props) {
  // 组件逻辑
  return <div>{props.message}</div>;
}

// 类组件
class MyComponent extends React.Component {
  render() {
    // 组件逻辑
    return <div>{this.props.message}</div>;
  }
}
```

#### 响应式数据绑定

**Vue**<br />Vue 提供了双向数据绑定，你可以直接在模板中使用 `{{ }}` 语法来绑定数据，同时也可以通过指令来实现数据绑定，如 `v-bind` 和 `v-model`。

```html
<template>
  <div>
    <input v-model="message" />
    <p>{{ message }}</p>
  </div>
</template>
```

**React**<br />React 使用单向数据流的思想，父组件通过 `props` 将数据传递给子组件，子组件不能直接修改父组件传递的数据。子组件可以通过调用父组件传递的回调函数来实现数据传递。

```jsx
import React, { useState } from "react";

function ParentComponent() {
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div>
      <ChildComponent message={message} onChange={handleChange} />
      <p>{message}</p>
    </div>
  );
}

function ChildComponent({ message, onChange }) {
  return <input value={message} onChange={onChange} />;
}
```

### API 差异

**Vue**<br />Template 模板 + options API，api 非常多<br />**React**<br />Virtual DOM + Diff 算法，核心 setState，hooks

### 社区差异

1. 社区规模：React 是由 Facebook 团队开发和维护的，拥有庞大的社区支持。React 的社区规模非常庞大，全球范围内有众多开发者和组织参与其中，提供了丰富的插件、组件库和解决方案。Vue 也有一个活跃的社区，虽然规模相对较小，但也在不断扩大，吸引了越来越多的开发者。
2. 学习资源：由于 React 的广泛应用和大规模社区，有很多高质量的学习资源可供选择，包括官方文档、社区教程、视频教程等。Vue 的学习资源也在不断增多，虽然可能没有 React 那么多，但也有很多优秀的学习资料可供参考。
3. 生态系统：React 的生态系统非常丰富，拥有大量的第三方库和组件，涵盖了各种开发场景。由于社区规模较大，React 生态系统的发展较为迅速。Vue 的生态系统也在不断发展壮大，但相对于 React 来说，可能会有一些较为小众的库和组件。
4. 适用领域：React 和 Vue 在适用的领域上有一些差异。React 更多地用于大型应用和复杂场景，适合构建复杂交互和高度动态的用户界面。Vue 则更注重简单易用和快速开发，适合构建中小型应用和较为简单的页面。
5. 技术栈：React 在技术栈方面更加灵活，可以与其他框架、库和工具很好地结合。Vue 也支持与其他库和工具的集成，但在某些方面可能更加倾向于提供一揽子解决方案，使得整体开发体验更加一致。

### 升级方向差异

**Vue**<br />依然定位简单易上手（渐进式开发），依然是考虑通过依赖收集来实现数据可变，更丰富的 API，又 Object 改为 Proxy 进行依赖收集<br />**React**<br />函数式编程，减少副作用（hooks）

## 响应式原理

**React 的响应式原理**

- React 使用单向数据流的响应式原理。组件的状态（state）是可变的，当状态发生变化时，React 会重新渲染组件。组件的 render 方法会被重新调用，返回一个新的 React 元素树（Virtual DOM）。
- 当组件重新渲染时，React 会使用之前的 Virtual DOM 树与新的 Virtual DOM 树进行比较，找出差异（Diff 算法），然后只更新变化的部分到实际 DOM 上，以提高性能和渲染效率。

**Vue 的响应式原理**

- Vue 使用双向数据绑定的响应式原理。Vue 使用 Object.defineProperty 或 Proxy 来追踪组件的数据变化。
- 在 Vue 中，所有在 data 选项中声明的数据属性都会被转换为响应式属性。当数据发生变化时，Vue 会自动更新与之相关联的视图，保持视图和数据的同步。

## Diff 算法

React 和 Vue 的 Diff 算法有一些相似之处，也有一些不同之处。

#### 相似之处

1.  虚拟 DOM：React 和 Vue 都使用虚拟 DOM 来进行组件的渲染和更新。虚拟 DOM 是一个轻量级的 JavaScript 对象，它对应着真实 DOM 的结构，并且可以高效地进行比较和更新。
2.  目标：React 和 Vue 的 Diff 算法的目标都是在组件更新时，尽量减少对实际 DOM 的操作，从而提高渲染性能。通过比较新旧虚拟 DOM，找出最小的差异并只更新变化的部分，可以减少昂贵的 DOM 操作。

#### 不同之处

1.  策略：React 的 Diff 算法采用深度优先遍历策略，而 Vue 采用双端对比策略。React 从上至下逐层对比新旧 Virtual DOM 树，找到有差异的组件或元素。Vue 同时从新旧 Virtual DOM 树的头部和尾部开始比较，找到最近的差异节点。
2.  列表渲染：React 和 Vue 都使用 "key" 属性来标识列表项，以便更准确地判断出是更新、插入还是删除。但在处理列表更新时，两者有所不同。React 在列表更新时，尽量复用已存在的 DOM 元素，避免不必要的 DOM 操作。Vue 默认采用“in-place patch”的方式来处理列表更新，即尽量复用已存在的 DOM 元素。
3.  更新策略：React 在找到差异后，采用全量更新的方式来更新组件。这意味着在更新过程中，React 会递归地更新整个组件子树。而 Vue 在找到差异后，采用部分更新的方式，只更新发生变化的组件及其子组件。

## 事件机制

React 和 Vue 在事件处理机制上有以下主要区别

1. 事件绑定语法不同

- React 使用 `camelCase` 的事件名称,如 `onClick`、`onChange`。
- Vue 使用 `kebab-case `的事件名称,如 `@click`、`@change`。

2. 事件绑定方式不同

- React 通过 `JSX` 属性绑定事件处理函数。
- Vue 使用 `v-on` 指令绑定事件处理函数。

3. 事件对象不同

- React 的事件对象是合成事件 `SyntheticEvent`。
- Vue 的事件对象是一个原生 `DOM` 事件。

4. 事件修改不同

- React 无法阻止事件的默认行为,必须显式调用 `preventDefault`。
- Vue 可以使用 `.prevent `修饰符阻止事件默认行为。

5. 事件传参不同

- React 需要通过 `bind()` 或箭头函数传参。
- Vue 可以直接在事件处理函数中传参。

6. 事件移除不同

- React 需要将事件处理函数 设置为 `null` 来移除。
- Vue 可以使用 `.once` 或 `v-on="{once: fn}"` 来一次性绑定事件。

总体上，Vue 的事件系统更加简单和便利，React 的事件系统更加自由和灵活。但两者都支持声明式的事件处理方式。

## 总结

总体来说，Vue 和 React 都是优秀的前端 UI 框架,各有特色。<br />Vue 的优点是更简单、轻量、易上手,文档丰富,渐进式框架设计让上手更容易；React 的优点是灵活、性能更优、生态更丰富，JSX 使组件更直观，虚拟 DOM 使重新渲染更高效。<br />两者都支持组件化、响应式编程、高效渲染虚拟 DOM，都可以用于构建单页面应用。<br />Vue 更加简单同时功能完备，React 更加灵活但需要配合其生态圈，所以两者可以互补共存,可根据项目需求选择使用。<br />未来 Vue 和 React 都在完善函数式编程和跨端支持，提升性能，都在努力提升前端开发体验。
