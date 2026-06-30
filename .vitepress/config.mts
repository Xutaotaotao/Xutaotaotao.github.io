import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

const footerIcp = '<a href="https://beian.miit.gov.cn/" target="_blank">渝ICP备2023003982号-2</a>'
const zhKeywords =
  "前端徐徐,前端博客,前端开发,Eletron实战,Tauri实战,Eletron,Tauri,Taotao's Blog,xutaotao,Xutaotaotao,Taotao,徐涛焘,徐涛涛,徐涛,blog,Blog,技术博客,博客,个人博客,技术总结,问题解析,个人成长,前端,JavaScript,Vue,React,网络,Electron,Node.js,TypeScript,Rust"
const enKeywords =
  'Terence Xu, frontend blog, frontend engineering, Electron practice, Tauri practice, JavaScript, Vue, React, network, Electron, Node.js, TypeScript, Rust, desktop apps, personal tech blog'

export default defineConfig({
  appearance: false,
  markdown: {
    theme: {
      light: 'one-light',
      dark: 'one-dark-pro',
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  srcExclude: [
    'README.md',
    'docs/**',
  ],
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    [
      'script',
      {},
      `(() => {
        const theme = localStorage.getItem('taotao-theme') || 'light';
        document.documentElement.dataset.theme = theme;
        document.documentElement.classList.toggle('dark', theme === 'dark');

        const savedLang = localStorage.getItem('taotao-lang');
        const systemLang = (() => {
          const languages = [navigator.language, ...(navigator.languages || [])];
          for (const language of languages) {
            const code = (language || '').toLowerCase();
            if (code.startsWith('zh')) return 'zh';
            if (code.startsWith('en')) return 'en';
          }
          return 'zh';
        })();
        const preferred = savedLang === 'en' || savedLang === 'zh' ? savedLang : systemLang;
        const path = window.location.pathname;
        const pathLang = path === '/en' || path.startsWith('/en/') ? 'en' : 'zh';

        document.documentElement.dataset.lang = preferred;

        if (pathLang !== preferred) {
          const strip = path.startsWith('/en/') || path === '/en' ? (path.slice(3) || '/') : path;
          const normalized = strip === '/' ? strip : strip.replace(/index\\.html$/, '').replace(/\\.html$/, '/');
          const target = preferred === 'en'
            ? (normalized === '/' ? '/en/' : '/en' + normalized)
            : normalized;
          const current = path.replace(/index\\.html$/, '').replace(/\\.html$/, '/') || '/';
          const next = target.replace(/index\\.html$/, '').replace(/\\.html$/, '/') || '/';
          if (current !== next) {
            window.location.replace(target + window.location.search + window.location.hash);
          }
        }
      })();`,
    ],
    ['meta', { name: 'robots', content: 'index,follow' }],
    ['meta', { name: 'referrer', content: 'no-referrer' }],
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
    const pageKeywords = pageData.relativePath.startsWith('en/') ? enKeywords : zhKeywords

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(['link', { rel: 'canonical', href: canonicalUrl }])
    pageData.frontmatter.head.push(['meta', { name: 'keywords', content: pageKeywords }])
  },
  lastUpdated: true,
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: '前端徐徐',
      titleTemplate: '前端徐徐',
      description: zhKeywords,
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
          copyright: `ICP备案/许可证号：  ${footerIcp}`,
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
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Terence Xu',
      titleTemplate: 'Terence Xu',
      description: enKeywords,
      themeConfig: {
        siteTitle: 'Terence Xu',
        search: {
          provider: 'local',
          options: {
            locales: {
              en: {
                translations: {
                  button: {
                    buttonText: 'Search',
                    buttonAriaLabel: 'Search',
                  },
                },
              },
            },
          },
        },
        footer: {
          message: 'Please link back to the original page when reposting or referencing this site.',
          copyright: `ICP License: ${footerIcp}`,
        },
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Archive', link: '/en/archive/' },
          { text: 'Categories', link: '/en/categories/' },
          { text: 'Tags', link: '/en/tags/' },
          { text: 'About', link: '/en/about/' },
        ],
        sidebar: false,
        socialLinks: [{ icon: 'github', link: 'https://github.com/Xutaotaotao' }],
      },
    },
  },
})
