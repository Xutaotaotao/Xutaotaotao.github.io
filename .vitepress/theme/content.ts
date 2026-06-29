export type Language = 'zh' | 'en'

export type ProjectLink = {
  text: string
  href: string
  external?: boolean
}

export const projectLinks: ProjectLink[] = [
  { text: '肠安记', href: '/GutEase/product' },
  { text: 'electron-prokit', href: 'https://xutaotaotao.github.io/electron-prokit/', external: true },
  { text: 'FindAll', href: 'https://findallteam.github.io/', external: true },
  { text: 'XTools', href: 'https://taotaoxu.com/XTools/', external: true },
  { text: 'get-installed-apps', href: 'https://github.com/Xutaotaotao/get-installed-apps', external: true },
  { text: 'wukong-wallpaper', href: 'https://github.com/Xutaotaotao/wukong-wallpaper', external: true },
]

export const navLabels = {
  zh: {
    home: '首页',
    archive: '归档',
    categories: '分类',
    tags: '标签',
    about: '关于',
    projects: '项目',
  },
  en: {
    home: 'Home',
    archive: 'Archive',
    categories: 'Categories',
    tags: 'Tags',
    about: 'About',
    projects: 'Projects',
  },
}

export type NavLabelKey = keyof typeof navLabels.zh

export type NavItem = {
  key: NavLabelKey
  href: string
  activePrefixes?: readonly string[]
}

export const navItems = [
  {
    key: 'home',
    href: '/',
    activePrefixes: ['/'],
  },
  {
    key: 'archive',
    href: '/archive/',
    activePrefixes: ['/archive/'],
  },
  {
    key: 'categories',
    href: '/categories/',
    activePrefixes: ['/categories/'],
  },
  {
    key: 'tags',
    href: '/tags/',
    activePrefixes: ['/tags/'],
  },
  {
    key: 'about',
    href: '/about/',
    activePrefixes: ['/about/'],
  },
] satisfies readonly NavItem[]

export const copy = {
  zh: {
    location: '重庆 · 可远程协作',
    heroLead: '你好，我是徐徐。',
    heroTitle: 'AI 全栈开发工程师',
    heroIntroBefore:
      '我是一名 AI 全栈开发工程师和开源创作者，也长期做前端与桌面端产品。从很早就开始写代码，并在这个',
    heroIntroLink: '博客',
    heroIntroAfter: '里持续整理技术文章与项目复盘。',
    heroNote: '本站上的每一篇内容都由我亲自撰写和整理，不是空泛的展示页。',
    archiveLink: '进入归档',
    aboutLink: '关于我',
    github: 'GitHub',
    latestTitle: '最新文章',
    latestIntro: '近期整理的技术文章、项目复盘和知识路线。',
    categoriesTitle: '分类',
    categoriesIntro: '围绕桌面开发、开发实战、前端面试和知识图谱整理。',
    tagsTitle: '标签',
    tagsIntro: '用标签串起技术栈、场景和长期关注的问题。',
    archiveMore: '查看全部文章',
    categoriesMore: '浏览全部分类',
    tagsMore: '浏览全部标签',
    humanNote: '这个站点的每一篇内容都由我整理、校对和发布。',
    footerLeft: '© 2026 前端徐徐',
    footerMeta: 'Frontend / Desktop Apps / Notes',
  },
  en: {
    location: 'Chongqing · Remote-friendly',
    heroLead: 'Hi, I am Terence.',
    heroTitle: 'I build AI-powered full-stack products.',
    heroIntroBefore:
      "I'm an AI full-stack engineer, open-source contributor, and desktop product builder. I've been coding for years and writing on ",
    heroIntroLink: 'this blog',
    heroIntroAfter: ' for quite a while!',
    heroNote: 'Everything on this site is written and curated by me, not AI.',
    archiveLink: 'Open archive',
    aboutLink: 'About',
    github: 'GitHub',
    latestTitle: 'Latest Posts',
    latestIntro: 'Recent technical essays, project notes, and learning maps.',
    categoriesTitle: 'Categories',
    categoriesIntro: 'Organized around desktop apps, practical engineering, interviews, and knowledge maps.',
    tagsTitle: 'Tags',
    tagsIntro: 'Tags connect stacks, scenarios, and long-running questions.',
    archiveMore: 'View all posts',
    categoriesMore: 'All categories',
    tagsMore: 'All tags',
    humanNote: 'Every post here is edited, checked, and published by me.',
    footerLeft: '© 2026 Taotao Blog',
    footerMeta: 'Frontend / Desktop Apps / Notes',
  },
}
