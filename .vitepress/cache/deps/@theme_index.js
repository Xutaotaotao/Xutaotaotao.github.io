import {
  useMediaQuery
} from "./chunk-CQNJJOBD.js";
import {
  computed,
  ref
} from "./chunk-G3CMYKT2.js";

// node_modules/vitepress/dist/client/theme-default/index.js
import "/Users/xutaotao/Documents/s/Xutaotaotao.github.io/node_modules/vitepress/dist/client/theme-default/styles/fonts.css";

// node_modules/vitepress/dist/client/theme-default/without-fonts.js
import "/Users/xutaotao/Documents/s/Xutaotaotao.github.io/node_modules/vitepress/dist/client/theme-default/styles/vars.css";
import "/Users/xutaotao/Documents/s/Xutaotaotao.github.io/node_modules/vitepress/dist/client/theme-default/styles/base.css";
import "/Users/xutaotao/Documents/s/Xutaotaotao.github.io/node_modules/vitepress/dist/client/theme-default/styles/utils.css";
import "/Users/xutaotao/Documents/s/Xutaotaotao.github.io/node_modules/vitepress/dist/client/theme-default/styles/components/custom-block.css";
import "/Users/xutaotao/Documents/s/Xutaotaotao.github.io/node_modules/vitepress/dist/client/theme-default/styles/components/vp-code.css";
import "/Users/xutaotao/Documents/s/Xutaotaotao.github.io/node_modules/vitepress/dist/client/theme-default/styles/components/vp-code-group.css";
import "/Users/xutaotao/Documents/s/Xutaotaotao.github.io/node_modules/vitepress/dist/client/theme-default/styles/components/vp-doc.css";
import "/Users/xutaotao/Documents/s/Xutaotaotao.github.io/node_modules/vitepress/dist/client/theme-default/styles/components/vp-sponsor.css";
import VPBadge from "/Users/xutaotao/Documents/s/Xutaotaotao.github.io/node_modules/vitepress/dist/client/theme-default/components/VPBadge.vue";
import Layout from "/Users/xutaotao/Documents/s/Xutaotaotao.github.io/node_modules/vitepress/dist/client/theme-default/Layout.vue";
import { default as default2 } from "/Users/xutaotao/Documents/s/Xutaotaotao.github.io/node_modules/vitepress/dist/client/theme-default/components/VPHomeHero.vue";
import { default as default3 } from "/Users/xutaotao/Documents/s/Xutaotaotao.github.io/node_modules/vitepress/dist/client/theme-default/components/VPHomeFeatures.vue";
import { default as default4 } from "/Users/xutaotao/Documents/s/Xutaotaotao.github.io/node_modules/vitepress/dist/client/theme-default/components/VPHomeSponsors.vue";
import { default as default5 } from "/Users/xutaotao/Documents/s/Xutaotaotao.github.io/node_modules/vitepress/dist/client/theme-default/components/VPDocAsideSponsors.vue";
import { default as default6 } from "/Users/xutaotao/Documents/s/Xutaotaotao.github.io/node_modules/vitepress/dist/client/theme-default/components/VPTeamPage.vue";
import { default as default7 } from "/Users/xutaotao/Documents/s/Xutaotaotao.github.io/node_modules/vitepress/dist/client/theme-default/components/VPTeamPageTitle.vue";
import { default as default8 } from "/Users/xutaotao/Documents/s/Xutaotaotao.github.io/node_modules/vitepress/dist/client/theme-default/components/VPTeamPageSection.vue";
import { default as default9 } from "/Users/xutaotao/Documents/s/Xutaotaotao.github.io/node_modules/vitepress/dist/client/theme-default/components/VPTeamMembers.vue";

// node_modules/vitepress/dist/client/shared.js
var inBrowser = typeof document !== "undefined";

// node_modules/vitepress/dist/client/theme-default/support/utils.js
import { withBase } from "vitepress";

// node_modules/vitepress/dist/client/theme-default/composables/data.js
import { useData as useData$ } from "vitepress";
var useData = useData$;

// node_modules/vitepress/dist/client/theme-default/support/utils.js
function ensureStartingSlash(path) {
  return /^\//.test(path) ? path : `/${path}`;
}

// node_modules/vitepress/dist/client/theme-default/support/sidebar.js
function getSidebar(_sidebar, path) {
  if (Array.isArray(_sidebar))
    return addBase(_sidebar);
  if (_sidebar == null)
    return [];
  path = ensureStartingSlash(path);
  const dir = Object.keys(_sidebar).sort((a, b) => {
    return b.split("/").length - a.split("/").length;
  }).find((dir2) => {
    return path.startsWith(ensureStartingSlash(dir2));
  });
  const sidebar = dir ? _sidebar[dir] : [];
  return Array.isArray(sidebar) ? addBase(sidebar) : addBase(sidebar.items, sidebar.base);
}
function getSidebarGroups(sidebar) {
  const groups = [];
  let lastGroupIndex = 0;
  for (const index in sidebar) {
    const item = sidebar[index];
    if (item.items) {
      lastGroupIndex = groups.push(item);
      continue;
    }
    if (!groups[lastGroupIndex]) {
      groups.push({ items: [] });
    }
    groups[lastGroupIndex].items.push(item);
  }
  return groups;
}
function addBase(items, _base) {
  return [...items].map((_item) => {
    const item = { ..._item };
    const base = item.base || _base;
    if (base && item.link)
      item.link = base + item.link;
    if (item.items)
      item.items = addBase(item.items, base);
    return item;
  });
}

// node_modules/vitepress/dist/client/theme-default/composables/sidebar.js
function useSidebar() {
  const { frontmatter, page, theme: theme2 } = useData();
  const is960 = useMediaQuery("(min-width: 960px)");
  const isOpen = ref(false);
  const sidebar = computed(() => {
    const sidebarConfig = theme2.value.sidebar;
    const relativePath = page.value.relativePath;
    return sidebarConfig ? getSidebar(sidebarConfig, relativePath) : [];
  });
  const hasSidebar = computed(() => {
    return frontmatter.value.sidebar !== false && sidebar.value.length > 0 && frontmatter.value.layout !== "home";
  });
  const leftAside = computed(() => {
    if (hasAside)
      return frontmatter.value.aside == null ? theme2.value.aside === "left" : frontmatter.value.aside === "left";
    return false;
  });
  const hasAside = computed(() => {
    if (frontmatter.value.layout === "home")
      return false;
    if (frontmatter.value.aside != null)
      return !!frontmatter.value.aside;
    return theme2.value.aside !== false;
  });
  const isSidebarEnabled = computed(() => hasSidebar.value && is960.value);
  const sidebarGroups = computed(() => {
    return hasSidebar.value ? getSidebarGroups(sidebar.value) : [];
  });
  function open() {
    isOpen.value = true;
  }
  function close() {
    isOpen.value = false;
  }
  function toggle() {
    isOpen.value ? close() : open();
  }
  return {
    isOpen,
    sidebar,
    sidebarGroups,
    hasSidebar,
    hasAside,
    leftAside,
    isSidebarEnabled,
    open,
    close,
    toggle
  };
}
var hashRef = ref(inBrowser ? location.hash : "");
if (inBrowser) {
  window.addEventListener("hashchange", () => {
    hashRef.value = location.hash;
  });
}

// node_modules/vitepress/dist/client/theme-default/without-fonts.js
var theme = {
  Layout,
  enhanceApp: ({ app }) => {
    app.component("Badge", VPBadge);
  }
};
var without_fonts_default = theme;
export {
  default5 as VPDocAsideSponsors,
  default3 as VPHomeFeatures,
  default2 as VPHomeHero,
  default4 as VPHomeSponsors,
  default9 as VPTeamMembers,
  default6 as VPTeamPage,
  default8 as VPTeamPageSection,
  default7 as VPTeamPageTitle,
  without_fonts_default as default,
  useSidebar
};
//# sourceMappingURL=@theme_index.js.map
