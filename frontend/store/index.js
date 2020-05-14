import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex)
 
const store = () => new Vuex.Store({
    state: {
        apiToken: '',
        posts: [],
    },
    getters: {
        apiToken(state) {
            return state.apiToken
        },
        posts(state) {
            return state.posts
        },
        postsLength(state) {
            return state.posts.length
        }
    },
    mutations: {
        loadPosts(state, posts) {
            state.posts = posts
        },
        addPost(state, post) {
            let curPosts = state.posts
            curPosts.push(post)
            state.posts = curPosts
        },
        setToken(state, token) {
            state.apiToken = token
        },
        deleteToken(state) {
            state.apiToken = ''
        }
    },
    actions: {
        nuxtServerInit(context) {
            return context.dispatch('loadPosts');
        },
        loadPosts(context) {
            return this.$axios.get('http://jsonplaceholder.typicode.com/posts').then(response => {
                context.commit('loadPosts', response.data)
            })
        },
        addPost(context, post) {
            context.commit('addPost', post)
        },
        setToken(context, token) {
            context.commit('setToken', token)
        },
        deleteToken(context) {
            context.commit('deleteToken')
        }
    }
})
 
export default store