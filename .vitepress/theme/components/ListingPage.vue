<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'
import { copy, type Language } from '../content'
import { data as blog } from '../posts.data.mts'
import { useSiteLocale } from '../composables/useSiteLocale'

type PageKind = 'archive' | 'categories' | 'tags' | 'about'

const { frontmatter } = useData()
const { lang, localizedPath } = useSiteLocale()
const archiveCategoryFilter = ref('')
const archiveTagFilter = ref('')
const selectedTaxonomySlug = ref('')

const pageKind = computed(() => (frontmatter.value.kind as PageKind | undefined) ?? 'archive')
const pageTitle = computed(() => String(frontmatter.value.title ?? ''))
const localizedBlog = computed(() => blog?.[lang.value] ?? blog?.zh ?? {
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
})

const pageCopy = computed(() => {
  switch (pageKind.value) {
    case 'categories':
      return {
        label: localizedPath('/categories/'),
        intro:
          lang.value === 'zh'
            ? copy.zh.categoriesIntro
            : copy.en.categoriesIntro,
      }
    case 'tags':
      return {
        label: localizedPath('/tags/'),
        intro:
          lang.value === 'zh'
            ? copy.zh.tagsIntro
            : copy.en.tagsIntro,
      }
    case 'about':
      return {
        label: localizedPath('/about/'),
        intro:
          lang.value === 'zh'
            ? '一个在意体验、工程质量与长期产品感受的开发者。'
            : 'A developer who cares about how things feel.',
      }
    default:
      return {
        label: localizedPath('/archive/'),
        intro:
          lang.value === 'zh'
            ? copy.zh.latestIntro
            : copy.en.latestIntro,
      }
  }
})

const taxonomyGroups = computed(() =>
  pageKind.value === 'categories' ? localizedBlog.value.categoryGroups : localizedBlog.value.tagGroups,
)

const taxonomySummary = computed(() => taxonomyGroups.value.slice(0, pageKind.value === 'tags' ? 18 : undefined))
const selectedTaxonomyGroup = computed(() => {
  const currentGroups = taxonomyGroups.value

  if (!currentGroups.length) return null

  return currentGroups.find((group) => group.slug === selectedTaxonomySlug.value) ?? null
})

const filteredPosts = computed(() => {
  if (!archiveCategoryFilter.value && !archiveTagFilter.value) {
    return localizedBlog.value.posts
  }

  return localizedBlog.value.posts.filter((post) => {
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
      intro: copy[lang.value].categoryPostsCount(filteredPosts.value.length),
    }
  }

  if (archiveTagFilter.value) {
    return {
      title: `# ${archiveTagFilter.value}`,
      intro: copy[lang.value].tagPostsCount(filteredPosts.value.length),
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
syncArchiveFilter()
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
          <span>{{ group.count }} {{ copy[lang].archiveCountSuffix }}</span>
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
                <span class="craft-chip craft-chip-date">{{ post.date }}</span>
              </span>
            </span>
          </a>
        </div>
      </section>
    </div>

    <div v-else-if="pageKind === 'about'" class="craft-about">
      <p>
        {{ copy[lang].aboutIntro }}
      </p>
      <p>
        {{ copy[lang].aboutSkills }}
      </p>

      <div class="craft-about-grid">
        <article class="craft-about-card">
          <span>{{ copy[lang].aboutPublishedLabel }}</span>
          <strong>{{ localizedBlog.stats.totalPosts }}</strong>
          <p>{{ copy[lang].aboutPublished }}</p>
        </article>
        <article class="craft-about-card">
          <span>{{ copy[lang].aboutThemesLabel }}</span>
          <strong>{{ localizedBlog.stats.totalCategories }}</strong>
          <p>{{ copy[lang].aboutThemes }}</p>
        </article>
        <article class="craft-about-card">
          <span>{{ copy[lang].aboutTagsLabel }}</span>
          <strong>{{ localizedBlog.stats.totalTags }}</strong>
          <p>{{ copy[lang].aboutTags }}</p>
        </article>
      </div>

      <h2>{{ copy[lang].aboutCurrentTitle }}</h2>
      <p>{{ copy[lang].aboutCurrentText }}</p>

      <h2>{{ copy[lang].aboutLinksTitle }}</h2>
      <p>
        GitHub:
        <a href="https://github.com/Xutaotaotao" target="_blank" rel="noreferrer">Xutaotaotao</a>
        ·
        <a :href="localizedPath('/archive/')">{{ copy[lang].openArchive }}</a>
        ·
        <a :href="localizedPath('/tags/')">{{ copy[lang].browseTags }}</a>
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
                {{ copy[lang].selectedTaxonomyCount(selectedTaxonomyGroup.count) }}
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
          <a :href="localizedPath('/archive/')">{{ copy[lang].browseAllPosts }}</a>
        </div>
      </section>
    </div>
  </main>
</template>
