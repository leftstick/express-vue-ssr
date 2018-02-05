import { Button } from 'element-ui'
import MainHeader from './MainHeader.vue'

export function installBasis(Vue) {
  Vue.use(Button)
  Vue.component(MainHeader.name, MainHeader)
}
