<template>
    <div>
        <h1>Тестирование запросов к апи</h1>
        <button @click="saveModel">save</button>
        <button @click="clearForm">clear</button>

        <div v-for="(val, name) in currentModel" :key="name">
            <input type="text" :placeholder="name" v-model="currentModel[name]">
        </div>

        <div v-for="item in errors" :key="item.message">
            <p style="color:red;">{{ item.message }}</p>
        </div>

        <div v-for="(item, index) in items" :key="index">
            {{ item._id }}
            {{ item.login }}
            <button @click="loadModel(item)">load</button>
            <button @click="removeModel(item)">remove</button>
        </div>
    </div>
</template>

<script>
    import User from '../backend'

    export default {
        name: 'ModelTest',
        components: {},
        data() {
            return {
                currentModel: {},
                model: User,
                errors: [],
                items: []
            }
        },
        created() {
            this.currentModel = this.model.toJson();
            this.loadModel(this.currentModel);
        },
        methods: {
            clearForm() {
                this.errors = [];
                this.currentModel = this.model.toJson();
            },
            saveModel() {
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
