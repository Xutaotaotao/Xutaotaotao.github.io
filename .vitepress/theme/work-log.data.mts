import { createContentLoader } from 'vitepress'

export type WorkEntry = {
  id: string
  title: string
  date: string
  area: string
  focus: string
  tools: string[]
  href: string
  summary: string
  html: string
}

export type LocalizedWorkLog = {
  zh: WorkEntry[]
  en: WorkEntry[]
}

// VitePress replaces this export with the transformed content in dev and builds.
export const data = null as unknown as LocalizedWorkLog

function normalizeDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  const source = String(value ?? '')
  const date = new Date(/^\d{4}-\d{2}-\d{2}$/.test(source) ? `${source}T00:00:00.000Z` : source)
  return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 10)
}

export default createContentLoader(['work/**/*.md', 'en/work/**/*.md'], {
  includeSrc: true,
  render: true,
  globOptions: { ignore: ['**/index.md'] },
  transform(rawData): LocalizedWorkLog {
    const result: LocalizedWorkLog = { zh: [], en: [] }
    // VitePress can pass an explicit file list, bypassing globOptions.ignore.
    const sorted = rawData.filter(entry => !/^\/(?:en\/)?work\/(?:index(?:\.html)?)?$/.test(entry.url)).sort((a, b) => {
      const byDate = normalizeDate(b.frontmatter.date).localeCompare(normalizeDate(a.frontmatter.date))
      return byDate || Number(a.frontmatter.order ?? 0) - Number(b.frontmatter.order ?? 0) || a.url.localeCompare(b.url)
    })

    for (const entry of sorted) {
      const { frontmatter } = entry
      const locale = entry.url.startsWith('/en/') ? 'en' : 'zh'
      const href = entry.url.endsWith('.html') ? entry.url : `${entry.url.replace(/\/$/, '')}.html`
      result[locale].push({
        id: href.replace(/^\/(?:en\/)?work\//, '').replace(/\.html$/, ''),
        title: String(frontmatter.title ?? ''),
        date: normalizeDate(frontmatter.date),
        area: String(frontmatter.area ?? ''),
        focus: String(frontmatter.focus ?? ''),
        tools: Array.isArray(frontmatter.tools) ? frontmatter.tools.map(String) : [],
        href,
        summary: String(frontmatter.description ?? ''),
        html: entry.html ?? '',
      })
    }

    return result
  },
})
