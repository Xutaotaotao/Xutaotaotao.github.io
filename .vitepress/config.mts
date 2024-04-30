import { defineConfig } from 'vitepress'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [
    ['link', 
      { rel: 'icon', href: '/favicon.ico' }
    ],
    [
      'meta',
      {name: 'referrer',content: 'no-referrer'},
    ],
    [
      'meta',
      {name:'robots',content:"index,follow"}
    ],
    [
      'meta',
      {name: 'referrer',content: 'no-referrer'},
    ],
    [
      "meta",
      {
        name: "keywords",
        content:
          "徐涛焘的博客,Taotao's Blog,xutaotao,Xutaotaotao,Taotao,徐涛焘,徐涛涛,徐涛,blog,Blog,技术博客,博客,个人博客,技术总结,问题解析,个人成长,前端,JavaScript,Vue,React,网络,Electron,Node.js,TypeScript,Rust",
      },
    ],
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=GTM-TFGN8CGD' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'TAG_ID');`
    ]
  ],
  transformPageData(pageData) {
    const canonicalUrl = `https://taotaoxu.com/${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '.html')

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push([
      'link',
      { rel: 'canonical', href: canonicalUrl }
    ])
  },
  lastUpdated: true,
  title: "技术总结备忘录",
  titleTemplate: false,
  description: "徐涛焘的博客,Taotao's Blog,xutaotao,Xutaotaotao,Taotao,徐涛焘,徐涛涛,徐涛,blog,Blog,技术博客,博客,个人博客,技术总结,问题解析,个人成长,前端,JavaScript,Vue,React,网络,Electron,Node.js,TypeScript,Rust",
  themeConfig: {
    siteTitle:'徐涛焘的博客',
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local'
    },
    footer: {
      message: '如有转载或 CV 的请标注本站原文地址',
      copyright: 'ICP备案/许可证号：  <a href="https://beian.miit.gov.cn/" target="_blank">渝ICP备2023003982号-2</a>'
    },
    nav: [
      { text: '技术总结', link: '/summary/',activeMatch: '^/summary/' },
      { text: '问题解析', link: '/question/',activeMatch: '^/question/' },
      // { text: '个人成长', link: '/growth/',activeMatch: '^/growth/' }
      { text: '摄影集锦', link: '/photo/',activeMatch: '^/photo/' },
      { text: '开源项目',items: [
        { text: 'electron-prokit', link: 'https://xutaotaotao.github.io/electron-prokit/' },
        { text: 'FindAll', link: 'https://findallteam.github.io/' },
      ]},
      { text: '关于我', link: '/about/',activeMatch: '^/about/' },
    ],
    sidebar: {
      '/summary/': [
        {
          text: '技术总结',
          items: [
            {
              text: 'Electron实战',
              items: [
                {
                  text: '为什么选择Electron',
                  link: '/summary/electron/why_choose_electron'
                },
                {
                  text: 'Electron生态开发技术选型',
                  link: '/summary/electron/development_technology_selection'
                },
                {
                  text: '环境&工程搭建',
                  link: '/summary/electron/vite_electron_react'
                },
                {
                  text: 'Electron跨进程通信',
                  link: '/summary/electron/cross_process_communication'
                },
                {
                  text: '原生模块调用&开发',
                  link: '/summary/electron/native_module_call_development'
                },
                {
                  text: '应用打包',
                  link: '/summary/electron/application_packaging'
                },
                {
                  text: '应用升级',
                  link: '/summary/electron/application_update'
                },
                {
                  text: '网络请求封装',
                  link: '/summary/electron/network_request'
                },
                {
                  text: 'Mac Root模式Tarui + Eletron实现WebView',
                  link: '/summary/electron/tauri_webview'
                },
                {
                  text: 'Electron 中使用 SQLite',
                  link: '/summary/electron/electron_sqlite'
                },
                {
                  text: 'Electron 实现一个桌面悬浮窗',
                  link: '/summary/electron/electron-min-window'
                },
              ]
            },
            {
              text: '一些实践',
              items: [
                {
                  text: 'Vue keep-alive使用&详解',
                  link: '/summary/practice/vue_keep_alive'
                },
                {
                  text: 'react-i18next 实现国际化',
                  link: '/summary/practice/react_i18'
                },
              ]
            }
          ]
        }
      ],
      '/question/': [
        {
          text: '问题解析',
          items: [
            {
              text: 'Javascript',
              items: [
                {
                  text: 'JS垃圾回收机制',
                  link: '/question/javascript/carbage_recovery_mechanism'
                },
                {
                  text: 'Web应用中的存储方式',
                  link: '/question/javascript/storage_method_in_web_applications'
                },
                {
                  text: 'apply、call、bind比较',
                  link: '/question/javascript/apply_call_bind'
                },
                {
                  text: 'JS模块化',
                  link: '/question/javascript/js_modularization'
                },
                {
                  text: '前端异步编程解决方案',
                  link: '/question/javascript/asynchronous_solution'
                },
                {
                  text: '浅拷贝和深拷贝',
                  link: '/question/javascript/shallow_copy_and_deep_copy'
                }
              ]
            },
            {
              text: 'Vue',
              items: [
                {
                  text: 'Vue组件通信方式',
                  link: '/question/vue/component_communication_method'
                },
                {
                  text: '真实DOM和虚拟DOM',
                  link: '/question/vue/dom_and_virtual_dom'
                },
                {
                  text: 'Vue和React',
                  link: '/question/vue/vue_react'
                },
                {
                  text: 'Vue2和Vue3对比',
                  link: '/question/vue/vue2_vue3'
                }
              ]
            },
            {
              text: 'React',
              items: [
                {
                  text: 'React样式解决方案',
                  link: '/question/react/react_styling_solutions'
                }
              ]
            },
            {
              text: '网络',
              items: [
                {
                  text: 'TCP和UDP的区别',
                  link: '/question/network/tcp_and_udp'
                },
                {
                  text: '输入URL回车后全过程',
                  link: '/question/network/what_steps_after_entering_the_url'
                },
                {
                  text: '跨域解决方案',
                  link: '/question/network/cross_domain_solution'
                },
                {
                  text: 'http 和 https的区别',
                  link: '/question/network/http_and_https'
                },
              ]
            },
          ]
        }
      ],
      // '/growth/': [
      //   {
      //     text: '个人成长',
      //     // items: [
      //     //   {
      //     //     text: '成长1',
      //     //     link: '/growth/'
      //     //   },
      //     // ]
      //   }
      // ]
      '/photo/':[
        {
          text:'2024-03-09',
          link:'/photo/2024-03-09'
        },
        {
          text:'2024-03-16',
          link:'/photo/2024-03-16'
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Xutaotaotao' }
    ]
  }
})
