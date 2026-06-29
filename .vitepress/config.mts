import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  srcExclude: [
    'README.md',
    'docs/**',
    'electron/index.md',
    'tauri/index.md',
    'summary/index.md',
    'question/index.md',
    'feMap/index.md',
    'notes/index.md',
    'photo/index.md',
    'GutEase/**',
  ],
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    [
      'script',
      {},
      `(() => {
        const theme = localStorage.getItem('taotao-theme') || 'light';
        const lang = localStorage.getItem('taotao-lang') || 'zh';
        document.documentElement.dataset.theme = theme;
        document.documentElement.dataset.lang = lang;
      })();`,
    ],
    ['meta', { name: 'robots', content: 'index,follow' }],
    ['meta', { name: 'referrer', content: 'no-referrer' }],
    [
      'meta',
      {
        name: 'keywords',
        content:
          "前端徐徐,前端博客,前端开发,Eletron实战,Tauri实战,Eletron,Tauri,Taotao's Blog,xutaotao,Xutaotaotao,Taotao,徐涛焘,徐涛涛,徐涛,blog,Blog,技术博客,博客,个人博客,技术总结,问题解析,个人成长,前端,JavaScript,Vue,React,网络,Electron,Node.js,TypeScript,Rust",
      },
    ],
    ['script', { src: 'https://unpkg.com/@antv/g6@5/dist/g6.min.js' }],
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=GTM-TFGN8CGD' }],
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-TB63M8G2D6' }],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-TB63M8G2D6');`,
    ],
    [
      'script',
      {},
      `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "mdde12font")`,
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'TAG_ID');`,
    ],
    [
      'script',
      {},
      `var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?48d31a1ec82cedac903f0150d2e000d9";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();`,
    ],
  ],
  transformPageData(pageData) {
    const canonicalUrl = `https://taotaoxu.com/${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '.html')

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(['link', { rel: 'canonical', href: canonicalUrl }])
  },
  lastUpdated: true,
  title: '前端徐徐',
  titleTemplate: '前端徐徐',
  description:
    "前端徐徐,前端博客,前端开发,Eletron实战,Tauri实战,Eletron,Tauri,Taotao's Blog,xutaotao,Xutaotaotao,Taotao,徐涛焘,徐涛涛,徐涛,blog,Blog,技术博客,博客,个人博客,技术总结,问题解析,个人成长,前端,JavaScript,Vue,React,网络,Electron,Node.js,TypeScript,Rust",
  themeConfig: {
    siteTitle: '前端徐徐',
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索',
              },
            },
          },
        },
      },
    },
    footer: {
      message: '如有转载或 CV 的请标注本站原文地址',
      copyright: 'ICP备案/许可证号：  <a href="https://beian.miit.gov.cn/" target="_blank">渝ICP备2023003982号-2</a>',
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '归档', link: '/archive/' },
      { text: '分类', link: '/categories/' },
      { text: '标签', link: '/tags/' },
      { text: '关于', link: '/about/' },
    ],
    sidebar: false,
    socialLinks: [{ icon: 'github', link: 'https://github.com/Xutaotaotao' }],
  },
})
