import { defineConfig } from 'vitepress'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [
    ['link', 
      { rel: 'icon', href: '/favicon.ico' }
    ],
    [
      'meta',
      {name:'robots',content:"index,follow"}
    ],
    [
      'meta',
      {name:'referrer',content:"no-referrer"}
    ],
    [
      "meta",
      {
        name: "keywords",
        content:
          "前端徐徐,前端博客,前端开发,Eletron实战,Tauri实战,Eletron,Tauri,Taotao's Blog,xutaotao,Xutaotaotao,Taotao,徐涛焘,徐涛涛,徐涛,blog,Blog,技术博客,博客,个人博客,技术总结,问题解析,个人成长,前端,JavaScript,Vue,React,网络,Electron,Node.js,TypeScript,Rust",
      },
    ],
    [
      'script',
      {src: 'https://unpkg.com/@antv/g6@5/dist/g6.min.js' }
    ],
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=GTM-TFGN8CGD' }
    ],
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-TB63M8G2D6' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'G-TB63M8G2D6');`
    ],
    [
      'script',
      {},
      `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "mdde12font")`
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'TAG_ID');`
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
      })();`
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
  title: "前端徐徐",
  titleTemplate: "前端徐徐",
  description: "前端徐徐,前端博客,前端开发,Eletron实战,Tauri实战,Eletron,Tauri,Taotao's Blog,xutaotao,Xutaotaotao,Taotao,徐涛焘,徐涛涛,徐涛,blog,Blog,技术博客,博客,个人博客,技术总结,问题解析,个人成长,前端,JavaScript,Vue,React,网络,Electron,Node.js,TypeScript,Rust",
  themeConfig: {
    siteTitle:'前端徐徐',
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local'
    },
    footer: {
      message: '如有转载或 CV 的请标注本站原文地址',
      copyright: 'ICP备案/许可证号：  <a href="https://beian.miit.gov.cn/" target="_blank">渝ICP备2023003982号-2</a>'
    },
    nav: [
      { text: 'Electron 开发', link: '/electron' },
      { text: 'Tauri 开发', link: '/tauri' },
      { text: '开发实战', link: '/summary/',activeMatch: '^/summary/' },
      { text: '前端知识图谱', link: '/feMap/',activeMatch: '^/feMap/' },
      { text: '前端面试题', link: '/question/',activeMatch: '^/question/' },
      { text: '摄影记录', link: '/photo' },
      { text: '开源项目',items: [
        { text: 'electron-prokit', link: 'https://xutaotaotao.github.io/electron-prokit/' },
        { text: 'FindAll', link: 'https://findallteam.github.io/' },
        { text: 'XTools', link: 'https://taotaoxu.com/XTools/' },
        { text: 'get-installed-apps', link: 'https://github.com/Xutaotaotao/get-installed-apps' },
        { text: 'wukong-wallpaper', link: 'https://github.com/Xutaotaotao/wukong-wallpaper' },
      ]},
      { text: '关于我', link: '/about/',activeMatch: '^/about/' },
    ],
    sidebar: {
      '/summary/': [
        {
          text: '开发实战',
          items: [
            {
              text:'概览',
              link: '/summary/'
            },
            {
              text: 'Electron 开发实践指南',
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
                {
                  text: '谈谈我做 Electron 桌面端应用的这一两年',
                  link: '/summary/electron/talk_about_electron'
                },
                {
                  text: '十年跨平台开发，Electron 凭什么占据一席之地？',
                  link: '/summary/electron/electron_summer'
                },
                {
                  text: '从架构到API，你真的掌握了Electron的全貌吗？',
                  link: '/summary/electron/electron_frame'
                },
              ]
            },
            {
              text: 'Tauri 开发实践指南',
              items: [
                {
                  text: 'Tauri 怎么样',
                  link: '/summary/tauri/how_about_tauri'
                },
                {
                  text: 'Tauri 工程搭建',
                  link: '/summary/tauri/tauri_project'
                },
                {
                  text: 'Tauri 配置介绍',
                  link: '/summary/tauri/tauri_config'
                },
                {
                  text: 'Tauri 原生能力',
                  link: '/summary/tauri/tauri_native'
                },
                {
                  text: 'Tauri 集成本地数据库',
                  link: '/summary/tauri/tauri_db'
                },
                {
                  text: 'Tauri 主题&多语言设置开发',
                  link: '/summary/tauri/tauri_theme'
                },
                {
                  text: 'Tauri 自定义多语言菜单开发',
                  link: '/summary/tauri/tauri_menu'
                },
                {
                  text: 'Tauri 日志记录功能开发',
                  link: '/summary/tauri/tauri_log'
                },
                {
                  text: 'Tauri HTTP 请求开发',
                  link: '/summary/tauri/tauri_http'
                },
                {
                  text: 'CI/CD 自动构建发布 Tauri 桌面端应用',
                  link: '/summary/tauri/tauri_ci_cd'
                },
                {
                  text: '打造《黑神话：悟空》壁纸软件：使用 Tauri 快速上手',
                  link: '/summary/tauri/tauri_wukong_wallpaper'
                },
              ]
            },
            {
              text: '一些杂项实战',
              items: [
                {
                  text: 'Vue keep-alive使用&详解',
                  link: '/summary/practice/vue_keep_alive'
                },
                {
                  text: 'react-i18next 实现国际化',
                  link: '/summary/practice/react_i18'
                },
                {
                  text: '纯前端实现图片切割,一键导出多张分割图片',
                  link: '/summary/practice/image-slicing'
                },
                {
                  text: '教你一步步用 Julep + ChatUI 构建 AI 应用',
                  link: '/summary/practice/chatui_julep'
                },
                {
                  text: 'Google 浏览器中的 AI 魔法 — window.ai （本地运行 AI 程序）',
                  link: '/summary/practice/window_ai'
                },
              ]
            }
          ]
        }
      ],
      '/question/': [
        {
          text: '前端面试题',
          items: [
            {
              text:'概览',
              link: '/question/'
            },
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
                },
                {
                  text: 'React组件通信方式总结',
                  link: '/question/react/react_components_props'
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
            {
              text:'杂项',
              items:[
                {
                  text: 'JSBridge原理简析',
                  link: '/question/sundry/JSBridge'
                },
              ]
            }
          ]
        }
      ],
      '/feMap/':[
        {
          text: '前端知识图谱',
          items:[
            {
              text:'概览',
              link: '/feMap/'
            },
            {
              text:'研发链路',
              items: [
                {text:'包管理器',link:'/feMap/developMap/packageManager'},
                {text:'脚手架',link:'/feMap/developMap/scaffold'},
                {text:'代码规范',link:'/feMap/developMap/codeSpecifications'},
                {text:'开发',link:'/feMap/developMap/develop'},
              ]
            },
            {
              text:'浏览器',
              items: [
                {text:'浏览器渲染的基石：DOM Tree 与 CSSOM',link:'/feMap/browser/dom-cssom'},
              ]
            }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Xutaotaotao' }
    ]
  },
})
