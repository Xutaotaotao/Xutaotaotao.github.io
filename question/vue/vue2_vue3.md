---
outline: deep
title: Vue2 和 Vue3对比
titleTemplate: 徐涛焘的博客
---

# Vue2 和 Vue3对比

<img src="/question/vue/vue2_vue3.jpg" width="500" height="520">

## 原理
主要是数据响应式上的区别，这也是最核心的区别<br />**Vue.js 2的响应式：**

1. **Object.defineProperty：** Vue.js 2使用`Object.defineProperty`来监听对象的属性访问和修改。当一个对象被传递给Vue实例的`data`选项时，Vue会遍历对象的每个属性，并使用`Object.defineProperty`将其转换为"响应式"的属性。这样一来，当数据发生变化时，Vue就能捕获到变化，并触发视图的更新。
2. **依赖追踪：** 在Vue.js 2中，每当视图（模板）访问一个响应式对象的属性时，Vue会在背后建立起一个依赖关系。这样，当属性发生改变时，Vue就能够找到对应的依赖，进而更新相关的视图。
3. **数组变异方法：** 由于`Object.defineProperty`只能监听对象的属性访问和修改，Vue.js 2对于数组的响应式处理需要特殊处理。Vue.js 2通过重写了数组的原型方法，如`push`、`pop`、`splice`等，使得这些方法在被调用时能够触发视图的更新。

**Vue.js 3的响应式：**

1. **ES6 Proxy：** Vue.js 3采用了ES6的`Proxy`代理，这是JavaScript的一种新特性。Proxy可以拦截并重定义对象上的操作，使得可以监听到对象的任何属性的访问和修改。
2. **依赖追踪优化：** Vue.js 3在依赖追踪方面进行了优化，将其与Proxy相结合，从而更高效地进行数据追踪和更新。这也使得在Vue.js 3中，对数组的处理更加自然，无需像Vue.js 2一样重写数组的原型方法。
3. **Composition API支持：** Vue.js 3的Composition API使得对数据的处理更加灵活，可以更好地组织组件逻辑，并减少了在大型应用中的数据追踪和管理的复杂性。
## 生命周期
主要区别是Vue3合并了一些钩子,同时新增了几个钩子,并通过组合式API让用户获得更多自定义钩子的灵活性。这些改变使得生命周期之间的关联更加清晰,也给用户提供了更好的逻辑组织方式。下面是一个比较列表


<img src="/question/vue/vue2_vue3_1.png">


## 性能

1. **数据监听机制**

Vue2通过Object.defineProperty()进行数据劫持,需要遍历所有属性,有一定性能开销。<br />Vue3使用Proxy代理数据,直接监听对象,减少遍历属性时间,性能更好。

2. **编译优化**

Vue3对编译过程进行了优化,静态节点提升,缓存事件处理函数等,启动速度比Vue2**快10-100倍**。

3. **包体积**

Vue3移除了一些不常用的API,并优化了Tree-Shaking,使打包体积相比Vue2小**10%左右**。

4. **内存占用**

Vue3中移除了一些内存占用高的功能,同时优化了部分内存分配,降低内存消耗。

5. **SSR优化**

Vue3使用异步SSR,大大减少主线程执行代码量,提升服务器端渲染性能。<br />Vue3可以说在初始化、渲染、内存占用等多个方面对Vue2有很大的性能提升，这使得Vue3可以承载更复杂的应用场景。
## 编码方式

1. **Options API 和 Composition API**

Vue2通过Options API进行编码,逻辑分散,不便于重用。<br />Vue3引入Composition API,基于函数式编程,代码更聚合。

2. **definingComponent**

Vue3通过definingComponent API定义组件,语法更清晰。

3. **Ref 和 Reactive**

Vue3通过Ref和Reactive API声明响应式变量,语法更简洁。

4. **setup**

Vue3中通过setup函数统一声明逻辑。Vue2逻辑分散在多个选项中。

5. **异步组件**

Vue3直接支持返回Promise的异步组件。
## API

1. **Options API 和 Composition API**
-  Vue2中主要通过Options API进行开发,如data、methods等。 
-  Vue3推荐使用Composition API,如ref、reactive、watch、computed等。 
2. **移除过滤器(filter)**
-  Vue2中可以使用filter对数据进行转换后显示。 
-  Vue3移除了filter,推荐使用方法或计算属性代替。 
3. **全局和内实例API调整**
-  Vue3删除了一些不常用的全局和内实例API，并做了功能调整,如$on改为app.config.globalProperties。 
4. **源码级API**
- Vue3暴露了部分源码API用于扩展,如createRenderer。
## Diff 算法

1. **静态标记**
-  Vue2 中通过标记静态根节点,跳过对这部分的Diff。 
-  Vue3 使用Shape Flags更精确地标记静态根,提高Diff效率。 
2. **优化逻辑**
-  Vue.js 2使用了比较经典的双指针（双端比较）的Diff算法。当进行Virtual DOM的更新时，Vue.js 2会比较新的Virtual DOM和旧的Virtual DOM，找出需要更新的节点并最小化更新DOM。 
-  Vue.js 3对Diff算法进行了优化，采用了更加高效的单端比较的Diff算法。在Vue.js 3中，每个VNode都有一个唯一的标识，这个标识在更新时被用来进行快速的节点匹配和查找。
3. **分块对比**
-  Vue3 支持对相邻重复节点进行分块比较,减少冗余Diff。 
-  如列表中连续相同文本节点进行合并比较。 
4. **异步渲染**
-  Vue3 支持组件异步渲染,等待组件完成再进行Diff。 
-  避免无效对比,提高性能。 
5. **代码减少**
-  Vue3 对核心Diff逻辑进行了裁剪,移除了冗余代码。 
-  优化后代码量减少超过40%。 
6. **SSR Diff**
-  Vue3 新增了 SSR 环境下的 Diff 优化模式。 
-  避免不必要客户端对比,加快渲染速度。 
## 打包构建

1. **打包体积**
-  Vue3移除了一些不常用的API,同时优化了Tree-shaking。 
-  与Vue2相比,打包后体积减小约10%。 
2. **依赖优化**
- Vue3对依赖进行了优化,裁剪不必要代码,减少冗余。
3. **构建速度**
-  Vue3改进了编译过程,提高了构建速度。 
-  特别是prod模式下打包速度明显加快。 
4. **编译优化**
-  Vue3改用优化的自动化持久缓存,加速增量编译。 
-  配合新语法提升热重载速度。 
5. **Tree-shaking**
-  Vue3编译支持更精确的Tree-shaking,删除无用代码。 
-  如自动Tree-shaking样式表。 
6. **模块化**
-  Vue3源码实现了高度的ESM模块化。 
-  更好的支持Tree-shaking、懒加载等能力。 
7. **新特性支持**
- Vue3内置支持了碎片、Teleport、Suspense等新特性。
## TypeScript支持

1. **内部实现**
-  Vue2源码是JavaScript编写,需要手动维护类型定义。 
-  Vue3源码直接采用TypeScript重写,类型信息内置。 
2. **组件定义**
-  Vue2使用.vue文件,需要额外的vue-class-component decorators。 
-  Vue3可以直接以类的形式定义组件,更纯粹的TS体验。 
3. **Options API**
-  Vue2的Options API缺乏类型推导。 
-  Vue3增强了对Options API的类型推导。 
4. **Composition API**
-  Vue3的Composition API全面采用泛型、接口等TS新语法。 
-  提供完整的类型支持。 
5. **引用注册**
-  Vue3改用统一的`defineComponent`方法注册组件。 
-  提供完整的Props检验和IDE提示。 
6. **TS配置**
- Vue3优化了`tsconfig.json`,提供更严谨的TS类型检查。
7. **内置工具类型**
- Vue3导出了部分内置工具的TS类型,增强扩展性。
## 总结
总体而言,Vue3对Vue2进行了全方位的升级:

1. 性能上,Vue3做了很多优化,无论是初始化速度还是渲染效率都有显著提高。
2. 功能上,Vue3添加了Composition API、Fragment、Teleport等前沿特性。
3. 架构上,Vue3使用TypeScript重写了代码,整体架构更加清晰优雅。
4. API上,废弃了一些API,新增了组合式API,提高了开发效率。
5. 组织上,推荐函数式编程和hooks,使代码逻辑更加聚合。
6. 构建上,改进了编译和Treeshaking,使打包速度和体积都得到优化。
7. 生态上,Vue3的升级将促进相关工具链的进一步完善。
