<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { copy, type Language } from '../content'

const lang = ref<Language>('zh')

function syncLanguage(event?: Event) {
  if (event) {
    lang.value = (event as CustomEvent<Language>).detail
    return
  }

  const savedLang = localStorage.getItem('taotao-lang')
  lang.value = savedLang === 'en' ? 'en' : 'zh'
}

onMounted(() => {
  syncLanguage()
  window.addEventListener('taotao:lang', syncLanguage)
})

onUnmounted(() => {
  window.removeEventListener('taotao:lang', syncLanguage)
})
</script>

<template>
  <footer class="craft-footer">
    <p class="craft-footer-primary">
      <span>{{ copy[lang].footerLeft }}</span>
      <span class="craft-footer-icp">
        {{ copy[lang].footerIcpLabel }}
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">{{ copy[lang].footerIcpNumber }}</a>
      </span>
    </p>
    <p>{{ copy[lang].footerMeta }}</p>
    <p>
      <a href="https://github.com/Xutaotaotao" target="_blank" rel="noreferrer">GitHub</a>
      <a href="/archive/">Archive</a>
      <a href="/tags/">Tags</a>
    </p>
  </footer>
</template>
