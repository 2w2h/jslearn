<template>
    <div>
        <h1>Тестирование запросов к сервисам</h1>

        <div v-for="star in stars" :key="star.id">
            <a :href="star.homepage">
                {{ star.name }}
            </a>
            <p>
                {{ star.description }}
            </p>
            lang: {{ star.language }}
            stars: {{ star.stargazers_count }}
            forks: {{ star.forks_count }}
            watchers: {{ star.watchers_count }}
        </div>
    </div>
</template>

<script>
    import github from "../../common/external/github"

    export default {
        name: 'External',
        components: {},
        created() {
            github.getStars().then(result => {
                this.stars = result;
            });
        },
        data() {
            return {
                stars: []
            }
        },
    }
</script>
