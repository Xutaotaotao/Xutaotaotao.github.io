---
outline: deep
title: Vue 2 vs Vue 3
titleTemplate: Frontend Interview Notes
---

# Vue 2 vs Vue 3

<img src="/question/vue/vue2_vue3.jpg" width="500" height="520" alt="Comparison illustration of Vue 2 and Vue 3">

## Reactivity internals

The biggest difference between Vue 2 and Vue 3 is in the reactivity system.

### Vue 2 reactivity

1. **`Object.defineProperty`**
   - Vue 2 uses `Object.defineProperty` to intercept property access and updates.
   - When an object is passed into `data`, Vue walks through each property and converts it into a reactive property.
2. **Dependency tracking**
   - When a template reads a reactive property, Vue records that dependency.
   - When the property changes, Vue can find the corresponding watchers and update the view.
3. **Array mutation handling**
   - Because `Object.defineProperty` cannot naturally observe every array operation, Vue 2 patches array mutation methods such as `push`, `pop`, and `splice`.

### Vue 3 reactivity

1. **ES6 `Proxy`**
   - Vue 3 uses `Proxy`, which can intercept far more kinds of object operations.
2. **Improved dependency tracking**
   - Vue 3's tracking is more efficient and works more naturally with arrays and nested structures.
3. **Composition API support**
   - Vue 3 introduces the Composition API, which gives developers more flexible ways to organize logic and reactive state.

## Lifecycle

Vue 3 merges some lifecycle hooks, introduces new ones, and provides more flexibility through the Composition API.

<img src="/question/vue/vue2_vue3_1.png" alt="Lifecycle comparison between Vue 2 and Vue 3">

Overall, the relationship between hooks becomes clearer, and developers get better control over custom logic composition.

## Performance

1. **Data observation**
   - Vue 2 uses `Object.defineProperty()` and needs to traverse properties
   - Vue 3 uses `Proxy` and can observe the object more directly
2. **Compilation optimizations**
   - Vue 3 introduces improvements such as static hoisting and cached event handlers
3. **Bundle size**
   - Vue 3 removes some less-used APIs and improves tree-shaking
4. **Memory usage**
   - Vue 3 reduces some memory-heavy behavior and improves allocation patterns
5. **SSR**
   - Vue 3 improves server-side rendering performance and architecture

In short, Vue 3 delivers meaningful performance improvements in initialization, rendering, and memory behavior.

## Coding style

1. **Options API vs Composition API**
   - Vue 2 is centered around the Options API
   - Vue 3 introduces the Composition API, which makes logic more cohesive
2. **`defineComponent`**
   - Vue 3 uses `defineComponent` for clearer component typing and declaration
3. **`ref` and `reactive`**
   - Vue 3 provides direct APIs for declaring reactive variables
4. **`setup`**
   - Vue 3 centralizes component logic in `setup`
5. **Async components**
   - Vue 3 provides improved support for async component patterns

## API changes

1. **Options API and Composition API**
   - Vue 2 mainly uses `data`, `methods`, and similar options
   - Vue 3 recommends `ref`, `reactive`, `watch`, `computed`, and related APIs
2. **Filters removed**
   - Vue 2 supported filters
   - Vue 3 removes them and recommends methods or computed properties instead
3. **Global and instance API adjustments**
   - some old APIs were removed or redesigned
4. **Lower-level APIs**
   - Vue 3 exposes more renderer-related extension points such as `createRenderer`

## Diff algorithm

1. **Static marking**
   - Vue 2 marks static roots
   - Vue 3 uses more precise patch flags and shape flags
2. **Optimization logic**
   - Vue 2 uses a classic double-ended diff approach
   - Vue 3 improves patching with more refined vnode metadata and faster matching
3. **Block tree optimization**
   - Vue 3 can group and optimize updates more aggressively
4. **Async rendering support**
   - Vue 3 works better with async component rendering scenarios
5. **Code reduction**
   - the core update logic is more streamlined
6. **SSR diff optimizations**
   - Vue 3 adds improvements for server-rendered hydration and patching

## Bundling and build

1. **Bundle size**
   - Vue 3 improves tree-shaking and removes rarely used APIs
2. **Dependency optimization**
   - code paths are more modular and easier for bundlers to prune
3. **Build speed**
   - compilation and production builds are generally improved
4. **Compiler improvements**
   - better caching and faster incremental feedback in many setups
5. **Tree-shaking**
   - more precise elimination of unused code
6. **Modularity**
   - Vue 3's codebase is more fully ESM-friendly
7. **New built-in capabilities**
   - Vue 3 supports features such as Fragment, Teleport, and Suspense

## TypeScript support

1. **Internal implementation**
   - Vue 2 was written in JavaScript and relied on external type maintenance
   - Vue 3 was rewritten in TypeScript
2. **Component definition**
   - Vue 3 offers a cleaner TS experience with `defineComponent`
3. **Options API typing**
   - Vue 3 improves type inference for the Options API too
4. **Composition API**
   - Vue 3's Composition API works naturally with generics and TypeScript interfaces
5. **Registration and props typing**
   - component definitions provide better props inference and IDE help
6. **TS configuration**
   - Vue 3 works better with stricter TypeScript workflows
7. **Built-in utility types**
   - Vue 3 exports more internal and helper types for extension

## Summary

Overall, Vue 3 is a full upgrade over Vue 2:

1. better performance in initialization and rendering
2. more modern features such as the Composition API, Fragment, Teleport, and Suspense
3. cleaner architecture with a TypeScript-based core
4. more efficient and flexible APIs
5. stronger support for composable and function-oriented logic organization
6. better build output and tree-shaking
7. a healthier foundation for future ecosystem growth

For teams maintaining Vue 2 projects, the migration cost still matters. But technically, Vue 3 is the more modern and capable baseline.
