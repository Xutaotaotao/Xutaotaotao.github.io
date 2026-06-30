<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { navLabels } from '../content'
import { data as blog } from '../posts.data.mts'
import { useSiteLocale } from '../composables/useSiteLocale'

const route = useRoute()
const { lang } = useSiteLocale()
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
const currentPost = computed(() => localizedBlog.value.postsByHref[route.path] ?? null)
const labels = computed(() => navLabels[lang.value])
</script>

<template>
  <div v-if="currentPost" class="craft-article-meta">
    <div class="craft-article-meta-main">
      <span class="craft-article-eyebrow">{{ labels.articleCategory }}</span>
      <strong>{{ currentPost.category }}</strong>
      <time :datetime="currentPost.date">{{ currentPost.date }}</time>
    </div>

    <div class="craft-entry-tags craft-article-tags">
      <span
        v-for="tag in currentPost.tags"
        :key="tag"
        class="craft-chip"
      >
        {{ tag }}
      </span>
    </div>
  </div>
</template>
