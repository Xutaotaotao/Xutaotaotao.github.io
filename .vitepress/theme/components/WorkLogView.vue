<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { data as workLog } from '../work-log.data'
import { useSiteLocale } from '../composables/useSiteLocale'

const { lang, localizedPath } = useSiteLocale()
const entries = computed(() => workLog[lang.value])

onMounted(() => {
  // The async layout may mount after the router's first anchor lookup.
  if (!window.location.hash) return
  try {
    document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView()
  } catch {}
})
const labels = computed(() => lang.value === 'en' ? {
  title: 'Work log',
  intro: 'An ongoing record of what I am working on, the problems I am exploring, and the details I care about. Each entry is a snapshot; earlier records stay here as the work moves forward.',
  about: 'About me',
  count: `${entries.value.length} ${entries.value.length === 1 ? 'entry' : 'entries'}`,
  recorded: 'Recorded on',
  focus: 'Current focus',
  tools: 'Tools and practices',
  empty: 'I am preparing the first work records. Check back soon.',
} : {
  title: '工作记录',
  intro: '持续记录我正在做什么、遇到什么问题，以及我在意的细节。每篇都是当时的工作快照，后续有新进展就继续补充，之前的记录也会保留在这里。',
  about: '关于我',
  count: `${entries.value.length} 条记录`,
  recorded: '记录日期',
  focus: '正在关注',
  tools: '工具与实践',
  empty: '正在整理第一批工作记录，稍后再来看看。',
})

function displayDate(date: string) {
  if (!date) return ''
  return new Intl.DateTimeFormat(lang.value === 'en' ? 'en-US' : 'zh-CN', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00.000Z`))
}
</script>

<template>
  <main class="worklog-page" :lang="lang === 'en' ? 'en' : 'zh-CN'" aria-labelledby="worklog-title">
    <header class="worklog-header">
      <div class="worklog-heading-row">
        <h1 id="worklog-title">{{ labels.title }}</h1>
        <a class="worklog-about-link" :href="localizedPath('/about/')">{{ labels.about }} <span aria-hidden="true">↗</span></a>
      </div>
      <p class="worklog-intro">{{ labels.intro }}</p>
    </header>

    <div class="worklog-count">{{ labels.count }}</div>

    <section v-if="entries.length" class="worklog-entries" :aria-label="labels.title">
      <article v-for="entry in entries" :id="entry.id" :key="entry.id" class="worklog-entry" :aria-labelledby="`title-${entry.id}`">
        <div class="worklog-meta">
          <p class="worklog-area">{{ entry.area }}</p>
          <p class="worklog-date"><span>{{ labels.recorded }}</span><time :datetime="entry.date">{{ displayDate(entry.date) }}</time></p>
        </div>
        <div class="worklog-content">
          <h2 :id="`title-${entry.id}`">{{ entry.title }}</h2>
          <div class="worklog-body" v-html="entry.html"></div>
          <dl v-if="entry.focus" class="worklog-focus">
            <dt>{{ labels.focus }}</dt>
            <dd>{{ entry.focus }}</dd>
          </dl>
          <ul v-if="entry.tools.length" class="worklog-tools" :aria-label="labels.tools">
            <li v-for="tool in entry.tools" :key="tool">{{ tool }}</li>
          </ul>
        </div>
      </article>
    </section>
    <p v-else class="worklog-empty">{{ labels.empty }}</p>
  </main>
</template>

<style scoped>
.worklog-page { width: calc(100% - 80px); max-width: 1120px; margin: 0 auto; padding: 48px 0 88px; color: var(--craft-ink); }
.worklog-page p, .worklog-page h1, .worklog-page h2, .worklog-page ul, .worklog-page dl, .worklog-page dd { margin: 0; }
.worklog-header { padding: 0 0 38px; }
.worklog-heading-row { display: flex; justify-content: space-between; gap: 24px; align-items: center; }
.worklog-about-link { display: inline-flex; align-items: center; gap: 10px; min-height: 44px; color: var(--craft-muted); font-size: 13px; text-underline-offset: 5px; }
.worklog-about-link:hover { color: var(--craft-accent); text-decoration: underline; }
.worklog-about-link:focus-visible { outline: 2px solid var(--craft-accent); outline-offset: 4px; }
.worklog-page h1 { font-size: clamp(34px, 4.3vw, 52px); font-weight: 750; line-height: 1.25; letter-spacing: -.035em; }
.worklog-intro { max-width: 740px; margin-top: 22px !important; color: var(--craft-muted); font-size: 16px; line-height: 1.9; }
.worklog-count { padding: 14px 0; border-top: 1px solid var(--craft-rule-strong); border-bottom: 1px solid var(--craft-rule); color: var(--craft-muted); font-size: 12px; }
.worklog-entry { display: grid; grid-template-columns: 200px minmax(0, 1fr); gap: 48px; padding: 36px 0 40px; border-bottom: 1px solid var(--craft-rule); scroll-margin-top: 100px; }
.worklog-meta { padding-top: 5px; }
.worklog-area { color: var(--craft-accent); font-size: 12px; font-weight: 600; line-height: 1.9; overflow-wrap: anywhere; }
.worklog-date { display: grid; gap: 5px; margin-top: 20px !important; color: var(--craft-muted); font-size: 12px; line-height: 1.7; }
.worklog-date > span { font-size: 11px; }
.worklog-date time { font-variant-numeric: tabular-nums; }
.worklog-content { min-width: 0; }
.worklog-page h2 { font-size: clamp(21px, 2.25vw, 27px); font-weight: 650; line-height: 1.5; letter-spacing: -.02em; text-wrap: balance; }
.worklog-body { margin-top: 18px; color: var(--craft-muted); font-size: 15px; line-height: 1.95; overflow-wrap: anywhere; }
.worklog-body :deep(p) { margin: 0 0 14px; }
.worklog-body :deep(p:last-child) { margin-bottom: 0; }
.worklog-body :deep(a) { color: var(--craft-accent); text-decoration: underline; text-underline-offset: 4px; }
.worklog-body :deep(img) { max-width: 100%; height: auto; }
.worklog-body :deep(pre) { overflow-x: auto; }
.worklog-focus { display: grid; grid-template-columns: 82px minmax(0, 1fr); gap: 16px; margin-top: 24px !important; padding-top: 18px; border-top: 1px solid var(--craft-rule); }
.worklog-focus dt { color: var(--craft-accent); font-size: 12px; font-weight: 600; line-height: 1.9; }
.worklog-focus dd { color: var(--craft-muted); font-size: 13px; line-height: 1.9; }
.worklog-tools { display: flex; flex-wrap: wrap; gap: 6px 12px; padding: 0; margin-top: 18px !important; list-style: none; color: var(--craft-muted); font-size: 12px; line-height: 1.8; }
.worklog-tools li:not(:last-child)::after { content: '/'; padding-left: 12px; color: var(--craft-rule-strong); }
.worklog-empty { padding: 40px 0; color: var(--craft-muted); line-height: 1.85; }
@media (max-width: 760px) {
  .worklog-page { width: calc(100% - 40px); padding-top: 28px; padding-bottom: 56px; }
  .worklog-header { padding-bottom: 28px; }
  .worklog-intro { font-size: 15px; margin-top: 18px !important; }
  .worklog-entry { grid-template-columns: minmax(0, 1fr); gap: 16px; padding: 28px 0 32px; }
  .worklog-meta { padding: 0; }
  .worklog-date { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 6px !important; }
  .worklog-date > span { font-size: 12px; }
  .worklog-focus { grid-template-columns: minmax(0, 1fr); gap: 5px; }
}
</style>
