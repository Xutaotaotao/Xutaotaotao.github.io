<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { data as blog } from '../posts.data.mts'

const route = useRoute()

const currentPost = computed(() => blog.postsByHref[route.path] ?? null)
</script>

<template>
  <div v-if="currentPost" class="craft-article-meta">
    <div class="craft-article-meta-main">
      <span class="craft-article-eyebrow">分类</span>
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
