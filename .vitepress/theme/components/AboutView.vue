<script setup lang="ts">
import { computed } from 'vue'
import { copy } from '../content'
import { aboutWork } from '../about-work'
import { data as workLog } from '../work-log.data'
import { useSiteLocale } from '../composables/useSiteLocale'

const { lang, localizedPath } = useSiteLocale()

const content = {
  zh: {
    title: '徐徐',
    subtitle: '全栈工程师 · AI Native 开发者 · 开源贡献者 · 徒步爱好者',
    tags: [
      { icon: '⚡', text: '工作 8 年' },
      { icon: '🤖', text: 'AI Native' },
      { icon: '🌐', text: '全栈开发' },
      { icon: '✍️', text: '掘金优秀作者' },
      { icon: '🥾', text: '徒步 & 摄影' },
    ],
    about: {
      title: '关于我',
      intro: [
        '你好！我是徐徐，一位工作 8 年的全栈工程师，正在拥抱 AI Native 开发。',
        '从咨询公司到互联网大厂，从执行到管理 15 人团队，从前端专家到全栈工程师，从传统开发到 AI 创业，我的职业生涯经历了多次转型。',
        '我现阶段专注于 AI Native 全栈开发、精准农业系统、大数据地图渲染、Flutter 应用，以及利用 AI 工具（Claude、Codex、Cursor）提升创作边界。',
      ],
    },
    stats: [
      { number: '8', label: '年工作经验' },
      { number: '15', label: '人团队管理' },
      { number: '4', label: '家公司经历' },
      { number: '10+', label: '项目经验' },
    ],
    tech: {
      title: '技术栈',
      items: [
        { icon: '🎯', title: '全栈开发', desc: 'Java · Node.js · Express · Koa · 数据库 · RESTful API · 端到端闭环' },
        { icon: '⚛️', title: '前端技术', desc: 'React · Vue · TypeScript · Electron · Taro · React-Native · Flutter' },
        { icon: '🤖', title: 'AI Native', desc: 'Cursor · Codex · Claude · Vibe Coding · AI 辅助开发' },
        { icon: '🗺️', title: '地图渲染', desc: 'GeoServer · 大数据可视化 · 轨迹渲染 · 空间数据 · Canvas' },
        { icon: '🔧', title: '工程化', desc: 'Webpack · Vite · CI/CD · Docker · 性能优化 · 自动化构建' },
        { icon: '🖥️', title: '桌面应用', desc: 'Electron · Tauri · Chromium 内核 · Chrome 插件 · Rust' },
        { icon: '🌾', title: '精准农业', desc: '农机配置 · 路径规划 · 数据分析 · 遥感处理 · 田块管理' },
        { icon: '🔐', title: '安全领域', desc: 'VPN · 零信任 · 证书管理 · 策略引擎 · XSS/CSRF 防护' },
      ],
    },
    highlights: {
      title: '工作亮点',
      items: [
        { icon: '🌾', title: '精准农业系统（2026）', desc: '从 0 到 1 主导精准农业系统交付（Vibe Coding），落地农机配置、路径规划与田块任务分析等核心能力，端到端闭环上线，获国际客户认可。' },
        { icon: '🏗️', title: 'AI Browser 核心开发（2025）', desc: '主导 AI Browser 桌面端核心架构（Electron），两周内落地 Chrome 插件 API 兼容层，支撑 Groups / Tabs 等浏览器核心能力重构，推动产品从原型走向可发布版本。' },
        { icon: '🔐', title: '零信任安全产品（2023-2025）', desc: '主导零信任桌面客户端与运营后台架构（Electron + Rust），落地覆盖进程 / 软件 / 硬件 / 合规等多维检测能力，支撑十余类安全策略的配置、调度与端上执行，并完成性能与体验从「能用」到「可规模化」的关键优化。' },
        { icon: '💝', title: '婚恋社交产品（2022）', desc: '从 0 到 1 主导婚恋社交小程序与 APP 交付，完成核心匹配与社交链路落地；通过启动与关键路径优化，将端上性能做到公司同类产品前三，支撑高频迭代稳定上线。' },
        { icon: '👥', title: '团队管理经验（2019-2021）', desc: '从 0 到 1 组建并带领 15 人前端团队，负责远程交付中心，建立技术规范与 CI/CD 流程，保障多项目稳定交付，获评年度最牛程序员。' },
        { icon: '💰', title: '金融系统（2018-2019）', desc: '参与融智汇云平台前端交付，支撑平安、东方证券等大型金融机构落地，助力平台实现数千万级营收。' },
      ],
    },
    journey: {
      title: '职业历程',
      items: [
        {
          year: '2018',
          title: '初入职场',
          descParts: [
            '毕业加入 ',
            { text: '汉得信息', href: 'https://www.hand-china.com/' },
            '，开始前端开发生涯，开发移动端项目',
          ],
        },
        { year: '2019', title: '技术转型', desc: '从 Vue 转向 React，从移动端到 PC 端，担任前端组副组长，开始接触敏捷开发' },
        { year: '2020', title: '团队管理', desc: '担任前端组组长，带领 15 人团队负责远程交付中心，学会合理安排精力和时间' },
        {
          year: '2021',
          title: '互联网',
          descParts: [
            '加入 ',
            { text: '哈啰出行', href: 'https://www.hello-inc.com/' },
            '，开始 Electron 开发之旅，这是技术成长最快的时期',
          ],
        },
        { year: '2022', title: '创业项目', desc: '加入婚恋社交创业项目，从 0 到 1 完成产品开发，经历完整的 C 端产品生命周期' },
        { year: '2023', title: '晋升资深', desc: '晋升资深前端工程师，深度投入零信任安全产品，掌握 Electron + Rust 技术栈' },
        { year: '2024', title: '开始写作', desc: '开始技术写作，成为掘金优秀作者，Electron 文章爆款，建立个人品牌' },
        {
          year: '2025',
          title: 'AI 创业',
          descParts: [
            '加入 ',
            { text: 'Fellou AI', href: 'https://fellou.ai/' },
            ' 开发 AI Browser，定位为 AI 行动浏览器',
          ],
        },
        {
          year: '2026',
          title: '全栈转型',
          descParts: [
            '加入 ',
            { text: '华测导航', href: 'https://www.huace.cn/' },
            ' 转型全栈工程师，深耕精准农业，拥抱 AI Native 开发，成为 E 型人才',
          ],
        },
      ],
    },
    philosophy: {
      title: '技术理念',
      items: [
        '拥抱 AI，成为 E 型人才：AI 能力 + 品味 + 架构能力 + 续航能力',
        '主动性和能动性比单纯的编码能力更重要',
        '深刻理解业务，做好架构设计，让 AI 完成编码',
        '端到端闭环，单兵极限作战能力',
        '写作先服务自己，其次才是帮助他人',
        '生活不是未来，也不是过去，而是此刻',
      ],
    },
    hobbies: {
      title: '工作之外',
      items: [
        { icon: '📝', title: '技术写作', desc: '掘金优秀作者，周更技术文章，沉淀知识体系，Electron 系列文章爆款' },
        { icon: '🥾', title: '徒步爱好者', desc: '虎跳峡、五台山、黄山、章里古道...在大自然中放松心灵，三天徒步朝圣之旅' },
        { icon: '📷', title: '摄影', desc: '爱摄影的前端工程师，记录徒步途中的风景和生活中的美好瞬间' },
        { icon: '🌍', title: '探索', desc: '云南、新疆、香格里拉...感受不同地方的风土人情，走过多个省份' },
      ],
    },
    quote: {
      text: '"生活不是未来，也不是过去，而是此刻。"',
      author: '— 人生中最大的谎言就是不活在"此时此刻"',
    },
    contact: {
      title: '联系方式',
      items: [
        { icon: '🐙', text: 'GitHub - Xutaotaotao', link: 'https://github.com/Xutaotaotao' },
        { icon: '📝', text: '掘金 - 前端徐徐', link: 'https://juejin.cn/user/114004939255678' },
        { icon: '✉️', text: 'Email - xutaotao1108@outlook.com', link: 'mailto:xutaotao1108@outlook.com' },
      ],
    },
  },
  en: {
    title: 'Terence Xu',
    subtitle: 'Full-Stack Engineer · AI Native Developer · Open Source Contributor · Hiking Enthusiast',
    tags: [
      { icon: '⚡', text: '8 Years of Experience' },
      { icon: '🤖', text: 'AI Native' },
      { icon: '🌐', text: 'Full-Stack Development' },
      { icon: '✍️', text: 'Juejin Outstanding Author' },
      { icon: '🥾', text: 'Hiking & Photography' },
    ],
    about: {
      title: 'About Me',
      intro: [
        'Hi! I\'m Terence Xu (徐徐), a full-stack engineer with 8 years of experience, embracing AI Native development.',
        'From consulting firms to major internet companies, from execution to leading a 15-person team, from frontend specialist to full-stack engineer, and from traditional development to AI startups, my career has gone through multiple transitions.',
        'I currently focus on AI Native full-stack development, precision agriculture systems, big data map rendering, Flutter applications, and using AI tools (Claude, Codex, Cursor) to push creative boundaries.',
      ],
    },
    stats: [
      { number: '8', label: 'Years of Experience' },
      { number: '15', label: 'Team Management' },
      { number: '4', label: 'Companies Worked At' },
      { number: '10+', label: 'Project Experience' },
    ],
    tech: {
      title: 'Tech Stack',
      items: [
        { icon: '🎯', title: 'Full-Stack Development', desc: 'Java · Node.js · Express · Koa · Database · RESTful API · End-to-End Delivery' },
        { icon: '⚛️', title: 'Frontend Tech', desc: 'React · Vue · TypeScript · Electron · Taro · React-Native · Flutter' },
        { icon: '🤖', title: 'AI Native', desc: 'Cursor · Codex · Claude · Vibe Coding · AI-Assisted Development' },
        { icon: '🗺️', title: 'Map Rendering', desc: 'GeoServer · Big Data Visualization · Trajectory Rendering · Spatial Data · Canvas' },
        { icon: '🔧', title: 'Engineering', desc: 'Webpack · Vite · CI/CD · Docker · Performance Optimization · Automated Builds' },
        { icon: '🖥️', title: 'Desktop Apps', desc: 'Electron · Tauri · Chromium Core · Chrome Extensions · Rust' },
        { icon: '🌾', title: 'Precision Agriculture', desc: 'Machine Config · Path Planning · Data Analytics · Remote Sensing · Field Management' },
        { icon: '🔐', title: 'Security', desc: 'VPN · Zero Trust · Certificate Management · Policy Engine · XSS/CSRF Protection' },
      ],
    },
    highlights: {
      title: 'Work Highlights',
      items: [
        { icon: '🌾', title: 'Precision Agriculture System (2026)', desc: 'Led delivery of the precision agriculture system from 0 to 1 (Vibe Coding), shipping core capabilities including machine configuration, path planning, and field task analytics; delivered end-to-end and recognized by international customers.' },
        { icon: '🏗️', title: 'AI Browser Core Development (2025)', desc: 'Led the AI Browser desktop core architecture (Electron), landed a Chrome extension API compatibility layer within two weeks, supported Groups / Tabs core rework, and helped move the product from prototype to a shippable release.' },
        { icon: '🔐', title: 'Zero Trust Security Product (2023-2025)', desc: 'Led the zero-trust desktop client and operations backend architecture (Electron + Rust), covering multi-dimensional detection across process / software / hardware / compliance, supporting configuration, scheduling, and on-device execution for 10+ security policy types, and driving the critical optimization from "usable" to "scalable" in performance and experience.' },
        { icon: '💝', title: 'Dating Social Product (2022)', desc: 'Led delivery of the dating social mini program and app from 0 to 1, shipping the core matching and social loop; optimized startup and critical paths to reach top 3 performance among similar products in the company, supporting high-frequency iteration and stable releases.' },
        { icon: '👥', title: 'Team Management Experience (2019-2021)', desc: 'Built and led a 15-person frontend team from 0 to 1, owned the remote delivery center, established engineering standards and CI/CD workflows, ensured stable multi-project delivery, and was named Programmer of the Year.' },
        { icon: '💰', title: 'Financial System (2018-2019)', desc: 'Contributed to frontend delivery of the Rongzhihui cloud platform, supporting rollouts for Ping An, Orient Securities, and other major financial institutions, and helping the platform achieve tens of millions in revenue.' },
      ],
    },
    journey: {
      title: 'Career Journey',
      items: [
        {
          year: '2018',
          title: 'Early Career',
          descParts: [
            'After graduation, joined ',
            { text: 'Hand China', href: 'https://www.hand-china.com/' },
            ', started my frontend career, and built mobile projects',
          ],
        },
        { year: '2019', title: 'Tech Transition', desc: 'Transitioned from Vue to React, from mobile to PC, became deputy frontend team lead, and started working with Agile development' },
        { year: '2020', title: 'Team Management', desc: 'Became frontend team lead, led a 15-person team for the remote delivery center, and learned how to manage energy and time' },
        {
          year: '2021',
          title: 'Internet',
          descParts: [
            'Joined ',
            { text: 'Hellobike', href: 'https://www.hello-inc.com/' },
            ', started my Electron journey, and experienced the fastest period of technical growth',
          ],
        },
        { year: '2022', title: 'Startup Venture', desc: 'Joined a dating social startup, built the product from 0 to 1, and experienced the full consumer product lifecycle' },
        { year: '2023', title: 'Senior Promotion', desc: 'Promoted to senior frontend engineer, deeply invested in zero trust security products, and mastered the Electron + Rust stack' },
        { year: '2024', title: 'Started Writing', desc: 'Started technical writing, became a Juejin outstanding author, had viral Electron articles, and built a personal brand' },
        {
          year: '2025',
          title: 'AI Startup',
          descParts: [
            'Joined ',
            { text: 'Fellou AI', href: 'https://fellou.ai/' },
            ' to develop AI Browser, positioned as an AI action browser',
          ],
        },
        {
          year: '2026',
          title: 'Full-Stack Transition',
          descParts: [
            'Joined ',
            { text: 'CHC Navigation', href: 'https://www.huace.cn/' },
            ', transitioned to full-stack engineer, focused on precision agriculture, embraced AI Native development, and became E-shaped talent',
          ],
        },
      ],
    },
    philosophy: {
      title: 'Technical Philosophy',
      items: [
        'Embrace AI and become E-shaped talent: AI skills + taste + architecture + stamina',
        'Initiative and agency matter more than coding ability alone',
        'Understand the business deeply, design the architecture well, and let AI handle the coding',
        'End-to-end ownership with solo extreme execution capability',
        'Write for yourself first, then for others',
        'Life is not the future or the past; it is this moment',
      ],
    },
    hobbies: {
      title: 'Beyond Work',
      items: [
        { icon: '📝', title: 'Tech Writing', desc: 'Juejin outstanding author, weekly technical articles, building a knowledge system, and viral Electron series' },
        { icon: '🥾', title: 'Hiking Enthusiast', desc: 'Tiger Leaping Gorge, Mount Wutai, Huangshan, Zhangli Ancient Trail... relaxing in nature on multi-day pilgrimage hikes' },
        { icon: '📷', title: 'Photography', desc: 'A frontend engineer who loves photography, capturing scenery on hikes and beautiful moments in daily life' },
        { icon: '🌍', title: 'Exploration', desc: 'Yunnan, Xinjiang, Shangri-La... experiencing local cultures and traveling across many provinces' },
      ],
    },
    quote: {
      text: '"Life is not the future, nor the past, but this moment."',
      author: '— The biggest lie in life is not living in "this moment"',
    },
    contact: {
      title: 'Contact',
      items: [
        { icon: '🐙', text: 'GitHub - Xutaotaotao', link: 'https://github.com/Xutaotaotao' },
        { icon: '📝', text: 'Juejin - Terence Xu', link: 'https://juejin.cn/user/114004939255678' },
        { icon: '✉️', text: 'Email - xutaotao1108@outlook.com', link: 'mailto:xutaotao1108@outlook.com' },
      ],
    },
  },
}

const currentContent = computed(() => content[lang.value as keyof typeof content] || content.zh)

const recentWork = computed(() => workLog[lang.value].slice(0, 3))
const workLabels = computed(() => aboutWork[lang.value])

function isJourneyLink(part: string | { text: string; href: string }): part is { text: string; href: string } {
  return typeof part === 'object'
}
</script>

<template>
  <div class="about-page">
    <!-- Hero Card -->
    <div class="hero-card">
      <div class="hero-avatar">
        <img
          class="hero-avatar-image"
          src="/img/home-avatar-portrait-576.jpg"
          srcset="/img/home-avatar-portrait-576.jpg 432w, /img/home-avatar-portrait-768.jpg 768w"
          sizes="140px"
          width="140"
          height="140"
          fetchpriority="high"
          decoding="async"
          :alt="lang === 'zh' ? '徐徐在山间的照片' : 'Portrait of Terence in the mountains'"
        >
      </div>
      <h1>{{ currentContent.title }}</h1>
      <p class="hero-subtitle">{{ currentContent.subtitle }}</p>
      <div class="hero-tags">
        <span v-for="tag in currentContent.tags" :key="tag.text" class="hero-tag">
          {{ tag.icon }} {{ tag.text }}
        </span>
      </div>
    </div>

    <section class="about-card recent-work-card" aria-labelledby="recent-work-title">
      <div class="card-icon" aria-hidden="true">🛠️</div>
      <h2 id="recent-work-title" class="card-title">{{ workLabels.title }}</h2>
      <div class="timeline">
        <article v-for="item in recentWork" :key="item.id" class="timeline-item recent-work-entry">
          <time class="recent-work-date" :datetime="item.date">{{ item.date }}</time>
          <h3 class="recent-work-entry-title"><a :href="`${localizedPath('/work/')}#${item.id}`">{{ item.title }}</a></h3>
          <p>{{ item.summary }}</p>
        </article>
      </div>
      <a class="recent-work-more" :href="localizedPath('/work/')">{{ workLabels.allLabel }}<span aria-hidden="true"> →</span></a>
    </section>

    <!-- Masonry Grid -->
    <div class="masonry-grid">
      <!-- About Card -->
      <div class="about-card">
        <div class="card-icon">👋</div>
        <h2 class="card-title">{{ currentContent.about.title }}</h2>
        <div class="card-content">
          <p v-for="(text, index) in currentContent.about.intro" :key="index">{{ text }}</p>
        </div>
      </div>

      <!-- Stats Card -->
      <div class="about-card">
        <div class="card-icon">📊</div>
        <h2 class="card-title">{{ lang === 'zh' ? '工作概览' : 'Work Overview' }}</h2>
        <div class="stats-grid">
          <div v-for="stat in currentContent.stats" :key="stat.label" class="stat-item">
            <div class="stat-number">{{ stat.number }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <!-- Tech Stack Card - Tall -->
      <div class="about-card tech-stack-card">
        <div class="card-icon">💻</div>
        <h2 class="card-title">{{ currentContent.tech.title }}</h2>
        <div class="tech-grid">
          <div v-for="item in currentContent.tech.items" :key="item.title" class="tech-item">
            <div class="tech-item-title">{{ item.icon }} {{ item.title }}</div>
            <div class="tech-list">{{ item.desc }}</div>
          </div>
        </div>
      </div>

      <!-- Highlights Card -->
      <div class="about-card highlights-card">
        <div class="card-icon">✨</div>
        <h2 class="card-title">{{ currentContent.highlights.title }}</h2>
        <div class="timeline">
          <div v-for="item in currentContent.highlights.items" :key="item.title" class="timeline-item">
            <h4>{{ item.icon }} {{ item.title }}</h4>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>

      <!-- Career Journey Card - New -->
      <div class="about-card journey-card">
        <div class="card-icon">🚀</div>
        <h2 class="card-title">{{ currentContent.journey.title }}</h2>
        <div class="journey-timeline">
          <div v-for="item in currentContent.journey.items" :key="item.year" class="journey-item">
            <div class="journey-year">{{ item.year }}</div>
            <div class="journey-content">
              <h4>{{ item.title }}</h4>
              <p v-if="item.descParts">
                <template v-for="(part, index) in item.descParts" :key="index">
                  <a
                    v-if="isJourneyLink(part)"
                    class="journey-link"
                    :href="part.href"
                    target="_blank"
                    rel="noopener noreferrer"
                  >{{ part.text }}</a>
                  <template v-else>{{ part }}</template>
                </template>
              </p>
              <p v-else>{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Philosophy Card -->
      <div class="about-card">
        <div class="card-icon">💡</div>
        <h2 class="card-title">{{ currentContent.philosophy.title }}</h2>
        <div class="card-content">
          <ul class="bullet-list">
            <li v-for="item in currentContent.philosophy.items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>

      <!-- Hobbies Card -->
      <div class="about-card">
        <div class="card-icon">🌈</div>
        <h2 class="card-title">{{ currentContent.hobbies.title }}</h2>
        <div class="hobby-grid">
          <div v-for="item in currentContent.hobbies.items" :key="item.title" class="hobby-item">
            <div class="hobby-item-icon">{{ item.icon }}</div>
            <div class="hobby-item-content">
              <h4>{{ item.title }}</h4>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quote Card -->
      <div class="about-card quote-card">
        <div class="card-content quote-content">
          {{ currentContent.quote.text }}
          <div class="quote-author">{{ currentContent.quote.author }}</div>
        </div>
      </div>

      <!-- Contact Card -->
      <div class="about-card">
        <div class="card-icon">✉️</div>
        <h2 class="card-title">{{ currentContent.contact.title }}</h2>
        <div class="contact-links">
          <a
            v-for="item in currentContent.contact.items"
            :key="item.text"
            :href="item.link"
            class="contact-link"
            :target="item.link.startsWith('http') ? '_blank' : undefined"
            :rel="item.link.startsWith('http') ? 'noopener noreferrer' : undefined"
          >
            <span class="contact-icon">{{ item.icon }}</span>
            <span>{{ item.text }}</span>
          </a>
        </div>
        <div class="contact-qr">
          <p class="contact-qr-label">{{ copy[lang].qrContact }}</p>
          <img
            class="contact-qr-image"
            src="/wx_qr.jpeg"
            :alt="copy[lang].qrContact"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px 80px;
}

/* Recent work extends the existing card and timeline styles. */
.recent-work-card { margin-bottom: 32px; }
.recent-work-date { display: block; margin-bottom: 6px; color: var(--craft-muted); font-size: 12px; font-variant-numeric: tabular-nums; }
.recent-work-entry-title { margin: 0 0 8px; color: var(--craft-ink); font-size: 16px; font-weight: 600; line-height: 1.6; }
.recent-work-entry-title a { text-underline-offset: 4px; }
.recent-work-entry-title a:hover { color: var(--craft-accent); text-decoration: underline; }
.recent-work-more { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; margin-top: 20px; color: var(--craft-accent); font-size: 14px; font-weight: 600; text-underline-offset: 4px; }
.recent-work-more:hover { text-decoration: underline; }

/* Hero Card */
.hero-card {
  background: var(--craft-card);
  border: 1px solid var(--craft-rule);
  border-radius: 0;
  padding: 60px;
  text-align: center;
  margin-bottom: 32px;
}

.hero-avatar {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: var(--craft-card);
  border: 3px solid var(--craft-rule-strong);
  margin: 0 auto 24px;
  overflow: hidden;
  padding: 3px;
}

.hero-avatar-image {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center 98%;
}

.hero-card h1 {
  font-size: 48px;
  margin-bottom: 12px;
  font-weight: 800;
  font-family: var(--vp-font-family-mono);
  color: var(--craft-ink);
}

.hero-subtitle {
  font-size: 16px;
  margin-bottom: 32px;
  font-family: var(--vp-font-family-base);
  color: var(--craft-muted);
}

.hero-tags {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-tag {
  background: var(--craft-paper);
  padding: 8px 20px;
  border-radius: 0;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid var(--craft-rule);
  font-family: var(--vp-font-family-mono);
  color: var(--craft-soft);
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 800;
}

/* Masonry Grid */
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.about-card {
  background: var(--craft-card);
  border-radius: 0;
  padding: 32px;
  border: 1px solid var(--craft-rule);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.about-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--craft-accent);
}

.about-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: var(--craft-rule-strong);
}

.card-icon {
  font-size: 36px;
  margin-bottom: 20px;
  line-height: 1;
}

.card-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--craft-ink);
  margin-bottom: 16px;
  font-family: var(--vp-font-family-mono);
}

.card-content {
  font-size: 15px;
  color: var(--craft-muted);
  line-height: 1.7;
}

.card-content p {
  margin-bottom: 12px;
}

.card-content p:last-child {
  margin-bottom: 0;
}

.card-content strong {
  color: var(--craft-ink);
  font-weight: 600;
}

/* Tech Stack Card - Tall */
.tech-stack-card {
  grid-row: span 2;
}

/* Highlights Card - Tall */
.highlights-card {
  grid-row: span 2;
}

/* Journey Card - Tall */
.journey-card {
  grid-row: span 2;
}

.tech-grid {
  display: grid;
  gap: 16px;
  margin-top: 20px;
}

.tech-item {
  background: var(--craft-paper);
  padding: 16px;
  border-radius: 0;
  border: 1px solid var(--craft-rule);
}

.tech-item-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--craft-accent);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--vp-font-family-base);
}

.tech-list {
  font-size: 14px;
  color: var(--craft-muted);
  line-height: 1.8;
}

/* Stats Card */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 20px;
}

.stat-item {
  text-align: center;
  padding: 20px;
  background: var(--craft-paper);
  border-radius: 0;
  border: 1px solid var(--craft-rule);
}

.stat-number {
  font-size: 36px;
  font-weight: 700;
  color: var(--craft-accent);
  font-family: var(--vp-font-family-mono);
}

.stat-label {
  font-size: 12px;
  color: var(--craft-muted);
  margin-top: 8px;
  font-family: var(--vp-font-family-base);
}

/* Timeline */
.timeline {
  margin-top: 20px;
}

.timeline-item {
  position: relative;
  padding-left: 28px;
  padding-bottom: 24px;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 6px;
  width: 10px;
  height: 10px;
  background: var(--craft-accent);
  border-radius: 50%;
  box-shadow: 0 0 0 4px var(--craft-accent-soft);
}

.timeline-item::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 16px;
  width: 2px;
  height: calc(100% - 10px);
  background: var(--craft-rule);
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-item:last-child::after {
  display: none;
}

.timeline-item h4 {
  font-size: 16px;
  color: var(--craft-ink);
  margin-bottom: 6px;
  font-weight: 600;
  font-family: var(--vp-font-family-base);
}

.timeline-item p {
  font-size: 14px;
  color: var(--craft-muted);
  line-height: 1.6;
  margin: 0;
}

/* Hobby Cards */
.hobby-grid {
  display: grid;
  gap: 12px;
  margin-top: 20px;
}

.hobby-item {
  background: var(--craft-paper);
  padding: 16px;
  border-radius: 0;
  border: 1px solid var(--craft-rule);
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.hobby-item-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.hobby-item-content h4 {
  font-size: 15px;
  color: var(--craft-ink);
  margin-bottom: 4px;
  font-weight: 600;
  font-family: var(--vp-font-family-base);
}

.hobby-item-content p {
  font-size: 13px;
  color: var(--craft-muted);
  line-height: 1.6;
  margin: 0;
}

/* Quote Card */
.quote-card {
  background: var(--craft-card);
  border: 1px solid var(--craft-rule-strong);
}

.quote-content {
  font-size: 17px;
  font-style: italic;
  color: var(--craft-muted);
  text-align: center;
  line-height: 1.7;
  font-family: var(--vp-font-family-base);
}

.quote-author {
  text-align: center;
  font-size: 13px;
  color: var(--craft-muted);
  margin-top: 16px;
  font-style: normal;
}

/* Contact Card */
.contact-links {
  display: grid;
  gap: 12px;
  margin-top: 20px;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  background: var(--craft-paper);
  border: 1px solid var(--craft-rule);
  border-radius: 0;
  color: var(--craft-ink);
  text-decoration: none;
  transition: all 0.3s ease;
  font-family: var(--vp-font-family-base);
  font-size: 14px;
  font-weight: 500;
}

.contact-link:hover {
  background: var(--craft-card-strong);
  border-color: var(--craft-rule-strong);
  transform: translateX(4px);
}

.contact-icon {
  font-size: 20px;
}

.contact-qr {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid var(--craft-rule);
}

.contact-qr-label {
  margin: 0 0 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--craft-muted);
}

.contact-qr-image {
  display: block;
  max-width: 220px;
  width: 100%;
  height: auto;
  border: 1px solid var(--craft-rule);
  border-radius: 8px;
  object-fit: contain;
}

/* List Styles */
.bullet-list {
  list-style: none;
  margin-top: 12px;
  padding: 0;
}

.bullet-list li {
  padding-left: 20px;
  position: relative;
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--craft-muted);
  line-height: 1.6;
}

.bullet-list li:last-child {
  margin-bottom: 0;
}

.bullet-list li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--craft-accent);
  font-weight: bold;
}

/* Career Journey Timeline */
.journey-timeline {
  margin-top: 20px;
}

.journey-item {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  padding-bottom: 24px;
  position: relative;
}

.journey-item::after {
  content: '';
  position: absolute;
  left: 28px;
  top: 28px;
  width: 2px;
  height: calc(100% - 4px);
  background: var(--craft-rule);
}

.journey-item:last-child {
  padding-bottom: 0;
}

.journey-item:last-child::after {
  display: none;
}

.journey-year {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--craft-card-strong);
  border: 2px solid var(--craft-accent);
  color: var(--craft-accent);
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  font-weight: 800;
  position: relative;
  z-index: 1;
}

.journey-content {
  flex: 1;
  padding-top: 8px;
}

.journey-content h4 {
  font-size: 16px;
  color: var(--craft-ink);
  margin-bottom: 6px;
  font-weight: 600;
  font-family: var(--vp-font-family-base);
}

.journey-content p {
  font-size: 14px;
  color: var(--craft-muted);
  line-height: 1.6;
  margin: 0;
}

.journey-link {
  color: var(--craft-accent);
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--craft-accent) 40%, transparent);
  text-underline-offset: 3px;
  transition: color 0.2s ease;
}

.journey-link:hover {
  color: var(--craft-accent-strong);
}

@media (max-width: 768px) {
  .hero-card {
    padding: 40px 30px;
  }

  .hero-card h1 {
    font-size: 32px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .masonry-grid {
    grid-template-columns: 1fr;
  }

  .tech-stack-card,
  .highlights-card,
  .journey-card {
    grid-row: span 1;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .about-page {
    padding: 20px 14px 60px;
  }
}

@media (max-width: 520px) {
  .hero-avatar {
    width: 100px;
    height: 100px;
  }

  .hero-card h1 {
    font-size: 28px;
  }

  .hero-subtitle {
    font-size: 14px;
  }

  .hero-tags {
    gap: 8px;
  }

  .hero-tag {
    padding: 6px 14px;
    font-size: 12px;
  }

  .about-card {
    padding: 24px;
  }

  .card-icon {
    width: 48px;
    height: 48px;
    font-size: 24px;
  }

  .card-title {
    font-size: 20px;
  }
}
</style>
