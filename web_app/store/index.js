import Vue from 'vue'
import Vuex from 'vuex'
import tasks from './modules/tasks'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    modules: {
      tasks
    }
  })
}
