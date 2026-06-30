export type Language = 'zh' | 'en'

export type ProjectLink = {
  text: string
  textEn?: string
  href: string
  external?: boolean
}

export const projectLinks: ProjectLink[] = [
  { text: '肠安记', textEn: 'GutEase', href: '/GutEase/product' },
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
    brand: '前端徐徐',
    homeAria: '前端徐徐 首页',
    menuOpen: '打开导航菜单',
    menuClose: '关闭导航菜单',
    mainNav: '主导航',
    switchZh: '切换到中文',
    switchEn: '切换到英文',
    switchDark: '切换深色主题',
    switchLight: '切换浅色主题',
    articleCategory: '分类',
  },
  en: {
    home: 'Home',
    archive: 'Archive',
    categories: 'Categories',
    tags: 'Tags',
    about: 'About',
    projects: 'Projects',
    brand: 'Terence Xu',
    homeAria: 'Terence Xu Home',
    menuOpen: 'Open navigation menu',
    menuClose: 'Close navigation menu',
    mainNav: 'Main navigation',
    switchZh: 'Switch to Chinese',
    switchEn: 'Switch to English',
    switchDark: 'Switch to dark theme',
    switchLight: 'Switch to light theme',
    articleCategory: 'Category',
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
    heroLead: '你好，我是',
    heroName: '徐徐。',
    heroTitle: 'AI 全栈开发工程师',
    heroIntroBefore:
      '我是一名 AI 全栈开发工程师和开源创作者，也长期做前端与桌面端产品。从很早就开始写代码，并在这个',
    heroIntroLink: '博客',
    heroIntroAfter: '里持续整理技术文章与项目复盘。',
    heroNote: '本站上的每一篇内容都由我亲自撰写和整理，不是 AI 生成的。',
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
    footerIcpLabel: 'ICP备案/许可证号：',
    footerIcpNumber: '渝ICP备2023003982号-2',
    qrContact: '扫码联系作者',
    archiveCountSuffix: '篇',
    categoryPostsCount: (count: number) => `分类下共 ${count} 篇文章`,
    tagPostsCount: (count: number) => `标签下共 ${count} 篇文章`,
    selectedTaxonomyCount: (count: number) => `共 ${count} 篇文章`,
    aboutIntro:
      '我是前端徐徐，长期关注前端工程、桌面端应用、产品化工具和有耐心的用户体验。',
    aboutSkills:
      '我擅长 React、Vue、Electron、Tauri、Node.js 与 Rust 周边工程实践，也喜欢把真实项目里的取舍整理成文章。',
    aboutPublishedLabel: '文章',
    aboutPublished: '已整理文章',
    aboutThemesLabel: '分类',
    aboutThemes: '主题方向',
    aboutTagsLabel: '标签',
    aboutTags: '技术标签',
    aboutCurrentTitle: '正在关注',
    aboutCurrentText:
      '正在持续整理桌面端工程实践、前端知识图谱和一些产品化工具，也记录摄影、户外和生活里的光线。',
    aboutLinksTitle: '联系与入口',
    openArchive: '查看归档',
    browseTags: '查看标签',
    browseAllPosts: '浏览全部文章',
  },
  en: {
    location: 'Chongqing · Remote-friendly',
    heroLead: 'Hi, I am',
    heroName: 'Terence.',
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
    footerIcpLabel: 'ICP License:',
    footerIcpNumber: '渝ICP备2023003982号-2',
    qrContact: 'Scan to contact the author',
    archiveCountSuffix: 'posts',
    categoryPostsCount: (count: number) => `${count} posts in this category`,
    tagPostsCount: (count: number) => `${count} posts with this tag`,
    selectedTaxonomyCount: (count: number) => `${count} posts`,
    aboutIntro:
      'I focus on frontend engineering, desktop apps, productized tools, and patient user experiences.',
    aboutSkills:
      'I work with React, Vue, Electron, Tauri, Node.js, and the Rust-adjacent parts of desktop engineering.',
    aboutPublishedLabel: 'Posts',
    aboutPublished: 'Published notes',
    aboutThemesLabel: 'Categories',
    aboutThemes: 'Core themes',
    aboutTagsLabel: 'Tags',
    aboutTags: 'Technical tags',
    aboutCurrentTitle: 'Currently',
    aboutCurrentText:
      'I am continuing to organize desktop engineering practice, frontend knowledge maps, and productized tools, with occasional notes on photography, outdoor time, and daily light.',
    aboutLinksTitle: 'Contact and links',
    openArchive: 'Open archive',
    browseTags: 'Browse tags',
    browseAllPosts: 'Browse all posts',
  },
}
