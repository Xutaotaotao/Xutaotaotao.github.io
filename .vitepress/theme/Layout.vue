<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { computed, defineAsyncComponent, onMounted } from 'vue'
import { useData } from 'vitepress'
import SiteFooter from './components/SiteFooter.vue'
import SiteNav from './components/SiteNav.vue'
import HomeView from './components/HomeView.vue'
import PageSkeleton from './components/PageSkeleton.vue'
import { dismissAppSplash } from './lib/app-splash.mjs'

const ListingPage = defineAsyncComponent({
  loader: () => import('./components/ListingPage.vue'),
  suspensible: true,
})
const AboutView = defineAsyncComponent({
  loader: () => import('./components/AboutView.vue'),
  suspensible: true,
})
const ArticleMeta = defineAsyncComponent(() => import('./components/ArticleMeta.vue'))

const { frontmatter } = useData()

const layout = computed(() => frontmatter.value.layout)

onMounted(() => {
  dismissAppSplash()
})
</script>

<template>
  <div class="craft-shell">
    <SiteNav />
    <HomeView v-if="layout === 'home'" />
    <Suspense v-else-if="layout === 'listing'">
      <ListingPage />
      <template #fallback>
        <PageSkeleton variant="listing" />
      </template>
    </Suspense>
    <Suspense v-else-if="layout === 'about'">
      <AboutView />
      <template #fallback>
        <PageSkeleton variant="about" />
      </template>
    </Suspense>
    <DefaultTheme.Layout v-else>
      <template #doc-before>
        <ArticleMeta />
      </template>
    </DefaultTheme.Layout>
    <SiteFooter />
  </div>
</template>
