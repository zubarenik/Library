<template>
    <div class="add-post-form">
        <div class="form">
            <h3 class="text-center">Добавь новый пост!</h3>       
            <div class="form-group">
                <input type="text" v-model="title" class="form-control" placeholder="Название" required="required">
            </div>
            <div class="form-group">
                <textarea v-model="body" class="form-control" placeholder="Текст" required="required"></textarea>
            </div>
            <div class="form-group">
                <button class="btn btn-primary btn-block" @click="addPost()">Добавить</button>
            </div>      
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            body: ''
        }
    },
    methods: {
        addPost() {
            let post = {
                title: this.title,
                body: this.body,
            }
            this.$store.dispatch('addPost', post)
            this.$nuxt.$router.push('/posts')
        }
    },
}
</script>

<style>
.add-post-form {
    width: 340px;
    margin: 50px auto;
}
.add-post-form .form {
    margin-bottom: 15px;
    background: #f7f7f7;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    padding: 30px;
}
.add-post-form h3 {
    margin: 0 0 15px;
}
.form-control, .btn {
    min-height: 38px;
    border-radius: 2px;
}
.btn {        
    font-size: 15px;
    font-weight: bold;
}
</style>