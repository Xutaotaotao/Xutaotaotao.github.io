import DefaultTheme from 'vitepress/theme'
import Electron from './components/Electron.vue'
import Graph from './components/Graph.vue'
import Layout from './Layout.vue'
import PhotoContent from './components/PhotoContent.vue'
import SideSponsors from './components/SideSponsors.vue'
import Tauri from './components/Tauri.vue'
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
