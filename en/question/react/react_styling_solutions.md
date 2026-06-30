---
outline: deep
title: Styling Solutions in React
titleTemplate: Frontend Interview Notes
---

# Styling Solutions in React

![Diagram of React styling options](/images/i18n/react-styling-en-map.svg)

## Inline styles

React supports inline styles by passing a style object directly to an element.

```javascript
const MyComponent = () => {
  const styles = {
    backgroundColor: 'blue',
    color: 'white',
    fontSize: '16px',
  };

  return <div style={styles}>This is a styled component.</div>;
};
```

### Pros
1. avoids naming collisions
2. supports dynamic styles naturally
3. keeps style logic close to the component
4. works well with JavaScript variables and branching

### Cons
1. styles are harder to cache and reuse
2. pseudo-classes and media queries are not directly available
3. runtime style object generation can add overhead
4. browser devtools workflows are less natural than stylesheet-based styling

## Traditional CSS

A basic and familiar option is to keep styles in standalone CSS files and import them into components.

```css
.myComponent {
  background-color: blue;
  color: white;
  font-size: 16px;
}
```

```javascript
import React from 'react';
import './styles.css';

const MyComponent = () => {
  return <div className="myComponent">This is a styled component.</div>;
};
```

### Pros
1. familiar and simple
2. lightweight
3. good for global design rules

### Cons
1. global scope can lead to collisions
2. weak isolation
3. reuse and composition are less structured
4. large projects can become hard to maintain
5. dynamic styling is less convenient

## CSS Modules

CSS Modules scope styles to a component by turning class names into locally scoped identifiers.

```css
.myComponent {
  background-color: blue;
  color: white;
  font-size: 16px;
}
```

```javascript
import React from 'react';
import styles from './MyComponent.module.css';

const MyComponent = () => {
  return <div className={styles.myComponent}>This is a styled component.</div>;
};
```

### Pros
1. local scoping
2. fewer naming conflicts
3. easier reuse and modularity
4. good build-time optimization opportunities

### Cons
1. some learning curve
2. extra setup compared with plain CSS
3. dynamic styling is still more limited than JavaScript-driven approaches

## CSS-in-JS

CSS-in-JS lets you define styles directly inside JavaScript, often with libraries such as Styled Components or Emotion.

```javascript
import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  background-color: blue;
  color: white;
  font-size: 16px;
`;

const MyComponent = () => {
  return <StyledDiv>This is a styled component.</StyledDiv>;
};
```

### Pros
1. strong component-level encapsulation
2. dynamic styles based on props or state
3. styles and component logic stay together
4. reusable style primitives
5. some libraries add prefixing and optimization automatically

### Cons
1. higher learning curve
2. possible bundle size impact
3. runtime costs in some implementations
4. extra dependencies
5. editor tooling can vary by setup

## CSS frameworks

Another approach is to rely on a CSS framework such as Bootstrap or Tailwind CSS.

Tailwind example:

```javascript
<div className="text-red-500 text-lg">Hello World!</div>
```

### Pros
1. faster UI delivery
2. consistent visual system
3. strong support for responsive design
4. large ecosystem and community
5. often highly practical for teams

### Cons
1. can introduce a lot of unused styles if not managed carefully
2. framework conventions may fight custom design needs
3. overriding styles can become awkward
4. requires learning the framework's model

## Summary

There is no universal best choice.

- Use **plain CSS** when the project is simple and global styling is acceptable.
- Use **CSS Modules** when you want local scoping without moving styling into JavaScript.
- Use **CSS-in-JS** when dynamic styling and component-level encapsulation matter a lot.
- Use a **framework** when delivery speed and consistency are more important than full styling freedom.
- Use **inline styles** sparingly, usually for highly dynamic one-off cases.

In real projects, the right answer often depends on team habits, design complexity, performance goals, and build tooling.
