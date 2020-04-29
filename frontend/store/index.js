import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex)
 
const store = () => new Vuex.Store({
    state: {
        apiToken: ''
    },
    getters: {
        apiToken(state) {
            return state.apiToken
        }
    },
    mutations: {
        setToken(state, token) {
            state.apiToken = token
        }
    },
    actions: {
        setToken(context, token) {
            context.commit('setToken', token)
        }
    }
})
 
export default store