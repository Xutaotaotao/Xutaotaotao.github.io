---
outline: deep
title: Tauri 集成本地数据库
titleTemplate: Tauri应用开发实践指南
---

# Tauri 集成本地数据库

## 前言
 Tauri 是一个构建跨平台桌面应用程序的框架，利用 Web 技术构建前端，并使用 Rust 构建后端。它以其小巧的体积和高性能受到开发者的欢迎。在开发过程中，我们常常需要数据本地持久化， 所以会需要与本地数据库进行交互 。
## 方案比较
在 Tauri 中集成本地数据库有多种方案，常见的包括：

1. **SQLite 通过直接绑定**
2. **使用第三方数据库库**
3. **Tauri 插件：tauri-plugin-sql-api**
### 1. SQLite 通过直接绑定
**优点：**

- 直接控制：可以完全掌控数据库的操作和配置。
- 轻量级：SQLite 非常适合桌面应用，文件存储简单。

**缺点：**

- 复杂性：需要手动处理所有数据库连接、查询和事务。
- 安全性：需要自行管理数据库文件的访问权限。
### 2. 使用第三方数据库库
**优点：**

- 功能丰富：第三方库通常提供丰富的功能和更好的文档支持。
- 社区支持：很多库有活跃的社区，能够快速获取帮助。

**缺点：**

- 依赖管理：需要处理额外的依赖管理和库更新。
- 体积增加：引入额外的库可能会增加应用的体积。
### 3. Tauri 插件：tauri-plugin-sql-api
**优点：**

- 集成方便：专为 Tauri 设计的插件，易于集成。
- 多数据库支持：支持 SQLite、MySQL 和 PostgreSQL。
- 安全性：通过 Tauri 的安全模型，确保数据库操作的安全性。

**缺点：**

- 功能限制：相比直接使用数据库库，插件可能有一些功能限制。

 综合考虑，我们选择 tauri-plugin-sql-api 作为集成本地数据库的方案。它的集成简单、支持多种数据库类型，并且与 Tauri 框架深度整合，能够有效地提升开发效率和安全性。  
## 使用 tauri-plugin-sql-api 集成本地数据库  
此插件要求 Rust 版本至少为 1.65。
我们推荐以下三种通用的安装方法：

1. 使用 crates.io 和 npm（最简单，但需要信任我们的发布流程是否正常）
2. 从 GitHub 上直接拉取源代码，使用 git 标签/修订哈希（最安全）
3. 在你的 Tauri 项目中使用 git 子模块安装这个仓库，然后使用文件协议来引入源代码（最安全，但使用起来不方便）
### 安装核心插件
在你的 Cargo.toml 文件中添加以下内容：
src-tauri/Cargo.toml
```toml
toml
复制代码
[dependencies.tauri-plugin-sql]
git = "https://github.com/tauri-apps/plugins-workspace"
branch = "v1"
features = ["sqlite"] # 或者 "postgres", 或 "mysql"
```
### 安装 JavaScript 依赖
你可以使用你喜欢的 JavaScript 包管理器来安装：
注意：由于大多数 JavaScript 包管理器无法从 git 单仓库安装包，我们提供了每个插件的只读镜像。这使得安装选项 2 更加方便使用。
```bash
pnpm add https://github.com/tauri-apps/tauri-plugin-sql#v1
# 或
npm add https://github.com/tauri-apps/tauri-plugin-sql#v1
# 或
yarn add https://github.com/tauri-apps/tauri-plugin-sql#v1
```
## 编写核心代码
### DatabaseService
构建db核心类，初始化DB，这里只是做的key-value的表
```typescript
import Database from "tauri-plugin-sql-api";
import {ENV_MODE} from "@/utils/const"

class DatabaseService {
  private db!: Database;
  private dbReady: Promise<void>;

  constructor() {
    this.dbReady = this.initDatabase();
  }

  private async initDatabase() {
    try {
      this.db = await Database.load(ENV_MODE !== 'development' ? "sqlite:xtools.db" : "sqlite:xtools_test.db");

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
### KeyValueStore
keyValue的增删改查，方便外部使用
```typescript
import DatabaseService from './dbService';

class KeyValueStore {
  private dbPromise = DatabaseService.getDbInstance();
  
  public async set(key: string, value: string): Promise<void> {
    const db = await this.dbPromise;
    try {
      await db.execute('REPLACE INTO key_value (key, value) VALUES (?, ?)', [key, value]);
    } catch (error) {
      console.error(`Error setting value for key "${key}":`, error);
      throw error; 
    }
  }

  public async get(key: string): Promise<string | null> {
    const db = await this.dbPromise;
    try {
      const result = await db.select<{ value: string }[]>('SELECT value FROM key_value WHERE key = ?', [key]);
      return result.length > 0 ? result[0].value : null;
    } catch (error) {
      console.error(`Error getting value for key "${key}":`, error);
      throw error;
    }
  }

  public async delete(key: string): Promise<void> {
    const db = await this.dbPromise;
    try {
      await db.execute('DELETE FROM key_value WHERE key = ?', [key]);
    } catch (error) {
      console.error(`Error deleting key "${key}":`, error);
      throw error;
    }
  }

  public async getAll(): Promise<{ key: string; value: string }[]> {
    const db = await this.dbPromise;
    try {
      const result = await db.select<{ key: string; value: string }[]>('SELECT key, value FROM key_value');
      return result;
    } catch (error) {
      console.error("Error getting all key-value pairs:", error);
      throw error;
    }
  }
}

export default KeyValueStore;
```
### 外部使用
这里判断了一下环境，如何是TAURI环境我们就用本地数据库，否则就用localStorage，兼容浏览器环境。
```typescript
import { KeyValueStore } from '@/db';
import {IS_TAURI} from '@/utils/const'
export const getStore = async (key:string) => {
    if (IS_TAURI) {
        const store = new KeyValueStore();
        const val =   await store.get(key);
        return val
    } else {
        return localStorage.getItem(key)
    }
}

export const setStore = async (key:string,value:string) => {
    if (IS_TAURI) {
        const store = new KeyValueStore();
        await store.set(key,value);
    } else {
        localStorage.setItem(key,value)
    }
}
```
## 总结
通过以上步骤，我们在 Tauri 应用中成功集成了 tauri-plugin-sql-api 插件，实现了与本地 SQLite 数据库的交互。tauri-plugin-sql-api 插件不仅支持 SQLite，还支持其他类型的数据库，如 MySQL 和 PostgreSQL，开发者可以根据需求进行选择。通过 Tauri 的这种插件化设计，使得开发者能够轻松地将强大的 Rust 后端功能集成到现代前端框架中，从而构建高性能的跨平台桌面应用程序。
## 源码
[https://github.com/Xutaotaotao/XTools/tree/feature-tauri-v1/src/db](https://github.com/Xutaotaotao/XTools/tree/feature-tauri-v1/src/db)
