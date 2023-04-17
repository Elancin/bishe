import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  getters: {},
  mutations: {
    // 更新token，存储
    TOKEN(state, value) {
      console.log('Store:' + value)
      state.token = value
      window.localStorage.setItem('token', state.token)
    }
  },
  actions: {},
  modules: {}
})
