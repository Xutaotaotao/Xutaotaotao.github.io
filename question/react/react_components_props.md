---
outline: deep
title: React组件通信方式
titleTemplate: 前端面试题
---

# React组件通信方式

![](https://cdn.nlark.com/yuque/0/2023/jpeg/277039/1690715555815-409e6af8-4097-49b8-b28e-c59f769558bc.jpeg)

## Props

Props 是 React 组件之间传递数据的一种机制，允许父组件向子组件传递数据和方法。
```jsx
// Parent.js
import React from 'react';
import Child from './Child';
function Parent() {
  const message = 'Hello from Parent!';
  return <Child message={message} />;
}

// Child.js
import React from 'react';
function Child(props) {
  return <div>{props.message}</div>;
}
```
在这个示例中，`Parent` 组件通过将 `message` 数据通过 `props` 传递给 `Child` 组件，`Child` 组件接收到这个数据并在页面上展示出来。

## 回调函数

通过将一个回调函数作为 props 传递给子组件，子组件可以在适当的时机调用该回调函数，从而将数据传递回父组件。
```jsx
// Parent.js
import React, { useState } from 'react';
import Child from './Child';
function Parent() {
  const [data, setData] = useState('');
  // 定义回调函数，用于接收子组件传递的数据
  const handleChildData = (dataFromChild) => {
    setData(dataFromChild);
  };
  return (
    <div>
      <Child onData={handleChildData} />
      <p>Data from Child: {data}</p>
    </div>
  );
}

// Child.js
import React from 'react';
function Child(props) {
  const sendDataToParent = () => {
    // 在适当的时机调用父组件传递的回调函数，并传递数据作为参数
    props.onData('Data from Child!');
  };
  return <button onClick={sendDataToParent}>Send Data</button>;
}
```
在这个示例中，`Child` 组件通过 `props` 接收一个名为 `onData` 的回调函数，然后在按钮点击时调用该回调函数，并将数据作为参数传递给 `Parent` 组件，从而实现了子组件向父组件传递数据的通信。
# Ref
在 React 中，`ref` 是用于访问 DOM 元素或类组件实例的一个特殊属性。虽然 `ref` 主要用于访问 DOM 元素，但也可以用来进行组件间通信。通过 `ref`，你可以在父组件中获取对子组件的引用，从而直接调用子组件的方法或访问其状态。
```jsx
// Parent.js
import React, { useRef } from 'react';
import Child from './Child';
function Parent() {
  // 创建一个 ref 对象
  const childRef = useRef(null);
  const sendDataToChild = () => {
    // 通过 ref.current 获取子组件的引用，并调用其方法
    childRef.current.displayMessage('Data from Parent!');
  };
  return (
    <div>
      <button onClick={sendDataToChild}>Send Data to Child</button>
      <Child ref={childRef} />
    </div>
  );
}

// Child.js
import React, { forwardRef, useImperativeHandle } from 'react';
const Child = forwardRef((props, ref) => {
  // 定义子组件内部的状态
  const [message, setMessage] = React.useState('');
  // 定义子组件的方法，可以被父组件调用
  const displayMessage = (data) => {
    setMessage(data);
  };
  // 使用 useImperativeHandle 将子组件的方法暴露给父组件
  useImperativeHandle(ref, () => ({
    displayMessage,
  }));
  return <div>Message from Parent: {message}</div>;
});
```
在这个示例中，Parent 组件通过 `useRef` 创建了一个 `childRef` 对象，用来存储对 Child 组件的引用。然后，通过将 `childRef` 传递给 Child 组件的 `ref` 属性，将对子组件的引用传递给了父组件。
在 Child 组件中，我们使用了 `forwardRef` 来允许 `ref` 属性传递给内部的子组件。然后，使用 `useImperativeHandle hook` 将子组件的 `displayMessage` 方法暴露给父组件，从而允许父组件直接调用子组件的方法。

**⚠️注意事项**：使用 `ref` 进行组件间通信可以在某些特定场景下非常有用，但应该谨慎使用，尽量遵循 `React` 的数据流向原则，避免过度依赖 `ref` 来进行组件通信。

## Context

React 中的 `Context` 是一种用于实现跨组件层级的数据传递的特性。通过 `Context`，您可以在组件树中直接传递数据，而不需要通过 `props` 一层一层地手动传递。这样，您可以在组件间实现高效的数据共享和通信。
```jsx
// MyContext.js
import React from 'react';
// 创建一个 Context 对象
const MyContext = React.createContext();
export default MyContext;

// Parent.js
import React, { useState } from 'react';
import Child from './Child';
import MyContext from './MyContext';

function Parent() {
  const [message, setMessage] = useState('');

  const handleChildData = (dataFromChild) => {
    setMessage(dataFromChild);
  };

  return (
    <MyContext.Provider value={message}>
      <Child onData={handleChildData} />
      <p>Data from Child: {message}</p>
    </MyContext.Provider>
  );
}
export default Parent;

// Child.js
import React, { useContext } from 'react';
import MyContext from './MyContext';
function Child(props) {
  const message = useContext(MyContext);
  const sendDataToParent = () => {
    props.onData('Data from Child!');
  };
  return (
    <div>
      <button onClick={sendDataToParent}>Send Data</button>
      <p>Data from Parent: {message}</p>
    </div>
  );
}
export default Child;
```
在这个示例中，我们先创建了一个 Context 对象 `MyContext`。然后在 `Parent` 组件中，通过 `MyContext.Provider` 包裹子组件，将 `message` 状态作为 value 传递给 Context。这样，`Child` 组件就能够通过 `useContext(MyContext)` 获取到 Context 中的数据 `message`。
在 `Child` 组件中，我们使用 `useContext` hook 获取了 Context 中的数据，并在按钮点击时通过 `props.onData('Data from Child!')` 将数据传递给父组件 `Parent`。
通过 Context，组件间的数据传递更加简洁和高效，尤其适用于需要在组件树中的多个层级中传递数据的场景。

**⚠️注意事项**：Context 不应该被滥用，最好只在跨组件层级的数据共享场景中使用。在其他情况下，还是推荐使用 Props 或其他适合的组件通信方式。

## Redux

在 React 应用中，Redux 是一种状态管理库，用于解决组件通信和状态共享的问题。Redux 通过将应用的状态存储在一个全局的单一状态树中，并使用纯函数来修改状态，实现了组件间通信和数据流的一致性。
```jsx
// actions.js
export const addTodo = (text) => ({type: 'ADD_TODO',payload: { text },});

// reducers.js
const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload.text],
      };
    default:
      return state;
  }
};
export default todoReducer;

// store.js
import { createStore } from 'redux';
import todoReducer from './reducers';
const store = createStore(todoReducer);
export default store;

// App.js
import React from 'react';
import { Provider } from 'react-redux';
import TodoList from './TodoList';
import store from './store';
function App() {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
}

// TodoList.js
import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from './actions';
function TodoList(props) {
  const { todos, addTodo } = props;
  const handleAddTodo = () => {
    addTodo('New Todo');
  };
  return (
    <div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const mapDispatchToProps = {
  addTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```
在上面的示例中，我们首先创建了一个 Redux Store，并定义了一个 Reducer 来处理状态的变化。在 TodoList 组件中，我们通过 `connect` 函数将组件连接到 Redux Store，使其能够访问 `todos` 状态并派发 `addTodo Action`。在点击按钮时，会调用 `handleAddTodo` 函数，该函数通过 `addTodo Action` 将新的 Todo 添加到状态中，从而触发状态的更新。最终，TodoList 组件将根据更新后的状态重新渲染，并在页面上展示新的 Todo。
通过 Redux，组件间的数据通信变得简洁和高效，使得数据流的管理更加清晰和可控。

**⚠️注意事项**：Redux 也需要更多的代码和设置，因此在小型应用或组件间通信简单的场景下，可以考虑其他更轻量级的状态管理解决方案。
## 消息发布-订阅
在 React 中，可以使用消息发布-订阅模式（Pub/Sub）来实现组件间的通信。消息发布-订阅模式是一种解耦的通信方式，其中一个组件作为消息的发布者（或称为事件的发起者），而其他组件可以作为消息的订阅者（或称为事件的监听者）。发布者发布消息，订阅者监听并响应这些消息，从而实现了组件间的解耦通信。在 React 中，可以使用第三方库如 `pubsub-js` 或 `postal.js` 来实现消息发布-订阅模式。
```jsx
// Publisher.js
import React from 'react';
import pubsub from 'pubsub-js';
function Publisher() {
  const publishMessage = () => {
    pubsub.publish('customEvent', 'Hello from Publisher!');
  };
  return (
    <div>
      <button onClick={publishMessage}>Publish Message</button>
    </div>
  );
}
export default Publisher;

// Subscriber.js
import React, { useState, useEffect } from 'react';
import pubsub from 'pubsub-js';
function Subscriber() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    // 订阅消息
    const token = pubsub.subscribe('customEvent', (msg, data) => {
      setMessage(data);
    });
    return () => {
      // 组件卸载时取消订阅
      pubsub.unsubscribe(token);
    };
  }, []);
  return (
    <div>
      <p>Received Message: {message}</p>
    </div>
  );
}
export default Subscriber;
```
在这个示例中，`Publisher` 组件作为消息的发布者，通过调用 `pubsub.publish` 发布了一个名为 `'customEvent'` 的消息，内容为 `'Hello from Publisher!'`。`Subscriber` 组件作为消息的订阅者，通过 `pubsub.subscribe` 方法订阅了 `'customEvent'` 消息，并在接收到消息后更新状态 `message`。当点击 `Publisher` 组件中的按钮时，会发布消息，`Subscriber` 组件会接收到消息并更新页面上显示的消息内容。
使用消息发布-订阅模式可以实现组件间的松耦合通信，不需要明确地将消息传递给特定的组件，使得组件的通信更加灵活和解耦。

**⚠️注意事项**：使用消息发布-订阅模式时需要注意管理订阅的生命周期，确保在组件卸载时取消订阅，避免潜在的内存泄漏问题。
## 全局事件
在 React 中，可以使用原生的 JavaScript 全局事件（`addEventListener` 和 `dispatchEvent`）来实现组件之间的通信。
```jsx
import React, { useEffect, useRef } from 'react';

function SenderComponent() {
  const inputRef = useRef(null);
  const sendData = () => {
    const data = inputRef.current.value;
    // 创建一个自定义事件，并将数据作为事件的 detail 属性
    const customEvent = new CustomEvent('customEvent', { detail: data });
    // 触发全局事件
    window.dispatchEvent(customEvent);
  };
  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={sendData}>Send Data</button>
    </div>
  );
}

function ReceiverComponent() {
  const [receivedData, setReceivedData] = React.useState('');
  useEffect(() => {
    // 监听全局事件，并在事件触发时更新状态
    const handleCustomEvent = (event) => {
      setReceivedData(event.detail);
    };
    window.addEventListener('customEvent', handleCustomEvent);
    return () => {
      // 在组件卸载时移除事件监听
      window.removeEventListener('customEvent', handleCustomEvent);
    };
  }, []);
  return <div>Received Data: {receivedData}</div>;
}

function App() {
  return (
    <div>
      <SenderComponent />
      <ReceiverComponent />
    </div>
  );
}

export default App;
```

在上述示例中，`SenderComponent` 组件中有一个输入框和一个按钮，当按钮被点击时，会创建一个自定义事件 `customEvent`，并将输入框中的数据作为事件的 `detail` 属性。然后通过 `window.dispatchEvent(customEvent)` 触发该自定义事件。
`ReceiverComponent` 组件中使用 `useEffect` 来监听全局事件 `customEvent`，并在事件触发时更新组件的状态，显示接收到的数据。
在 `App` 组件中将 `SenderComponent` 和 `ReceiverComponent` 组件放在一起，当在 `SenderComponent` 输入框中输入数据并点击按钮后，`ReceiverComponent` 就会接收并显示这些数据。
使用事件总线可以实现全局事件通信，使得组件之间的通信更加灵活和解耦。

**⚠️注意事项**：虽然全局事件可以实现组件之间的通信，但是在使用时要小心，避免过度使用全局事件，以免导致代码不易维护和理解。通常，推荐使用其他更明确的组件通信方式，如 Props、Context API、Redux 等。全局事件在某些特定场景下可能会有用，但要慎重使用。
## 总结
组件件通信的方式很多，每种都有每种的使用场景，下面做个简单总结：

1. **Props**
- 优点:父子组件间通信简单直观,属性传递明确。
- 缺点:多层组件传递props会繁琐,只能一方向传递数据。
2. **回调函数**
- 优点:可以实现子组件向父组件传递数据。
- 缺点:回调函数需要层层传递,代码冗余。
3. **Ref**
- 优点:可以直接访问子组件实例,灵活调用方法。
- 缺点:破坏组件封装,不够优雅,需要注意引用释放。
4. **Context**
- 优点:跨组件传递数据,避免层层传递props。
- 缺点:上下文数据会被许多组件共享,不够明确。
5. **Redux**
- 优点:集中管理状态,组件可订阅store数据。
- 缺点:需要额外的store设置,更复杂的状态管理。
6. **发布-订阅**
- 优点:解耦组件通信,组件间低耦合。
- 缺点:需要引入额外库,订阅管理复杂。
7. **全局事件**
- 优点:灵活的事件通信方式,解耦组件。
- 缺点:全局事件滥用会使程序难以维护。

总体而言,不同场景需要选择合适的通信方式,简单的父子组件间通信可以使用 Props 和回调函数,复杂数据流建议使用 Redux 或 Context 等。