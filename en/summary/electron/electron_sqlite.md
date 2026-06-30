---
outline: deep
title: Using SQLite in Electron
titleTemplate: Electron Practice
---

# Using SQLite in Electron

## Preparation

1. Install SQLiteStudio: <https://sqlitestudio.pl/>
2. Install `sqlite3`:

```bash
npm install sqlite3
```

## Encapsulate database methods

```typescript
// src/sqlite/index.ts
import { app } from "electron";
import * as path from "path";
import * as sqlite3 from "sqlite3";
import { queryParam, insertParam, updateParam, deleteParam } from "./types";

const userDataPath = app.getPath("userData");
const dbPath = path.join(userDataPath, "sqliteDatabase.db");

console.log("Database path:", dbPath);

class Database {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database(dbPath);
  }

  open(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run("PRAGMA foreign_keys = ON");
        console.log("Connected to the database.");
        resolve();
      });
    });
  }

  close(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          console.log("Database closed.");
          resolve();
        }
      });
    });
  }

  query(param: queryParam): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      this.db.all(param.sql, param.params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  insert(param: insertParam): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const keys = Object.keys(param.data);
      const values = Object.values(param.data);
      const placeholders = keys.map(() => "?").join(",");
      const sql = `INSERT INTO ${param.table} (${keys.join(
        ","
      )}) VALUES (${placeholders})`;

      this.db.run(sql, values, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  update(param: updateParam): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const entries = Object.entries(param.data)
        .map(([key, value]) => `${key} = ?`)
        .join(",");
      const params = Object.values(param.data);
      const sql = `UPDATE ${param.table} SET ${entries} WHERE ${param.condition}`;

      this.db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }

  delete(param: deleteParam): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const sql = `DELETE FROM ${param.table} WHERE ${param.condition}`;

      this.db.run(sql, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

const db = new Database();

export const initSqlite = async () => {
  try {
    await db.open();
    await db.query({
      sql: `
      CREATE TABLE IF NOT EXISTS test (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER
      )
    `,
    });
    console.log("Database initialized.");
  } catch (err) {
    console.error("Error opening database:", err);
  }
};

export const sqQuery = db.query.bind(db);
export const sqInsert = db.insert.bind(db);
export const sqUpdate = db.update.bind(db);
export const sqDelete = db.delete.bind(db);
```

```typescript
// src/sqlite/types.ts
export interface queryParam {
  sql: string;
  params?: any[];
}

export interface insertParam {
  table: string;
  data: { [key: string]: any };
}

export interface updateParam {
  table: string;
  data: { [key: string]: any };
  condition: string;
}

export interface deleteParam {
  table: string;
  condition: string;
}
```

This gives you a lightweight SQLite wrapper for:

- initialization
- querying
- inserts
- updates
- deletes

## Notes from real usage

### 1. Do you need to install `sqlite3` with a custom build command?

For example:

```bash
npm install sqlite3 --build-from-source --sqlite_libname=sqlcipher --sqlite=`brew --prefix` --runtime=electron --target=18.2.1 --dist-url=https://electronjs.org/headers
```

In my case: no.

I tried it, hit errors, and found it unnecessary for this setup.

### 2. Runtime error after installation

Example error:

```plain
stderr: App threw an error during load

stderr: Error: Could not dynamically require "/Users/xutaotao/Documents/s/Posttool/build/node_sqlite3.node". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.

at se (/Users/xutaotao/Documents/s/Posttool/dist/main/index.cjs:1:5994)
at w (/Users/xutaotao/Documents/s/Posttool/dist/main/index.cjs:1:8145)
at Module.<anonymous> (/Users/xutaotao/Documents/s/Posttool/dist/main/index.cjs:3:717)
at Module._compile (node:internal/modules/cjs/loader:1141:14)
at Module._extensions..js (node:internal/modules/cjs/loader:1196:10)
at Module.load (node:internal/modules/cjs/loader:1011:32)
at Module._load (node:internal/modules/cjs/loader:846:12)
at f._load (node:electron/js2c/asar_bundle:2:13377)
at loadApplicationPackage (/Users/xutaotao/Documents/s/Posttool/node_modules/electron/dist/Electron.app/Contents/Resources/default_app.asar/main.js:121:16)
at Object.<anonymous> (/Users/xutaotao/Documents/s/Posttool/node_modules/electron/dist/Electron.app/Contents/Resources/default_app.asar/main.js:233:9)
```

In a Vite-based build, the fix was to add `sqlite3` to `external` in `vite.config.ts`:

```typescript
rollupOptions: {
  external: ["electron", "log4js", "iconv-lite", "sqlite3", ...builtinModules],
  output: {
    entryFileNames: "[name].cjs",
  },
},
```

That prevents Vite from trying to bundle `sqlite3` in a way that breaks its native binary loading.

