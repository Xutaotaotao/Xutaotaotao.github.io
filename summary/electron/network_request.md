---
outline: deep
title: 网络请求封装
titleTemplate: Electron实战
---

# 网络请求封装

## 前言

在之前的开发实践章节，我们基本把一个成型的Electron应用搭建起来了，形成了一个骨架，但是它还不能称为一个可以快速实现业务逻辑的框架，这一节，我们将给这个框架赋予一个核心的灵魂，那就是网络请求。

## 技术选型
其实桌面端的网络请求方案比较多，每个人在开发的时候可能实现起来不一样，笔者也调研了一下，众说纷纭。如：https://www.zhihu.com/question/363765602

在这里我选择渲染进程使用axios，主进程使用net，然后封装成统一的工具类，包含常规的通用拦截器。封装网络请求必然会使用到本地数据缓存token这类场景，所以我们还需要一个本地存储的能力，我选择了lowdb，另外就是如果要模拟一些数据效果的话，我们还需要一个小小本地的服务，我选择用koa来构建一个简单的服务。

## 核心实现
我们需要实现一个数据库管理的工具，还需要实现一个网络请求的工具，然后将两者结合就成为了一个强大的网络请求库。

### 本地数据库的实现
首先，我们来实现数据库管理工具。在`src`目录下建一个`lowdb`的文件夹,加入`index.ts`和`low.ts`

首先实现`low.ts`,一共三个核心的方法：初始化数据、写数据、读数据，如下

```typescript
import { LowSync, JSONFileSync } from "lowdb";
let dbInstance: any = null;

export interface WriteDbDataParams {
  key: string;
  value: any;
}

// 初始化数据库
export const initDb = () => {
  const {app} = require('electron')
  const { join } = require("path");
  return new Promise(async (resolve) => {
    const file = join(app.getAppPath(), "db.json");
    const adapter = new JSONFileSync(file);
    dbInstance = new LowSync(adapter);
    await dbInstance.read();
    if (dbInstance.data && dbInstance.data["vite-react-electron-template"]) {
      resolve(true)
    } else {
      dbInstance.data = {
        "vite-react-electron-template": "yyds",
      };
      await dbInstance.write();
      resolve(true)
    }
  });
};

// 写数据
export const writeDbData = async (data: WriteDbDataParams) => {
  if (dbInstance) {
    try {
      await dbInstance.read();
      dbInstance.data[data.key] = data.value;
      await dbInstance.write();
    } catch (err) {
      console.error(err);
    }
  }
};

// 读数据
export const readDbData = (key: string) => {
  return new Promise(async (resolve) => {
    if (dbInstance) {
      try {
        await dbInstance.read();
        const res = dbInstance.data[key];
        resolve(res || "");
      } catch {
        resolve("");
      }
    } else {
      resolve("");
    }
  });
};
```
这样一个本地数据库就简单实现了，但是这些方法不能在渲染进程中使用，所以我们需要给选择进程注入相应的桥接方法才行。注入桥接方法后就可以实现`index.ts`了，如下：
```typescript
import { WriteDbDataParams,readDbData,writeDbData } from "./low"

export const gloabReadDbData = (key:string) => {
  if (import.meta.env.VITE_CURRENT_RUN_MODE === "main") {
    return readDbData(key)
  }
  if (import.meta.env.VITE_CURRENT_RUN_MODE === "work" ) {
    return new Promise((resolve) => {
      import('@/preload/index').then(res => {
        const {readDbData} = res
        readDbData(key).then((res) => {
          resolve(res)
        }).catch(() => {
          resolve('')
        })
      }).catch(() => {
        resolve('')
      })
    })
  }
  return window.nativeBridge.readDbData(key)
}

export const gloabWriteDbData = (data:WriteDbDataParams) => {
  console.log(import.meta.env.VITE_CURRENT_RUN_MODE)
  if (import.meta.env.VITE_CURRENT_RUN_MODE === "main") {
    return writeDbData(data)
  }
  if (import.meta.env.VITE_CURRENT_RUN_MODE === "work" ) {
    return import('@/preload/index').then(res => {
      const {writeDbData} = res
      writeDbData(data)
    })
  }
  return window.nativeBridge.writeDbData(data)
}
```
这样你就可以在主进程，渲染进程，work进程中随处读写你想要的数据了。

### 请求模块实现
我们请求模块的实现主要是使用axios和electron的net，axios用于渲染进程和work进程，net用于主进程，我们需要在这个请求模块中磨平上层的调用。核心实现逻辑如下，在src下增加http文件夹，下面增加三个文件，`baseUrl.ts`用于配置请求基础路径，`index.ts`就是请求的核心逻辑实现，`service.ts`就是各个请求接口。

baseUrl.ts如下
```typescript
const MODE = import.meta.env.MODE || 'production'

export const baseUrls:any = {
  dev: 'http://localhost:3999',
  production: 'http://jsonplaceholder.typicode.com'
}

const baseUrl = baseUrls[MODE]

export default baseUrl
```
上面的代码作用主要是获取环境变量，提供相应的请求基础url。

index.ts如下
```typescript
import axios from "axios";
import baseUrl from "./baseUrl";
import { gloabReadDbData, gloabWriteDbData } from "@/lowdb";

interface BaseParams {
  url: string;
  data: any;
  contentType?: string;
}

interface HttpOption {
  url: string;
  data: any;
  method: string;
  headers: any;
}

// 登出操作
const loginOutAction = () => {
  if (import.meta.env.VITE_CURRENT_RUN_MODE === "main") {
    import('@/main').then(res=>{ 
      const {mainWindow} = res
      mainWindow.webContents.send("login-out", true);
    })
  } else if (import.meta.env.VITE_CURRENT_RUN_MODE === "work") {
    import('@/preload').then(res => {
      const {loginOutFromWork} = res
      loginOutFromWork()
    })
  } else {
    window.location.hash = "/login";
  }
  gloabWriteDbData({
    key: "user",
    value: "",
  });
};

// 错误处理/拦截器
const responseErrorHandle = (error: any) => {
  if (error.response) {
    const { status } = error.response;
    if (status === 401) {
      loginOutAction();
    }
  }
};

// 构建基础的请求参数
const baseOptions = async (params: BaseParams, method = "post") => {
  const userData = await gloabReadDbData("user");
  const Authorization = userData ? `Bearer ${userData.token}` : "";
  let { url, data } = params;
  let contentType = "application/json";
  contentType = params.contentType || contentType;
  const option: HttpOption = {
    url: baseUrl + url,
    data: data,
    method: method,
    headers: {
      "content-type": contentType,
      Authorization,
    },
  };
  return option;
};

// electron net 请求
const netRequest = (option: HttpOption) => {
  return new Promise(async (resolve, reject) => {
    const { net } = require("electron");
    const request = net.request(option);
    let Data = {};
    request.on("response", (response) => {
      console.log(`STATUS: ${response.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
      response.on("data", (chunk) => {
        console.log(`BODY: ${chunk}`);
        Data = chunk;
      });
      response.on("end", () => {
        console.log("No more data in response.");
        if (response.statusCode !== 200) {
          reject({
            response: {
              status: response.statusCode,
              data: Data,
            },
          });
        }
        resolve(Data);
      });
    });
    request.end();
  });
};

// axios请求
const axiosRequest = (option: HttpOption) => {
  return axios(option);
};

// 核心基础请求封装
export const baseRequest = (url: string, data: any, method = "post") => {
  return new Promise(async (resolve, reject) => {
    const option = await baseOptions(
      {
        url,
        data,
      },
      method
    );
    if (import.meta.env.VITE_CURRENT_RUN_MODE === "main") {
      netRequest(option)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          responseErrorHandle(err);
          reject(err);
        });
    } else {
      axiosRequest(option)
        .then((res) => {
          console.log(res);
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          responseErrorHandle(err);
          reject(err);
        });
    }
  });
};

export const postRequest = (url: string, data = {}) => {
  return baseRequest(url, data, "post");
};

export const getRequest = (url: string, data = {}) => {
  return baseRequest(url, data, "get");
};

```
上面的代码主要是核心的http请求代码，封装了axios和electron的net,然后对请求做了一些响应处理，封装了基础的post请求和get请求，这个封装好之后就可以在各个service做处理了。

`service.ts`如下，两个简单的例子
```typescript
import {getRequest, postRequest} from "./index";

export const loginFetch = (data:any) => {
  return getRequest(`/api/user?username=${data.username}`,{})
}

export const unauthorizedFetch = () => {
  return postRequest('/api/unauthorized',{})
}
```
客户端基础封装都做好了，下面我们来用koa写个mock接口，模拟真实的接口吧。
### koa mock实现
``` javascript
  /*app.js*/
  import Koa from 'koa';
  import Router from 'koa-router';
  const app = new Koa();
  const router = new Router();
  router.get('/api', function (ctx, next) {
      ctx.body = "Hello koa";
  })
  router.get('/api/user', (ctx, next) => {
      ctx.body = {
        "name": "Terence",
        "password": 123456,
        "token": "jsdhkjalsdkajdkajdjkajkdajdas",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
        "userid": "00000001",
        "email": "antdesign@alipay.com",
        "signature": "海纳百川，有容乃大",
        "title": "前端开发",
        "group": "某某技术部"
      }
  });
  router.post('/api/unauthorized', function (ctx, next) {
    ctx.body = "unauthorized";
    ctx.status = 401;
})
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.listen(3999, () => {
      console.log('starting at port 3999');
  });

```
很简单，就这样模拟实现了两个接口请求。

到这里我们整个网络请求的封装就完成了。我们可以简单的在页面上添加两个按钮来实现401登录失效的跳转，验证我们是否可以成功的执行相应的请求，并跳转回登录页面。

![WechatIMG62.jpeg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d6e3d9776d74f5aa0a0358c21088359~tplv-k3u1fbpfcp-watermark.png?)

三种情况都可以！完成！
