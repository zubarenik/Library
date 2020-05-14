<template>
  <div class="container-posts">
    <post v-for="post in posts"
          :key="post.id"
          :title="post.title"
          :body="post.body">
    </post>
  </div>
</template>

<script>
import Post from '~/components/Post.vue'

export default {
    components: {
        Post
    },
    computed:{
        posts(){
            return this.$store.getters['posts'].filter(el => el.userId == this.$route.params.id)
        },
    },
};
</script>

<style>
.container-posts {
  margin: 50px auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 900px;
}
</style>
