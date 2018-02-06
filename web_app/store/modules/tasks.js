export default {
  actions: {
    fetchDescriptions({ commit, state, rootState }) {
      const { api } = rootState

      return api.get('/descriptions').then(res => {
        commit('setDescriptions', res.data.descriptions)
        return res.data.descriptions
      })
    },
    fetchTasks({ commit, state, rootState }) {
      const { api } = rootState

      return api.get('/tasks').then(res => {
        commit('setTasks', res.data.tasks)
        return res.data.tasks
      })
    }
  },
  mutations: {
    setDescriptions(state, desc) {
      state.descriptions = desc
    },
    setTasks(state, tasks) {
      state.tasks = tasks
    }
  },
  namespaced: true,
  state: {
    descriptions: '',
    tasks: []
  }
}
