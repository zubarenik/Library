<template>
  <div class="container-books">
    <post v-for="post in posts" :key="post.id" :title="post.title" :body="post.body"></post>
  </div>
</template>


<script>
import Post from "~/components/Post.vue";

export default {
  data() {
    return {
      posts: [],
    }
  },
  components: {
    Post,
  },
  methods: {
    getPosts(){
      this.$axios.get("http://jsonplaceholder.typicode.com/posts").then(response => {
        this.posts = response.data;
      });
    }
  },
  mounted() {
    this.getPosts()
  },
};
</script>

<style>
.container-books {
  margin: 50px auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 900px;
}
</style>