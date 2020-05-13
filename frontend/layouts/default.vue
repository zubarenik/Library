<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <router-link class="login" :to="linkAddress" @click.native="logout()">{{ linkTitle }}</router-link>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-library',
          title: 'Home',
          to: '/home'
        },
        {
          icon: 'mdi-view-agenda',
          title: 'Posts',
          to: '/posts'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Library',
      linkAddress: '/',
      linkTitle: 'Войти в учетную запись',
    }
  },
  watch: {
    '$nuxt.$store.state.apiToken'(){
      if (this.linkAddress == '/') {
        this.linkAddress = '/home'
        this.linkTitle = 'Выйти'
        this.items.push({
          icon: 'mdi-account',
          title: 'Admin',
          to: '/admin'
        })  
      } else {    
        this.linkAddress = '/'
        this.linkTitle = 'Войти в учетную запись'
        this.items.pop()
      }
    }
  },
  methods: {
    logout(){
      if (this.linkAddress == '/home') 
        this.$store.dispatch('deleteToken')
    }
  },
}
</script>

<style>
  a.login{
    color: #e43f5a;
    text-decoration: none;
  }
  a.login:hover{
    font-weight: bold;
  }
</style>
