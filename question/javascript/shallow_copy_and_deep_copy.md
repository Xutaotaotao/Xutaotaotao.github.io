---
outline: deep
title: 浅拷贝和深拷贝
titleTemplate: 小徐前端手记
---
# 浅拷贝和深拷贝

<img src="/question/javascript/shallow_copy_and_deep_copy.jpg" width="500" height="520">



要讲明白浅拷贝和深拷贝，首先要明白 Javascript 的数据类型。

## 数据类型基础

<img src="/question/javascript/shallow_copy_and_deep_copy1.jpg" width="500" height="520">
<br />除了 Object 以外，所有类型都定义了表示在语言最低层面的不可变值。我们将这些值称为原始值。在计算机科学中，对象（object）是指内存中的可以被标识符引用的一块区域。在 JavaScript 中，对象是唯一可变的值。事实上，函数也是具有额外可调用能力的对象。<br />原始值保存在栈内存中，引用类型数据（Object 类型）的数据内容保存在堆内存中，栈内存存放变量以及指向堆内存区域存储位置的指针。有了这个概念之后就有了浅拷贝和深拷贝的概念了。我们说的浅拷贝和深拷贝主要是对对象而言，基础类型的值本身即是复制一模一样的一份，不区分深浅拷贝。

## 两者的定义

### 浅拷贝

对象的浅拷贝是其属性与拷贝源对象的属性共享相同引用（指向相同的底层值）的副本。因此，当你更改源或副本时，也可能导致其他对象也发生更改——也就是说，你可能会无意中对源或副本造成意料之外的更改。<br />底层逻辑是重新在堆中创建内存，拷贝前后对象的基本数据类型互不影响，只拷贝一层，不能对对象中的子对象进行拷贝。如果属性是基本数据类型，拷贝的是基本数据类型的值；如果属性是引用类型，拷贝的是内存地址，所以如果一个对象改变了这个地址，就会影响到另外一个对象。<br />⚠️ 注意事项：<br />对于浅拷贝，有选择地更改对象中现有元素的共享属性的值与给现有元素赋一个全新的值是不同的，理解这一点很重要。

### 深拷贝

对象的深拷贝是指其属性与其拷贝的源对象的属性不共享相同的引用（指向相同的底层值）的副本。因此，当你更改源或副本时，可以确保不会导致其他对象也发生更改；也就是说，你不会无意中对源或副本造成意料之外的更改。<br />底层逻辑是深拷贝会拷贝所有的属性，并拷贝属性指向的动态分配的内存。当对象和它所引用的对象一起拷贝时即发生深拷贝。

## 浅拷贝实现方法

### Object.assign

#### 使用

```javascript
const objClone = Object.assign(target, ...sources);
```

#### 注意事项

1. 不会拷贝对象的继承属性
2. 不会拷贝对象的不可枚举的属性
3. 可以拷贝 Symbol 类型的属性
4. 如果目标对象和源对象有同名属性，或者多个源对象有同名属性，则后面的属性会覆盖前面的属性

### 扩展运算符

#### 使用

```javascript
// 对象
const objClone = { ...obj };

// 数组
const arrClone = [...arr];
```

#### 注意事项

缺陷和 Object.assign()差不多，但是如果属性都是基本类型的值，使用扩展运算符进行浅拷贝会更加方便。

### slice & concat & Arrary.form

#### 使用

```javascript
// slice
const arrCloneBySlice = arr.slice();

// concat
const arrCloneByConcat = [].concat(arr);

// Arrary.form
const arrCloneByArrayForm = Array.from(arr);
```

### 手动实现

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

## 深拷贝实现方法

### JSON.stringify()

```javascript
function deepClone(target) {
  if (typeof target === "object" && target !== null) {
    return JSON.parse(JSON.stringify(target));
  } else {
    return target;
  }
}
```

这个是最粗暴，最简单的方式，如果你能保证你的数据的准确性且不复杂，可以满足基本需求，但是限制非常多。

### lodash.cloneDeep() & jQuery.extend()

这种两个是这种类似工具库的代表，使用简单。

```javascript
// lodash.cloneDeep()
_.cloneDeep(value);
// jQuery.extend
jQuery.extend(true, {}, value);
```

### 手动实现

实现之前需要看下是否可以满足这些条件

1. 基本类型数据是否能拷贝？
2. 键和值都是基本类型的普通对象是否能拷贝？
3. Symbol 作为对象的 key 是否能拷贝？
4. 除了普通对象，Date、RegExp 、Function、Map、Set 能否拷贝？
5. Function 对象类型是否能拷贝？
6. 对象的原型是否能拷贝？
7. 不可枚举属性是否能拷贝？
8. 循环引用是否能拷贝？

可以一步步实现<br />第一版：对浅拷贝进行改造，使其支持深层次拷贝（可以拷贝第二层及后面的层次）

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
<img src="/question/javascript/shallow_copy_and_deep_copy4.png">

<br />这个基础版本只能满足上面的第 1 点和第 2 点，要满足下面的几个点，我们还需要对函数进行丰富

```javascript
function deepClone(target) {
  // WeakMap作为记录对象Hash表（用于防止循环引用）
  const map = new WeakMap();

  // 判断是否为object类型的辅助函数，减少重复代码
  function isObject(data) {
    return (typeof data === "object" && data) || typeof data === "function";
  }

  function clone(data) {
    // 基础类型直接返回值
    if (!isObject(data)) {
      return data;
    }

    // 日期或者正则对象则直接构造一个新的对象返回
    if ([Date, RegExp].includes(data.constructor)) {
      return new data.constructor(data);
    }

    // 处理函数对象
    if (typeof data === "function") {
      return new Function("return " + data.toString())();
    }

    // 如果该对象已存在，则直接返回该对象
    const exist = map.get(data);
    if (exist) {
      return exist;
    }

    // 处理Map对象
    if (data instanceof Map) {
      const result = new Map();
      map.set(data, result);
      data.forEach((val, key) => {
        // 注意：map中的值为object的话也得深拷贝
        if (isObject(val)) {
          result.set(key, clone(val));
        } else {
          result.set(key, val);
        }
      });
      return result;
    }

    // 处理Set对象
    if (data instanceof Set) {
      const result = new Set();
      map.set(data, result);
      data.forEach((val) => {
        // 注意：set中的值为object的话也得深拷贝
        if (isObject(val)) {
          result.add(clone(val));
        } else {
          result.add(val);
        }
      });
      return result;
    }

    // 收集键名（考虑了以Symbol作为key以及不可枚举的属性）
    const keys = Reflect.ownKeys(data);
    // 利用 Object 的 getOwnPropertyDescriptors 方法可以获得对象的所有属性以及对应的属性描述
    const allDesc = Object.getOwnPropertyDescriptors(data);
    // 结合 Object 的 create 方法创建一个新对象，并继承传入原对象的原型链， 这里得到的result是对data的浅拷贝
    const result = Object.create(Object.getPrototypeOf(data), allDesc);

    // 新对象加入到map中，进行记录
    map.set(data, result);

    // Object.create()是浅拷贝，所以要判断并递归执行深拷贝
    keys.forEach((key) => {
      const val = data[key];
      if (isObject(val)) {
        // 属性值为 对象类型 或 函数对象 的话也需要进行深拷贝
        result[key] = clone(val);
      } else {
        result[key] = val;
      }
    });
    return result;
  }

  return clone(target);
}
```

## 区别

在浅拷贝中，对源或副本的更改可能也会导致其他对象的更改（因为两个对象共享相同的引用）。<br />在深拷贝中，源和副本是完全独立的。<br />核心区别是：其在内存中的存储类型不同。<br />
<img src="/question/javascript/shallow_copy_and_deep_copy2.jpg" width="500" height="520">
<br />
<img src="/question/javascript/shallow_copy_and_deep_copy3.jpg" width="500" height="520">
