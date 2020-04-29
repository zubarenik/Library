<template>
    <div class="post">
        <h2>{{ title }}</h2>
        <p>{{ body }}</p>
    </div>
</template>

<script>
export default {
    props: ['title', 'body']
}
</script>

<style>
.post {
  box-sizing: border-box;
  padding: 20px;
  margin: 10px 10px;
  border: 1px solid #acacac;
  border-radius: 10px;
  width: 40%;
  height: 300px;
}
</style>