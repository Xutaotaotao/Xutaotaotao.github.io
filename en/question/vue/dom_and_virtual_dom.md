---
outline: deep
title: Real DOM and Virtual DOM
titleTemplate: Frontend Interview Notes
---

# Real DOM and Virtual DOM

<img src="/question/vue/dom_and_virtual_dom.jpg" width="500" height="520" alt="Illustration of real DOM and virtual DOM">

## Concepts

### Real DOM

The Document Object Model (DOM) is a programming interface for representing and manipulating HTML, XML, and SVG documents. The real DOM is a tree structure in which every element, attribute, and text node in the document is represented as a node. Developers can use JavaScript and other scripting languages to manipulate that structure directly.

### Virtual DOM

The virtual DOM is a concept and technique used to improve frontend rendering performance. It is a lightweight JavaScript object tree that represents an abstract version of the real DOM.

Its basic workflow looks like this:

1. **Initialization:** when a page loads, the initial real DOM state is represented as a virtual DOM tree
2. **Data change:** when state changes, a new virtual DOM tree is created
3. **Diffing:** the framework compares the old and new virtual DOM trees and records what changed
4. **Patch:** only the actual differences are applied to the real DOM

## Differences

### How they are used

#### Real DOM

1. **Direct manipulation:** developers call native DOM APIs such as `document.getElementById` or `appendChild`
2. **More manual coordination:** in many setups, developers must track state changes and trigger updates themselves

#### Virtual DOM

1. **An abstraction layer:** developers manipulate state and describe the desired UI rather than mutating DOM nodes directly
2. **A declarative style:** frameworks calculate the minimal real DOM updates automatically

## Advantages

### Real DOM

1. **Native power:** the real DOM is the browser's actual rendering interface
2. **Broad support:** it is standardized and well supported
3. **Familiarity:** many developers understand direct DOM manipulation well

### Virtual DOM

1. **Better performance under frequent updates:** it reduces unnecessary DOM reads and writes
2. **More flexibility:** it is easier to support cross-platform rendering and testing
3. **Platform abstraction:** the same ideas work for the web, SSR, and even some native-like rendering targets

## Disadvantages

### Real DOM

1. **Performance cost:** repeated direct DOM writes can trigger expensive layout and paint work
2. **Higher complexity:** manual DOM creation, update, and removal logic becomes harder to maintain
3. **Cross-browser details:** low-level DOM behavior can still vary in ways that require extra care

### Virtual DOM

1. **Memory overhead:** the virtual tree is an extra representation in memory
2. **Learning cost:** it introduces abstraction and framework-specific patterns
3. **Computation cost:** diffing also takes time, so it is not free

## Typical use cases

### Real DOM

1. **Small applications:** simple structure, low update frequency
2. **Simple interactions:** straightforward UI logic where manual manipulation remains manageable

### Virtual DOM

1. **Large complex applications:** lots of components and frequent updates
2. **Performance-sensitive UI:** when minimizing repaint and reflow matters
3. **Component-based systems:** where local state changes should trigger targeted updates
4. **Cross-platform development:** when consistent rendering abstractions are useful

## Influencing factors

### Real DOM

1. Frequency of state changes
2. Complexity of DOM operations
3. Total number of DOM elements
4. Cross-browser compatibility needs
5. Performance requirements

### Virtual DOM

1. Frequency of state changes
2. Depth of component nesting
3. Complexity of interactions
4. Performance requirements
5. Team familiarity with the supporting framework

## Development efficiency

### Real DOM

1. **Directness:** easier to understand in small or simple scenarios
2. **Mature ecosystem:** traditional DOM tools and libraries are well known
3. **Small update scope:** sometimes simpler for tiny changes

### Virtual DOM

1. **More abstraction:** there is a learning curve
2. **Framework dependency:** developers need to learn framework APIs and conventions
3. **Optimization concerns:** performance still needs attention in large apps
4. **Component architecture:** better maintainability usually comes with more structural planning

## Performance discussion

### Real DOM

1. Each change maps directly to real DOM operations
2. Frequent updates can trigger more reflow and repaint
3. DOM access is relatively expensive
4. Fine-grained partial updates are harder to manage manually

### Virtual DOM

1. Works as an abstraction layer above the real DOM
2. Can batch multiple state changes into fewer DOM operations
3. Minimizes repaint and reflow by updating only changed parts
4. Supports targeted local updates
5. Benefits from framework-level diff and patch optimizations

### Why virtual DOM often performs better

1. Fewer direct DOM operations
2. Reduced repaint and reflow pressure
3. Better support for partial updates
4. Additional optimization opportunities from frameworks such as React and Vue

## Summary

Both real DOM and virtual DOM have valid use cases.

- Real DOM is direct and practical for simple scenarios
- Virtual DOM becomes more valuable when updates are frequent and UI complexity grows

In real projects, the right choice depends on the shape of the application, the performance profile, and the framework or architecture you are already using.
