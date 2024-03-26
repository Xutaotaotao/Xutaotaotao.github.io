---
outline: deep
title: Vue keep-alive 使用及缓存机制详解
titleTemplate: Vue 实践
---

# Vue keep-alive 使用及缓存机制详解

## 前言
在VUE项目中，有些组件或者页面没必要多次渲染，所以需要将部分组件有条件的在内存中进行"持久化",不过这里的持久化不是简单的数据持久化，而是整个组件（包括数据和视图）的持久化，刚好VUE提供了`<keep-alive>`这个内置组件来完成这件事情。
`<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 `<transition>` 相似，`<keep-alive>` 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在组件的父组件链中。
当组件在 `<keep-alive>` 内被切换，它的 `activated `和 `deactivated` 这两个生命周期钩子函数将会被对应执行。
## 基本使用
使用的时候分两个版本。
在vue 2.1.0 之前，大部分是这样实现的：
```vue
<keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>
new Router({
    routes: [
        {
            name: 'a',
            path: '/a',
            component: A,
            meta: {
                keepAlive: true
            }
        },
        {
            name: 'b',
            path: '/b',
            component: B
        }
    ]
})
```
这样配置路由的路由元信息之后，a路由的` $route.meta.keepAlive `便为 true ，而b路由则为 false 。所以为 true 的将被包裹在 keep-alive 中，为 false 的则在外层。这样a路由便达到了被缓存的效果，如果还有想要缓存的路由，只需要在路由元中加入 keepAlive: true 即可。

在vue 2.1.0 版本之后，keep-alive 新加入了两个属性: include(包含的组件缓存生效) 与 exclude(排除的组件不缓存，优先级大于include) 。
include 和 exclude 属性允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示。
当使用正则或者是数组时，一定要使用 v-bind 。

简单使用：
```vue
<!-- 逗号分隔字符串 -->
<keep-alive include="a,b">
  <component :is="view"></component>
</keep-alive>
<!-- 正则表达式 (使用 `v-bind`) -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>
<!-- 数组 (使用 `v-bind`) -->
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>
<!-- 配合router-view使用 -->
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
推荐使用2.1.0以后的版本来做缓存策略，代码更加简洁，而且少了很多的重复渲染。
## 高级进阶使用
我们了解了基本的使用，但是在日常项目中可没有想象的那么简单，所以需要设计一下整个项目的缓存策略，如何让所有组件可以动态的去切换自己的缓存属性是一个值得考虑的问题。

### 业务场景

1.列表页进入详情页，详情页中有头也有行列表。

2.从详情页的行列表进入行详情页查看后返回详情页，详情页不刷新，如果行详情页修改后，我进入详情页需要刷新。

这样的业务场景在移动端非常常见，当然解决方法也有很多，比如每次返回详情页传递给详情页一个标志之类的，然后在详情页做判断，根据标志去获取store里面的数据还是接口最新数据，这样做判断不仅麻烦，而且无法做到页面级的缓存，而且耗费内存资源。如果使用好了keep-alive，你可以轻松实现如上效果。
### 整体设计思路
1.在store里面写三个方法：setKeepAlive，setNoKeepAlive，getKeepAlive，作用分别是设置需要缓存的组件，清除不需要缓存的组件，获取缓存的组件。

2.获得所有的组件的name属性，并将其存入store里面的一个数组中。

3.在App.vue挂载的时候去获取缓存的组件数组。

4.在页面路由拦截函数中去动态设置页面是不是要缓存。

5.在App.vue中监听store的变化，对include对应的数组进行赋值。

### 具体实现
1.store里面注册三个方法
```javascript
const state = {
  keepAliveComponents:[],
}
const getters = {
  getKeepAlive (state) {
    return state.keepAliveComponents
  },
}
const mutations = {
  setKeepAlive (state, component) {
    // 判断keepAliveComponents中是否存在之前设置过的组件名，避免重复
    !state.keepAliveComponents.includes(component) && state.keepAliveComponents.push(component)
  },
  setNoKeepAlive (state, component) {
    // 删除不要缓存的组件
    const index = state.keepAliveComponents.indexOf(component)
    index !== -1 && state.keepAliveComponents.splice(index, 1)
  },
}
const actions = {}
export default {
  state,
  getters,
  mutations,
  actions,
}
```
2.路由集合中去设置每个组件都缓存。
```javascript
routes.forEach((item) => {
    // 在路由全局钩子beforeEach中,作用是每次进入该组件，就将它缓存
  store.commit('setKeepAlive', item.name)
 })
export default routes
```
⚠️注意：
这里没有写成`store.commit('setKeepAlive', item.component.name)`，而是`item.name`。
本应该写成`store.commit('setKeepAlive', item.component.name)`，因为`include`接受的是组件的名，但是在按需加载的情况下打包后这个`name`会变化，所以在开始设计你的项目的时候尽量保证路由名和组件名一致。

3.在App.vue挂载的时候去获取缓存的组件数组，默认全部缓存。
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
import Vue from 'vue'
import store from './store'
export default {
  name: 'App',
  data () {
    return {
      keepAliveComponentsData: [],
    }
  },
  mounted () {
    // 挂载获取需要缓存的组件
    this.keepAliveComponentsData = store.getters.getKeepAlive
  }
}
</script>
```
4.动态改变页面的缓存属性。

比如我要从详情页跳转行详情了，跳转之前我不能让行详情有缓存，如果行详情有缓存的话，每次进去都是一样的。所以我要清除缓存。
```javascript
toLoanApplicationDetail (index) {
  store.commit('setNoKeepAlive', 'LoanlineReadonly')
}      
```

我现在需要从行详情跳转到其他关联的单据了，那我肯定需要缓存一下行详情了，不然回到行详情啥都没有了。
```javascript
toContractDetail (item) {
	store.commit('setKeepAlive', 'LoanlineReadonly')
}      
```


5.监听缓存变化。

动态设置可以了，我现在还需要去动态绑定到include的数组上，所以我需要在每次页面跳转的时候去监听一下。
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
import Vue from 'vue'
import store from './store'
export default {
  name: 'App',
  data () {
    return {
      keepAliveComponentsData: [],
    }
  },
  mounted () {
    this.keepAliveComponentsData = store.getters.getKeepAlive
  },
  watch: {
    // 监听路由变化动态设置include绑定的数据
    $route (to, from) {
      this.keepAliveComponentsData = store.getters.getKeepAlive
    },
  },
}
</script>
```
现在用法说完了，但是对其原理好像还不是很清楚，那就来看看他的实现方式。
## 原理解析
keep-alive核心思想就是将组件缓存为vnode，然后用include里面的数组去匹配，匹配到就拿来直接用，如果exclude变化的话就销毁对应的vnode。
### 源码解析
直接贴源码。大概理解写注释里面
```javascript
import { isRegExp, remove } from 'shared/util'
import { getFirstComponentChild } from 'core/vdom/helpers/index'
type VNodeCache = { [key: string]: ?VNode };
// 获取组件名
function getComponentName (opts: ?VNodeComponentOptions): ?string {
  return opts && (opts.Ctor.options.name || opts.tag)
}
// 一个检测name是否匹配的函数
function matches (pattern: string | RegExp | Array<string>, name: string): boolean {
  // 数组
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') { //字符串
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) { //正则
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}
// 修正cache
function pruneCache (keepAliveInstance: any, filter: Function) {
  const { cache, keys, _vnode } = keepAliveInstance
  for (const key in cache) {
    // 取出cache中的vnode
    const cachedNode: ?VNode = cache[key]
    if (cachedNode) {
      const name: ?string = getComponentName(cachedNode.componentOptions)
      /* name不符合filter条件的，同时不是目前渲染的vnode时，销毁vnode对应的组件实例（Vue实例），并从cache中移除 */
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  }
}
function pruneCacheEntry (
  cache: VNodeCache,
  key: string,
  keys: Array<string>,
  current?: VNode
) {
  const cached = cache[key]
  if (cached && (!current || cached.tag !== current.tag)) {
    /* 销毁vnode对应的组件实例（Vue实例） */
    cached.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}
const patternTypes: Array<Function> = [String, RegExp, Array]
export default {
  name: 'keep-alive',
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  created () {
    /* 缓存对象 */
    this.cache = Object.create(null)
    this.keys = []
  },
    /* destroyed钩子中销毁所有cache中的组件实例 */
  destroyed () {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },
  mounted () {
    /* 监视include以及exclude，在被修改的时候对cache进行修正 */
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },
  render () {
    /* 得到slot插槽中的第一个组件 */
    const slot = this.$slots.default
    const vnode: VNode = getFirstComponentChild(slot)
    const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
    if (componentOptions) {
      // check pattern
      /* 获取组件名称，优先获取组件的name字段，否则是组件的tag */
      const name: ?string = getComponentName(componentOptions)
      const { include, exclude } = this
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }
      const { cache, keys } = this
      const key: ?string = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key
      /* 如果已经做过缓存了则直接从缓存中获取组件实例给vnode，还未缓存过则进行缓存 */
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance
        // make current key freshest
        remove(keys, key)
        keys.push(key)
      } else {
        cache[key] = vnode
        keys.push(key)
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
      }
            /* keepAlive标记位 */
      vnode.data.keepAlive = true
    }
    return vnode || (slot && slot[0])
  }
}
```
### 简单总结

1.created钩子会创建一个cache对象，用来作为缓存容器，保存vnode节点。destroyed钩子则在组件被销毁的时候清除cache缓存中的所有组件实例。

2.在render函数中主要做了这些事情：

• 首先通过getFirstComponentChild获取第一个子组件，获取该组件的name（存在组件名则直接使用组件名，否则会使用tag）。

• 接下来会将这个name通过include与exclude属性进行匹配，匹配不成功（说明不需要进行缓存）则不进行任何操作直接返回vnode，vnode是一个VNode类型的对象。

• include与exclude属性支持字符串如"a,b,c"这样组件名以逗号隔开的情况以及正则表达式。matches通过这两种方式分别检测是否匹配当前组件。

• 然后根据key在this.cache中查找，如果存在则说明之前已经缓存过了，直接将缓存的vnode的componentInstance（组件实例）覆盖到目前的vnode上面，否则将vnode存储在cache中。最后返回vnode（有缓存时该vnode的componentInstance已经被替换成缓存中的了）。

3.需要监听改变就用watch来监听pruneCache与pruneCache这两个属性的改变，在改变的时候修改cache缓存中的缓存数据。

4.Vue.js内部将DOM节点抽象成了一个个的VNode节点，keep-alive组件的缓存也是基于VNode节点的而不是直接存储DOM结构。它将满足条件（pruneCache与pruneCache）的组件在cache对象中缓存起来，在需要重新渲染的时候再将vnode节点从cache对象中取出并渲染。