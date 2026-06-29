import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()

const requiredFiles = [
  '.vitepress/theme/Layout.vue',
  '.vitepress/theme/components/SiteNav.vue',
  '.vitepress/theme/components/SiteFooter.vue',
  '.vitepress/theme/components/HomeView.vue',
  '.vitepress/theme/components/ListingPage.vue',
  '.vitepress/theme/content.ts',
  '.vitepress/theme/style/main.css',
  'archive/index.md',
  'categories/index.md',
  'tags/index.md',
  'about/index.md',
]

const requiredDistChecks = [
  ['.vitepress/dist/index.html', '最新文章'],
  ['.vitepress/dist/index.html', '博客改版记录的随想'],
  ['.vitepress/dist/archive/index.html', '归档'],
  ['.vitepress/dist/archive/index.html', '为什么选择Electron'],
  ['.vitepress/dist/archive/index.html', 'apply、call、bind 比较'],
  ['.vitepress/dist/categories/index.html', '分类'],
  ['.vitepress/dist/categories/index.html', '桌面开发'],
  ['.vitepress/dist/tags/index.html', '标签'],
  ['.vitepress/dist/tags/index.html', 'Electron'],
  ['.vitepress/dist/about/index.html', '关于我'],
  ['.vitepress/dist/archive/index.html', '博客改版记录的随想'],
  ['.vitepress/dist/index.html', 'craft-mobile-menu'],
  ['.vitepress/dist/index.html', '首页'],
  ['.vitepress/dist/index.html', '归档'],
  ['.vitepress/dist/index.html', '分类'],
  ['.vitepress/dist/index.html', '标签'],
  ['.vitepress/dist/index.html', '关于'],
  ['.vitepress/dist/assets', 'craft-taxonomy'],
  ['.vitepress/dist/assets', 'craft-shell'],
]

const forbiddenDistChecks = [
  ['.vitepress/dist/assets', 'What two years of Electron work taught me.'],
  ['.vitepress/dist/assets', '桌面端工程、跨进程通信、打包升级和长期维护的真实经验。'],
  ['.vitepress/dist/assets', 'A good blog homepage sets the tone before it sends people into the archive.'],
  ['.vitepress/dist/assets', '好的博客首页先建立气质，再把读者带到内容。'],
  ['.vitepress/dist/index.html', '把文章打平'],
  ['.vitepress/dist/index.html', 'Hexo'],
  ['.vitepress/dist/index.html', '真实 Markdown'],
  ['.vitepress/dist/index.html', '从文章路径和 frontmatter'],
  ['.vitepress/dist/about/index.html', '真实 Markdown'],
  ['.vitepress/dist/about/index.html', '统一文章流'],
  ['.vitepress/dist/about/index.html', '源文档仍然保留'],
  ['.vitepress/dist/about/index.html', '现在的内容结构'],
  ['.vitepress/dist/index.html', '前端知识图谱'],
  ['.vitepress/dist/index.html', '前端面试题'],
  ['.vitepress/dist/index.html', '摄影记录'],
  ['.vitepress/dist/assets', '/GutEase/product'],
]

const forbiddenDistFiles = [
  '.vitepress/dist/summary/index.html',
  '.vitepress/dist/question/index.html',
  '.vitepress/dist/feMap/index.html',
  '.vitepress/dist/notes/index.html',
  '.vitepress/dist/photo/index.html',
  '.vitepress/dist/electron/index.html',
  '.vitepress/dist/tauri/index.html',
  '.vitepress/dist/GutEase/index.html',
  '.vitepress/dist/GutEase/product.html',
  '.vitepress/dist/GutEase/privacy.html',
  '.vitepress/dist/README.html',
  '.vitepress/dist/docs/superpowers/plans/2026-06-28-taotao-blog-hexo-flattening.html',
]

function fail(message) {
  console.error(message)
  process.exitCode = 1
}

function targetIncludes(target, expected) {
  const fullPath = resolve(root, target)

  if (!existsSync(fullPath)) {
    fail(`Missing build output: ${target}`)
    return false
  }

  if (target.endsWith('assets')) {
    return readdirSync(fullPath).some((file) => {
      const assetPath = resolve(fullPath, file)
      if (!file.endsWith('.css') && !file.endsWith('.js')) return false
      return readFileSync(assetPath, 'utf8').includes(expected)
    })
  }

  return readFileSync(fullPath, 'utf8').includes(expected)
}

for (const file of requiredFiles) {
  if (!existsSync(resolve(root, file))) {
    fail(`Missing required file: ${file}`)
  }
}

for (const [target, expected] of requiredDistChecks) {
  if (!targetIncludes(target, expected)) {
    fail(`${target} does not include marker: ${expected}`)
  }
}

for (const [target, forbidden] of forbiddenDistChecks) {
  if (targetIncludes(target, forbidden)) {
    fail(`${target} includes fake content marker: ${forbidden}`)
  }
}

for (const file of forbiddenDistFiles) {
  if (existsSync(resolve(root, file))) {
    fail(`Legacy build output should not exist: ${file}`)
  }
}

if (process.exitCode) {
  process.exit()
}

console.log('Design build checks passed.')
