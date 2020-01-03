<template>
    <div>
        <h1>Тестирование запросов к сервисам</h1>

        <div style="text-align: left;">
            <div v-for="star in stars" :key="star.id">
                <h3>
                    <a v-if="star.homepage" :href="star.homepage" target="_blank">
                        {{ star.name }}
                    </a>
                    <template v-else>
                        {{ star.name }}
                    </template>
                </h3>
                <p>
                    {{ star.description }}
                </p>
                ★ {{ star.stargazers_count }}
                ⑂ {{ star.forks_count }}
                👁 {{ star.watchers_count }}
            </div>
        </div>
    </div>
</template>

<script>
    import {githubStars} from '../http/backend'

    export default {
        name: 'External',
        components: {},
        created() {
            let params = {username: 'pilot114', lang: 'JavaScript'};
            githubStars(params).then(res => {
                if (res.data.result) {
                    this.stars = res.data.result.stars;
                }
            });
        },
        data() {
            return {
                stars: []
            }
        },
    }
</script>
