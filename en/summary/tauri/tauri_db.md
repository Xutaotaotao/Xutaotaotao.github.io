---
outline: deep
title: Integrating a Local Database in Tauri
titleTemplate: Tauri Application Development Guide
---

# Integrating a Local Database in Tauri

## Introduction

Tauri is a cross-platform desktop framework that uses web technologies for the frontend and Rust for the backend. Because desktop applications often need local persistence, database integration is a common requirement.

## Comparing approaches

There are several ways to use a local database in Tauri:

1. **Direct SQLite binding**
2. **Third-party database libraries**
3. **A Tauri plugin such as `tauri-plugin-sql-api`**

### 1. Direct SQLite binding

**Pros**

- full control over database behavior
- SQLite is lightweight and simple for desktop apps

**Cons**

- you must manage connections, queries, and transactions yourself
- you are responsible for file-level access behavior and related details

### 2. Third-party database libraries

**Pros**

- often more feature-rich
- usually better documentation and community examples

**Cons**

- extra dependency management
- potentially larger application size

### 3. Tauri plugin: `tauri-plugin-sql-api`

**Pros**

- easy to integrate
- supports multiple database types
- aligns well with Tauri's security model

**Cons**

- can be less flexible than fully manual integration

For this article, the chosen solution is `tauri-plugin-sql-api` because it is easy to integrate, supports multiple databases, and fits naturally into Tauri's plugin model.

## Install `tauri-plugin-sql-api`

This plugin requires Rust `1.65` or later.

Three common installation approaches:

1. use crates.io and npm
2. pull directly from GitHub by git tag or revision
3. use a git submodule plus file protocol

### Install the Rust plugin

Add this to `src-tauri/Cargo.toml`:

```toml
[dependencies.tauri-plugin-sql]
git = "https://github.com/tauri-apps/plugins-workspace"
branch = "v1"
features = ["sqlite"]
```

### Install the JavaScript dependency

```bash
pnpm add https://github.com/tauri-apps/tauri-plugin-sql#v1
# or
npm add https://github.com/tauri-apps/tauri-plugin-sql#v1
# or
yarn add https://github.com/tauri-apps/tauri-plugin-sql#v1
```

## Core implementation

### `DatabaseService`

This class initializes the database and creates a simple key-value table:

```typescript
import Database from "tauri-plugin-sql-api";
import { ENV_MODE } from "@/utils/const";

class DatabaseService {
  private db!: Database;
  private dbReady: Promise<void>;

  constructor() {
    this.dbReady = this.initDatabase();
  }

  private async initDatabase() {
    try {
      this.db = await Database.load(
        ENV_MODE !== "development" ? "sqlite:xtools.db" : "sqlite:xtools_test.db"
      );

      await this.db.execute(`
        CREATE TABLE IF NOT EXISTS key_value (
          key TEXT PRIMARY KEY,
          value TEXT
        )
      `);
    } catch (error) {
      console.error("Error initializing database:", error);
      throw error;
    }
  }

  public async getDbInstance(): Promise<Database> {
    await this.dbReady;
    return this.db;
  }
}

export default new DatabaseService();
```

### `KeyValueStore`

This wraps CRUD behavior around the key-value table:

```typescript
import DatabaseService from "./dbService";

class KeyValueStore {
  private dbPromise = DatabaseService.getDbInstance();

  public async set(key: string, value: string): Promise<void> {
    const db = await this.dbPromise;
    await db.execute("REPLACE INTO key_value (key, value) VALUES (?, ?)", [key, value]);
  }

  public async get(key: string): Promise<string | null> {
    const db = await this.dbPromise;
    const result = await db.select<{ value: string }[]>(
      "SELECT value FROM key_value WHERE key = ?",
      [key]
    );
    return result.length > 0 ? result[0].value : null;
  }

  public async delete(key: string): Promise<void> {
    const db = await this.dbPromise;
    await db.execute("DELETE FROM key_value WHERE key = ?", [key]);
  }

  public async getAll(): Promise<{ key: string; value: string }[]> {
    const db = await this.dbPromise;
    return db.select<{ key: string; value: string }[]>(
      "SELECT key, value FROM key_value"
    );
  }
}

export default KeyValueStore;
```

### External usage

This example chooses the database in Tauri and falls back to `localStorage` in a browser environment:

```typescript
import { KeyValueStore } from "@/db";
import { IS_TAURI } from "@/utils/const";

export const getStore = async (key: string) => {
  if (IS_TAURI) {
    const store = new KeyValueStore();
    return await store.get(key);
  } else {
    return localStorage.getItem(key);
  }
};

export const setStore = async (key: string, value: string) => {
  if (IS_TAURI) {
    const store = new KeyValueStore();
    await store.set(key, value);
  } else {
    localStorage.setItem(key, value);
  }
};
```

## Summary

By using `tauri-plugin-sql-api`, it is straightforward to integrate a local SQLite database into a Tauri application. The same plugin can also support other database engines such as MySQL and PostgreSQL if needed.

This plugin-based model is one of Tauri's practical strengths: it lets frontend developers bring Rust-backed native capabilities into modern frontend applications without building every layer from scratch.

## Source code

[https://github.com/Xutaotaotao/XTools/tree/feature-tauri-v1/src/db](https://github.com/Xutaotaotao/XTools/tree/feature-tauri-v1/src/db)
