---
outline: deep
title: Internationalization with react-i18next
titleTemplate: React Practice
---

# Internationalization with react-i18next

## Documentation

[https://react.i18next.com/](https://react.i18next.com/)

## Implementation

### Install dependencies

```javascript
yarn add react-i18next i18next
```

### Create the locale folder

Create a `locales` folder:

```plain
├── src/
│   ├── locales/
│   │   ├── en-us.json
│   │   ├── zh-cn.json
│   │   └── index.ts
```

`zh-cn.json` stores Chinese translations:

```json
{
  "test words": "测试文字",
  "school": "学校",
  "welcome": "欢迎来首页"
}
```

`en-us.json` stores English translations:

```json
{
  "test words": "test words",
  "school": "School",
  "welcome": "Welcome To Home"
}
```

Tip: a key style like `"test words": "测试文字"` is often easier to read and helps reduce naming confusion.

### Prepare initialization

Use `index.ts` to initialize i18n:

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

Initialize it at the app entry:

```javascript
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import App from "./App.tsx";
import i18n from "./locales/index.ts";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
);
```

### Use it inside the project

```javascript
import { useTranslation } from "react-i18next";

const TestPage = () => {
  const { t } = useTranslation();
  return <div>{t("test words")}</div>;
};

export default TestPage;
```

### Switch languages

```javascript
import i18n from "../locales";

const lang = "en";
i18n.changeLanguage(lang);
```
