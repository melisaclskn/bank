import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    LogedIn : localStorage.getItem("userType") == '"admin"' ? true : false ,
  },
  mutations: {
    SET_AUTH_STATUS (state, payload) {
      state.LogedIn = payload
    },
  },
  getters: {
    isLogedIn : state => {
      return state.LogedIn
    },
  },
  actions: {
  },
  modules: {
  }
})
