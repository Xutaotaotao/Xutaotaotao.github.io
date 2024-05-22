---
outline: deep
title: Web 应用中的存储方式
titleTemplate: 徐涛焘的博客
---

# Web 应用中的存储方式

<img src="/question/javascript/storage_method_in_web_applications.jpg" width="500" height="520">


## Cookie

Cookie 是存储在用户浏览器中的小型文本文件，用于在客户端和服务器之间传递数据。它是 Web 开发中常用的一种机制，用于在用户访问网站时跟踪和存储有关用户会话、偏好设置、状态等的信息。

### 使用

#### 设置值

```javascript
document.cookie = "name=oeschger";
document.cookie = "favorite_food=tripe";
alert(document.cookie);
// 显示：name=oeschger;favorite_food=tripe
```

#### 读取值

```javascript
// 得到名为 test2 的 cookie
document.cookie = "test1=Hello";
document.cookie = "test2=World";

const myCookie = document.cookie.replace(
  /(?:(?:^|.*;\s*)test2\s*\=\s*([^;]*).*$)|^.*$/,
  "$1"
);

alert(myCookie);
// 显示：World
```

### 特点

Cookie 是 Web 开发中常用的一种机制，用于在客户端（浏览器）和服务器之间传递数据。它具有以下主要特点：

1.  **小型容量**：<br />每个 Cookie 的大小通常有限制，一般为几 KB，通常在 4KB 左右。由于容量有限，不适合存储大量的数据。
2.  **域限制**：<br />Cookie 与特定的域名相关联，只能由该域名下的页面进行读取和修改。这样可以确保 Cookie 的数据仅在特定的网站内有效，不被其他网站访问。
3.  **路径限制**：<br />可以设置 Cookie 的作用路径，限制哪些页面可以访问 Cookie。默认情况下，Cookie 对于设置它的页面以及该页面所在目录下的所有页面都是可见的。
4.  **安全性**：<br />Cookie 中的数据可以被浏览器读取和修改，因此敏感数据应该避免直接存储在 Cookie 中。可以使用加密或其他安全措施来增强 Cookie 的安全性。
5.  **时效性**：<br />Cookie 可以设置过期时间，控制 Cookie 的生命周期。一些 Cookie 是会话 Cookie，会在用户关闭浏览器时被删除，而其他 Cookie 可能会有更长的过期时间。
6.  **数据传递**：<br />通过在 HTTP 请求的头部添加 Cookie，浏览器可以将存储在 Cookie 中的数据发送给服务器。这使得服务器能够根据用户的 Cookie 识别用户、维护用户会话状态、提供个性化体验等。
7.  **持久性**：<br />由于 Cookie 是存储在用户浏览器中的文本文件，它们可以在用户下次访问网站时继续使用。因此，Cookie 可用于在用户访问同一网站时保留数据。
8.  **无状态协议补偿**：<br />HTTP 是一种无状态协议，即服务器无法识别两次请求是否来自同一个用户。通过使用 Cookie，服务器可以在用户浏览器中存储一个唯一的标识符，从而在多个请求之间识别用户，实现会话跟踪。

## Web Storage

Web Storage 包括 localStorage 和 sessionStorage

### 使用

```javascript
// 保存数据到 localStorage
localStorage.setItem("key", "value");

// 从 localStorage 获取数据
let data = localStorage.getItem("key");

// 从 localStorage 删除保存的数据
localStorage.removeItem("key");

// 从 localStorage 删除所有保存的数据
localStorage.clear();
```

sessionStorage 的使用和 localStorage 一样

### LocalStorage 和 SessionStorage 对比

LocalStorage 和 SessionStorage 都是 Web 存储 API，它们用于在客户端（浏览器）中存储数据。虽然它们在使用和行为上有相似之处，但它们在存储数据的时效性和作用域等方面有一些重要的区别。以下是对比它们的主要差异：

1.  **时效性**：

- LocalStorage：存储在 LocalStorage 中的数据没有过期时间，除非用户手动清除或网站代码删除它们。数据会一直保留在客户端，即使浏览器被关闭或电脑重启。
- SessionStorage：存储在 SessionStorage 中的数据在当前会话期间有效。当用户关闭标签页或浏览器时，会话数据会被清除。会话期间，数据可以在不同页面之间共享。

2.  **作用域**：

- LocalStorage：数据在同一个域名下始终有效，不同页面之间可以共享相同的 LocalStorage 数据。
- SessionStorage：数据在同一个标签页（页面会话）中有效，不同标签页之间无法共享 SessionStorage 数据。

3.  **存储大小限制**：

- LocalStorage：通常可以存储更多的数据，一般限制在 5MB 到 10MB 之间（不同浏览器可能有所不同）。
- SessionStorage：一般也限制在 5MB 到 10MB 之间，但由于数据在会话结束时被清除，所以通常会拥有与 LocalStorage 相同的存储空间。

4.  **数据共享与隔离**：

- LocalStorage：由于数据在同一个域名下共享，可能会导致不同页面之间共享相同的数据。这在某些场景下是有用的，但也需要小心管理以避免数据冲突。
- SessionStorage：数据只在当前会话期间有效，不同标签页之间无法共享数据。这使得 SessionStorage 在某些场景下更适合临时保存和隔离数据。

应该根据具体的需求来选择使用 LocalStorage 还是 SessionStorage。如果需要长期保存数据或数据在不同页面间共享，可以使用 LocalStorage。如果只需要在单个会话期间保存临时数据，并且不需要跨页面共享数据，那么 SessionStorage 是更合适的选择。

## IndexedDB

IndexedDB 是一种底层 API，用于在客户端存储大量的结构化数据（也包括文件/二进制大型对象（blobs））。该 API 使用索引实现对数据的高性能搜索。

### 使用

```javascript
// 打开或创建名为 "myDatabase" 的数据库
const request = indexedDB.open("myDatabase", 1);

// 数据库创建或升级时触发
request.onupgradeneeded = (event) => {
  const db = event.target.result;

  // 创建一个名为 "users" 的对象存储空间（相当于数据库表）
  const usersStore = db.createObjectStore("users", {
    keyPath: "id",
    autoIncrement: true,
  });

  // 定义需要存储的数据结构
  usersStore.createIndex("name", "name", { unique: false });
  usersStore.createIndex("email", "email", { unique: true });
};

// 数据库打开成功后触发
request.onsuccess = (event) => {
  const db = event.target.result;

  // 获取事务并访问对象存储空间
  const transaction = db.transaction("users", "readwrite");
  const usersStore = transaction.objectStore("users");

  // 存储数据
  usersStore.add({ name: "John Doe", email: "john@example.com" });
  usersStore.add({ name: "Alice Smith", email: "alice@example.com" });

  // 查询数据
  const emailIndex = usersStore.index("email");
  const request = emailIndex.get("john@example.com");
  request.onsuccess = (event) => {
    const user = event.target.result;
    if (user) {
      console.log(user); // { id: 1, name: 'John Doe', email: 'john@example.com' }
    } else {
      console.log("User not found.");
    }
  };
};

// 处理数据库打开失败
request.onerror = (event) => {
  console.error("Error opening database:", event.target.error);
};
```

这只是 IndexedDB 的简单示例，它还支持更复杂的查询、索引、范围查询等功能，可以满足更复杂的数据存储需求。IndexedDB 是一种强大的客户端存储解决方案，特别适合需要离线访问、大量数据存储和复杂查询的 Web 应用。这里就不详细展开来讲，如果想了解更多可以去 MDN 网站查看它的使用及底层原理。

### 特点

1.  **容量较大**：<br />IndexedDB 可以存储大量数据，通常限制在 50MB 到数百 MB 之间（不同浏览器可能有所不同），远远超过传统的本地存储（如 LocalStorage）的容量限制。
2.  **异步 API**：<br />IndexedDB API 是异步的，它使用 Promise 或类似的异步机制来处理数据的存储和检索。这样可以避免阻塞主线程，提高应用程序的响应性能。
3.  **事务支持**：<br />IndexedDB 支持事务概念，可以在一个事务中执行多个数据操作，保证数据的一致性和完整性。事务可确保所有数据操作都要么全部成功，要么全部失败，以避免部分数据操作导致的数据不一致。
4.  **复杂查询**：<br />IndexedDB 支持多种查询方式，可以通过索引来高效地检索数据。你可以创建索引以提高查询性能，并使用游标或范围查询等方式查询数据。
5.  **支持多个对象存储空间**：<br />IndexedDB 允许在一个数据库中创建多个对象存储空间（类似于数据库表），每个对象存储空间可以存储不同类型的数据。这样可以更好地组织数据，使数据模型更灵活。
6.  **跨标签页和浏览器窗口支持**：<br />与 LocalStorage 不同，IndexedDB 支持多个标签页或浏览器窗口之间共享数据。这使得 IndexedDB 更适合在复杂的 Web 应用中共享数据。
7.  **数据安全性**：<br />IndexedDB 中的数据是相对安全的，因为数据只能被存储在用户的本地设备上，不会被发送到服务器，也不会受到跨站点请求伪造（CSRF）等网络攻击的影响。

## Cache Storage

Cache Storage 是浏览器提供的一种 API，它是用于缓存资源文件的存储方式，在 PWA（Progressive Web App）中，Cache Storage 是一个重要的组成部分，它允许开发者将网站所需的资源（例如 HTML、CSS、JavaScript、图像等）保存在客户端的缓存中，以便在离线时仍然能够访问网站，并提供更快的加载速度和更好的用户体验。

### 使用

```javascript
// 在 Service Worker 中缓存资源文件
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/styles.css",
        "/script.js",
        "/images/logo.png",
        // 可以添加其他需要缓存的资源文件
      ]);
    })
  );
});

// 拦截网络请求并从缓存中响应资源
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 如果缓存中有匹配的资源，则直接返回缓存中的响应
      if (response) {
        return response;
      }
      // 否则，从网络中获取资源，并将响应缓存起来
      return fetch(event.request).then((response) => {
        // 使用 clone() 方法，因为 response 是只能使用一次的对象
        const clonedResponse = response.clone();
        caches.open("my-cache").then((cache) => {
          cache.put(event.request, clonedResponse);
        });
        return response;
      });
    })
  );
});
```

上述代码是一个简单的 Service Worker 脚本，它在安装阶段将指定的资源文件缓存到名为 "my-cache" 的 Cache Storage 中。然后，在网络请求发生时，它会先检查缓存中是否存在匹配的资源，如果有，则直接返回缓存中的响应；如果没有，则从网络获取资源，并将响应缓存起来，以便以后离线时可以使用。<br />⚠️ 注意事项：Cache Storage 的使用需要配合 Service Worker，因为它们通常用于离线缓存和拦截网络请求

### 特点

1.  **离线访问**：<br />Cache Storage 允许将网站所需的资源（如 HTML、CSS、JavaScript、图像等）缓存到客户端的缓存中，使得网站在离线时仍然可以访问这些资源。这为 PWA（Progressive Web App）提供了离线访问的能力，提升了用户体验。
2.  **快速加载**：<br />通过缓存资源，可以实现更快的加载速度。当用户再次访问网站时，资源可以从缓存中直接加载，无需再次从服务器请求，减少了网络延迟和服务器负担，提高了页面的加载性能。
3.  **多级缓存**：<br />Cache Storage 支持多级缓存，可以将资源分为不同的缓存级别，如缓存优先级高的资源和缓存优先级低的资源。这样可以更灵活地控制缓存策略，确保常用的资源总是可以快速地被访问。
4.  **缓存策略**：<br />开发者可以通过控制 Service Worker 的缓存策略来定义资源的缓存行为。例如，可以指定资源的过期时间，强制重新请求最新的资源，或者使用新的资源更新旧的缓存等。
5.  **网络拦截**：<br />通过 Service Worker，Cache Storage 可以拦截网络请求，并决定是否从缓存中提供资源，或者通过网络请求最新的资源。这为开发者提供了更大的灵活性和控制权。
6.  **跨会话缓存**：<br />Cache Storage 中的缓存数据不受会话限制，即使用户关闭浏览器或重新启动设备，缓存数据仍然可以保留，从而使得缓存的资源可以在多个会话中共享，提供更持久的缓存效果。
7.  **资源管理**：<br />开发者可以根据具体需求随时添加、更新或删除缓存中的资源，从而实现资源的动态管理和更新。

## Memory Storage

Memory Storage（内存中存储数据）通常用于简单的状态管理，特别是在一些小型应用或简单的组件之间共享状态数据。内存中存储数据不涉及持久化，数据只在内存中存在，一旦页面刷新或关闭，数据将丢失。这使得它适用于临时存储数据或共享状态，但不适用于需要长期保持数据的场景。

### 使用

常见的状态管理，比如`Vue`里面的`data`，`react`中的`useState`。这里就不详细展开了，在我们日常开发中基本都是随处可见的内存存储数据的方式。

### 特点

1.  **临时存储**：<br />Memory Storage 仅在当前会话期间有效，一旦用户关闭浏览器标签或窗口，数据将丢失。它适用于临时存储数据，例如在单个会话中共享状态或传递临时信息。
2.  **数据在内存中**：<br />数据存储在浏览器的内存中，不会发送到服务器，因此不涉及网络请求。这使得读取和写入数据的速度非常快。
3.  **数据的生命周期与页面一致**：<br />Memory Storage 的生命周期与网页的生命周期一致。当页面刷新或关闭时，存储在 Memory Storage 中的数据将被清除，不会被保留。
4.  **轻量级**：<br />Memory Storage 不会像持久化存储（如 LocalStorage 或 IndexedDB）那样占用大量的磁盘空间，因为数据仅存储在浏览器的内存中。
5.  **不支持跨标签页和浏览器窗口共享数据**：<br />每个标签页或浏览器窗口都有自己的独立的 Memory Storage，它们之间无法直接共享数据。如果需要在多个标签页或浏览器窗口之间共享数据，可以考虑使用其他持久化存储方案。
6.  **适用于简单状态管理**：<br />Memory Storage 在某些场景下适用于简单的状态管理，特别是在小型应用或组件中共享状态数据。然而，对于复杂的状态管理需求，应该使用专业的状态管理工具，如 Redux 或 Vuex，以及持久化存储方案。

## 应用场景总结

1. **Cookie**： 适合用于在客户端和服务器之间传递少量的用户身份信息、会话信息或用户偏好设置等。
2. **LocalStorage**： 适合存储少量的键值对数据，例如用户配置、主题设置、用户喜好等。也可用于缓存一些静态资源，以提高页面加载速度。
3. **SessionStorage**： 适合存储会话期间需要保留的数据，例如表单数据、临时状态等。仅在当前会话中有效，关闭页面后数据将丢失。
4. **IndexedDB**： 适合存储大量的结构化数据，适用于需要离线访问和复杂查询的 Web 应用。适合较复杂的数据操作和数据查询需求。
5. **Cache Storage**： 适合用于 PWA 中的离线访问和资源缓存，提供更快的页面加载速度和离线使用体验。
6. **Memory Storage**： 适合简单的状态管理，特别是在小型应用或简单组件中共享状态数据，用于临时存储数据。

综合考虑存储容量、持久性、应用场景等因素，选择合适的存储方式对于开发前端应用至关重要。在实际应用中，可能会结合使用不同的存储方式，以满足复杂的数据管理需求。对于复杂的状态管理需求，可以考虑使用专业的状态管理工具，如 Redux（用于 React）或 Vuex（用于 Vue）。
