# Taotao Blog Hexo Flattening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the current VitePress blog into a Hexo-like flattened reading experience with only Home, Archive, Categories, Tags, and About at the top level, while keeping the existing markdown source folders in place.

**Architecture:** Keep markdown files where they are, but replace the current section-driven presentation with a unified article index generated from `posts.data.mts`. Use one normalized post model for home, archive, categories, tags, and article metadata, and exclude non-article product/legal pages from that stream.

**Tech Stack:** VitePress, Vue 3 SFCs, TypeScript, custom theme components, Node-based design check script

---

### Task 1: Define the flattened article model and route surface

**Files:**
- Modify: `.vitepress/theme/posts.data.mts`
- Modify: `.vitepress/theme/content.ts`
- Modify: `scripts/check-design.mjs`
- Create: `categories/index.md`
- Create: `tags/index.md`
- Modify: `archive/index.md`
- Modify: `about/index.md`
- Delete or stop using: `notes/index.md`

- [ ] Define which markdown files are included in the article stream and which are excluded.
- [ ] Normalize each article into one record with `id`, `title`, `excerpt`, `date`, `year`, `href`, `category`, `tags`, and any home-page ordering helpers.
- [ ] Add deterministic category and tag fallback rules for posts missing explicit frontmatter.
- [ ] Update design checks so the target structure is provable from built output.

### Task 2: Rebuild listing logic around flattened data

**Files:**
- Modify: `.vitepress/theme/components/ListingPage.vue`
- Modify: `.vitepress/theme/Layout.vue`

- [ ] Replace the current `archive / notes / about` branching with a route-kind system that supports `archive`, `categories`, `tags`, and `about`.
- [ ] Make archive page render all article posts in a flattened timeline.
- [ ] Make categories page render category groups and counts from the unified post index.
- [ ] Make tags page render tag groups and counts from the unified post index.
- [ ] Keep about page as a standalone non-article page.

### Task 3: Rebuild the home page for the new taxonomy model

**Files:**
- Modify: `.vitepress/theme/components/HomeView.vue`
- Modify: `.vitepress/theme/content.ts`

- [ ] Replace the current hero + featured-only structure with a home view that highlights the latest posts plus taxonomy summaries.
- [ ] Surface category and tag overviews using the same flattened post data.
- [ ] Keep the existing visual language, but remove obsolete copy that refers to short notes or old section navigation.

### Task 4: Replace the navigation and supporting labels

**Files:**
- Modify: `.vitepress/theme/components/SiteNav.vue`
- Modify: `.vitepress/theme/content.ts`
- Modify: `.vitepress/config.mts`

- [ ] Replace the top-level navigation with only `首页 / 归档 / 分类 / 标签 / 关于`.
- [ ] Remove section-specific desktop nav entries from the custom nav component.
- [ ] Keep external project links out of the primary reading nav.

### Task 5: Add visual support for taxonomy pages and article metadata

**Files:**
- Modify: `.vitepress/theme/style/main.css`
- Modify: `.vitepress/theme/components/ListingPage.vue`

- [ ] Add styles for category groups, tag groups, counts, chips, and archive year sections.
- [ ] Add article category/tag metadata blocks where useful on listing surfaces.
- [ ] Preserve responsive behavior and avoid horizontal overflow.

### Task 6: Verify build output and local behavior

**Files:**
- Modify as needed from previous tasks

- [ ] Run `yarn docs:build`.
- [ ] Run `yarn design:check`.
- [ ] Verify the built output contains Home, Archive, Categories, Tags, and About surfaces.
- [ ] Verify the custom nav and listing pages work at desktop and mobile widths.
