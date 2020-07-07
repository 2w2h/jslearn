<template>
    <div>
        <h2>Тестирование функций из common/learn</h2>
        <div>
            <b>randNumbers</b>
            <span>Чем равномернее цвет, тем качественее рандом</span>
        </div>
        Вариантов {{ variants }}
        <input type="range" v-model="variants" style="width: 300px" max="30">
        Попыток {{ tryCount }}
        <input type="range" v-model="tryCount" min="1" max="5000" style="width: 300px">
        <div v-for="(v, i) in percents" :key="i">
            <span v-for="(item, j) in v" :key="j" class="percentItem" :style="{backgroundColor: item}">
                {{ j }}
            </span>
        </div>
    </div>
</template>

<script>
    // import _ from 'lodash';
    // import {bubble} from '../../../common/learn/algo/sort';
    import gen from '../../../common/learn/algo/gen';

    export default {
        name: 'Lib',
        components: {},
        created() {
            setInterval(this.updatePercents, 100);
        },
        data() {
            return {
                percents: [],
                variants: 6,
                tryCount: 500,
            }
        },
        methods: {
            // логарифмический range
            // https://stackoverflow.com/questions/846221/logarithmic-slider

            updatePercents() {
                // 1000 испытаний из 10 совместных бросков 6-гранного кубика
                let setSize = 10;
                let set = this.randSet(+this.tryCount, setSize, this.variants);

                let percents = [];
                for (var i = 0; i < setSize; i++) {
                    let percent = {};
                    this.getCol(set, i).forEach(item => {
                        if (percent[item]) {
                            percent[item]++;
                        } else {
                            percent[item] = 1;
                        }
                    });
                    for(let j in percent) {
                        let per = ((percent[j] / this.tryCount) * 100).toFixed(2);
                        percent[j] = this.perc2color(per);
                    }

                    percents[i] = percent;
                }
                this.percents = percents;
            },

            // nSet выборок по nItem элементов из variants вариантов
            randSet(nSet, nItem, variants) {
                let set = [];
                [...Array(nSet)].forEach(() => {
                    set.push(gen.randNumbers(nItem, 1, variants));
                });
                return set;
            },
            // получить i-ую колонку матрицы
            getCol(matrix, i){
                return matrix.map(x => x[i]);
            },
            // проценты => зелено-красный диапозон
            perc2color(perc) {
                let r, g, b = 0;
                if(perc < 50) {
                    r = 255;
                    g = Math.round(5.1 * perc);
                } else {
                    g = 255;
                    r = Math.round(510 - 5.10 * perc);
                }
                let h = r * 0x10000 + g * 0x100 + b * 0x1;
                return '#' + ('000000' + h.toString(16)).slice(-6);
            }
        }
    }
</script>
<style>
    .percentItem {
         display: inline-block;
         width: 30px;
         height: 30px;
    }
</style>
