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
      "meta",
      {
        name: "keywords",
        content:
          "xutaotao,Xutaotaotao,Taotao,徐涛涛,blog,Blog,技术博客,博客,个人博客,技术总结,问题解析,个人成长,前端,JavaScript,Vue,React,网络,Electron,Node.js,TypeScript,Rust",
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
  lastUpdated: true,
  title: "Taotao's Blog",
  description: "一个写博客的地方",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local'
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present TaotaoXu'
    },
    nav: [
      { text: '技术总结', link: '/summary/',activeMatch: '^/summary/' },
      { text: '问题解析', link: '/question/',activeMatch: '^/question/' },
      // { text: '个人成长', link: '/growth/',activeMatch: '^/growth/' }
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
                  text: '1.为什么选择Electron',
                  link: '/summary/electron/why_choose_electron'
                },
                {
                  text: '2.Electron生态开发技术选型',
                  link: '/summary/electron/development_technology_selection'
                },
                {
                  text: '3.环境&工程搭建',
                  link: '/summary/electron/vite_electron_react'
                },
                {
                  text: '4.Electron跨进程通信',
                  link: '/summary/electron/cross_process_communication'
                },
                {
                  text: '5.原生模块调用&开发',
                  link: '/summary/electron/native_module_call_development'
                },
                {
                  text: '6.应用打包',
                  link: '/summary/electron/application_packaging'
                },
                {
                  text: '7.应用升级',
                  link: '/summary/electron/application_update'
                },
                {
                  text: '8.网络请求封装',
                  link: '/summary/electron/network_request'
                }
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
                }
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
      '/growth/': [
        {
          text: '个人成长',
          // items: [
          //   {
          //     text: '成长1',
          //     link: '/growth/'
          //   },
          // ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Xutaotaotao/Xutaotaotao.github.io' }
    ]
  }
})
