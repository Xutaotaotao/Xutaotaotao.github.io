<script setup lang="ts">
import { onMounted, ref } from 'vue'
import VPNavBarSearch from 'vitepress/dist/client/theme-default/components/VPNavBarSearch.vue'

const ready = ref(false)

onMounted(() => {
  const mountSearch = () => {
    ready.value = true
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(mountSearch, { timeout: 2500 })
    return
  }

  setTimeout(mountSearch, 1200)
})
</script>

<template>
  <div class="craft-nav-search">
    <VPNavBarSearch v-if="ready" />
  </div>
</template>
