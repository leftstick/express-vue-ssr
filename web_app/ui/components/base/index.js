import { Button, Menu, MenuItem, Switch, Table, TableColumn } from 'element-ui'
import MainHeader from './MainHeader.vue'

export function installBasis(Vue) {
  Vue.use(Button)
  Vue.use(Menu)
  Vue.use(MenuItem)
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Switch)
  Vue.component(MainHeader.name, MainHeader)
}
