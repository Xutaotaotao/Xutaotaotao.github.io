import DefaultTheme from 'vitepress/theme'
import { defineAsyncComponent } from 'vue'
import Layout from './Layout.vue'
import SideSponsors from './components/SideSponsors.vue'

const Electron = defineAsyncComponent(() => import('./components/Electron.vue'))
const Graph = defineAsyncComponent(() => import('./components/Graph.vue'))
const PhotoContent = defineAsyncComponent(() => import('./components/PhotoContent.vue'))
const Tauri = defineAsyncComponent(() => import('./components/Tauri.vue'))
import './style/tailwind.css'
import './style/main.css'
import './style/code.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Electron', Electron)
    app.component('Graph', Graph)
    app.component('PhotoContent', PhotoContent)
    app.component('SideSponsors', SideSponsors)
    app.component('Tauri', Tauri)
  },
}
