---
outline: [1,2]
title: 打造《黑神话：悟空》壁纸软件：使用 Tauri 快速上手
titleTemplate: Tauri应用开发实践指南
---

大家好，我是徐徐！在这里跟大家分享一下我如何用半天时间实现一款《黑神话：悟空》桌面壁纸软件的。先看效果图。

## Windows

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/462829652d3b470c9f0b38b5e3c47c04~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5b6Q5b6Q:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE0MDA0OTM5MjU1Njc4In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1725009449&x-orig-sign=AvwhrII60pdnZfuuRnzgiI5zUp0%3D)

## Mac

![970af9b5e896db75b9ffd660a2b99e5.jpg](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/2545a5091e0a4b89997fee8cd6fa78b7~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5b6Q5b6Q:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE0MDA0OTM5MjU1Njc4In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1725009449&x-orig-sign=wVn8zkvcBDOwDR%2B38m9UQYGJgUs%3D)

# 前言

最近 《黑神话：悟空》这款游戏太火爆了，里面的场景和画面都非常的美丽，就想到是不是可以把里面的图片设置成桌面壁纸呢，然后我就在网上看了一下图片，发现了 Wegame 的官网有图片，但是需要一张张下载，要么就是需要下载 Wegame 然后设置桌面壁纸，我就想想我办公电脑肯定不能下载 Wegame，然后也不想一张张下载图片。

于是就直接想着写个桌面应用程序来设置壁纸得了。话不多说，让我们来看看如何用 Tauri 快速完成一个桌面端的壁纸软件吧！

# 前期准备

在开始项目之前需要完成 rust 环境安装和 tauri 项目初始化的准备工作。具体参考如下：

*   rust 环境安装：<https://www.rust-lang.org/zh-CN/tools/install>
*   tauri 项目初始化：<https://tauri.app/zh-cn/v1/guides/getting-started/setup/>

# 核心流程

其实核心流程很简单，如下图所示。
![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/61ef91d799e74cb0a04c0fe0cb286670~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5b6Q5b6Q:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE0MDA0OTM5MjU1Njc4In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1725009449&x-orig-sign=Ck1R%2BGvAPAyGGj4fnGfng8mxVMo%3D)
步骤就是很常规的流式流程，中规中矩。

当然上面的是从 GUI 前端界面操作的，我们还有在系统托盘的功能，就是上一张下一张的快捷切换壁纸的功能，流程跟这个有所差别，但是核心逻辑都差不多，具体逻辑如下图所示。
![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/c6c332213e374f32997573c90d6e4622~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5b6Q5b6Q:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE0MDA0OTM5MjU1Njc4In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1725009449&x-orig-sign=4GzE%2FSXJ5p6jtYCMk%2B0IIQwUzcg%3D)
上面的两个流程最核心的就是下载壁纸和更换壁纸，这两个地方也是最难的地方。

# 如何实现下载和更换壁纸

## 下载壁纸实现

```rust
#[command]
async fn download_and_set_wallpaper(url: String, file_name: String) -> Result<(), String> {
    let mut image_path = dirs::home_dir().unwrap_or(PathBuf::from("."));
    let file_name_with_extension = format!("{}.jpg", file_name);
    image_path.push(file_name_with_extension);

    let response = reqwest::get(&url).await.map_err(|e| e.to_string())?;
    let bytes = response.bytes().await.map_err(|e| e.to_string())?;

    let mut file = File::create(&image_path).map_err(|e| e.to_string())?;
    file.write_all(&bytes).map_err(|e| e.to_string())?;

    change_wallpaper(image_path.to_str().unwrap().to_string())
}
```

这段代码定义了一个异步函数 `download_and_set_wallpaper`，用于从指定的 `url` 下载图片并将其设置为桌面壁纸。

*   它先确定图片的保存路径为用户主目录，并生成带 `.jpg` 后缀的文件名。
*   通过 `reqwest` 发送 HTTP 请求下载图片数据，并保存到本地文件。
*   下载完成后，调用 `change_wallpaper` 函数将该图片设置为桌面壁纸。

## 更换壁纸实现

```rust
fn change_wallpaper(image_path: String) -> Result<(), String> {
    #[cfg(target_os = "windows")]
    {
        let c_image_path = CString::new(image_path).map_err(|e| e.to_string())?;
        unsafe {
            if SystemParametersInfoA(SPI_SETDESKWALLPAPER, 0, c_image_path.as_ptr() as *mut _, 0)
                == 0
            {
                return Err("Failed to set wallpaper".into());
            }
        }
    }

    #[cfg(target_os = "macos")]
    {
        let script = format!(
            r#"tell application "System Events"
                set desktopCount to count of desktops
                repeat with desktopNumber from 1 to desktopCount
                    tell desktop desktopNumber
                        set picture to POSIX file "{}"
                    end tell
                end repeat
            end tell"#,
            image_path
        );

        let output = Command::new("osascript")
            .arg("-e")
            .arg(&script)
            .output()
            .map_err(|e| e.to_string())?;

        if !output.status.success() {
            return Err(String::from_utf8_lossy(&output.stderr).to_string());
        }
    }

    Ok(())
}
```

这段代码定义了一个 `change_wallpaper` 函数，用于在 Windows 和 macOS 系统上设置桌面壁纸。根据操作系统的不同，代码路径也不同：

1.  **Windows (**`target_os = "windows"`**)**:
    *   将图片路径 `image_path` 转换为 C 风格的字符串（`CString`）。
    *   使用 `SystemParametersInfoA` 函数设置桌面壁纸。如果设置失败，返回错误信息。
    *   该部分代码是通过 `#[cfg(target_os = "windows")]` 宏条件编译的，确保只在 Windows 系统上编译和运行。
2.  **macOS (**`target_os = "macos"`**)**:
    *   使用 AppleScript 生成一个脚本，设置所有桌面的壁纸为指定的 `image_path`。
    *   使用 `osascript` 命令执行该 AppleScript 脚本。
    *   如果脚本执行失败，返回错误信息。

设置壁纸这一块也有很多其他的方法，我暂时觉得上面的两个方法更加简单方便，如果你有其他的方案也可以替换。

# 前后端如何交互

前后端交互主要是用到两个方法，前端向后端发消息使用 `invoke`,前端收后端的消息使用 `listen`。
大概分四大块，分别是：

*   前端向后端发送消息

```js
const handleChangeWallpaper = async (item: any, index: number, showLoading = true) => {
  setTip('设置中...')
  currentIndex = index;
  if (showLoading) {
    setLoading(true);
  }
  try {
    // 向后端发出指令
    await invoke('download_and_set_wallpaper', {
      url: item.url,
      fileName: item.file_id,
      wallpapers: wallPapers
    });
    if (showLoading) {
      message.success('壁纸更改成功!');
    }
  } catch (error) {
    if (showLoading) {
      message.error(`更改壁纸失败: ${error}`);
    }
  } finally {
    setLoading(false);
  }
};
```

*   后端处理前端消息

```js
#[command]
async fn download_and_set_wallpaper(url: String, file_name: String) -> Result<(), String> {}
```

*   后端发送消息给前端

```js
SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                // 点击发送事件
                "next" => {
                    app.emit_all("change_wallpaper", Payload { message: "next_wallpaper".into() }).unwrap();
                }
                "previous" => {
                    app.emit_all("change_wallpaper", Payload { message: "previous_wallpaper".into() }).unwrap();
                }
                _ => {}
            },
```

*   前端接受后端的消息

```js
useEffect(() => {
    const changeWallpaperListen = listen("change_wallpaper", (data:any) => {
      const currentIndex = Number(localStorage.getItem("currentIndex")) || 0;
      console.log("currentIndex",currentIndex)
      const { message } = data.payload || {};
      if (message === "next_wallpaper") {
        let indexData = currentIndex + 1;
        if (indexData > wallPapers.length - 1){
          indexData = 0
        }
        if (wallPapers[indexData]) {
          handleChangeWallpaper(wallPapers[indexData], indexData, false);
        } else {
          // 兜底
          handleChangeWallpaper(WALLPAPERS[0], 0, false);
        }
      }
      if (message === "previous_wallpaper") {
        let indexData = currentIndex - 1
        if (indexData < 0){
          indexData = wallPapers.length - 1
        }
        if (wallPapers[indexData]) {
          handleChangeWallpaper(wallPapers[indexData], indexData, false);
        } else {
          handleChangeWallpaper(WALLPAPERS[0], 0, false);
        }
      }
    });

    return () => {
      changeWallpaperListen.then((unlisten) => unlisten());
    };
  }, [wallPapers]);
```

到这里其实所有的核心代码逻辑就完成了，然后只需要测试修改添加一些其他的辅助功能就可以使用了。

# 一些已知问题

*   Mac 端扩展屏幕壁纸不同步，确保扩展屏幕在主屏幕即可
*   Mac 首次使用文件权限提醒

![b0cdb7b8871ba5628c76b43c35fe6d4.jpg](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/eb682eb00859437b930492218073a7a1~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5b6Q5b6Q:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE0MDA0OTM5MjU1Njc4In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1725009449&x-orig-sign=SMSjZ20Mlvb4D3b7%2FVu941WtrPg%3D)
直接允许之后就可以使用。

*   Windows 下载 & 安装阻止

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/2467fdaad7c94f1b99ee8dbd7792f377~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5b6Q5b6Q:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE0MDA0OTM5MjU1Njc4In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1725009449&x-orig-sign=LBH2esSjI2S7D9GHdQosQGtpHgI%3D)
解除限制即可使用，原因是因为没有签名。

# 源码

<https://github.com/Xutaotaotao/wukong-wallpaper>

# 下载地址

<https://github.com/Xutaotaotao/wukong-wallpaper/releases>

# 结语

这个应用纯粹是个人玩具，图片源自于 Wegame 官网，如果大家有兴趣可以下载使用体验体验。空闲时间做一些好玩的东西也是不错的，可以锻炼技术，还可以让自己方便，何乐而不为？
