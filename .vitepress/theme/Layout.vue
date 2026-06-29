<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { computed } from 'vue'
import { useData } from 'vitepress'
import SiteFooter from './components/SiteFooter.vue'
import SiteNav from './components/SiteNav.vue'
import HomeView from './components/HomeView.vue'
import ListingPage from './components/ListingPage.vue'
import ArticleMeta from './components/ArticleMeta.vue'

const { frontmatter } = useData()

const layout = computed(() => frontmatter.value.layout)
const isCustomPage = computed(() => ['home', 'listing'].includes(layout.value))
</script>

<template>
  <div class="craft-shell">
    <SiteNav />
    <HomeView v-if="layout === 'home'" />
    <ListingPage v-else-if="layout === 'listing'" />
    <DefaultTheme.Layout v-else>
      <template #doc-before>
        <ArticleMeta />
      </template>
    </DefaultTheme.Layout>
    <SiteFooter />
  </div>
</template>
