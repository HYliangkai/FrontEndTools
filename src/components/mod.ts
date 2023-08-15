import { App } from "vue";
import Svger from '@/components/svger/index.vue'

const convert_component = (component: any) => {
  return { name: component.name, component: component }
}
const register_components_list = [
  convert_component(Svger),
]
export const register_components = {
  install(app: App, options: any[]) {
    register_components_list.forEach((item) => {
      app.component(item.name, item.component)
    })
  }
}
