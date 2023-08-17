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
          // items: [
          //   {
          //     text: '问题1',
          //     link: '/question/'
          //   },
          // ]
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
