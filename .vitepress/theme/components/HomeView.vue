<script setup lang="ts">
import { computed } from 'vue'
import { copy } from '../content'
import { data as blog } from '../posts.data.mts'
import { useSiteLocale } from '../composables/useSiteLocale'

const { lang, localizedPath } = useSiteLocale()
const localizedBlog = computed(() => blog?.[lang.value] ?? blog?.zh ?? {
  posts: [],
  latestPosts: [],
  archiveGroups: [],
  categoryGroups: [],
  tagGroups: [],
  postsByHref: {},
  postsBySource: {},
  stats: {
    totalPosts: 0,
    totalCategories: 0,
    totalTags: 0,
  },
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
          :class="[
            'font-sans font-bold tracking-tight text-craft-ink',
            lang === 'en'
              ? 'max-w-[12ch] text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05]'
              : 'text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.05] md:whitespace-nowrap',
          ]"
        >
        {{ copy[lang].heroLead }} {{ copy[lang].heroName }}
        </h1>
        <!-- <p
          :class="[
            'mt-5 font-sans font-medium tracking-tight text-craft-muted',
            lang === 'en'
              ? 'max-w-[20ch] text-[clamp(1.1rem,1.9vw,1.55rem)] leading-[1.3]'
              : 'text-[clamp(1.2rem,2vw,1.7rem)] leading-[1.3]',
          ]"
        >
          {{ copy[lang].heroTitle }}
        </p> -->
        <p class="mt-6 max-w-4xl text-lg leading-8 text-craft-muted sm:text-xl sm:leading-9 lg:text-[1.3rem] lg:leading-10">
          {{ copy[lang].heroIntroBefore }}<a
            :href="localizedPath('/archive/')"
            class="font-medium text-craft-accent underline decoration-dotted underline-offset-4 hover:text-craft-accent-strong"
          >{{ copy[lang].heroIntroLink }}</a>{{ copy[lang].heroIntroAfter }}
        </p>

        <p class="mt-6 max-w-3xl text-sm leading-7 text-craft-ink sm:text-base sm:leading-8 lg:text-[1.02rem]">
          {{ copy[lang].heroNote }}
        </p>

        <div class="mt-12 flex flex-wrap gap-4">
          <a
            :href="localizedPath('/archive/')"
            class="inline-flex min-h-12 items-center justify-center border border-craft-line px-5 text-lg font-medium text-craft-ink transition-colors hover:bg-craft-card"
          >
            {{ copy[lang].archiveLink }}
          </a>
          <a
            :href="localizedPath('/about/')"
            class="inline-flex min-h-12 items-center justify-center border border-craft-line px-5 text-lg font-medium text-craft-ink transition-colors hover:bg-craft-card"
          >
            {{ copy[lang].aboutLink }}
          </a>
          <a
            href="https://github.com/Xutaotaotao"
            target="_blank"
            rel="noreferrer"
            class="inline-flex min-h-12 items-center justify-center border border-craft-line px-5 text-lg font-medium text-craft-ink transition-colors hover:bg-craft-card"
          >
            {{ copy[lang].github }}
          </a>
        </div>
      </div>

      <figure class="m-0 flex w-full flex-col items-center justify-self-center pt-2 sm:pt-4 md:items-end md:justify-self-end md:pt-6">
        <div class="relative flex aspect-square w-full max-w-72 items-center justify-center rounded-full border border-craft-line bg-craft-card p-3 sm:max-w-88 sm:p-4">
          <img
            class="home-avatar block h-full w-full rounded-full"
            src="/img/home-avatar-portrait-576.jpg"
            srcset="/img/home-avatar-portrait-576.jpg 432w, /img/home-avatar-portrait-768.jpg 768w"
            sizes="(min-width: 640px) 352px, 288px"
            width="352"
            height="352"
            fetchpriority="high"
            decoding="async"
            :alt="lang === 'zh' ? '徐徐在山间的照片' : 'Portrait of Terence in the mountains'"
          >
        </div>
        <figcaption class="mt-5 flex flex-col items-center gap-1 font-mono text-xs font-extrabold uppercase text-craft-soft">
          <span>Portrait</span>
          <span>{{ lang === 'zh' ? '徐徐 / AI 全栈开发工程师' : 'Terence / AI full-stack engineer' }}</span>
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
          v-for="post in localizedBlog.latestPosts"
          :key="post.id"
          class="block border-b border-craft-line py-5 transition-colors hover:bg-[color-mix(in_srgb,var(--color-craft-card)_72%,transparent)]"
          :href="post.href"
        >
          <span class="min-w-0">
            <strong class="block font-mono text-lg font-extrabold leading-6 text-craft-ink">
              {{ post.title }}
            </strong>
            <small class="mt-2 block text-sm leading-6 text-craft-muted">{{ post.excerpt }}</small>
            <span class="mt-3 flex flex-wrap items-center gap-2">
              <span
                v-for="tag in post.tags.slice(0, 3)"
                :key="tag"
                class="inline-flex min-h-7 items-center justify-center border border-craft-line bg-craft-card px-2.5 font-mono text-xs font-bold uppercase text-craft-muted"
              >
                {{ tag }}
              </span>
              <span class="inline-flex min-h-7 items-center justify-center border border-craft-line bg-craft-card px-2.5 font-mono text-xs font-extrabold uppercase text-craft-soft">
                {{ post.date }}
              </span>
            </span>
          </span>
        </a>
      </div>

      <div class="mt-4 flex justify-end">
        <a
          :href="localizedPath('/archive/')"
          class="inline-flex min-h-10 items-center justify-center border border-craft-line bg-craft-card px-4 font-mono text-xs font-extrabold text-craft-ink transition-colors hover:bg-craft-card"
        >
          {{ copy[lang].archiveMore }}
        </a>
      </div>
    </section>
  </main>
</template>
