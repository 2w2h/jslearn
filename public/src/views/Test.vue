<template>
    <div>
        <h1>Тестирование запросов к апи</h1>
        <button @click="saveModel">saveModel</button>
        <button @click="clearForm">clear</button>

        <div v-for="(val, name) in currentSchema" :key="name">
            <input type="text" :placeholder="name" v-model="currentSchema[name]">
        </div>

        <div v-for="item in errors" :key="item.message">
            <p style="color:red;">{{ item.message }}</p>
        </div>

        <div v-for="(item, index) in items" :key="index">
            {{ item }}
            <button @click="readModel(item)">edit</button>
            <button @click="deleteModel(item)">delete</button>
        </div>
    </div>
</template>

<script>
    import saveUser from '../backend'

    export default {
        name: 'test',
        components: {},
        data() {
            return {
                currentSchema: {},
                schema: {
                    login: null, // строковый идентификатор
                    first_name: null, // Имя
                    last_name: null, // Фамилия
                    active: null, // Признак активности
                    password: null, // пароль
                    salt: null, // уникальная соль
                    email: null, // email
                    last_seen: null, // последнее посещение
                    update_at: null, // время обновления
                },
                errors: [],
                items: [
                    {_id: 123, login: 'a'},
                    {_id: 234, login: 'd'},
                ]
            }
        },
        created() {
            this.currentSchema = JSON.parse(JSON.stringify(this.schema));
        },
        methods: {
            clearForm() {
                this.errors = [];
                this.currentSchema = JSON.parse(JSON.stringify(this.schema));
            },
            saveModel() {
                saveUser(this.currentSchema).then(res => {
                    console.log(res);
                    if (res.result) {
                        console.log('Success save!');
                    } else {
                        this.errors = res.errors;
                    }
                });
            },
            readModel(model) {
                this.currentSchema = model;
            },
            deleteModel() {
                this.currentSchema = JSON.parse(JSON.stringify(this.schema));
            },
            findModels() {
            },
        }
    }
</script>
