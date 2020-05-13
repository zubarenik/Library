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
        },
        deleteToken(state) {
            state.apiToken = ''
        }
    },
    actions: {
        setToken(context, token) {
            context.commit('setToken', token)
        },
        deleteToken(context) {
            context.commit('deleteToken')
        }
    }
})
 
export default store