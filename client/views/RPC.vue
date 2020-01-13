<template>
    <div>
        <h1>Тестирование запросов к сервисам</h1>

        <select>
          <option v-for="lang in languages" value="lang" :key="lang">
            {{ lang }}
          </option>
        </select>

        <div style="text-align: left;">
            <div v-for="star in stars" :key="star.id" class="card">
                <h3>
                    <a :href="'https://github.com/' + star.full_name" target="_blank">
                        <img src="@/assets/icons/github.png" style="width: 18px;">
                    </a>
                    <a v-if="star.homepage" :href="star.homepage" target="_blank">
                        {{ star.name }}
                    </a>
                    <template v-else>
                        {{ star.name }}
                    </template>
                </h3>
                <p style="height: 55px; overflow: hidden;">
                    {{ star.description }}
                </p>
                <span title="Звёзд" style="cursor: pointer;">
                ★ {{ star.stargazers_count }}
                </span>
                <span title="Форков" style="cursor: pointer;">
                ⑂ {{ star.forks_count }}
                </span>
                <span title="Отслеживаний" style="cursor: pointer;">
                👁 {{ star.watchers_count }}
                </span>
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
            let params = {
              username: 'pilot114',
              // lang: 'JavaScript'
            };
            githubStars(params).then(res => {
                if (res.data.result) {
                    this.stars = res.data.result.stars;

                    // уникальные языки отсортированные языки
                    this.languages = this.stars
                      .map(x => x.language)
                      .filter((value, index, self) => self.indexOf(value) === index);
                    this.languages.push("Все");
                    this.languages = this.languages.sort((a, b) => {
                        if (!a) return 1;
                        if (!b) return -1;
                        return a.localeCompare(b);
                      });
                }
            });
        },
        data() {
            return {
                stars: [],
                languages: []
            }
        },
    }
</script>
<style>
    .card {
        width: 300px;
        float: left;
        border: 1px solid black;
        border-radius: 3px;
        padding: 10px;
        margin: 10px;
    }
</style>
