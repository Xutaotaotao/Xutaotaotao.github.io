<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vitepress'
import { navItems, navLabels, type Language, type NavItem } from '../content'
import NavVisitor from './NavVisitor.vue'
import SiteProjectsMenu from './SiteProjectsMenu.vue'
import SiteSearch from './SiteSearch.vue'

const route = useRoute()

const lang = ref<Language>('zh')
const theme = ref<'light' | 'dark'>('light')
const menuOpen = ref(false)
const navRoot = ref<HTMLElement | null>(null)
const showLangSwitch = false

const labels = computed(() => navLabels[lang.value])

function itemText(item: NavItem) {
  return labels.value[item.key]
}

function normalizedPath(path: string) {
  return path.replace(/\.html$/, '')
}

function isActive(item: NavItem) {
  const current = normalizedPath(route.path)
  const target = normalizedPath(item.href)

  if (target === '/') {
    return current === '/'
  }

  return current === target || current.startsWith(target)
}

function applyLang(next: Language) {
  lang.value = next

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('taotao-lang', next)
  }

  document.documentElement.dataset.lang = next
  window.dispatchEvent(new CustomEvent('taotao:lang', { detail: next }))
}

function applyTheme(next: 'light' | 'dark') {
  theme.value = next

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('taotao-theme', next)
  }

  document.documentElement.dataset.theme = next
}

function toggleTheme() {
  applyTheme(theme.value === 'light' ? 'dark' : 'light')
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function handleOutsideClick(event: MouseEvent) {
  if (!navRoot.value?.contains(event.target as Node)) {
    closeMenu()
  }
}

onMounted(() => {
  const savedLang = localStorage.getItem('taotao-lang')
  const savedTheme = localStorage.getItem('taotao-theme')

  applyLang(savedLang === 'en' ? 'en' : 'zh')
  applyTheme(savedTheme === 'dark' ? 'dark' : 'light')

  document.documentElement.classList.toggle('is-home', route.path === '/')
  document.addEventListener('click', handleOutsideClick)

  watch(
    () => route.path,
    (path) => {
      document.documentElement.classList.toggle('is-home', path === '/')
      closeMenu()
    },
  )
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})
</script>

<template>
  <header
    ref="navRoot"
    class="craft-nav"
    :class="{ 'menu-open': menuOpen }"
    @keydown.esc="closeMenu"
  >
    <div class="craft-nav-start">
      <a class="craft-brand" href="/" aria-label="前端徐徐 首页">前端徐徐</a>
      <NavVisitor />
      <SiteSearch class="craft-nav-search--lead" />
    </div>

    <button
      class="craft-menu-button"
      type="button"
      :aria-expanded="menuOpen"
      aria-controls="craft-mobile-menu"
      :aria-label="menuOpen ? '关闭导航菜单' : '打开导航菜单'"
      @click="toggleMenu"
    >
      <span></span>
      <span></span>
    </button>

    <nav
      id="craft-mobile-menu"
      class="craft-nav-links craft-mobile-menu"
      aria-label="主导航"
    >
      <div class="craft-primary-links">
        <a
          v-for="item in navItems"
          :key="item.key"
          class="craft-nav-link"
          :class="{ active: isActive(item) }"
          :href="item.href"
          @click="closeMenu"
        >
          {{ itemText(item) }}
        </a>

        <SiteProjectsMenu
          :lang="lang"
          @navigate="closeMenu"
        />
      </div>

      <span class="craft-divider" aria-hidden="true"></span>

      <div class="craft-nav-controls">
        <div v-if="showLangSwitch" class="craft-lang-switch" aria-label="language switch">
          <button
            class="craft-switch"
            type="button"
            :class="{ active: lang === 'zh' }"
            aria-label="切换到中文"
            @click="applyLang('zh')"
          >
            中
          </button>
          <button
            class="craft-switch"
            type="button"
            :class="{ active: lang === 'en' }"
            aria-label="Switch to English"
            @click="applyLang('en')"
          >
            EN
          </button>
        </div>

        <button
          class="craft-theme-toggle"
          type="button"
          :aria-label="theme === 'light' ? '切换深色主题' : '切换浅色主题'"
          @click="toggleTheme"
        >
          <svg
            v-if="theme === 'light'"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M20.4 15.3A8.1 8.1 0 0 1 8.7 3.6a8.8 8.8 0 1 0 11.7 11.7Z" />
          </svg>
          <svg
            v-else
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" />
          </svg>
        </button>
      </div>
    </nav>
  </header>
</template>
