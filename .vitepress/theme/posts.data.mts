import { execFileSync } from 'node:child_process'
import { existsSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Ref } from 'vue'
import { createContentLoader } from 'vitepress'

type Frontmatter = Record<string, unknown>

export type PostRecord = {
  id: string
  title: string
  excerpt: string
  date: string
  year: string
  href: string
  category: string
  tags: string[]
  source: string
}

export type ArchiveGroup = {
  year: string
  count: number
  posts: PostRecord[]
}

export type TaxonomyGroup = {
  name: string
  slug: string
  count: number
  posts: PostRecord[]
}

export type BlogData = {
  posts: PostRecord[]
  latestPosts: PostRecord[]
  archiveGroups: ArchiveGroup[]
  categoryGroups: TaxonomyGroup[]
  tagGroups: TaxonomyGroup[]
  postsByHref: Record<string, PostRecord>
  stats: {
    totalPosts: number
    totalCategories: number
    totalTags: number
  }
}

const ROOT = process.cwd()
const createdDateCache = new Map<string, string>()

const categoryRules = [
  {
    prefix: 'summary/electron/',
    category: '桌面开发',
    tags: ['Electron', '桌面应用'],
  },
  {
    prefix: 'summary/tauri/',
    category: '桌面开发',
    tags: ['Tauri', '桌面应用'],
  },
  {
    prefix: 'summary/practice/',
    category: '开发实战',
    tags: ['实战'],
  },
  {
    prefix: 'summary/terminal/',
    category: '开发实战',
    tags: ['Terminal'],
  },
  {
    prefix: 'question/javascript/',
    category: '前端面试',
    tags: ['JavaScript', '面试'],
  },
  {
    prefix: 'question/vue/',
    category: '前端面试',
    tags: ['Vue', '面试'],
  },
  {
    prefix: 'question/react/',
    category: '前端面试',
    tags: ['React', '面试'],
  },
  {
    prefix: 'question/network/',
    category: '前端面试',
    tags: ['网络', '面试'],
  },
  {
    prefix: 'question/sundry/',
    category: '前端面试',
    tags: ['前端', '面试'],
  },
  {
    prefix: 'feMap/browser/',
    category: '知识图谱',
    tags: ['浏览器', '知识图谱'],
  },
  {
    prefix: 'feMap/developMap/',
    category: '知识图谱',
    tags: ['工程化', '知识图谱'],
  },
] as const

function normalizeRelativePath(url: string) {
  return url.replace(/^\//, '').replace(/\/$/, '').replace(/\.html$/, '') + '.md'
}

function normalizeDate(value: unknown) {
  if (typeof value !== 'string') return null
  const normalized = value.trim().slice(0, 10)

  if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    return normalized
  }

  return null
}

function getCreatedDate(relativePath: string) {
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

function toExcerpt(source: string) {
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
    return '来自真实 Markdown 文档的整理记录。'
  }

  return plain.length > 92 ? `${plain.slice(0, 92).trim()}...` : plain
}

function extractHeading(source: string) {
  const body = source.replace(/^---[\s\S]*?---\s*/, '')
  const match = body.match(/^#\s+(.+)$/m)
  return match?.[1]?.trim() ?? null
}

function normalizeTags(frontmatter: Frontmatter) {
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

function inferCategory(relativePath: string, frontmatter: Frontmatter) {
  if (typeof frontmatter.category === 'string' && frontmatter.category.trim()) {
    return frontmatter.category.trim()
  }

  const matchedRule = categoryRules.find((rule) => relativePath.startsWith(rule.prefix))

  if (matchedRule) {
    return matchedRule.category
  }

  return '文章'
}

function inferKeywordTags(relativePath: string, title: string) {
  const value = `${relativePath} ${title}`.toLowerCase()
  const tags: string[] = []

  if (value.includes('electron')) tags.push('Electron')
  if (value.includes('tauri')) tags.push('Tauri')
  if (value.includes('react')) tags.push('React')
  if (value.includes('vue')) tags.push('Vue')
  if (value.includes('javascript') || value.includes('js')) tags.push('JavaScript')
  if (value.includes('node')) tags.push('Node.js')
  if (value.includes('rust')) tags.push('Rust')
  if (value.includes('sqlite')) tags.push('SQLite')
  if (value.includes('http')) tags.push('HTTP')
  if (value.includes('tcp') || value.includes('udp')) tags.push('网络')
  if (value.includes('i18n') || value.includes('国际化')) tags.push('国际化')
  if (value.includes('mac')) tags.push('macOS')
  if (value.includes('windows')) tags.push('Windows')

  return tags
}

function inferTags(relativePath: string, frontmatter: Frontmatter, title: string) {
  const matchedRule = categoryRules.find((rule) => relativePath.startsWith(rule.prefix))
  const tags = [
    ...normalizeTags(frontmatter),
    ...(matchedRule?.tags ?? []),
    ...inferKeywordTags(relativePath, title),
  ]

  return Array.from(new Set(tags)).filter(Boolean)
}

function toSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-\u4e00-\u9fa5]/g, '')
}

function buildTaxonomyGroups(posts: PostRecord[], key: 'category' | 'tags') {
  const bucket = new Map<string, PostRecord[]>()

  for (const post of posts) {
    const names = key === 'category' ? [post.category] : post.tags

    for (const name of names) {
      if (!bucket.has(name)) {
        bucket.set(name, [])
      }

      bucket.get(name)?.push(post)
    }
  }

  return Array.from(bucket.entries())
    .map(([name, groupedPosts]) => ({
      name,
      slug: toSlug(name),
      count: groupedPosts.length,
      posts: groupedPosts,
    }))
    .sort((left, right) => right.count - left.count || left.name.localeCompare(right.name, 'zh-Hans-CN'))
}

function buildArchiveGroups(posts: PostRecord[]) {
  const bucket = new Map<string, PostRecord[]>()

  for (const post of posts) {
    if (!bucket.has(post.year)) {
      bucket.set(post.year, [])
    }

    bucket.get(post.year)?.push(post)
  }

  return Array.from(bucket.entries())
    .sort(([leftYear], [rightYear]) => Number(rightYear) - Number(leftYear))
    .map(([year, groupedPosts]) => ({
      year,
      count: groupedPosts.length,
      posts: groupedPosts,
    }))
}

// Placeholder for TypeScript; VitePress replaces this module at build/dev time.
export const data = null as unknown as Ref<BlogData>

export default createContentLoader(['summary/**/*.md', 'question/**/*.md', 'feMap/**/*.md'], {
  includeSrc: true,
  globOptions: {
    ignore: ['**/index.md'],
  },
  transform(rawData): BlogData {
    const posts = rawData
      .filter((entry) => !['/summary/', '/question/', '/feMap/'].includes(entry.url))
      .map((entry) => {
        const relativePath = normalizeRelativePath(entry.url)
        const frontmatter = entry.frontmatter as Frontmatter
        const headingTitle = extractHeading(entry.src ?? '')
        const fallbackTitle = relativePath.split('/').pop()?.replace(/\.md$/, '') ?? relativePath
        const title =
          typeof frontmatter.title === 'string' && frontmatter.title.trim()
            ? frontmatter.title.trim()
            : headingTitle ?? fallbackTitle
        const date = normalizeDate(frontmatter.date) ?? getCreatedDate(relativePath)
        const category = inferCategory(relativePath, frontmatter)
        const tags = inferTags(relativePath, frontmatter, title)

        return {
          id: relativePath,
          title,
          excerpt: toExcerpt(entry.src ?? ''),
          date,
          year: date.slice(0, 4),
          href: entry.url,
          category,
          tags,
          source: relativePath,
        } satisfies PostRecord
      })
      .sort((left, right) => right.date.localeCompare(left.date) || left.title.localeCompare(right.title, 'zh-Hans-CN'))

    const categoryGroups = buildTaxonomyGroups(posts, 'category')
    const tagGroups = buildTaxonomyGroups(posts, 'tags')
    const featuredIds = ['summary/electron/talk_about_electron.md', 'summary/electron/why_choose_electron.md']
    const latestPosts = [
      ...featuredIds
        .map((id) => posts.find((post) => post.id === id))
        .filter((post): post is PostRecord => Boolean(post)),
      ...posts,
    ].filter((post, index, list) => list.findIndex((item) => item.id === post.id) === index)
    const postsByHref = Object.fromEntries(posts.map((post) => [post.href, post]))

    return {
      posts,
      latestPosts: latestPosts.slice(0, 8),
      archiveGroups: buildArchiveGroups(posts),
      categoryGroups,
      tagGroups,
      postsByHref,
      stats: {
        totalPosts: posts.length,
        totalCategories: categoryGroups.length,
        totalTags: tagGroups.length,
      },
    }
  },
})
