import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { relative, resolve } from 'node:path'

import { buildBlogIndexByLocale } from '../.vitepress/theme/lib/blog-data.mjs'
import {
  getLocaleFromPath,
  stripLocalePrefix,
  withLocale,
  localizeProjectHref,
} from '../.vitepress/theme/lib/site-locale.mjs'

function walkMarkdownFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name)

    if (entry.isDirectory()) {
      files.push(...walkMarkdownFiles(fullPath))
      continue
    }

    if (entry.isFile() && fullPath.endsWith('.md')) {
      files.push(fullPath)
    }
  }

  return files
}

test('locale route helpers map Chinese and English routes', () => {
  assert.equal(getLocaleFromPath('/'), 'zh')
  assert.equal(getLocaleFromPath('/archive/'), 'zh')
  assert.equal(getLocaleFromPath('/en/'), 'en')
  assert.equal(getLocaleFromPath('/en/archive/'), 'en')

  assert.equal(stripLocalePrefix('/en/archive/'), '/archive/')
  assert.equal(stripLocalePrefix('/en/feMap/browser/dom-cssom.html'), '/feMap/browser/dom-cssom/')

  assert.equal(withLocale('/archive/', 'en'), '/en/archive/')
  assert.equal(withLocale('/en/tags/', 'zh'), '/tags/')
})

test('project href helper localizes internal project pages and preserves external links', () => {
  assert.equal(localizeProjectHref('/GutEase/product', 'en'), '/en/GutEase/product')
  assert.equal(localizeProjectHref('/GutEase/product', 'zh'), '/GutEase/product')
  assert.equal(
    localizeProjectHref('https://github.com/Xutaotaotao/get-installed-apps', 'en', true),
    'https://github.com/Xutaotaotao/get-installed-apps',
  )
})

test('buildBlogIndexByLocale separates mirrored routes into zh and en datasets', () => {
  const siteData = buildBlogIndexByLocale(
    [
      {
        url: '/feMap/browser/dom-cssom.html',
        frontmatter: {
          title: '浏览器渲染的基石：DOM Tree 与 CSSOM',
        },
        src: '# 浏览器渲染的基石：DOM Tree 与 CSSOM\n\n这是一篇中文文章。',
      },
      {
        url: '/en/feMap/browser/dom-cssom.html',
        frontmatter: {
          title: 'The Rendering Foundation: DOM Tree and CSSOM',
        },
        src: '# The Rendering Foundation: DOM Tree and CSSOM\n\nThis is an English article.',
      },
    ],
    {
      getCreatedDate: () => '2024-09-01',
    },
  )

  assert.equal(siteData.zh.posts.length, 1)
  assert.equal(siteData.en.posts.length, 1)

  assert.equal(siteData.zh.posts[0].href, '/feMap/browser/dom-cssom.html')
  assert.equal(siteData.en.posts[0].href, '/en/feMap/browser/dom-cssom.html')
  assert.equal(siteData.en.posts[0].source, 'feMap/browser/dom-cssom.md')
  assert.equal(siteData.en.postsBySource['feMap/browser/dom-cssom.md'].title, 'The Rendering Foundation: DOM Tree and CSSOM')
  assert.equal(siteData.en.categoryGroups[0].name, 'Knowledge Map')
  assert.ok(siteData.en.tagGroups.some((group) => group.name === 'Browser'))
})

test('buildBlogIndexByLocale excludes non-article static pages from article datasets', () => {
  const siteData = buildBlogIndexByLocale(
    [
      {
        url: '/notes/blogReset.html',
        frontmatter: {
          title: '博客改版记录的随想',
        },
        src: '# 博客改版记录的随想\n\n这是一篇中文文章。',
      },
      {
        url: '/en/summary/electron/why_choose_electron.html',
        frontmatter: {
          title: 'Why Choose Electron',
        },
        src: '# Why Choose Electron\n\nThis is an English article.',
      },
      {
        url: '/GutEase/product.html',
        frontmatter: {
          title: '肠安记产品页',
        },
        src: '# 肠安记产品页\n\n这是一个静态项目页面。',
      },
      {
        url: '/en/electron/index.html',
        frontmatter: {
          title: 'Electron',
        },
        src: '# Electron\n\nThis is a static landing page.',
      },
    ],
    {
      getCreatedDate: () => '2024-09-01',
    },
  )

  assert.deepEqual(siteData.zh.posts.map((post) => post.href), ['/notes/blogReset.html'])
  assert.deepEqual(siteData.en.posts.map((post) => post.href), ['/en/summary/electron/why_choose_electron.html'])
  assert.equal(siteData.zh.postsByHref['/GutEase/product.html'], undefined)
  assert.equal(siteData.en.postsByHref['/en/electron/index.html'], undefined)
})

test('current bilingual rollout includes the expected mirrored English articles', () => {
  const root = process.cwd()
  const expected = [
    'en/notes/blogReset.md',
    'en/question/javascript/apply_call_bind.md',
    'en/question/javascript/asynchronous_solution.md',
    'en/question/javascript/carbage_recovery_mechanism.md',
    'en/question/javascript/js_modularization.md',
    'en/question/javascript/shallow_copy_and_deep_copy.md',
    'en/question/javascript/storage_method_in_web_applications.md',
    'en/question/network/cross_domain_solution.md',
    'en/question/network/http_and_https.md',
    'en/question/network/tcp_and_udp.md',
    'en/question/network/what_steps_after_entering_the_url.md',
    'en/question/react/react_components_props.md',
    'en/question/react/react_styling_solutions.md',
    'en/question/sundry/JSBridge.md',
    'en/question/vue/component_communication_method.md',
    'en/question/vue/dom_and_virtual_dom.md',
    'en/question/vue/vue2_vue3.md',
    'en/question/vue/vue_react.md',
    'en/summary/terminal/mac.md',
    'en/summary/terminal/windows.md',
    'en/summary/practice/image-slicing.md',
    'en/summary/practice/node_install_app.md',
    'en/summary/practice/react_i18.md',
    'en/summary/practice/taro_img_share.md',
    'en/summary/practice/tasklist_implement.md',
    'en/summary/practice/vue_keep_alive.md',
    'en/summary/practice/window_ai.md',
    'en/summary/tauri/how_about_tauri.md',
    'en/summary/tauri/tauri_ci_cd.md',
    'en/summary/tauri/tauri_config.md',
    'en/summary/tauri/tauri_db.md',
    'en/summary/tauri/tauri_http.md',
    'en/summary/tauri/tauri_log.md',
    'en/summary/tauri/tauri_menu.md',
    'en/summary/tauri/tauri_native.md',
    'en/summary/tauri/tauri_project.md',
    'en/summary/tauri/tauri_theme.md',
    'en/summary/tauri/tauri_wukong_wallpaper.md',
    'en/summary/electron/application_packaging.md',
    'en/summary/electron/application_update.md',
    'en/summary/electron/cross_process_communication.md',
    'en/summary/electron/development_technology_selection.md',
    'en/summary/electron/electron-min-window.md',
    'en/summary/electron/electron_frame.md',
    'en/summary/electron/electron_sqlite.md',
    'en/summary/electron/electron_summer.md',
    'en/summary/electron/native_module_call_development.md',
    'en/summary/electron/network_request.md',
    'en/summary/electron/talk_about_electron.md',
    'en/summary/electron/tauri_webview.md',
    'en/summary/electron/vite_electron_react.md',
    'en/summary/electron/why_choose_electron.md',
  ]

  for (const relativePath of expected) {
    assert.equal(
      existsSync(resolve(root, relativePath)),
      true,
      `${relativePath} should exist`,
    )
  }
})

test('current bilingual rollout includes mirrored English static pages', () => {
  const root = process.cwd()
  const expected = [
    'en/summary/index.md',
    'en/question/index.md',
    'en/notes/index.md',
    'en/electron/index.md',
    'en/tauri/index.md',
    'en/photo/index.md',
    'en/GutEase/index.md',
    'en/GutEase/product.md',
    'en/GutEase/privacy.md',
    'en/README.md',
  ]

  for (const relativePath of expected) {
    assert.equal(
      existsSync(resolve(root, relativePath)),
      true,
      `${relativePath} should exist`,
    )
  }
})

test('custom static entry pages declare explicit localized titles', () => {
  const root = process.cwd()
  const expectedTitles = new Map([
    ['electron/index.md', 'Electron 专题'],
    ['en/electron/index.md', 'Electron'],
    ['tauri/index.md', 'Tauri 专题'],
    ['en/tauri/index.md', 'Tauri'],
    ['photo/index.md', '摄影记录'],
    ['en/photo/index.md', 'Photography'],
    ['feMap/index.md', '前端知识图谱'],
    ['en/feMap/index.md', 'Frontend Knowledge Graph'],
  ])

  for (const [relativePath, expectedTitle] of expectedTitles) {
    const content = readFileSync(resolve(root, relativePath), 'utf8')
    const match = content.match(/^title:\s*(.+)$/m)
    assert.equal(match?.[1]?.trim(), expectedTitle, `${relativePath} should declare title: ${expectedTitle}`)
  }
})

test('Graph component uses bundled G6 import instead of relying on a global window.G6 runtime', () => {
  const root = process.cwd()
  const content = readFileSync(resolve(root, '.vitepress/theme/components/Graph.vue'), 'utf8')

  assert.equal(content.includes('const { Graph, treeToGraphData } = G6;'), false)
  assert.equal(content.includes("import { Graph as G6Graph, treeToGraphData } from '@antv/g6'"), true)
  assert.equal(content.includes('window.G6'), false)
})

test('transformPageData injects locale-specific keywords metadata instead of sharing Chinese keywords globally', async () => {
  const configModule = await import('../.vitepress/config.mts')
  const config = configModule.default

  const zhPage = { relativePath: 'index.md', frontmatter: { head: [] } }
  config.transformPageData(zhPage)

  const enPage = { relativePath: 'en/index.md', frontmatter: { head: [] } }
  config.transformPageData(enPage)

  const zhKeywords = zhPage.frontmatter.head.find(([tag, attrs]) => tag === 'meta' && attrs?.name === 'keywords')?.[1]?.content
  const enKeywords = enPage.frontmatter.head.find(([tag, attrs]) => tag === 'meta' && attrs?.name === 'keywords')?.[1]?.content
  const hasGlobalKeywordsMeta = config.head.some(([tag, attrs]) => tag === 'meta' && attrs?.name === 'keywords')

  assert.match(zhKeywords, /前端徐徐/)
  assert.match(enKeywords, /Terence Xu/)
  assert.equal(enKeywords.includes('前端徐徐'), false)
  assert.equal(hasGlobalKeywordsMeta, false)
})

test('current English markdown content does not contain empty image alt text', () => {
  const root = process.cwd()
  const markdownFiles = walkMarkdownFiles(resolve(root, 'en'))
  const offenders = markdownFiles
    .filter((filePath) => /!\[\]\(/.test(readFileSync(filePath, 'utf8')))
    .map((filePath) => relative(root, filePath))

  assert.deepEqual(offenders, [])
})

test('home hero separates the large name heading from smaller supporting copy', () => {
  const root = process.cwd()
  const homeView = readFileSync(resolve(root, '.vitepress/theme/components/HomeView.vue'), 'utf8')
  const content = readFileSync(resolve(root, '.vitepress/theme/content.ts'), 'utf8')

  assert.match(homeView, /copy\[lang\]\.heroName/, 'HomeView should render a dedicated heroName heading')
  assert.match(homeView, /copy\[lang\]\.heroLead/, 'HomeView should keep a smaller intro line')
  assert.match(content, /heroName:\s*'徐徐/, 'Chinese home copy should define a heroName')
  assert.match(content, /heroName:\s*'Terence/, 'English home copy should define a heroName')
})

test('first-wave English knowledge-map and interview diagrams use localized project assets instead of shared source images', () => {
  const root = process.cwd()
  const expectedRefs = new Map([
    ['en/feMap/browser/dom-cssom.md', [
      '/images/i18n/dom-cssom-en-dom-flow.svg',
      '/images/i18n/dom-cssom-en-cssom-flow.svg',
      '/images/i18n/dom-cssom-en-render-tree.svg',
    ]],
    ['en/feMap/developMap/codeSpecifications.md', [
      '/images/i18n/code-specs-en-style-guides.svg',
      '/images/i18n/code-specs-en-css-naming.svg',
      '/images/i18n/code-specs-en-tooling.svg',
    ]],
    ['en/feMap/developMap/develop.md', [
      '/images/i18n/develop-en-dev-server.svg',
      '/images/i18n/develop-en-hmr.svg',
    ]],
    ['en/feMap/developMap/scaffold.md', [
      '/images/i18n/scaffold-en-timeline.svg',
      '/images/i18n/scaffold-en-workflow.svg',
    ]],
    ['en/question/network/http_and_https.md', [
      '/images/i18n/http-https-en-flow.svg',
    ]],
    ['en/question/react/react_components_props.md', [
      '/images/i18n/react-component-props-en-map.svg',
    ]],
    ['en/question/react/react_styling_solutions.md', [
      '/images/i18n/react-styling-en-map.svg',
    ]],
    ['en/summary/tauri/how_about_tauri.md', [
      '/images/i18n/tauri-architecture-en.svg',
    ]],
    ['en/summary/electron/application_update.md', [
      '/images/i18n/electron-update-en-dialog.svg',
      '/images/i18n/electron-update-en-server.svg',
    ]],
    ['en/summary/tauri/tauri_http.md', [
      '/images/i18n/tauri-http-en-demo.svg',
    ]],
    ['en/summary/tauri/tauri_log.md', [
      '/images/i18n/tauri-log-en-console.svg',
    ]],
    ['en/summary/practice/image-slicing.md', [
      '/images/i18n/image-slicing-en-demo.svg',
    ]],
    ['en/summary/electron/why_choose_electron.md', [
      '/images/i18n/electron-why-architecture-en.svg',
      '/images/i18n/electron-why-cross-platform-en.svg',
      '/images/i18n/electron-why-framework-comparison-en.svg',
      '/images/i18n/electron-why-ecosystem-en.svg',
      '/images/i18n/electron-why-apps-en.svg',
      '/images/i18n/electron-why-detect-command-en.svg',
    ]],
    ['en/summary/tauri/tauri_ci_cd.md', [
      '/images/i18n/tauri-cicd-en-overview.svg',
      '/images/i18n/tauri-cicd-en-build-flow.svg',
      '/images/i18n/tauri-cicd-en-actions-build.svg',
      '/images/i18n/tauri-cicd-en-release-assets.svg',
      '/images/i18n/tauri-cicd-en-permission-error.svg',
      '/images/i18n/tauri-cicd-en-actions-settings-1.svg',
      '/images/i18n/tauri-cicd-en-actions-settings-2.svg',
    ]],
    ['en/summary/tauri/tauri_theme.md', [
      '/images/i18n/tauri-theme-en-flow.svg',
      '/images/i18n/tauri-theme-en-windows-confirm.svg',
      '/images/i18n/tauri-theme-en-light.svg',
      '/images/i18n/tauri-theme-en-dark.svg',
    ]],
    ['en/summary/tauri/tauri_native.md', [
      '/images/i18n/tauri-native-en-slicing-tool.svg',
      '/images/i18n/tauri-native-en-download-flow.svg',
    ]],
    ['en/summary/electron/development_technology_selection.md', [
      '/images/i18n/electron-tech-choice-en-databases.svg',
      '/images/i18n/electron-tech-choice-en-logging.svg',
      '/images/i18n/electron-tech-choice-en-packaging.svg',
    ]],
    ['en/summary/electron/network_request.md', [
      '/images/i18n/electron-network-en-request-demo.svg',
    ]],
    ['en/summary/electron/electron_frame.md', [
      '/images/i18n/electron-frame-en-core.svg',
      '/images/i18n/electron-frame-en-ipc.svg',
      '/images/i18n/electron-frame-en-source-tree.svg',
    ]],
    ['en/summary/electron/vite_electron_react.md', [
      '/images/i18n/electron-vite-en-create-vite.svg',
      '/images/i18n/electron-vite-en-split-structure.svg',
      '/images/i18n/electron-vite-en-render-dev.svg',
      '/images/i18n/electron-vite-en-main-dev.svg',
      '/images/i18n/electron-vite-en-running-app.svg',
    ]],
    ['en/summary/electron/cross_process_communication.md', [
      '/images/i18n/electron-ipc-en-preload-structure.svg',
      '/images/i18n/electron-ipc-en-preload-error.svg',
      '/images/i18n/electron-ipc-en-work-structure.svg',
      '/images/i18n/electron-ipc-en-hidden-work-window.svg',
      '/images/i18n/electron-ipc-en-forward-message.svg',
      '/images/i18n/electron-ipc-en-message-port.svg',
    ]],
    ['en/summary/electron/electron_summer.md', [
      '/images/i18n/electron-summer-en-cover.svg',
      '/images/i18n/electron-summer-en-origin.svg',
      '/images/i18n/electron-summer-en-timeline.svg',
      '/images/i18n/electron-summer-en-github-ecosystem.svg',
      '/images/i18n/electron-summer-en-npm-ecosystem.svg',
      '/images/i18n/electron-summer-en-apps.svg',
      '/images/i18n/electron-summer-en-framework-comparison.svg',
    ]],
    ['en/summary/electron/native_module_call_development.md', [
      '/images/i18n/electron-native-en-linux-benchmark.svg',
      '/images/i18n/electron-native-en-windows-benchmark.svg',
      '/images/i18n/electron-native-en-napi-create.svg',
      '/images/i18n/electron-native-en-napi-structure.svg',
      '/images/i18n/electron-native-en-node-binary.svg',
      '/images/i18n/electron-native-en-electron-rust-structure.svg',
    ]],
    ['en/summary/electron/talk_about_electron.md', [
      '/images/i18n/electron-thoughts-en-showcase.svg',
      '/images/i18n/electron-thoughts-en-architecture.svg',
      '/images/i18n/electron-thoughts-en-update-capabilities.svg',
      '/images/i18n/electron-thoughts-en-task-queue.svg',
    ]],
    ['en/summary/practice/chatui_julep.md', [
      '/images/i18n/julep-chatui-en-frontend-preview.svg',
      '/images/i18n/julep-chatui-en-api-token.svg',
      '/images/i18n/julep-chatui-en-demo-1.svg',
      '/images/i18n/julep-chatui-en-demo-2.svg',
    ]],
    ['en/summary/practice/window_ai.md', [
      '/images/i18n/window-ai-en-prompt-flag.svg',
      '/images/i18n/window-ai-en-optimization-flag.svg',
      '/images/i18n/window-ai-en-hardware-requirements.svg',
      '/images/i18n/window-ai-en-availability-check.svg',
      '/images/i18n/window-ai-en-console-response.svg',
      '/images/i18n/window-ai-en-summary-demo.svg',
    ]],
    ['en/summary/tauri/tauri_project.md', [
      '/images/i18n/tauri-project-en-create-cli.svg',
      '/images/i18n/tauri-project-en-starter-app.svg',
      '/images/i18n/tauri-project-en-identifier-error.svg',
      '/images/i18n/tauri-project-en-build-output.svg',
    ]],
    ['en/summary/tauri/tauri_wukong_wallpaper.md', [
      '/images/i18n/tauri-wukong-en-windows-app.svg',
      '/images/i18n/tauri-wukong-en-macos-app.svg',
      '/images/i18n/tauri-wukong-en-main-flow.svg',
      '/images/i18n/tauri-wukong-en-tray-flow.svg',
      '/images/i18n/tauri-wukong-en-macos-permission.svg',
      '/images/i18n/tauri-wukong-en-windows-warning.svg',
    ]],
  ])

  for (const [relativePath, refs] of expectedRefs) {
    const content = readFileSync(resolve(root, relativePath), 'utf8')

    for (const ref of refs) {
      assert.equal(content.includes(ref), true, `${relativePath} should reference ${ref}`)
      assert.equal(existsSync(resolve(root, `public${ref}`)), true, `${ref} should exist in public assets`)
    }
  }
})
