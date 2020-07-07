<template>
    <div>
        <h1>Тестирование запросов к апи</h1>
        <button @click="saveModel">Сохранить</button>
        <button @click="clearForm">Очистить</button>

        <div v-for="(val, name) in currentModel" :key="name">
            <input type="text" :placeholder="name" v-model="currentModel[name]">
        </div>

        <div v-for="item in errors" :key="item.message">
            <p style="color:red;">{{ item.message }}</p>
        </div>

        <div v-for="(item, index) in items" :key="index">
            {{ item._id }}
            {{ item.login }}
            <button @click="loadModel(item)">Загрузить</button>
            <button @click="removeModel(item)">Удалить</button>
        </div>
    </div>
</template>

<script>
    import {User} from '../http/backend'

    export default {
        name: 'ModelTest',
        components: {},
        data() {
            return {
                currentModel: {},
                errors: [],
                items: []
            }
        },
        created() {
            this.currentModel = User.buildEmpty();
            this.loadModel(this.currentModel);
        },
        methods: {
            clearForm() {
                this.errors = [];
                this.currentModel = User.buildEmpty();
            },
            saveModel() {
                let errors = User.validate(this.currentModel);
                if (errors.length > 0) {
                    this.errors = errors;
                    return;
                }

                User.save(this.currentModel).then(res => {
                    console.log('saveModel', res);
                    if (res.result) {
                        if (this.currentModel._id) {
                            console.log('Success update!');
                        } else {
                            console.log('Success create!');
                        }
                    } else {
                        this.errors = res.errors;
                    }
                });
            },
            loadModel(item) {
                User.load(item).then(res => {
                    console.log('loadModel', res);
                    if (res.result) {
                        if (Array.isArray(res.result.items)) {
                            console.log('Success find!');
                            this.items = res.result.items;
                        } else {
                            console.log('Success read!');
                            this.currentModel = res.result;
                        }
                    }
                });
            },
            removeModel(item) {
                User.remove(item).then(res => {
                    console.log('removeModel', res);
                });
                if (item._id === this.currentModel._id) {
                    this.clearForm();
                }
            },
        }
    }
</script>
