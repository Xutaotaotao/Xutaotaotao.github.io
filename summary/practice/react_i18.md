---
outline: deep
title: react-i18next 实现国际化
titleTemplate: react实践
---

# react-i18next 实现国际化

## 文档

[https://react.i18next.com/](https://react.i18next.com/)

## 实现

### 安装依赖

```javascript
yarn add react-i18next i18next
```

### 创建文件夹

创建`locales`文件夹。

```javascript
├── src/
│   ├── locales/
│   │   ├── en-us.json
│   │   ├── zh-cn.json
│   │   └── index.ts
```

`zh-cn.json`用来存储中文翻译

```javascript
{
    "test words":"测试文字",
    "school":"学校",
    "welcome":"欢迎来首页"
}

```

`en-us.json`用来存储英文

```javascript
{
    "test words":"test words",
    "school":"School",
    "welcome":"Welcome To Home"
}
```

Tips：建议使用`"test words":"测试文字"`这种命名方式，具体含义，减少命名困扰，提高可读性。

### 准备初始化

`index.ts`用来多语言初始化

```typescript
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enUsTrans from "./en-us.json";
import zhCnTrans from "./zh-cn.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enUsTrans,
    },
    zh: {
      translation: zhCnTrans,
    },
  },
  detection: {
    order: ["queryString", "cookie"],
    caches: ["cookie"],
  },
  fallbackLng: "zh",
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
```

在项目入口处初始化

```javascript
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next';
import App from './App.tsx'
import i18n from './locales/index.ts'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
)
```

### 项目中使用

```javascript
import { useTranslation } from "react-i18next";
const TestPage = () => {
  const { t } = useTranslation();
  return <div>{t("test words")}</div>;
};

export default TestPage;
```

### 切换语言

```javascript
import i18n from "../locales";
const lang = "en";
i18n.changeLanguage(lang);
```
