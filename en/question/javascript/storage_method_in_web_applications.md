---
outline: deep
title: Storage Options in Web Applications
titleTemplate: Frontend Interview Notes
---

# Storage Options in Web Applications

<img src="/question/javascript/storage_method_in_web_applications.jpg" width="500" height="520" alt="Diagram of storage options in web applications">

## Cookie

Cookies are small text files stored in the browser. They are used to pass data between the client and the server, and they are a common mechanism for tracking session data, preferences, and user state.

### Usage

#### Set values

```javascript
document.cookie = "name=oeschger";
document.cookie = "favorite_food=tripe";
alert(document.cookie);
// shows: name=oeschger;favorite_food=tripe
```

#### Read values

```javascript
document.cookie = "test1=Hello";
document.cookie = "test2=World";

const myCookie = document.cookie.replace(
  /(?:(?:^|.*;\s*)test2\s*\=\s*([^;]*).*$)|^.*$/,
  "$1"
);

alert(myCookie);
// shows: World
```

### Features

1. **Small capacity:** a cookie is usually limited to only a few KB, often around 4 KB.
2. **Domain scope:** a cookie belongs to a specific domain and can only be read or modified under that domain.
3. **Path scope:** a cookie can be limited to specific paths on a site.
4. **Security caveats:** cookies can be read and modified by the browser, so sensitive data should not be stored casually.
5. **Expiration:** cookies can expire at the end of a session or at a later time.
6. **Server transmission:** browsers automatically attach cookies to matching HTTP requests.
7. **Persistence:** many cookies survive across visits and can be reused later.
8. **State compensation for HTTP:** cookies help identify users across otherwise stateless HTTP requests.

## Web Storage

Web Storage includes `localStorage` and `sessionStorage`.

### Usage

```javascript
// save data to localStorage
localStorage.setItem("key", "value");

// read data from localStorage
let data = localStorage.getItem("key");

// remove one item
localStorage.removeItem("key");

// clear everything
localStorage.clear();
```

`sessionStorage` is used in the same way.

### localStorage vs sessionStorage

1. **Lifetime**
   - `localStorage`: persists until the user clears it or the site removes it.
   - `sessionStorage`: only lasts for the current tab session.
2. **Scope**
   - `localStorage`: shared across pages under the same origin.
   - `sessionStorage`: limited to the current tab session.
3. **Storage limits**
   - both are often in the 5 MB to 10 MB range depending on the browser
4. **Sharing and isolation**
   - `localStorage`: shared across same-origin pages
   - `sessionStorage`: isolated per tab

Use `localStorage` when data should survive longer and be shared across pages. Use `sessionStorage` when data only needs to live during the current session.

## IndexedDB

IndexedDB is a lower-level browser API for storing large amounts of structured data, including files and binary large objects. It uses indexes for efficient querying.

### Usage

```javascript
const request = indexedDB.open("myDatabase", 1);

request.onupgradeneeded = (event) => {
  const db = event.target.result;

  const usersStore = db.createObjectStore("users", {
    keyPath: "id",
    autoIncrement: true,
  });

  usersStore.createIndex("name", "name", { unique: false });
  usersStore.createIndex("email", "email", { unique: true });
};

request.onsuccess = (event) => {
  const db = event.target.result;

  const transaction = db.transaction("users", "readwrite");
  const usersStore = transaction.objectStore("users");

  usersStore.add({ name: "John Doe", email: "john@example.com" });
  usersStore.add({ name: "Alice Smith", email: "alice@example.com" });

  const emailIndex = usersStore.index("email");
  const request = emailIndex.get("john@example.com");
  request.onsuccess = (event) => {
    const user = event.target.result;
    if (user) {
      console.log(user);
    } else {
      console.log("User not found.");
    }
  };
};

request.onerror = (event) => {
  console.error("Error opening database:", event.target.error);
};
```

This is only a simple example. IndexedDB supports more complex queries, ranges, indexes, and transaction patterns.

### Features

1. **Large capacity:** often far larger than `localStorage`
2. **Asynchronous API:** avoids blocking the main thread
3. **Transaction support:** helps keep operations consistent
4. **Complex querying:** supports indexes, cursors, and range queries
5. **Multiple object stores:** similar to tables in a database
6. **Cross-tab support:** same-origin pages can share it
7. **Local-only data:** data stays on the user's device unless your app explicitly syncs it

## Cache Storage

Cache Storage is a browser API for caching resource files. It is especially important in PWAs because it allows HTML, CSS, JavaScript, images, and other assets to be cached locally for offline usage and faster repeat loads.

### Usage

```javascript
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/styles.css",
        "/script.js",
        "/images/logo.png",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).then((response) => {
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

This is a simple Service Worker example. Cache Storage is usually used together with Service Workers for offline support and request interception.

### Features

1. **Offline access:** cached resources remain available even without a network connection
2. **Fast loading:** resources can be served from cache instead of the server
3. **Layered caching:** developers can separate resources into different caches
4. **Flexible cache strategies:** stale-while-revalidate, network-first, cache-first, and more
5. **Network interception:** Service Workers can choose whether to serve from cache or network
6. **Cross-session persistence:** cache data can survive browser restarts
7. **Resource management:** assets can be added, updated, and removed as needed

## Memory Storage

Memory storage means keeping data only in runtime memory. It is often used for simple state management, especially in small applications or component-level state sharing.

### Usage

Typical examples include Vue's `data` or React's `useState`. These are memory-based state containers and are everywhere in day-to-day frontend development.

### Features

1. **Temporary storage:** data is lost on refresh or close
2. **In-memory only:** fast reads and writes with no network cost
3. **Same lifecycle as the page:** data disappears when the page goes away
4. **Lightweight:** does not consume persistent disk storage the way local databases do
5. **No cross-tab sharing by default:** each tab has its own memory space
6. **Good for simple state:** practical for lightweight state sharing, but not enough for larger application state needs

## Scenario summary

1. **Cookie:** good for small identity, session, and preference data shared with the server
2. **localStorage:** useful for small key-value data such as user settings and preferences
3. **sessionStorage:** useful for temporary state that only needs to last for the current session
4. **IndexedDB:** good for large structured data, offline access, and complex querying
5. **Cache Storage:** ideal for PWA resource caching and offline support
6. **Memory Storage:** good for temporary state in small apps or components

In practice, frontend applications often combine multiple storage strategies. The right choice depends on capacity, persistence, sharing needs, and the complexity of the application.
