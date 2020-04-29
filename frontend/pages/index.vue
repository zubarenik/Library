<template>
    <div class="login-form">
        <h3>Get access to edit library!</h3>
        <form>
            <h2 class="text-center">Log in</h2>       
            <div class="form-group">
                <input type="text" v-model="email" class="form-control" placeholder="Email" required="required">
            </div>
            <div class="form-group">
                <input type="password" v-model="password" class="form-control" placeholder="Password" required="required">
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block" @click="login()">Log in</button>
            </div>      
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            this.$axios.post('/api/get_token', {
                email: this.email,
                password: this.password,
                device_name: "web"
            }).then(response => {   
                this.$store.dispatch('setToken', response.data)
                this.$nuxt.$router.push('/home')
            }).catch(error => {
                console.log('error :>> ', error);
            })
        }
    },
}
</script>

<style>
.login-form {
    width: 340px;
    margin: 50px auto;
}
.login-form form {
    margin-bottom: 15px;
    background: #f7f7f7;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    padding: 30px;
}
.login-form h2 {
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