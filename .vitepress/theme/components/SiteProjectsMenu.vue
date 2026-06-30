<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { navLabels, projectLinks, type Language } from '../content'
import { localizeProjectHref } from '../lib/site-locale.mjs'

const props = defineProps<{
  lang: Language
}>()

const emit = defineEmits<{
  navigate: []
}>()

const open = ref(false)
const root = ref<HTMLElement | null>(null)

const label = computed(() => navLabels[props.lang].projects)
const itemText = (item: { text: string, textEn?: string }) => (
  props.lang === 'en' ? item.textEn ?? item.text : item.text
)

const itemHref = (item: { href: string, external?: boolean }) => (
  localizeProjectHref(item.href, props.lang, item.external)
)

function toggle() {
  open.value = !open.value
}

function close() {
  open.value = false
}

function handleNavigate() {
  close()
  emit('navigate')
}

function handleOutsideClick(event: MouseEvent) {
  if (!root.value?.contains(event.target as Node)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})
</script>

<template>
  <div
    ref="root"
    class="craft-nav-dropdown"
    :class="{ open }"
  >
    <button
      class="craft-nav-link craft-nav-dropdown-trigger"
      type="button"
      :aria-expanded="open"
      aria-haspopup="menu"
      @click.stop="toggle"
    >
      <span>{{ label }}</span>
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" />
      </svg>
    </button>

    <div
      class="craft-nav-dropdown-panel"
      role="menu"
      :aria-label="label"
    >
      <a
        v-for="item in projectLinks"
        :key="item.href"
        class="craft-nav-dropdown-item"
        role="menuitem"
        :href="itemHref(item)"
        :target="item.external ? '_blank' : undefined"
        :rel="item.external ? 'noreferrer' : undefined"
        @click="handleNavigate"
      >
        <span>{{ itemText(item) }}</span>
        <svg
          v-if="item.external"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M7 13 13 7M8 7h5v5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" />
        </svg>
      </a>
    </div>
  </div>
</template>
