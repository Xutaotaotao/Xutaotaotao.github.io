<script setup lang="ts">
import { copy } from '../content'
import { useSiteLocale } from '../composables/useSiteLocale'

const { lang, localizedPath } = useSiteLocale()
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
      <a :href="localizedPath('/archive/')">{{ copy[lang].openArchive }}</a>
      <a :href="localizedPath('/tags/')">{{ copy[lang].browseTags }}</a>
    </p>
  </footer>
</template>
