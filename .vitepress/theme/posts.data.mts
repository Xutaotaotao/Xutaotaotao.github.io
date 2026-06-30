import { createContentLoader } from 'vitepress'
import { buildBlogIndexByLocale } from './lib/blog-data.mjs'

export type PostRecord = {
  id: string
  locale: 'zh' | 'en'
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
  postsBySource: Record<string, PostRecord>
  stats: {
    totalPosts: number
    totalCategories: number
    totalTags: number
  }
}

export type LocalizedBlogData = {
  zh: BlogData
  en: BlogData
}

// Placeholder for TypeScript; VitePress replaces this module at build/dev time.
export const data = null as unknown as LocalizedBlogData

export default createContentLoader(
  ['summary/**/*.md', 'question/**/*.md', 'feMap/**/*.md', 'notes/**/*.md', 'en/**/*.md'],
  {
    includeSrc: true,
    globOptions: {
      ignore: [
        '**/index.md',
        'README.md',
        'en/index.md',
        'en/archive/index.md',
        'en/categories/index.md',
        'en/tags/index.md',
        'en/about/index.md',
        'GutEase/**/*.md',
        'en/GutEase/**/*.md',
        'electron/index.md',
        'tauri/index.md',
        'photo/index.md',
        'en/electron/index.md',
        'en/tauri/index.md',
        'en/photo/index.md',
      ],
    },
    transform(rawData): LocalizedBlogData {
      return buildBlogIndexByLocale(rawData)
    },
  },
)
