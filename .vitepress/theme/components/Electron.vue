<script setup lang="ts">
import { computed } from 'vue'
import { useSiteLocale } from '../composables/useSiteLocale'

const { lang } = useSiteLocale()

const copy = computed(() => (
  lang.value === 'en'
    ? {
        title: 'Electron Article Collection',
        intro: 'These long-form Electron notes were first published as a WeChat article album. The archive is still the original Chinese source.',
        note: 'The bilingual versions inside this site are the preferred reading path if you want localized article pages and mirrored metadata.',
        primary: 'Open Archive',
        archiveHref: '/en/archive/',
        secondary: 'Open Original Album',
        albumHref: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkwOTUyMzc1NA==&action=getalbum&album_id=3643392167478919169&scene=126#wechat_redirect',
      }
    : {
        title: 'Electron 文章合集',
        intro: '这里收录的是我最早发布在微信公众号里的 Electron 专栏，外链内容仍然是原始中文文章源。',
        note: '如果你希望按照站内的双语结构阅读，优先使用本站归档页里的镜像文章。',
        primary: '查看归档',
        archiveHref: '/archive/',
        secondary: '打开原始专栏',
        albumHref: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkwOTUyMzc1NA==&action=getalbum&album_id=3643392167478919169&scene=126#wechat_redirect',
      }
))
</script>

<template>
  <section class="craft-embed-page">
    <div class="craft-embed-copy">
      <p class="craft-page-label">/electron/</p>
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
