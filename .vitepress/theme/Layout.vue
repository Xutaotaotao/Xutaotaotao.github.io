<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { computed, defineAsyncComponent } from 'vue'
import { useData } from 'vitepress'
import SiteFooter from './components/SiteFooter.vue'
import SiteNav from './components/SiteNav.vue'

const HomeView = defineAsyncComponent(() => import('./components/HomeView.vue'))
const ListingPage = defineAsyncComponent(() => import('./components/ListingPage.vue'))
const AboutView = defineAsyncComponent(() => import('./components/AboutView.vue'))
const ArticleMeta = defineAsyncComponent(() => import('./components/ArticleMeta.vue'))

const { frontmatter } = useData()

const layout = computed(() => frontmatter.value.layout)
const isCustomPage = computed(() => ['home', 'listing', 'about'].includes(layout.value))
</script>

<template>
  <div class="craft-shell">
    <SiteNav />
    <HomeView v-if="layout === 'home'" />
    <ListingPage v-else-if="layout === 'listing'" />
    <AboutView v-else-if="layout === 'about'" />
    <DefaultTheme.Layout v-else>
      <template #doc-before>
        <ArticleMeta />
      </template>
    </DefaultTheme.Layout>
    <SiteFooter />
  </div>
</template>
