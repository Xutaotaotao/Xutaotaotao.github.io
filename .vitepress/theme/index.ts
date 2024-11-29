import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import SideSponsors from './components/SideSponsors.vue'
import NavVisitor from './components/NavVisitor.vue'
import Graph from './components/Graph.vue'
import PhotoContent from './components/PhotoContent.vue'
import Electron from './components/Electron.vue'
import Tauri from './components/Tauri.vue'


export default   {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout,null,{
      'nav-bar-title-after': () => h(NavVisitor),
      'aside-bottom': () => h(SideSponsors)
    })
  },
  enhanceApp({app}) {
    app.component('Graph' , Graph)
    app.component('PhotoContent',PhotoContent)
    app.component('Electron',Electron)
    app.component('Tauri',Tauri)
  }
}