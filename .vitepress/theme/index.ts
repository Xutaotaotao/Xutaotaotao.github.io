import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import SideSponsors from './components/SideSponsors.vue'
import NavVisitor from './components/NavVisitor.vue'
import Graph from './components/Graph.vue'

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
  }
}