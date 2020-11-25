import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    test:'TEST FROM STORE'
  },
  getters:{
    test: state => state.test
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
