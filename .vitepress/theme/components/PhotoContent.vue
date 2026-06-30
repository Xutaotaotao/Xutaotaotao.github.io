<script setup lang="ts">
import { computed } from 'vue'
import { useSiteLocale } from '../composables/useSiteLocale'

const { lang } = useSiteLocale()

const copy = computed(() => (
  lang.value === 'en'
    ? {
        title: 'Photography Notes',
        intro: 'My photography stream still lives in an external WeChat album. It is not yet mirrored into standalone bilingual article pages inside this site.',
        note: 'For now, this page acts as a bilingual index and an outbound entry to the original collection.',
        open: 'Open Original Album',
        albumHref: 'https://mp.weixin.qq.com/mp/appmsgalbum?action=getalbum&__biz=MzkwOTUyMzc1NA==&scene=1&album_id=3537712498173345795#wechat_redirect',
      }
    : {
        title: '摄影记录',
        intro: '我的摄影记录目前仍然主要放在微信公众号外链合集里，还没有完整镜像成站内的双语独立文章页。',
        note: '当前这个页面先作为双语索引页和原始合集的跳转入口。',
        open: '打开原始合集',
        albumHref: 'https://mp.weixin.qq.com/mp/appmsgalbum?action=getalbum&__biz=MzkwOTUyMzc1NA==&scene=1&album_id=3537712498173345795#wechat_redirect',
      }
))
</script>

<template>
  <section class="craft-embed-page">
    <div class="craft-embed-copy">
      <p class="craft-page-label">/photo/</p>
      <h1>{{ copy.title }}</h1>
      <p>{{ copy.intro }}</p>
      <p>{{ copy.note }}</p>
      <div class="craft-embed-actions">
        <a :href="copy.albumHref" target="_blank" rel="noreferrer">{{ copy.open }}</a>
      </div>
    </div>
  </section>
</template>
