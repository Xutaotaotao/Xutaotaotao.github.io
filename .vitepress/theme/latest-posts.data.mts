import { createContentLoader } from 'vitepress'
import { buildBlogIndexByLocale } from './lib/blog-data.mjs'
import type { PostRecord } from './posts.data.mts'

export type LatestPostsData = {
  zh: { latestPosts: PostRecord[] }
  en: { latestPosts: PostRecord[] }
}

// Placeholder for TypeScript; VitePress replaces this module at build/dev time.
export const data = null as unknown as LatestPostsData

const articleGlob = ['summary/**/*.md', 'question/**/*.md', 'feMap/**/*.md', 'notes/**/*.md', 'en/**/*.md']

const ignoredPaths = [
  '**/index.md',
  'README.md',
  'en/index.md',
  'en/archive/index.md',
  'en/categories/index.md',
  'en/tags/index.md',
  'en/about/index.md',
  'work/**/*.md',
  'en/work/**/*.md',
  'GutEase/**/*.md',
  'en/GutEase/**/*.md',
  'electron/index.md',
  'tauri/index.md',
  'photo/index.md',
  'en/electron/index.md',
  'en/tauri/index.md',
  'en/photo/index.md',
]

export default createContentLoader(articleGlob, {
  includeSrc: true,
  globOptions: { ignore: ignoredPaths },
  transform(rawData): LatestPostsData {
    const full = buildBlogIndexByLocale(rawData)
    return {
      zh: { latestPosts: full.zh.latestPosts },
      en: { latestPosts: full.en.latestPosts },
    }
  },
})
