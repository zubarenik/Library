<template>
    <div class="container mt-5" v-if="validity">
        <h1>Список книг нашей библиотеки</h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Название</th>
                    <th scope="col">Автор</th>
                    <th scope="col">Наличие</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="book in books" :key="book.id">
                    <th scope="row">{{ book.id }}</th>
                    <td>{{ book.title }}</td>
                    <td>{{ book.author }}</td>
                    <td>{{ book.availability === 1 ? 'Доступно': 'Недоступно'}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            books: [],
            validity: false,
        }
    },
    methods: {
        loadBookList(){
            // TODO Требуется проверка токена в backend
            this.$axios.get('/api/book/all', {
                headers: {"Authorization" : 'Bearer ' + this.$store.getters['apiToken'] } 
            }).then(response => {
                this.validity = true
                this.books = response.data
            }).catch(error => {
                this.$route.push('/')
            })
        }
    },
    mounted() {
        this.loadBookList()
    },
}
</script>
