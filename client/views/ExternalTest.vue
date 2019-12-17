<template>
    <div>
        <h1>Тестирование запросов к сервисам</h1>
    </div>
</template>

<script>
    import habr from "../../common/external/habr"

    export default {
        name: 'External',
        components: {},
        created() {
            console.log(habr)
        }
    }
</script>
