---
outline: deep
title: Tauri 原生能力
titleTemplate: Tauri应用开发实践指南
---

# Tauri 原生能力

## 原生能力简介
Tauri 是一个用于构建安全的小型桌面应用程序的框架,它结合了 Web 前端和系统后端技术。Tauri 提供了一些原生能力,让您的 Web 应用程序能够访问本地系统资源和 API,主要包括以下几个方面:

1. **文件系统访问** Tauri 允许你的 Web 应用程序读取、写入和监视本地文件系统中的文件和目录。这对于处理用户文档、保存应用程序数据等场景非常有用。
2. **系统托盘** Tauri 支持在系统托盘区显示应用程序图标,并提供自定义的上下文菜单,让您可以构建类似于本机桌面应用程序的用户体验。
3. **本地消息通知** 您可以使用 Tauri 在桌面系统上显示本地通知,让用户获得关于应用程序状态或重要事件的反馈。
4. **剪贴板访问** Tauri 允许您读取和写入系统剪贴板中的文本和图像数据。
5. **对话框和文件选择器** 使用 Tauri,您可以在应用程序中调用本地对话框,如打开文件、保存文件和显示消息框等,提高与用户的交互体验。
6. **命令行参数** Tauri 使您能够访问用于启动应用程序的命令行参数。
7. **全局捷径** 您可以注册全局键盘快捷键,以便在应用程序运行时响应特定的键盘输入。
8. **系统信息** Tauri 提供对系统信息的访问,包括 CPU、内存、网络等,允许您构建跨平台的系统监视工具。
9. **更新检查** 使用 Tauri,您可以检查应用程序的更新并提示用户进行更新。

通过利用这些原生能力,您可以构建功能强大且与本地桌面应用程序体验无缝集成的 Web 应用程序。Tauri 的目标是最大限度地减少 Web 和本机之间的鸿沟,同时保持了 Web 开发的高效性和可移植性。
我们这里以一个文件系统访问的场景来实现一下相应的能力，这里会涉及到一些配置以及Tauri的API的基本使用。

## 实战应用场景
在实现Tauri文件存储相关的功能之前，需要把相应的页面完成。大概效果如下，一个切割图片的工具，可上传图片，然后下载切割的图片，在这个场景里就会涉及到原生能力的调用，主要是文件相关的原生能力。
![截屏2024-06-04 13.55.43.png](https://cdn.nlark.com/yuque/0/2024/png/277039/1717480574430-b4d892a1-3b27-4918-a4ad-af28208ff82b.png#averageHue=%23decfc5&clientId=u9338b8bf-ce4a-4&from=drop&height=1438&id=u0fc604b8&originHeight=1442&originWidth=2162&originalType=binary&ratio=2&rotation=0&showTitle=false&size=2256455&status=done&style=none&taskId=u45ad091b-91bd-432b-b9cb-ffe0499e2c9&title=&width=2156)
在这个场景中，我们常规的在浏览器的下载模式和方法是这样的。利用了浏览器提供的` <a> `元素的 download 和 href 属性,创建了一个临时的链接,并触发了点击事件,从而实现了文件下载的功能。它可以下载来自 URL 或者 Blob 对象的文件。
```javascript
const downloadSlice = (sliceData: any, fileName: string) => {
    const link = document.createElement("a");
    link.download = fileName;
    link.href = sliceData;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
```
但是在Tauri中我们就不能这样做了，我们需要使用 Tauri的原生能力，主要是这三个模块：path模块，dialog模块，fs模块。path模块获取文件路径，dialog模块让用户选择文件对话框，fs模块存储文件。因为Tauri在使用相应的模块的时候是需要配置相应的权限的，否则无法在代码中使用相关方法，下面就具体讲解一下如何在Tauri实现文件下载的功能。
## Tauri实现文件下载
### 修改配置
上面已经提到了，在Tauri中使用相应的原生模块的时候是需要配置相应的权限的，下面我们就来配置一下相关的权限，然后讲解一下相关的配置项。
首先是path的配置

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| all | boolean | false | 使用此标志启用所有路径 API 功能。 |

所以如果要启用路径API的话，需要设置其为true
```javascript
"path": {
  "all": true
}
```
然后再是dialog的配置

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| all | boolean | false | 使用此标志启用所有对话框 API 功能。 |
| open | boolean | false | 允许 API 打开对话框窗口来选择文件。 |
| save | boolean | false | 允许 API 打开一个对话框窗口来选择保存文件的位置。 |
| message | boolean | false | 允许 API 显示消息对话框窗口。 |
| ask | boolean | false | 允许 API 显示带有是/否按钮的对话框窗口。 |
| confirm | boolean | false | 允许 API 显示带有“确定”/“取消”按钮的对话框窗口。 |

直接全部设置为true，感觉每个都需要
```javascript
 "dialog": {
    "all": true,
    "ask": true,
    "confirm": true,
    "message": true,
    "open": true,
    "save": true
}
```
最后是file的配置

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| scope | [FsAllowlistScope](https://tauri.app/v1/api/config/#fsallowlistscope) | [] | 文件系统 API 的访问范围。 |
| all | boolean | false | 使用此标志启用所有文件系统 API 功能。 |
| readFile | boolean | false | 从本地文件系统读取文件。 |
| writeFile | boolean | false | 将文件写入本地文件系统。 |
| readDir | boolean | false | 从本地文件系统读取目录。 |
| copyFile | boolean | false | 从本地文件系统复制文件。 |
| createDir | boolean | false | 从本地文件系统创建目录。 |
| removeDir | boolean | false | 从本地文件删除目录。 |
| removeFile | boolean | false | 删除文件 |
| renameFile | boolean | false | 重命名文件 |
| exists | boolean | false | 检测是否存在文件 |

我们直接设置如下
```javascript
 "fs":{
  "all":true,
  "scope": ["**"] // 代表所有文件都可以访问
}
```
到这里，我们前期的配置就完成了，可以用tauri 实现文件下载了。
### 下载实现
我们因为要实现浏览器环境和tauri环境的下载，所以呢我们需要区分环境，区分环境可以使用
```javascript
if (window.__TAURI__){
  // tauri环境
} else {
  // 浏览器环境
}
```
另外我们的应用场景是下载多张切割图片，所以需要做ZIP打包压缩处理。
整体思路如下
![](https://cdn.nlark.com/yuque/0/2024/jpeg/277039/1717483616505-52464eeb-bdbb-44ec-a940-7d94715dad72.jpeg)
具体代码如下
```javascript
import { writeBinaryFile } from '@tauri-apps/api/fs';
import { path, dialog } from '@tauri-apps/api';
import JSZip from 'jszip';
import dayJS from 'dayjs';
import { FileBase64List } from '@/type';

// 单个文件下载
export const downloadFileBase64 = async (data: any, fileName: string) => {
  if (window.__TAURI__){
    const binaryString = atob(data.split(',')[1]);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    try {
      const basePath = await path.downloadDir();
      let selPath:any = await dialog.save({
        defaultPath: basePath,
      });
      selPath = selPath.replace(/Untitled$/, '');
      writeBinaryFile({ contents: bytes, path: `${selPath}${fileName}` });
    } catch (error) {
      console.error(error);
    }
  } else {
    const link = document.createElement("a");
    link.download = fileName;
    link.href = data;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// tauri批量打包ZIP下载
export const downloadBase64FileWithZip =async (data:FileBase64List,callback:Function) => {
  const zip = new JSZip();
  data.forEach(item => {
    zip.file(item.name, item.data.replace(/^data:image\/(png|jpg);base64,/, ""), { base64: true });
  });
  const date = dayJS().format('YYYYMMDDHHmmss');
  const basePath = await path.downloadDir();
  let selPath:any = await dialog.save({
    defaultPath: basePath,
  });
  selPath = selPath.replace(/Untitled$/, '');
  zip.generateAsync({ type: 'blob' }).then((content) => {
    let file = new FileReader();
    file.readAsArrayBuffer(content);
    file.onload = function (e:any) {
      let fileU8A = new Uint8Array(e.target.result);
      writeBinaryFile({ contents: fileU8A, path: `${selPath}IMG_${date}.zip` });
      callback();
    };
  });
}

// 多个base64文件下载
export const downloadFileBase64List = async (data:FileBase64List,callback:Function) => {
  if (window.__TAURI__){
    downloadBase64FileWithZip(data,callback)
  } else {
    data.forEach(item => {
      downloadFileBase64(item.data, item.name)
    })
  }
}
```
## 总结
经过上面的步骤,我们基本上已经了解了 Tauri 原生能力的相关知识,并在一个实际案例中实现了利用这些能力实现文件下载的操作,掌握了整个原生能力对接的流程。不过,Tauri 原生能力的范围有一定限制,如果需要实现一些更加强大和复杂的功能,我们还需要使用到 Tauri 的进程通信机制以及原生能力扩展功能。在后续的章节中,我们将通过实例一步步带你了解这些更高级的特性,让你能够充分发挥 Tauri 的潜力,构建出更加强大的桌面应用程序。

源码：https://github.com/Xutaotaotao/XTools/blob/feature/tauri/src/pages/imageSlicing/index.tsx
