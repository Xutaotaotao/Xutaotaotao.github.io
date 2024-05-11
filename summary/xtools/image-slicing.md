---
outline: deep
title: 纯前端实现图片切割,一键导出多张分割图片
titleTemplate: XTools系列
---

## 前言

在Web开发中,经常会遇到需要将一张大图切割成多张小图的场景,比如:

*   对大图进行加载优化,将大图拆分成多张按需加载
*   实现像素级完美拼picture效果时,需要将大图切割成相应的小图拼接
*   移动端WebApp中,需要为配图生成不同尺寸的缩略图等

传统做法一般是在服务端完成图片处理,然后将处理结果输出到前端。但实际上,现代浏览器为我们提供了强大的canvas接口,我们完全可以在前端实现图片处理的各种功能。今天,我们就来学习如何使用React实现前端图片切割功能,一键导出多张分割后的小图片。

## 功能介绍

我们实现的图片切割功能包括:

*   支持本地上传图片
*   支持预览大图
*   支持自定义行数和列数切割图片
*   支持调节切割线的位置
*   支持一键下载所有切割后的小图片

最终的实现效果如下图所示:

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ce660d34cc64aa8934b121f4bf0a49d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=4096\&h=2062\&s=303218\&e=png\&b=eaeaea)

## 技术选型

我们使用React作为开发框架,Ant Design作为UI库,同时引入了以下关键技术:

*   canvas: 用于切割图片
*   react-draggable: 实现可拖动的切割线
*   FileReader: 读取本地文件并预览

## 功能实现步骤

### 图片上传和预览

首先,我们通过Ant Design的Upload组件实现了本地图片上传功能:

```jsx
<Dragger
  name="file"
  onChange={filesChange}
  fileList={fileList}
  customRequest={() => { }}
  showUploadList={false}
>
  <p className="ant-upload-drag-icon">
    <InboxOutlined />
  </p>
  <p className="ant-upload-text">点击或拖拽上传图片</p>
</Dragger>
```

在filesChange函数中,我们使用FileReader对象读取上传的图片文件,并将图片以Base64格式的数据存储到currentImg状态中:

```jsx
let reader = new FileReader();
reader.readAsDataURL(info.file.originFileObj);
reader.onload = function(e) {
  setCurrentImg(e.target.result);
}
```

然后,我们在img标签中通过src属性渲染currentImg状态,即可预览上传的图片:

```jsx
<img
  ref={imageRef}
  src={currentImg}
  onLoad={...}
/>
```

同时,我们在图片加载完成后,会通过img元素的naturalWidth和naturalHeight属性获取图片的原始尺寸,并根据指定的最大宽高计算缩放比例scale,确保图片最终以合适的尺寸渲染出来。

### 绘制拖动切割线

我们希望能够自定义图片的切割行数和列数,并通过拖动调节切割线的位置。为此,我们通过react-draggable这个库生成了一系列可拖动的分割线组件:

```jsx
<Draggable
  axis={axis}
  defaultPosition={defaultPosition}
  handle={`.${handle}`}
  key={key}
  onStop={(e, data) => { handleDragOnStop(e, data, key); }}
>
  <div style={{position: "absolute", ...lineStyle,background: "red"}}>
    <div className={handle} style={{...lineStyle, cursor: axis==="x"?"ew-resize":"ns-resize"}}/>
  </div>
</Draggable>
```

这些分割线组件会根据切割行列数的不同而动态生成,它们的位置是通过计算公式确定的:

```jsx
const xUnitSize = imageSize.width / customX; 
const yUnitSize = imageSize.height / customY;

const xDraggableList = createRandomArray(customX - 1).map((item, index) => {
  const position = xUnitSize * (index + 1);
  return {...}
});

const yDraggableList = createRandomArray(customY - 1).map((item, index) => {  
  const position = yUnitSize * (index + 1);
  return {...}
});
```

这样,当用户拖动某个分割线时,我们就可以在onStop回调函数中获取到该分割线的最新位置坐标,并更新到draggableListData状态中。

### 切割图片生成小图

当用户选择好切割行列数,并调整好每条切割线的位置后,就可以点击"下载切割图片"按钮开始真正的图片切割操作。我们定义了sliceImage函数完成这个工作:

```jsx
const sliceImage = () => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  ...

  const xLines = draggableListData
    .filter(item => item.axis === "x")
    .map(item => item.newPosition ? item.newPosition.x : item.defaultPosition.x)
    .map(item => Math.round(item / scale))
    .concat(imageWidth)
    .sort((a, b) => a - b);

  const yLines = // 与上面类似,获取所有y轴切割线的坐标
      
  for (let y = 0; y < yLines.length; y++) {
    for (let x = 0; x < xLines.length; x++) {
      const sliceX = x === 0 ? 0 : xLines[x - 1];
      const sliceY = y === 0 ? 0 : yLines[y - 1];
      const sliceWidth = x === xLines.length - 1 ? imageWidth - sliceX : xLines[x] - sliceX;
      const sliceHeight = y === yLines.length - 1 ? imageHeight - sliceY : yLines[y] - sliceY;

      canvas.width = sliceWidth;
      canvas.height = sliceHeight;
      
      context.drawImage(
        imageRef.current,
        sliceX,
        sliceY,
        sliceWidth,
        sliceHeight,
        0,
        0,
        sliceWidth,
        sliceHeight
      );

      const sliceData = canvas.toDataURL("image/png");
      downloadSlice(sliceData, `slice_${x}_${y}.png`);
    }
  }
};
```

这个函数的核心逻辑是:

1.  遍历所有切割线坐标,计算出每一个小图的起始坐标(sliceX, sliceY)和尺寸(sliceWidth, sliceHeight)
2.  创建一个Canvas元素,指定其尺寸为当前切割的小图尺寸
3.  通过drawImage方法,将大图按指定的起始坐标和尺寸渲染到Canvas中
4.  将Canvas导出为PNG格式的Base64数据
5.  触发文件下载,将当前小图导
    好的,继续丰富一下这篇文章的内容:

### 下载切割后的小图片

在sliceImage函数中,我们通过调用downloadSlice函数实现了将每张切割后的小图片下载到本地的功能:

```jsx
const downloadSlice = (sliceData, fileName) => {
  const link = document.createElement("a");
  link.download = fileName;
  link.href = sliceData;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
```

这段代码的作用是:

1.  创建一个 a 标签
2.  将 a 标签的 download 属性设置为文件名
3.  将 a 标签的 href 属性设置为图片的 Base64 数据
4.  将 a 标签插入到 document.body 中
5.  模拟点击 a 标签,触发文件下载
6.  下载完成后将 a 标签从 document.body 中移除

这样,所有切割后的小图片就会以文件的形式下载到用户的本地了。


## 总结

通过这个实例,我们学习了如何借助现代浏览器强大的canvas接口,结合React等前端技术,在不依赖服务端的情况下,实现图片切割的功能。

实现这个功能的关键技术点包括:

*   使用 FileReader 读取本地文件
*   通过 img 标签预览和获取图片尺寸信息
*   使用 canvas drawImage 方法绘制和导出图片
*   利用 react-draggable 实现拖动调整切割线位置
*   模拟点击链接实现文件下载

不难看出,结合canvas和其他现代Web API,我们在浏览器中几乎可以复现任何服务端图片处理的功能,这不仅能够减轻服务端压力,还能提高整体的响应速度和体验。

当然,前端图片处理也并非是一无是处。比如对于过大的图片,在浏览器中进行处理可能会导致页面卡顿;另外,图片下载也只能一次性完成,如果需要持久保存,还是需要依赖服务端等。因此在真实项目中,我们需要根据具体情况权衡利弊,选择合适的实现方式。

未来,随着Web技术的不断进步,我相信前端图像处理能力一定会变得越来越强大。这不仅能给图像处理相关的Web应用注入新的活力,也为Web开发人员拓展了新的能力边界,让我们拭目以待!

## XTools

- 专注工具，助力高效。
- 完全本地化工具，无需云端，不担心隐私泄露。
- 体验地址：https://taotaoxu.com/XTools/
- github: https://github.com/xutaotaotao/XTools

欢迎有兴趣的小伙伴一起参与，创建更多纯前端的工具箱。
