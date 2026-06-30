import { execFileSync } from 'node:child_process'
import { existsSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { getLocaleFromPath, stripLocalePrefix, withLocale } from './site-locale.mjs'

const ROOT = process.cwd()
const createdDateCache = new Map()

const categoryRules = [
  {
    prefix: 'summary/electron/',
    category: { zh: '桌面开发', en: 'Desktop Development' },
    tags: { zh: ['Electron', '桌面应用'], en: ['Electron', 'Desktop Apps'] },
  },
  {
    prefix: 'summary/tauri/',
    category: { zh: '桌面开发', en: 'Desktop Development' },
    tags: { zh: ['Tauri', '桌面应用'], en: ['Tauri', 'Desktop Apps'] },
  },
  {
    prefix: 'summary/practice/',
    category: { zh: '开发实战', en: 'Engineering Practice' },
    tags: { zh: ['实战'], en: ['Practice'] },
  },
  {
    prefix: 'summary/terminal/',
    category: { zh: '开发实战', en: 'Engineering Practice' },
    tags: { zh: ['Terminal'], en: ['Terminal'] },
  },
  {
    prefix: 'question/javascript/',
    category: { zh: '前端面试', en: 'Frontend Interview' },
    tags: { zh: ['JavaScript', '面试'], en: ['JavaScript', 'Interview'] },
  },
  {
    prefix: 'question/vue/',
    category: { zh: '前端面试', en: 'Frontend Interview' },
    tags: { zh: ['Vue', '面试'], en: ['Vue', 'Interview'] },
  },
  {
    prefix: 'question/react/',
    category: { zh: '前端面试', en: 'Frontend Interview' },
    tags: { zh: ['React', '面试'], en: ['React', 'Interview'] },
  },
  {
    prefix: 'question/network/',
    category: { zh: '前端面试', en: 'Frontend Interview' },
    tags: { zh: ['网络', '面试'], en: ['Network', 'Interview'] },
  },
  {
    prefix: 'question/sundry/',
    category: { zh: '前端面试', en: 'Frontend Interview' },
    tags: { zh: ['前端', '面试'], en: ['Frontend', 'Interview'] },
  },
  {
    prefix: 'feMap/browser/',
    category: { zh: '知识图谱', en: 'Knowledge Map' },
    tags: { zh: ['浏览器', '知识图谱'], en: ['Browser', 'Knowledge Map'] },
  },
  {
    prefix: 'feMap/developMap/',
    category: { zh: '知识图谱', en: 'Knowledge Map' },
    tags: { zh: ['工程化', '知识图谱'], en: ['Engineering', 'Knowledge Map'] },
  },
  {
    prefix: 'notes/',
    category: { zh: '随笔', en: 'Notes' },
    tags: { zh: ['随笔'], en: ['Notes'] },
  },
]

const staticPagePrefixes = [
  '/GutEase/',
  '/en/GutEase/',
]

const staticPageExactUrls = new Set([
  '/summary/',
  '/question/',
  '/feMap/',
  '/notes/',
  '/en/summary/',
  '/en/question/',
  '/en/feMap/',
  '/en/notes/',
  '/electron/',
  '/tauri/',
  '/photo/',
  '/en/electron/',
  '/en/tauri/',
  '/en/photo/',
  '/README.html',
  '/en/README.html',
  '/electron/index.html',
  '/tauri/index.html',
  '/photo/index.html',
  '/en/electron/index.html',
  '/en/tauri/index.html',
  '/en/photo/index.html',
])

function isStaticPageUrl(url) {
  if (staticPageExactUrls.has(url)) {
    return true
  }

  return staticPagePrefixes.some((prefix) => url.startsWith(prefix))
}

function normalizeRelativePath(url) {
  return stripLocalePrefix(url).replace(/^\//, '').replace(/\/$/, '').replace(/\.html$/, '') + '.md'
}

function normalizeDate(value) {
  if (typeof value !== 'string') return null
  const normalized = value.trim().slice(0, 10)
  return /^\d{4}-\d{2}-\d{2}$/.test(normalized) ? normalized : null
}

function defaultGetCreatedDate(relativePath) {
  const cached = createdDateCache.get(relativePath)

  if (cached) {
    return cached
  }

  try {
    const output = execFileSync('git', ['log', '--follow', '--format=%cs', '--', relativePath], {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .trim()
      .split('\n')
      .filter(Boolean)

    const firstCommitDate = output.at(-1)

    if (firstCommitDate) {
      createdDateCache.set(relativePath, firstCommitDate)
      return firstCommitDate
    }
  } catch {}

  const absolutePath = resolve(ROOT, relativePath)

  if (existsSync(absolutePath)) {
    const fallback = new Date(statSync(absolutePath).mtimeMs).toISOString().slice(0, 10)
    createdDateCache.set(relativePath, fallback)
    return fallback
  }

  return '2024-01-01'
}

function toExcerpt(source, locale) {
  const plain = source
    .replace(/^---[\s\S]*?---\s*/, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/[>*_~|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (!plain) {
    return locale === 'en'
      ? 'Curated notes from real Markdown documents.'
      : '来自真实 Markdown 文档的整理记录。'
  }

  return plain.length > 108 ? `${plain.slice(0, 108).trim()}...` : plain
}

function extractHeading(source) {
  const body = source.replace(/^---[\s\S]*?---\s*/, '')
  const match = body.match(/^#\s+(.+)$/m)
  return match?.[1]?.trim() ?? null
}

function normalizeTags(frontmatter) {
  const rawTags = frontmatter.tags

  if (Array.isArray(rawTags)) {
    return rawTags.map((item) => String(item).trim()).filter(Boolean)
  }

  if (typeof rawTags === 'string') {
    return rawTags
      .split(/[,\u3001\uff0c|/]/)
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return []
}

function inferCategory(relativePath, frontmatter, locale) {
  if (typeof frontmatter.category === 'string' && frontmatter.category.trim()) {
    return frontmatter.category.trim()
  }

  const matchedRule = categoryRules.find((rule) => relativePath.startsWith(rule.prefix))

  if (matchedRule) {
    return matchedRule.category[locale]
  }

  return locale === 'en' ? 'Articles' : '文章'
}

function inferKeywordTags(relativePath, title, locale) {
  const value = `${relativePath} ${title}`.toLowerCase()
  const tags = []

  if (value.includes('electron')) tags.push('Electron')
  if (value.includes('tauri')) tags.push('Tauri')
  if (value.includes('react')) tags.push('React')
  if (value.includes('vue')) tags.push('Vue')
  if (value.includes('javascript') || value.includes('js')) tags.push('JavaScript')
  if (value.includes('node')) tags.push('Node.js')
  if (value.includes('rust')) tags.push('Rust')
  if (value.includes('sqlite')) tags.push('SQLite')
  if (value.includes('http')) tags.push('HTTP')
  if (value.includes('tcp') || value.includes('udp')) tags.push(locale === 'en' ? 'Network' : '网络')
  if (value.includes('i18n') || value.includes('国际化') || value.includes('internationalization')) {
    tags.push(locale === 'en' ? 'i18n' : '国际化')
  }
  if (value.includes('mac')) tags.push('macOS')
  if (value.includes('windows')) tags.push('Windows')

  return tags
}

function inferTags(relativePath, frontmatter, title, locale) {
  const matchedRule = categoryRules.find((rule) => relativePath.startsWith(rule.prefix))
  const tags = [
    ...normalizeTags(frontmatter),
    ...(matchedRule?.tags[locale] ?? []),
    ...inferKeywordTags(relativePath, title, locale),
  ]

  return Array.from(new Set(tags)).filter(Boolean)
}

function toSlug(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-\u4e00-\u9fa5]/g, '')
}

function buildTaxonomyGroups(posts, key, locale) {
  const bucket = new Map()

  for (const post of posts) {
    const names = key === 'category' ? [post.category] : post.tags

    for (const name of names) {
      if (!bucket.has(name)) {
        bucket.set(name, [])
      }

      bucket.get(name).push(post)
    }
  }

  return Array.from(bucket.entries())
    .map(([name, groupedPosts]) => ({
      name,
      slug: toSlug(name),
      count: groupedPosts.length,
      posts: groupedPosts,
    }))
    .sort((left, right) => right.count - left.count || left.name.localeCompare(right.name, locale === 'en' ? 'en' : 'zh-Hans-CN'))
}

function buildArchiveGroups(posts) {
  const bucket = new Map()

  for (const post of posts) {
    if (!bucket.has(post.year)) {
      bucket.set(post.year, [])
    }

    bucket.get(post.year).push(post)
  }

  return Array.from(bucket.entries())
    .sort(([leftYear], [rightYear]) => Number(rightYear) - Number(leftYear))
    .map(([year, groupedPosts]) => ({
      year,
      count: groupedPosts.length,
      posts: groupedPosts,
    }))
}

function buildEmptyBlogData() {
  return {
    posts: [],
    latestPosts: [],
    archiveGroups: [],
    categoryGroups: [],
    tagGroups: [],
    postsByHref: {},
    postsBySource: {},
    stats: {
      totalPosts: 0,
      totalCategories: 0,
      totalTags: 0,
    },
  }
}

function toPostRecord(entry, locale, getCreatedDate) {
  const relativePath = normalizeRelativePath(entry.url)
  const frontmatter = entry.frontmatter ?? {}
  const headingTitle = extractHeading(entry.src ?? '')
  const fallbackTitle = relativePath.split('/').pop()?.replace(/\.md$/, '') ?? relativePath
  const title =
    typeof frontmatter.title === 'string' && frontmatter.title.trim()
      ? frontmatter.title.trim()
      : headingTitle ?? fallbackTitle
  const date = normalizeDate(frontmatter.date) ?? getCreatedDate(relativePath)
  const category = inferCategory(relativePath, frontmatter, locale)
  const tags = inferTags(relativePath, frontmatter, title, locale)

  return {
    id: `${locale}:${relativePath}`,
    locale,
    title,
    excerpt: toExcerpt(entry.src ?? '', locale),
    date,
    year: date.slice(0, 4),
    href: entry.url,
    category,
    tags,
    source: relativePath,
  }
}

function buildLocaleBlogData(posts, locale) {
  if (!posts.length) {
    return buildEmptyBlogData()
  }

  const sortedPosts = [...posts].sort((left, right) => right.date.localeCompare(left.date) || left.title.localeCompare(right.title, locale === 'en' ? 'en' : 'zh-Hans-CN'))
  const categoryGroups = buildTaxonomyGroups(sortedPosts, 'category', locale)
  const tagGroups = buildTaxonomyGroups(sortedPosts, 'tags', locale)

  return {
    posts: sortedPosts,
    latestPosts: sortedPosts.slice(0, 8),
    archiveGroups: buildArchiveGroups(sortedPosts),
    categoryGroups,
    tagGroups,
    postsByHref: Object.fromEntries(sortedPosts.map((post) => [post.href, post])),
    postsBySource: Object.fromEntries(sortedPosts.map((post) => [post.source, post])),
    stats: {
      totalPosts: sortedPosts.length,
      totalCategories: categoryGroups.length,
      totalTags: tagGroups.length,
    },
  }
}

export function buildBlogIndexByLocale(rawData, options = {}) {
  const getCreatedDate = options.getCreatedDate ?? defaultGetCreatedDate
  const localeBuckets = {
    zh: [],
    en: [],
  }

  for (const entry of rawData) {
    if (isStaticPageUrl(entry.url)) {
      continue
    }

    const locale = getLocaleFromPath(entry.url)
    localeBuckets[locale].push(toPostRecord(entry, locale, getCreatedDate))
  }

  return {
    zh: buildLocaleBlogData(localeBuckets.zh, 'zh'),
    en: buildLocaleBlogData(localeBuckets.en, 'en'),
  }
}
