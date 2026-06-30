---
outline: deep
title: Shallow Copy and Deep Copy
titleTemplate: Frontend Interview Notes
---

# Shallow Copy and Deep Copy

<img src="/question/javascript/shallow_copy_and_deep_copy.jpg" width="500" height="520" alt="Illustration of shallow copy and deep copy">

To explain shallow copy and deep copy clearly, it helps to first understand JavaScript data types.

## Data type basics

<img src="/question/javascript/shallow_copy_and_deep_copy1.jpg" width="500" height="520" alt="Diagram of JavaScript data types">

Except for `Object`, all types define immutable values at the lowest level of the language. We call these values **primitive values**.

In computer science, an object is a region of memory that can be referenced by an identifier. In JavaScript, objects are the main mutable values. In fact, functions are also objects, just with callable behavior.

Primitive values are typically discussed as being stored directly, while reference-type data such as objects is stored by reference. A variable holds either a direct primitive value or a reference to a location where the object data lives. Once that distinction is clear, the difference between shallow copy and deep copy becomes much easier to understand.

When we talk about shallow and deep copy, we are mainly talking about **objects**. Primitive values are simply copied as values, so the deep-vs-shallow distinction is not especially meaningful for them.

## Definitions

### Shallow copy

A shallow copy of an object copies the object's top-level properties, but if a property points to another object, the copy and the original still share the same reference.

That means:

- top-level primitive fields are copied by value
- nested objects are still shared
- changing a nested object through one reference can affect the other

The core behavior is that only one layer is copied. If a property is a primitive, the copied value is independent. If a property is a reference type, the copied result still points to the same underlying object.

**Important:** changing a nested property's contents is very different from assigning an entirely new value to that property. That distinction matters a lot when thinking about shallow copies.

### Deep copy

A deep copy creates a completely independent copy of the source object's nested structure.

That means:

- nested objects are copied recursively
- the new object does not share nested references with the original
- changes on one side do not affect the other

In short, deep copy clones the object together with the objects it refers to.

## Ways to create a shallow copy

### `Object.assign`

#### Usage

```javascript
const objClone = Object.assign(target, ...sources);
```

#### Notes

1. It does not copy inherited properties
2. It does not copy non-enumerable properties
3. It can copy `Symbol` properties
4. Later properties overwrite earlier ones when names collide

### Spread syntax

#### Usage

```javascript
// object
const objClone = { ...obj };

// array
const arrClone = [...arr];
```

#### Notes

Its limitations are similar to `Object.assign()`, but it is often more convenient when the data is mostly primitive fields.

### `slice`, `concat`, and `Array.from`

#### Usage

```javascript
// slice
const arrCloneBySlice = arr.slice();

// concat
const arrCloneByConcat = [].concat(arr);

// Array.from
const arrCloneByArrayFrom = Array.from(arr);
```

### Manual implementation

```javascript
function clone(target) {
  if (typeof target === "object" && target !== null) {
    const cloneTarget = Array.isArray(target) ? [] : {};
    for (let prop in target) {
      cloneTarget[prop] = target[prop];
    }
    return cloneTarget;
  } else {
    return target;
  }
}
```

## Ways to create a deep copy

### `JSON.stringify()`

```javascript
function deepClone(target) {
  if (typeof target === "object" && target !== null) {
    return JSON.parse(JSON.stringify(target));
  } else {
    return target;
  }
}
```

This is the simplest and most direct approach. It works for some basic cases, but it has many limitations. If your data is simple and you understand the trade-offs, it may be enough.

### `lodash.cloneDeep()` and `jQuery.extend()`

These are representative utility-library solutions and are straightforward to use.

```javascript
// lodash.cloneDeep()
_.cloneDeep(value);

// jQuery.extend()
jQuery.extend(true, {}, value);
```

### Manual implementation

Before implementing your own deep clone, ask what it needs to support:

1. Can it clone primitive values correctly?
2. Can it clone plain objects whose keys and values are primitives?
3. Can it clone `Symbol` keys?
4. Can it clone `Date`, `RegExp`, `Function`, `Map`, and `Set`?
5. Can it clone function objects?
6. Can it preserve prototypes?
7. Can it clone non-enumerable properties?
8. Can it handle circular references?

You can improve the implementation step by step.

#### First version

Turn the earlier shallow copy into a recursive version so it can copy deeper levels:

```javascript
function deepClone(target) {
  if (typeof target === "object" && target !== null) {
    const cloneTarget = Array.isArray(target) ? [] : {};
    for (let prop in target) {
      if (typeof target[prop] === "object" && target[prop] !== null) {
        cloneTarget[prop] = deepClone(target[prop]);
      } else {
        cloneTarget[prop] = target[prop];
      }
    }
  } else {
    return target;
  }
}
```

<img src="/question/javascript/shallow_copy_and_deep_copy4.png" alt="Result of a basic deep clone implementation test">

This first version only really satisfies the first two conditions. To support the rest, the function needs to become more complete:

```javascript
function deepClone(target) {
  const map = new WeakMap();

  function isObject(data) {
    return (typeof data === "object" && data) || typeof data === "function";
  }

  function clone(data) {
    if (!isObject(data)) {
      return data;
    }

    if ([Date, RegExp].includes(data.constructor)) {
      return new data.constructor(data);
    }

    if (typeof data === "function") {
      return new Function("return " + data.toString())();
    }

    const exist = map.get(data);
    if (exist) {
      return exist;
    }

    if (data instanceof Map) {
      const result = new Map();
      map.set(data, result);
      data.forEach((val, key) => {
        if (isObject(val)) {
          result.set(key, clone(val));
        } else {
          result.set(key, val);
        }
      });
      return result;
    }

    if (data instanceof Set) {
      const result = new Set();
      map.set(data, result);
      data.forEach((val) => {
        if (isObject(val)) {
          result.add(clone(val));
        } else {
          result.add(val);
        }
      });
      return result;
    }

    const keys = Reflect.ownKeys(data);
    const allDesc = Object.getOwnPropertyDescriptors(data);
    const result = Object.create(Object.getPrototypeOf(data), allDesc);
    map.set(data, result);
    keys.forEach((key) => {
      result[key] = isObject(data[key]) ? clone(data[key]) : data[key];
    });
    return result;
  }

  return clone(target);
}
```

This version handles a much wider set of cases:

- circular references through `WeakMap`
- `Date` and `RegExp`
- `Map` and `Set`
- symbol keys and non-enumerable properties
- prototype preservation

## Summary

Shallow copy and deep copy are fundamentally about whether nested references are shared.

- **Shallow copy** only copies the first layer and keeps nested references shared.
- **Deep copy** recursively duplicates nested structures so the new object is independent.

In simple cases, spread syntax or `Object.assign()` is usually enough for shallow copy. For deep copy, `JSON.parse(JSON.stringify(...))` is only safe for limited data shapes. In real projects, `structuredClone`, `lodash.cloneDeep`, or a carefully designed custom solution is usually the better choice when the data structure is more complex.
