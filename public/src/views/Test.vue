<template>
    <div>
        <h1>Тестирование запросов к апи</h1>
    </div>
</template>

<script>
    import createUser from '../backend'

    export default {
        name: 'test',
        components: {},
        created() {
            createUser({a: 1, b: 2}).then(res => {
                console.log(res);
            });
        }
    }
</script>
