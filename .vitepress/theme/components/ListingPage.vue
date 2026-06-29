<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useData } from 'vitepress'
import { type Language } from '../content'
import { data as blog } from '../posts.data.mts'

type PageKind = 'archive' | 'categories' | 'tags' | 'about'

const { frontmatter } = useData()
const lang = ref<Language>('zh')
const archiveCategoryFilter = ref('')
const archiveTagFilter = ref('')
const selectedTaxonomySlug = ref('')

const pageKind = computed(() => (frontmatter.value.kind as PageKind | undefined) ?? 'archive')
const pageTitle = computed(() => String(frontmatter.value.title ?? ''))

const pageCopy = computed(() => {
  switch (pageKind.value) {
    case 'categories':
      return {
        label: '/categories',
        intro:
          lang.value === 'zh'
            ? '按主题查看所有文章，目录只是来源，分类才是阅读入口。'
            : 'Browse posts by the themes behind the writing.',
      }
    case 'tags':
      return {
        label: '/tags',
        intro:
          lang.value === 'zh'
            ? '标签用于串起技术栈、场景和长期关注的问题。'
            : 'Tags connect stacks, scenarios, and long-running questions.',
      }
    case 'about':
      return {
        label: '/about',
        intro:
          lang.value === 'zh'
            ? 'A developer who cares about how things feel.'
            : 'A developer who cares about how things feel.',
      }
    default:
      return {
        label: '/archive',
        intro:
          lang.value === 'zh'
            ? '所有文章按时间归档，读者可以先按年份浏览，再回到分类和标签继续筛选。'
            : 'Every post in one timeline, grouped by year.',
      }
  }
})

const taxonomyGroups = computed(() =>
  pageKind.value === 'categories' ? blog.categoryGroups : blog.tagGroups,
)

const taxonomySummary = computed(() => taxonomyGroups.value.slice(0, pageKind.value === 'tags' ? 18 : undefined))
const selectedTaxonomyGroup = computed(() => {
  const currentGroups = taxonomyGroups.value

  if (!currentGroups.length) return null

  return currentGroups.find((group) => group.slug === selectedTaxonomySlug.value) ?? null
})

const filteredPosts = computed(() => {
  if (!archiveCategoryFilter.value && !archiveTagFilter.value) {
    return blog.posts
  }

  return blog.posts.filter((post) => {
    const categoryMatched = !archiveCategoryFilter.value || post.category === archiveCategoryFilter.value
    const tagMatched = !archiveTagFilter.value || post.tags.includes(archiveTagFilter.value)
    return categoryMatched && tagMatched
  })
})

const archiveGroups = computed(() => {
  const bucket = new Map<string, typeof filteredPosts.value>()

  for (const post of filteredPosts.value) {
    if (!bucket.has(post.year)) {
      bucket.set(post.year, [])
    }

    bucket.get(post.year)?.push(post)
  }

  return Array.from(bucket.entries())
    .sort(([leftYear], [rightYear]) => Number(rightYear) - Number(leftYear))
    .map(([year, posts]) => ({
      year,
      count: posts.length,
      posts,
    }))
})

const archiveHeading = computed(() => {
  if (archiveCategoryFilter.value) {
    return {
      title: archiveCategoryFilter.value,
      intro: lang.value === 'zh' ? `分类下共 ${filteredPosts.value.length} 篇文章` : `${filteredPosts.value.length} posts in this category`,
    }
  }

  if (archiveTagFilter.value) {
    return {
      title: `# ${archiveTagFilter.value}`,
      intro: lang.value === 'zh' ? `标签下共 ${filteredPosts.value.length} 篇文章` : `${filteredPosts.value.length} posts with this tag`,
    }
  }

  return {
    title: pageTitle.value,
    intro: pageCopy.value.intro,
  }
})

function syncArchiveFilter() {
  if (typeof window === 'undefined') return

  const params = new URLSearchParams(window.location.search)
  archiveCategoryFilter.value = params.get('category') ?? ''
  archiveTagFilter.value = params.get('tag') ?? ''
}

function selectTaxonomy(slug: string) {
  selectedTaxonomySlug.value = slug
}

function syncLanguage(event?: Event) {
  if (event) {
    lang.value = (event as CustomEvent<Language>).detail
    return
  }

  const savedLang = localStorage.getItem('taotao-lang')
  lang.value = savedLang === 'en' ? 'en' : 'zh'
}

onMounted(() => {
  syncLanguage()
  syncArchiveFilter()
  window.addEventListener('taotao:lang', syncLanguage)
})

onUnmounted(() => {
  window.removeEventListener('taotao:lang', syncLanguage)
})
</script>

<template>
  <main class="craft-main craft-page">
    <div class="craft-page-heading">
      <p class="craft-page-label">{{ pageCopy.label }}</p>
      <h1>{{ pageKind === 'archive' ? archiveHeading.title : pageTitle }}</h1>
      <p>{{ pageKind === 'archive' ? archiveHeading.intro : pageCopy.intro }}</p>
    </div>

    <div v-if="pageKind === 'archive'" class="craft-archive">
      <section
        v-for="group in archiveGroups"
        :key="group.year"
        class="craft-archive-group"
      >
        <div class="craft-archive-year">
          <h2>{{ group.year }}</h2>
          <span>{{ group.count }} 篇</span>
        </div>

        <div class="craft-entry-list craft-archive-list">
          <a
            v-for="post in group.posts"
            :key="post.id"
            class="craft-entry"
            :href="post.href"
          >
            <span class="craft-entry-main">
              <strong>{{ post.title }}</strong>
              <small>{{ post.excerpt }}</small>
              <span class="craft-entry-tags">
                <span
                  v-for="tag in post.tags.slice(0, 3)"
                  :key="tag"
                  class="craft-chip"
                >
                  {{ tag }}
                </span>
              </span>
            </span>
            <span class="craft-entry-category">{{ post.category }}</span>
            <span class="craft-entry-date">{{ post.date }}</span>
          </a>
        </div>
      </section>
    </div>

    <div v-else-if="pageKind === 'about'" class="craft-about">
      <p>
        {{
          lang === 'zh'
            ? '我是前端徐徐，长期关注前端工程、桌面端应用、产品化工具和有耐心的用户体验。'
            : 'I focus on frontend engineering, desktop apps, productized tools, and patient user experiences.'
        }}
      </p>
      <p>
        {{
          lang === 'zh'
            ? '我擅长 React、Vue、Electron、Tauri、Node.js 与 Rust 周边工程实践，也喜欢把真实项目里的取舍整理成文章。'
            : 'I work with React, Vue, Electron, Tauri, Node.js, and the Rust-adjacent parts of desktop engineering.'
        }}
      </p>

      <div class="craft-about-grid">
        <article class="craft-about-card">
          <span>Posts</span>
          <strong>{{ blog.stats.totalPosts }}</strong>
          <p>{{ lang === 'zh' ? '已整理文章' : 'Published notes' }}</p>
        </article>
        <article class="craft-about-card">
          <span>Categories</span>
          <strong>{{ blog.stats.totalCategories }}</strong>
          <p>{{ lang === 'zh' ? '主题方向' : 'Core themes' }}</p>
        </article>
        <article class="craft-about-card">
          <span>Tags</span>
          <strong>{{ blog.stats.totalTags }}</strong>
          <p>{{ lang === 'zh' ? '技术标签' : 'Technical tags' }}</p>
        </article>
      </div>

      <h2>{{ lang === 'zh' ? '正在关注' : 'Currently' }}</h2>
      <p>
        {{
          lang === 'zh'
            ? '正在持续整理桌面端工程实践、前端知识图谱和一些产品化工具，也记录摄影、户外和生活里的光线。'
            : 'I am continuing to organize desktop engineering practice, frontend knowledge maps, and productized tools, with occasional notes on photography, outdoor time, and daily light.'
        }}
      </p>

      <h2>{{ lang === 'zh' ? '联系与入口' : 'Contact and links' }}</h2>
      <p>
        GitHub:
        <a href="https://github.com/Xutaotaotao" target="_blank" rel="noreferrer">Xutaotaotao</a>
        ·
        <a href="/archive/">{{ lang === 'zh' ? '查看归档' : 'Open archive' }}</a>
        ·
        <a href="/tags/">{{ lang === 'zh' ? '查看标签' : 'Browse tags' }}</a>
      </p>
    </div>

    <div v-else class="craft-taxonomy-page craft-taxonomy-page-compact">
      <section class="craft-taxonomy craft-taxonomy-panel craft-taxonomy-summary">
        <div v-if="pageKind === 'categories'" class="craft-taxonomy-list">
          <button
            v-for="group in taxonomySummary"
            :key="group.name"
            type="button"
            class="craft-taxonomy-item"
            :class="{ active: selectedTaxonomyGroup?.slug === group.slug }"
            @click="selectTaxonomy(group.slug)"
          >
            <span class="craft-taxonomy-name">{{ group.name }}</span>
            <span class="craft-taxonomy-count">{{ group.count }}</span>
          </button>
        </div>

        <div v-else class="craft-tag-cloud">
          <button
            v-for="group in taxonomySummary"
            :key="group.name"
            type="button"
            class="craft-chip craft-chip-link craft-chip-large"
            :class="{ active: selectedTaxonomyGroup?.slug === group.slug }"
            @click="selectTaxonomy(group.slug)"
          >
            {{ group.name }} <span>{{ group.count }}</span>
          </button>
        </div>

        <section
          v-if="selectedTaxonomyGroup"
          class="craft-taxonomy-detail"
          :aria-label="selectedTaxonomyGroup.name"
        >
          <header class="craft-taxonomy-detail-heading">
            <div>
              <h2>{{ selectedTaxonomyGroup.name }}</h2>
              <p>
                {{
                  lang === 'zh'
                    ? `共 ${selectedTaxonomyGroup.count} 篇文章`
                    : `${selectedTaxonomyGroup.count} posts`
                }}
              </p>
            </div>
          </header>

          <div class="craft-entry-list craft-taxonomy-posts">
            <a
              v-for="post in selectedTaxonomyGroup.posts"
              :key="post.id"
              class="craft-entry"
              :href="post.href"
            >
              <span class="craft-entry-main">
                <strong>{{ post.title }}</strong>
              </span>
            </a>
          </div>
        </section>

        <div class="craft-section-link">
          <a href="/archive/">{{ lang === 'zh' ? '浏览全部文章' : 'Browse all posts' }}</a>
        </div>
      </section>
    </div>
  </main>
</template>
