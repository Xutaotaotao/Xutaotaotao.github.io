---
outline: deep
title: A Detailed Guide to Vue keep-alive and Its Caching Mechanism
titleTemplate: Vue Practice
---

# A Detailed Guide to Vue keep-alive and Its Caching Mechanism

## Introduction

In Vue projects, some components or pages do not need to be rendered repeatedly. In those cases, it is useful to keep part of the UI alive in memory. This is not just simple data persistence. It is persistence of the entire component instance, including both state and view structure.

Vue provides the built-in `<keep-alive>` component for exactly this purpose.

When `<keep-alive>` wraps dynamic components, inactive component instances are cached instead of destroyed. Like `<transition>`, it is an abstract component: it does not render a DOM element of its own and does not appear in the parent chain the way a normal component does.

When a component is switched inside `<keep-alive>`, the `activated` and `deactivated` lifecycle hooks will run.

## Basic usage

There are two common eras of usage.

Before Vue 2.1.0, people often used a pattern like this:

```vue
<keep-alive>
  <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>

new Router({
  routes: [
    {
      name: "a",
      path: "/a",
      component: A,
      meta: {
        keepAlive: true,
      },
    },
    {
      name: "b",
      path: "/b",
      component: B,
    },
  ],
});
```

After configuring route meta like this, route `a` gets cached while route `b` does not. Any route that should be cached can simply add `keepAlive: true`.

After Vue 2.1.0, `<keep-alive>` introduced two useful props:

- `include`: only matching components are cached
- `exclude`: matching components are not cached, and this takes priority over `include`

Both props support:

- comma-separated strings
- regular expressions
- arrays

When using regexes or arrays, `v-bind` is required.

Examples:

```vue
<!-- comma-separated string -->
<keep-alive include="a,b">
  <component :is="view"></component>
</keep-alive>

<!-- regular expression -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>

<!-- array -->
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>

<!-- with router-view -->
<template>
  <div id="app">
    <transition :name="routerTransition">
      <keep-alive :include="keepAliveComponentsData">
        <router-view :key="$route.fullPath"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
```

The post-2.1.0 approach is cleaner and gives you more control over caching strategy.

## Advanced usage

Basic usage is only the beginning. Real projects often need a more intentional caching strategy. The key question becomes: how can components dynamically decide whether they should be cached?

### Business scenario

Imagine this flow:

1. the user enters a list page
2. then opens a detail page
3. from the detail page, the user opens a row-level detail page
4. when returning, the detail page should sometimes stay cached
5. but if the row detail changed data, the detail page should refresh

This is common in mobile applications.

One workaround is to pass flags around and decide whether to use store data or refetch fresh data. That works, but it becomes awkward and does not provide real page-level caching.

If you use `keep-alive` carefully, the flow becomes much cleaner.

### Overall strategy

1. Create three store methods:
   - `setKeepAlive`
   - `setNoKeepAlive`
   - `getKeepAlive`
2. Collect the `name` of every component and store them in an array
3. Read the cached-component list when `App.vue` mounts
4. Dynamically decide whether pages should be cached inside route guards or page transitions
5. Watch store changes in `App.vue` and sync them to `include`

### Concrete implementation

#### 1. Register store methods

```javascript
const state = {
  keepAliveComponents: [],
};

const getters = {
  getKeepAlive(state) {
    return state.keepAliveComponents;
  },
};

const mutations = {
  setKeepAlive(state, component) {
    !state.keepAliveComponents.includes(component) &&
      state.keepAliveComponents.push(component);
  },
  setNoKeepAlive(state, component) {
    const index = state.keepAliveComponents.indexOf(component);
    index !== -1 && state.keepAliveComponents.splice(index, 1);
  },
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};
```

#### 2. Default components to cached in route config

```javascript
routes.forEach((item) => {
  store.commit("setKeepAlive", item.name);
});

export default routes;
```

Note: this uses `item.name` instead of `item.component.name`.

In principle, `include` matches component names. But when code-splitting and bundling are involved, component names can change unexpectedly. In practice, it is safer to keep route names and component names aligned from the start.

#### 3. Read cached components in `App.vue`

```vue
<template>
  <div id="app">
    <transition :name="routerTransition">
      <keep-alive :include="keepAliveComponentsData">
        <router-view :key="$route.fullPath"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import store from "./store";

export default {
  name: "App",
  data() {
    return {
      keepAliveComponentsData: [],
    };
  },
  mounted() {
    this.keepAliveComponentsData = store.getters.getKeepAlive;
  },
};
</script>
```

#### 4. Dynamically change caching behavior

If you jump from a detail page into a row-detail page, you may not want the row-detail page cached:

```javascript
toLoanApplicationDetail(index) {
  store.commit("setNoKeepAlive", "LoanlineReadonly");
}
```

If you then jump from row detail into another associated document and want to preserve the row detail page, you can cache it again:

```javascript
toContractDetail(item) {
  store.commit("setKeepAlive", "LoanlineReadonly");
}
```

#### 5. Watch cache changes

Now you need to keep the `include` list in sync with the store:

```vue
<template>
  <div id="app">
    <transition :name="routerTransition">
      <keep-alive :include="keepAliveComponentsData">
        <router-view :key="$route.fullPath"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import store from "./store";

export default {
  name: "App",
  data() {
    return {
      keepAliveComponentsData: [],
    };
  },
  mounted() {
    this.keepAliveComponentsData = store.getters.getKeepAlive;
  },
  watch: {
    $route() {
      this.keepAliveComponentsData = store.getters.getKeepAlive;
    },
  },
};
</script>
```

## How it works internally

The core idea of `keep-alive` is to cache components as VNodes and reuse them when they match the `include` / `exclude` rules.

If the rules change and a cached VNode no longer matches, it gets destroyed.

### Source-level explanation

At a high level:

1. `created` initializes a `cache` object to hold cached VNodes
2. `destroyed` clears cached component instances
3. `render`:
   - reads the first child component
   - gets its component name
   - checks `include` / `exclude`
   - if it matches, tries to reuse a cached instance
   - otherwise stores the new vnode in cache
4. watchers on `include` and `exclude` prune the cache when rules change

### A simpler summary

1. `created` builds the cache container
2. `render` decides whether to reuse or cache the current component vnode
3. `include` and `exclude` determine which names are allowed to stay cached
4. cached entries are vnode-based, not direct DOM snapshots
5. when the component is needed again, Vue reuses the cached vnode instance instead of recreating it

That is why `keep-alive` can preserve component state and view state so effectively.
