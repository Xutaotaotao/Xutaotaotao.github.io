---
outline: deep
---

# Node.js 实现 Mac & Windows 应用安装

此片文章将介绍如何使用 Node.js 实现 Mac & Windows 应用的安装。主要包括安装exe, dmg, pkg, zip等格式的安装包。

exe主要是针对Windows系统，dmg、zip、pkg是针对Mac系统。

## exe安装

exe安装包是Windows系统常见的安装包格式，一般是.exe文件。

Node.js提供了`child_process`模块，可以用来执行命令行命令，通过执行命令行命令来实现exe安装包的安装。

```javascript
const { exec } = require('child_process');

// index.exe为exe安装包文件名
exec('start install.exe', (error, stdout, stderr) => {
  if (error) { 
    console.error(`error: ${error.message}`);
    return;
  }          
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }          
  console.log(`stdout: ${stdout}`);    
});

## dmg安装

dmg安装包是Mac系统常见的安装包格式，一般是.dmg文件。

还是使用`child_process`模块执行命令行命令，通过执行命令行命令来实现dmg安装包的安装。

```javascript
const { exec } = require('child_process');

// 挂载dmg

// 获得.app文件路径

// 复制.app文件到Applications

// 卸载挂载程序
```

## pkg安装

使用`installer`命令行工具来实现pkg安装包的安装。

## zip安装

zip 文件安装包就是先解压到指定目录，然后将解压文件移动到到Applications。