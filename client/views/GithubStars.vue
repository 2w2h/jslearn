<template>
<div>
    <h1>Тестирование запросов к сервисам</h1>

    Всего: {{ this.filteredStars.length }}

    <select v-model="selectedLang">
        <option v-for="lang in languages" :value="lang" :key="lang">
            {{ lang }}
        </option>
    </select>

    <div style="text-align: left;">
        <div v-for="star in filteredStars" :key="star.id" class="card">
            <h3 style="height: 40px;">
                <a :href="'https://github.com/' + star.full_name" target="_blank">
                    <img src="@/assets/icons/github.png" style="width: 18px;">
                </a>
                <a v-if="star.homepage" :href="prepareHref(star.homepage)" target="_blank">
                    {{ star.name }}
                </a>
                <template v-else>
                    {{ star.name }}
                </template>
            </h3>
            <textarea style="height: 55px; overflow: hidden;" @input="changeDesc(star, $event)" :value="star.meta ? star.meta.description : star.description">
                </textarea>
            <span title="Звёзд" style="cursor: pointer;">
                ★ {{ star.stargazers_count }}
            </span>
            <span title="Форков" style="cursor: pointer;">
                ⑂ {{ star.forks_count }}
            </span>
            <span title="Отслеживаний" style="cursor: pointer;">
                👁 {{ star.watchers_count }}
            </span>
            <div>
                <template v-if="star.meta && star.meta.tags && star.meta.tags.length > 0">
                    <span v-for="tag in star.meta.tags" :key="tag">
                        {{ tag }}
                    </span>
                </template>
                <input style="width: 80px;" placeholder="добавить тэг" :ref="'newTag' + star.id">
                <button @click="addTag(star, 'newTag' + star.id)">+</button>
            </div>

            <button v-if="star.meta && star.meta.edited === true" @click="saveDesc(star)">
                Сохранить
            </button>
        </div>
    </div>
</div>
</template>

<script>
import {
    githubStars,
    githubStarsAddDesc
} from '../http/backend'

const ALL = "Все"

export default {
    name: 'GithubStars',
    components: {},
    created() {
        githubStars({
            username: 'pilot114'
        }).then(res => {
            if (res.data.result) {
                this.stars = res.data.result.stars;

                // уникальные отсортированные языки
                this.languages = this.stars
                    .map(x => x.language)
                    .filter((value, index, self) => self.indexOf(value) === index);
                this.languages.push(ALL);
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
            languages: [],
            selectedLang: "JavaScript"
        }
    },
    computed: {
        filteredStars() {
            if (this.selectedLang === ALL) {
                return this.stars;
            }
            return this.stars.filter(x => x.language === this.selectedLang);
        }
    },
    methods: {
        changeDesc(star, value) {
            if (!star.meta) {
                this.$set(star, 'meta', {});
            }
            this.$set(star.meta, 'description', value.target.value);
            this.$set(star.meta, 'edited', true);
        },
        saveDesc(star) {
            let params = {
                username: "pilot114",
                star_id: star.id,
                description: star.meta.description
            };
            githubStarsAddDesc(params).then(() => {
                star.meta.edited = false;
            });
        },
        prepareHref(href) {
            if (href.indexOf('http') === 0) {
                return href;
            }
            return 'https://' + href;
        },
        addTag(star, refName) {
            let newTag = this.$refs[refName][0].value;
            if (!star.meta) {
                this.$set(star, 'meta', {});
            }
            if (!star.meta.tags) {
                this.$set(star.meta, 'tags', []);
            }
            star.meta.tags.push(newTag);
            this.$refs[refName][0].value = "";
        }
    }
}
</script>
<style scoped>
.card {
    width: 300px;
    height: 180px;
    float: left;
    border: 1px solid black;
    border-radius: 3px;
    padding: 10px;
    margin: 10px;
}

textarea {
    width: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 16px;
    border: none;
    overflow: auto;
    outline: none;
    box-shadow: none;
    resize: none;
}
</style>
