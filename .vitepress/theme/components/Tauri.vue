<script setup lang="ts">
import { computed } from 'vue'
import { useSiteLocale } from '../composables/useSiteLocale'

const { lang } = useSiteLocale()

const copy = computed(() => (
  lang.value === 'en'
    ? {
        title: 'Tauri Article Collection',
        intro: 'These Tauri notes were also first organized as a WeChat article album, so the external collection remains Chinese.',
        note: 'For bilingual reading, use the mirrored article pages that are already integrated into the archive of this site.',
        primary: 'Open Archive',
        archiveHref: '/en/archive/',
        secondary: 'Open Original Album',
        albumHref: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkwOTUyMzc1NA==&action=getalbum&album_id=3505334719489900558&scene=126#wechat_redirect',
      }
    : {
        title: 'Tauri 文章合集',
        intro: '这组 Tauri 文章最早也是整理在微信公众号专栏里，所以外链合集仍然是中文原始内容。',
        note: '如果要按本站的双语路径阅读，请优先使用已经接入归档页的镜像文章。',
        primary: '查看归档',
        archiveHref: '/archive/',
        secondary: '打开原始专栏',
        albumHref: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkwOTUyMzc1NA==&action=getalbum&album_id=3505334719489900558&scene=126#wechat_redirect',
      }
))
</script>

<template>
  <section class="craft-embed-page">
    <div class="craft-embed-copy">
      <p class="craft-page-label">/tauri/</p>
      <h1>{{ copy.title }}</h1>
      <p>{{ copy.intro }}</p>
      <p>{{ copy.note }}</p>
      <div class="craft-embed-actions">
        <a :href="copy.archiveHref">{{ copy.primary }}</a>
        <a :href="copy.albumHref" target="_blank" rel="noreferrer">{{ copy.secondary }}</a>
      </div>
    </div>
  </section>
</template>
