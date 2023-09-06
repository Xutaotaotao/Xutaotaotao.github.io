import { defineConfig } from 'vitepress'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Taotao's Blog",
  description: "一个写博客的地方",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '技术总结', link: '/summary/',activeMatch: '^/summary/' },
      { text: '问题解析', link: '/question/',activeMatch: '^/question/' },
      { text: '个人成长', link: '/growth/',activeMatch: '^/growth/' }
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
              ]
            },
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
