export const appSplashStyles = `
#app-splash {
  --splash-paper: #f5f2ec;
  --splash-card: #fbf8f3;
  --splash-card-strong: #f0e8db;
  --splash-rule: #ddd4c8;
  position: fixed;
  inset: 0;
  z-index: 9999;
  overflow: auto;
  background: var(--splash-paper);
  transition: opacity 0.28s ease, visibility 0.28s ease;
}

html[data-theme='dark'] #app-splash {
  --splash-paper: #111110;
  --splash-card: #171716;
  --splash-card-strong: #201f1d;
  --splash-rule: #2f2b27;
}

html.app-ready #app-splash {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.app-splash-shell {
  min-height: 100%;
}

.app-splash-nav,
.app-splash-main {
  width: min(1120px, calc(100% - 40px));
  margin: 0 auto;
}

.app-splash-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 68px;
  border-bottom: 1px solid var(--splash-rule);
}

.app-splash-nav-start {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.app-splash-nav-links {
  display: flex;
  gap: 10px;
}

.app-splash-main {
  padding: 34px 0 80px;
}

.app-splash-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(220px, 320px);
  gap: 48px;
  align-items: start;
  padding: 24px 0 40px;
  border-bottom: 1px solid var(--splash-rule);
}

.app-splash-copy {
  padding-top: 24px;
}

.app-splash-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}

.app-splash-avatar-wrap {
  display: flex;
  justify-content: center;
  padding-top: 12px;
}

.app-splash-avatar {
  width: min(100%, 288px);
  aspect-ratio: 1;
  border-radius: 999px;
  border: 1px solid var(--splash-rule);
  background: var(--splash-card);
}

.app-splash-section {
  padding-top: 36px;
}

.app-splash-section-head {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 20px;
}

.app-splash-list {
  border-top: 1px solid var(--splash-rule);
}

.app-splash-entry {
  padding: 18px 0;
  border-bottom: 1px solid var(--splash-rule);
}

.app-splash-line,
.app-splash-block {
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    var(--splash-card-strong) 0%,
    color-mix(in srgb, var(--splash-card-strong) 55%, var(--splash-card)) 50%,
    var(--splash-card-strong) 100%
  );
  background-size: 200% 100%;
  animation: app-splash-shimmer 1.4s ease-in-out infinite;
}

.app-splash-line-brand {
  width: 112px;
  height: 18px;
}

.app-splash-line-search {
  width: 120px;
  height: 32px;
}

.app-splash-line-link {
  width: 52px;
  height: 14px;
}

.app-splash-line-title {
  width: min(360px, 80%);
  height: clamp(38px, 5vw, 56px);
  margin-bottom: 18px;
}

.app-splash-line-text {
  width: min(520px, 92%);
  height: 16px;
  margin-bottom: 12px;
}

.app-splash-line-text-short {
  width: min(420px, 72%);
}

.app-splash-block {
  width: 108px;
  height: 44px;
}

.app-splash-line-section-title {
  width: 180px;
  height: 28px;
}

.app-splash-line-section-intro {
  width: 240px;
  height: 14px;
}

.app-splash-line-entry-title {
  width: min(640px, 88%);
  height: 18px;
  margin-bottom: 10px;
}

.app-splash-line-entry-desc {
  width: min(520px, 72%);
  height: 14px;
}

@keyframes app-splash-shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

@media (max-width: 768px) {
  .app-splash-nav-links {
    display: none;
  }

  .app-splash-hero {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .app-splash-section-head {
    flex-direction: column;
  }
}

@media (prefers-reduced-motion: reduce) {
  #app-splash {
    transition: none;
  }

  .app-splash-line,
  .app-splash-block {
    animation: none;
  }
}
`

export const appSplashHtml = `
<div id="app-splash" aria-busy="true" aria-label="Loading site">
  <div class="app-splash-shell">
    <header class="app-splash-nav">
      <div class="app-splash-nav-start">
        <div class="app-splash-line app-splash-line-brand"></div>
        <div class="app-splash-line app-splash-line-search"></div>
      </div>
      <div class="app-splash-nav-links">
        <div class="app-splash-line app-splash-line-link"></div>
        <div class="app-splash-line app-splash-line-link"></div>
        <div class="app-splash-line app-splash-line-link"></div>
        <div class="app-splash-line app-splash-line-link"></div>
        <div class="app-splash-line app-splash-line-link"></div>
      </div>
    </header>

    <main class="app-splash-main">
      <section class="app-splash-hero">
        <div class="app-splash-copy">
          <div class="app-splash-line app-splash-line-title"></div>
          <div class="app-splash-line app-splash-line-text"></div>
          <div class="app-splash-line app-splash-line-text"></div>
          <div class="app-splash-line app-splash-line-text app-splash-line-text-short"></div>
          <div class="app-splash-actions">
            <div class="app-splash-block"></div>
            <div class="app-splash-block"></div>
            <div class="app-splash-block"></div>
          </div>
        </div>
        <div class="app-splash-avatar-wrap">
          <div class="app-splash-avatar"></div>
        </div>
      </section>

      <section class="app-splash-section">
        <div class="app-splash-section-head">
          <div class="app-splash-line app-splash-line-section-title"></div>
          <div class="app-splash-line app-splash-line-section-intro"></div>
        </div>
        <div class="app-splash-list">
          <div class="app-splash-entry">
            <div class="app-splash-line app-splash-line-entry-title"></div>
            <div class="app-splash-line app-splash-line-entry-desc"></div>
          </div>
          <div class="app-splash-entry">
            <div class="app-splash-line app-splash-line-entry-title"></div>
            <div class="app-splash-line app-splash-line-entry-desc"></div>
          </div>
          <div class="app-splash-entry">
            <div class="app-splash-line app-splash-line-entry-title"></div>
            <div class="app-splash-line app-splash-line-entry-desc"></div>
          </div>
        </div>
      </section>
    </main>
  </div>
</div>
`

export function dismissAppSplash() {
  if (typeof document === 'undefined') return

  document.documentElement.classList.add('app-ready')

  const splash = document.getElementById('app-splash')
  if (!splash) return

  const remove = () => splash.remove()

  splash.addEventListener('transitionend', remove, { once: true })
  window.setTimeout(remove, 400)
}
