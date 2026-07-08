<script setup lang="ts">
type SkeletonVariant = 'listing' | 'about'

withDefaults(
  defineProps<{
    variant?: SkeletonVariant
  }>(),
  {
    variant: 'listing',
  },
)
</script>

<template>
  <main
    class="craft-main craft-page page-skeleton"
    aria-busy="true"
    aria-label="Loading page content"
  >
    <div class="page-skeleton-heading">
      <div class="page-skeleton-line page-skeleton-label" />
      <div class="page-skeleton-line page-skeleton-title" />
      <div class="page-skeleton-line page-skeleton-intro" />
    </div>

    <template v-if="variant === 'listing'">
      <div class="page-skeleton-chips">
        <div
          v-for="index in 12"
          :key="index"
          class="page-skeleton-chip"
          :style="{ width: `${72 + (index % 4) * 28}px` }"
        />
      </div>

      <div class="page-skeleton-list">
        <div
          v-for="index in 6"
          :key="index"
          class="page-skeleton-entry"
        >
          <div class="page-skeleton-line page-skeleton-entry-title" />
        </div>
      </div>
    </template>

    <template v-else>
      <div class="page-skeleton-cards">
        <div
          v-for="index in 3"
          :key="index"
          class="page-skeleton-card"
        >
          <div class="page-skeleton-line page-skeleton-card-label" />
          <div class="page-skeleton-line page-skeleton-card-value" />
          <div class="page-skeleton-line page-skeleton-card-desc" />
        </div>
      </div>

      <div class="page-skeleton-blocks">
        <div class="page-skeleton-line page-skeleton-block-title" />
        <div class="page-skeleton-line page-skeleton-block-text" />
        <div class="page-skeleton-line page-skeleton-block-text page-skeleton-block-text-short" />
      </div>
    </template>
  </main>
</template>

<style scoped>
.page-skeleton {
  min-height: calc(100vh - 360px);
}

.page-skeleton-heading {
  margin-bottom: 32px;
}

.page-skeleton-line {
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    var(--craft-card-strong) 0%,
    color-mix(in srgb, var(--craft-card-strong) 55%, var(--craft-card)) 50%,
    var(--craft-card-strong) 100%
  );
  background-size: 200% 100%;
  animation: page-skeleton-shimmer 1.4s ease-in-out infinite;
}

.page-skeleton-label {
  width: 96px;
  height: 12px;
  margin-bottom: 16px;
}

.page-skeleton-title {
  width: min(320px, 70%);
  height: clamp(38px, 5vw, 56px);
  margin-bottom: 18px;
}

.page-skeleton-intro {
  width: min(520px, 90%);
  height: 18px;
}

.page-skeleton-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 28px;
}

.page-skeleton-chip {
  height: 36px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    var(--craft-card-strong) 0%,
    color-mix(in srgb, var(--craft-card-strong) 55%, var(--craft-card)) 50%,
    var(--craft-card-strong) 100%
  );
  background-size: 200% 100%;
  animation: page-skeleton-shimmer 1.4s ease-in-out infinite;
}

.page-skeleton-list {
  border-top: 1px solid var(--craft-rule);
}

.page-skeleton-entry {
  padding: 18px 0;
  border-bottom: 1px solid var(--craft-rule);
}

.page-skeleton-entry-title {
  width: min(640px, 88%);
  height: 20px;
}

.page-skeleton-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 36px;
}

.page-skeleton-card {
  padding: 20px;
  border: 1px solid var(--craft-rule);
  background: var(--craft-card);
}

.page-skeleton-card-label {
  width: 56px;
  height: 12px;
  margin-bottom: 14px;
}

.page-skeleton-card-value {
  width: 48px;
  height: 32px;
  margin-bottom: 12px;
}

.page-skeleton-card-desc {
  width: 80%;
  height: 14px;
}

.page-skeleton-blocks {
  display: grid;
  gap: 14px;
}

.page-skeleton-block-title {
  width: 160px;
  height: 24px;
}

.page-skeleton-block-text {
  width: 100%;
  height: 16px;
}

.page-skeleton-block-text-short {
  width: 72%;
}

@keyframes page-skeleton-shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

@media (max-width: 768px) {
  .page-skeleton-cards {
    grid-template-columns: 1fr;
  }

  .page-skeleton-chips {
    gap: 8px;
  }
}
</style>
