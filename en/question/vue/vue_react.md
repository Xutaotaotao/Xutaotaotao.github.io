---
outline: deep
title: Vue and React
titleTemplate: Frontend Interview Notes
---

# Vue and React

<img src="/question/vue/vue_react.jpg" width="500" height="520" alt="Comparison illustration of Vue and React">

## Origins

### The origin of Vue

- Vue.js was created by Evan You. While working at Google, he was exposed to AngularJS and appreciated some of its ideas, but also felt it was too heavy in certain ways.
- Later, while working on a mobile application project, he started building the prototype of Vue around his own ideas and needs.
- Vue began as a personal project, then was open-sourced after Evan left Google. The first version was released in February 2014, and the framework quickly gained broad attention.

### The origin of React

- React was developed by Facebook.
- It was originally created by Jordan Walke while he was an engineer at Facebook.
- Its roots go back to around 2011, when Facebook was building its own advertising management system and needed a better way to handle large UI updates efficiently.
- After trying several approaches, Jordan Walke built a new UI framework. It was first called `FaxJS`, then later renamed `React`.
- Facebook open-sourced React in May 2013.

## Core ideas

### Vue's core idea

Vue is a **progressive framework**. You can adopt only the parts you need. It can be used as a small view-layer library, or gradually introduced into a larger application.

### React's core idea

React emphasizes **one-way data flow**. Components receive data through `props` and manage their own internal state through `state`. When state or props change, React updates the UI efficiently through the virtual DOM.

## Differences in style

### Syntax differences

#### Template syntax

**Vue**

Vue uses a template syntax. You can write HTML-like code directly in templates and use Vue directives for data binding and behavior.

```html
<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="increment">Increment</button>
  </div>
</template>
```

**React**

React uses JSX. You write HTML-like structures directly inside JavaScript.

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

#### Component declaration

**Vue**

Vue components can be registered globally with `Vue.component`, or locally through single-file components. A single-file component keeps template, style, and logic together.

```html
<script>
  Vue.component("my-component", {
    // component options
  });
</script>

<template>
  <!-- component template -->
</template>

<script>
  export default {
    // component options
  };
</script>
```

**React**

React components are usually declared as functions or classes.

```jsx
function MyComponent(props) {
  return <div>{props.message}</div>;
}

class MyComponent extends React.Component {
  render() {
    return <div>{this.props.message}</div>;
  }
}
```

#### Reactive data binding

**Vue**

Vue supports two-way style bindings in template-oriented scenarios, such as `v-model`, and also provides directives like `v-bind`.

```html
<template>
  <div>
    <input v-model="message" />
    <p>{{ message }}</p>
  </div>
</template>
```

**React**

React follows one-way data flow. Parents pass data down through `props`, and children notify parents through callbacks.

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

## API differences

**Vue**

- template-driven
- historically centered on the Options API
- rich built-in API surface

**React**

- centered around the virtual DOM and diffing
- historically built around `setState`
- now heavily oriented around hooks

## Community differences

1. **Community size:** React has a very large ecosystem because it is maintained by Facebook and widely adopted. Vue also has a strong and active community, though smaller.
2. **Learning resources:** React has an enormous number of tutorials, books, and community resources. Vue also has many strong resources and continues to grow.
3. **Ecosystem:** React's ecosystem is broad and fast-moving, with many third-party libraries for different needs. Vue's ecosystem is also healthy, though slightly more curated in practice.
4. **Typical use cases:** React is often chosen for larger and more complex interfaces. Vue is often valued for ease of use and faster onboarding in small-to-medium applications.
5. **Stack philosophy:** React is more flexible and library-oriented. Vue often provides a more integrated development experience.

## Differences in upgrade direction

**Vue**

- continues to value ease of adoption and progressive usage
- moved from `Object.defineProperty`-based reactivity to `Proxy`
- provides richer APIs for organizing logic

**React**

- leans further into functional programming
- tries to reduce side effects
- emphasizes hooks and composable state logic

## Reactivity principles

### React's reactivity

- React uses one-way reactive updates.
- Component `state` is mutable through APIs like `setState` or hooks such as `useState`.
- When state changes, the component re-renders and produces a new virtual DOM tree.
- React compares the old and new virtual DOM trees, finds the differences, and updates only what changed in the real DOM.

### Vue's reactivity

- Vue tracks reactive data changes and automatically updates the view.
- Vue 2 used `Object.defineProperty`, while Vue 3 uses `Proxy`.
- Data declared in component state becomes reactive, and changes automatically propagate to the UI.

## Diff algorithm

React and Vue share the same goal: minimize real DOM work. But they differ in strategy.

### Similarities

1. Both use a virtual DOM
2. Both compare old and new trees to reduce real DOM updates

### Differences

1. **Strategy**
   - React typically uses a top-down diffing process
   - Vue often uses optimized double-ended comparisons in list patching
2. **List rendering**
   - both rely on `key`
   - both try to reuse existing DOM where possible
3. **Update behavior**
   - React often re-renders a component subtree and lets reconciliation determine what actually changes
   - Vue often performs highly optimized targeted updates based on dependency tracking

## Event system

Main differences in event handling:

1. **Event naming**
   - React uses `camelCase`, such as `onClick`
   - Vue uses directive syntax such as `@click`
2. **Binding style**
   - React binds handlers via JSX props
   - Vue binds them with `v-on` or `@`
3. **Event object**
   - React uses `SyntheticEvent`
   - Vue receives the native DOM event
4. **Default-prevention helpers**
   - React calls `preventDefault()` explicitly
   - Vue can use modifiers such as `.prevent`
5. **Passing parameters**
   - React often uses arrow functions or `bind`
   - Vue can pass parameters directly in the template
6. **Removing handlers**
   - React removes them by changing props
   - Vue has modifiers such as `.once` for one-time binding

Overall, Vue's event syntax often feels more concise, while React's event model is more explicit and JavaScript-centric.

## Summary

Vue and React are both excellent frontend UI frameworks.

- Vue is often praised for being simpler, lighter, and easier to learn.
- React is often praised for flexibility, strong performance characteristics, and a large ecosystem.

Both support component-based development, reactive UI updates, and virtual DOM rendering. Both are suitable for single-page applications and modern frontend systems.

Vue tends to offer a more integrated and approachable experience, while React offers more flexibility but usually expects you to assemble more of the stack yourself. In practice, either can be the right choice depending on the project and team.
