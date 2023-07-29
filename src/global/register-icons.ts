import type { App } from 'vue'
import * as ElementpluesIconsVue from '@element-plus/icons-vue'

function registerIcons(app: App<Element>) {
  for (const [key, component] of Object.entries(ElementpluesIconsVue)) {
    app.component(key, component)
  }
}

export default registerIcons
