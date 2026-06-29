<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { copy, type Language } from '../content'
import { data as blog } from '../posts.data.mts'


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
  <main class="mx-auto w-full max-w-280 px-10 pb-20 pt-6 md:pt-8">
    <section
      aria-labelledby="home-title"
      class="grid grid-cols-1 items-start gap-8 border-b border-craft-line pb-10 pt-6 md:grid-cols-2 md:gap-12 lg:gap-16 lg:pt-8"
    >
      <div class="min-w-0 max-w-152 pt-4 md:pt-12">
        <h1
          id="home-title"
          class="font-sans text-4xl font-bold leading-none tracking-tight text-craft-ink sm:text-5xl md:whitespace-nowrap lg:text-6xl"
        >
          {{ lang === 'zh' ? '你好，我是徐徐。' : "Hey, I'm Taotao." }}
        </h1>
        <p class="mt-8 max-w-2xl text-lg leading-relaxed text-craft-ink lg:text-xl">
          {{ copy[lang].heroIntroBefore }}<a
            href="/archive/"
            class="font-medium text-craft-accent underline decoration-dotted underline-offset-4 hover:text-craft-accent-strong"
          >{{ copy[lang].heroIntroLink }}</a>{{ copy[lang].heroIntroAfter }}
        </p>

        <p class="mt-5 max-w-2xl text-lg leading-relaxed text-craft-ink lg:text-xl">
          {{ copy[lang].heroNote }}
        </p>

        <div class="mt-12 flex flex-wrap gap-4">
          <a
            href="/archive/"
            class="inline-flex min-h-12 items-center justify-center border border-craft-line px-5 text-xl font-medium text-craft-ink transition-colors hover:bg-craft-card"
          >
            {{ copy[lang].archiveLink }}
          </a>
          <a
            href="/about/"
            class="inline-flex min-h-12 items-center justify-center border border-craft-line px-5 text-xl font-medium text-craft-ink transition-colors hover:bg-craft-card"
          >
            {{ copy[lang].aboutLink }}
          </a>
          <a
            href="https://github.com/Xutaotaotao"
            target="_blank"
            rel="noreferrer"
            class="inline-flex min-h-12 items-center justify-center border border-craft-line px-5 text-xl font-medium text-craft-ink transition-colors hover:bg-craft-card"
          >
            {{ copy[lang].github }}
          </a>
        </div>
      </div>

      <figure class="m-0 flex w-full flex-col items-center justify-self-center pt-2 sm:pt-4 md:items-end md:justify-self-end md:pt-6">
        <div class="relative flex aspect-square w-full max-w-72 items-center justify-center rounded-full border border-craft-line bg-craft-card p-3 sm:max-w-88 sm:p-4">
          <img
            class="block h-full w-full rounded-full object-cover"
            src="/img/home-avatar.jpg"
            alt="Portrait of Taotao"
          >
        </div>
        <figcaption class="mt-5 flex flex-col items-center gap-1 font-mono text-xs font-extrabold uppercase text-craft-soft">
          <span>Portrait</span>
          <span>{{ lang === 'zh' ? '前端徐徐 / AI 全栈开发工程师' : 'Taotao / AI full-stack engineer' }}</span>
        </figcaption>
      </figure>
    </section>

    <section aria-labelledby="latest-title" class="pt-10">
      <div class="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div class="min-w-0">
          <h2
            id="latest-title"
            class="font-mono text-2xl font-extrabold leading-tight text-craft-ink md:text-3xl lg:text-4xl"
          >
            {{ copy[lang].latestTitle }}
          </h2>
        </div>
        <p class="max-w-xl text-sm leading-7 text-craft-muted">
          {{ copy[lang].latestIntro }}
        </p>
      </div>

      <div class="border-t border-craft-line">
        <a
          v-for="post in blog.latestPosts"
          :key="post.id"
          class="grid gap-4 border-b border-craft-line py-5 transition-colors hover:bg-[color-mix(in_srgb,var(--color-craft-card)_72%,transparent)] md:grid-cols-[minmax(0,1fr)_32_24] md:items-start md:gap-5"
          :href="post.href"
        >
          <span class="min-w-0">
            <strong class="block font-mono text-lg font-extrabold leading-6 text-craft-ink">
              {{ post.title }}
            </strong>
            <small class="mt-2 block text-sm leading-6 text-craft-muted">{{ post.excerpt }}</small>
            <span class="mt-3 flex flex-wrap gap-2">
              <span
                v-for="tag in post.tags.slice(0, 3)"
                :key="tag"
                class="inline-flex min-h-7 items-center justify-center border border-craft-line bg-craft-card px-2.5 font-mono text-xs font-bold uppercase text-craft-muted"
              >
                {{ tag }}
              </span>
            </span>
          </span>
          <span class="font-mono text-xs font-extrabold uppercase text-craft-soft md:pt-1">{{ post.category }}</span>
          <span class="font-mono text-xs font-extrabold uppercase text-craft-soft md:pt-1">{{ post.date }}</span>
        </a>
      </div>

      <div class="mt-4 flex justify-end">
        <a
          href="/archive/"
          class="inline-flex min-h-10 items-center justify-center border border-craft-line bg-craft-card px-4 font-mono text-xs font-extrabold text-craft-ink transition-colors hover:bg-craft-card"
        >
          {{ copy[lang].archiveMore }}
        </a>
      </div>
    </section>
  </main>
</template>
