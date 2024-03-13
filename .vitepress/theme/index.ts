import { h, watch } from 'vue'
import { useData, EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import SideSponsors from './components/SideSponsors.vue'

export default   {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout,null,{
      'aside-bottom': () => h(SideSponsors)
    })
  }
}