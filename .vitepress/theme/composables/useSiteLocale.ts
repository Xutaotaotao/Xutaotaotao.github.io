import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vitepress'
import type { Language } from '../content'
import {
  getLocaleFromPath,
  redirectToPreferredLocale,
  stripLocalePrefix,
  withLocale,
} from '../lib/site-locale.mjs'

export function useSiteLocale() {
  const route = useRoute()
  const lang = ref<Language>(getLocaleFromPath(route.path))

  const isEnglishRoute = computed(() => getLocaleFromPath(route.path) === 'en')
  const localizedPath = (path: string, targetLang = lang.value) => withLocale(path, targetLang)
  const strippedRoutePath = computed(() => stripLocalePrefix(route.path))

  function applyLang(next: Language) {
    lang.value = next

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('taotao-lang', next)
    }

    document.documentElement.dataset.lang = next
    window.dispatchEvent(new CustomEvent('taotao:lang', { detail: next }))
  }

  function syncLanguage(event?: Event) {
    if (event) {
      lang.value = (event as CustomEvent<Language>).detail
      return
    }

    lang.value = getLocaleFromPath(route.path)
    document.documentElement.dataset.lang = lang.value
  }

  onMounted(() => {
    if (redirectToPreferredLocale(window.location.pathname)) {
      return
    }

    syncLanguage()
    window.addEventListener('taotao:lang', syncLanguage)
  })

  watch(
    () => route.path,
    () => {
      syncLanguage()
    },
  )

  onUnmounted(() => {
    window.removeEventListener('taotao:lang', syncLanguage)
  })

  return {
    lang,
    isEnglishRoute,
    localizedPath,
    strippedRoutePath,
    applyLang,
    syncLanguage,
  }
}
