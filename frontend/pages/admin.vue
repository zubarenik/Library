<template>
    <div class="container mt-5">
        <h1>Список книг нашей библиотеки</h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Название</th>
                    <th scope="col">Автор</th>
                    <th scope="col">Наличие</th>
                    <th scope="col">Действия</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="book in books" :key="book.id">
                    <th scope="row">{{ book.id }}</th>
                    <td>{{ book.title }}</td>
                    <td>{{ book.author }}</td>
                    <td>
                        <button type="button" class="btn btn-outline-primary" v-on:click="changeBookAvailability(book.id)">
                            {{ book.availability === 1 ? 'Доступно': 'Недоступно'}}
                        </button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-outline-danger" v-on:click="deleteBook(book.id)">
                            Удалить
                        </button>
                    </td>
                </tr>

                <!-- Строка с полями для добавления новой книги -->
                <tr>
                    <th scope="row">Добавить</th>
                    <td><input v-model="title" type="text" class="form-control"></td>
                    <td><input v-model="author" type="text" class="form-control"></td>
                    <td></td>
                    <td>
                        <button type="button" class="btn btn-outline-success" v-on:click="addBook()">
                            Добавить
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            author: '',
            books: [],
        }
    },
    methods: {
        loadBookList(){
            this.$axios.get('/api/book/all').then(response => {
                this.books = response.data
            })
        },
        addBook(){
            this.$axios.post('/api/book/add', {
                title: this.title,
                author: this.author,
            }).then(response => {
                this.books.push({
                    id: response.data,
                    title: this.title,
                    author: this.author,
                    availability: 1
                })
                this.title = ''
                this.author = ''
            })
        },
        deleteBook(id){
            this.$axios.post('/api/book/delete/' + id).then(() => {
                this.loadBookList()
            })
        },
        changeBookAvailability(id){
            this.$axios.post('/api/book/change_availability/' + id).then(() => {
                this.loadBookList()
            })
        }
    },
    mounted(){
        if (this.$store.getters['apiToken'] == '')
            this.$nuxt.$router.push('/')   
        this.loadBookList()
    },
}
</script>
