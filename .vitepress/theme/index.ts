import DefaultTheme from 'vitepress/theme'
import Graph from './components/Graph.vue'
import Layout from './Layout.vue'
import './style/tailwind.css'
import './style/main.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Graph', Graph)
  },
}
