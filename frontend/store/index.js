import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex)
 
const store = () => new Vuex.Store({
    state: {
        user: null,
        posts: [],
    },
    getters: {
        posts(state) {
            return state.posts
        },
        postsLength(state) {
            return state.posts.length
        },
        user(state) {
            return state.user
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
        setUser(state, user) {
            state.user = user
        }
    },
    actions: {
        /*async nuxtServerInit(context) {
            const token = this.$cookies.get(cookieName) || null
            if (token) {
                this.$axios.setToken(token, 'Bearer')
                await context.dispatch('fetchUser')
            }
            //await context.dispatch('loadPosts');
        }, */
        async fetchUser(context) {
            const response = await this.$axios.get('/api/user')
            context.commit('setUser', response.data)
        },
        async login(context, tokenData) {
            try {
                const response = await this.$axios.post('/api/get_token', tokenData)
                const token = response.data
                this.$cookies.set('auth', token, {
                    path: '/',
                    maxAge: 60*60*24*7,
                })
            } catch(user) {
                // TODO
            }
        },
        loadPosts(context) {
            return this.$axios.get('http://jsonplaceholder.typicode.com/posts').then(response => {
                context.commit('loadPosts', response.data)
            })
        },
        addPost(context, post) {
            context.commit('addPost', post)
        }
    }
})
 
export default store