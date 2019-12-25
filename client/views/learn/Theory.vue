<template>
    <div>
        <h1>Теория</h1>

        <div class="divideThree">
            <h3>Изучаем программирование на JavaScript (Head First)</h3>
            <img
                    src="https://cdn1.ozone.ru/multimedia/c650/1011395255.jpg"
                    alt="Изучаем программирование на JavaScript (Head First)"
                    width="200px"
            >
            <ol>
                <li v-for="chapter in hfChapters" :key="chapter">
                    <label>
                        <input type="checkbox">{{ chapter }}
                    </label>
                </li>
            </ol>

            <h3><a href="https://learn.javascript.ru">Учебник JavaScript</a></h3>

            <h4>Часть 1</h4>
            <ol>
                <li v-for="chapter in ljChapters.slice(0, 14)" :key="chapter">
                    <label>
                        <input type="checkbox">{{ chapter }}
                    </label>
                </li>
            </ol>

            <h4>Часть 2</h4>
            <ol>
                <li v-for="chapter in ljChapters.slice(14, 20)" :key="chapter">
                    <label>
                        <input type="checkbox">{{ chapter }}
                    </label>
                </li>
            </ol>

            <h4>Часть 3</h4>
            <ol>
                <li v-for="chapter in ljChapters.slice(20)" :key="chapter">
                    <label>
                        <input type="checkbox">{{ chapter }}
                    </label>
                </li>
            </ol>
        </div>
        <div class="divideThree">
            <h3><a href="https://html5book.ru/html-html5">Учебник HTML</a></h3>
            <ol>
                <li v-for="chapter in htmlChapters" :key="chapter">
                    <label>
                        <input type="checkbox">{{ chapter }}
                    </label>
                </li>
            </ol>

            <h3><a href="https://html5book.ru/css-css3">Учебник CSS</a></h3>
            <ol>
                <li v-for="chapter in cssChapters" :key="chapter">
                    <label>
                        <input type="checkbox">{{ chapter }}
                    </label>
                </li>
            </ol>
        </div>
        <div class="divideThree">
            <h3><a href="https://javarush.ru/quests/QUEST_HARVARD_CS50">Computer Science 50</a></h3>
            <ol>
                <li v-for="chapter in csChapters" :key="chapter">
                    <label>
                        <input type="checkbox">{{ chapter }}
                    </label>
                </li>
            </ol>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'theory',
        components: {},
        data() {
            return {
                hfChapters: [
                    'Знакомство с JS',
                    'Настоящий код (Морской бой)',
                    'Функции 1',
                    'Массивы',
                    'Объекты 1',
                    'Модель DOM',
                    'Типы',
                    'Всё вместе',
                    'Обработка событий',
                    'Функции 2',
                    'Функции 3',
                    'Объекты 2',
                    'Объекты 3',
                ],
                ljChapters: [
                    "Введение", "Основы JavaScript", "Качество кода", "Объекты: основы", "Типы данных", "Продвинутая работа с функциями","Свойства объекта, их конфигурация",
                    "Прототипы, наследование", "Классы", "Обработка ошибок", "Промисы, async/await", "Генераторы, продвинутая итерация", "Модули", "Разное",
                    "Документ", "Введение в события", "Интерфейсные события", "Формы, элементы управления", "Загрузка документа и ресурсов", "Разное",
                    "Фреймы и окна", "Бинарные данные и файлы", "Сетевые запросы", "Хранение данных в браузере", "Анимация", "Веб-компоненты", "Регулярные выражения", "CSS для JavaScript-разработчика"
                ],
                htmlChapters: [
                    " Основы HTML", "HTML-теги", "HTML-атрибуты", "HTML-текст", "HTML-ссылки", "HTML-изображения", "HTML-таблицы", "HTML-списки", "Спецсимволы HTML", "HTML-генераторы",
                    "Семантические элементы HTML5", "HTML5-аудио", "HTML5-видео", "Необязательные теги HTML5-разметки", "HTML5-формы", "Контентная модель HTML5"
                ],
                cssChapters: [
                    "Основы CSS", "Блочные и строчные элементы", "CSS-позиционирование", "CSS-текст", "CSS-шрифты", "CSS-ссылки", "CSS-таблицы", "CSS-списки", "CSS-фон", "CSS-рамка",
                    "CSS-content", "CSS-генераторы", "CSS-цвета", "CSS3 UI", "CSS3-градиент", "CSS3-рамка", "CSS3-оформление текста", "CSS3-тень блока", "CSS3-переходы", "CSS3-трансформации",
                    "CSS3-анимация", "CSS3 flexbox", "CSS3 columns", "CSS3 3D-трансформации", "CSS3-медиазапросы", "CSS3-фильтры", "CSS Grid", "CSS3-шрифты"],
                csChapters: [
                    "Системы счисления. Алгоритмы. Визуальный язык Scratch и программы на нём.", "Основные команды Linux. Язык Си, его синтаксис. Первая программа (hello world).",
                    "Что такое криптография? Простые криптографические шифры. Баги. Си: строки и массивы.", "Алгоритмы сортировки. Компилятор. Побитовые операции.",
                    "Рекурсия. Стек памяти и локальные переменные. Кодирование изображения. Структуры (struct). Основы адресной арифметики.", "Указатели, структура памяти, стек, очереди и связные списки.",
                    "Начинаем программировать в вебе. HTML, CSS, протокол TCP/IP и HTTP.", "Язык программирования PHP. Динамическая типизация.",
                    "Шаблон MVC. Немного о языке запросов SQL.", "JavaScript, Ajax и DOM.", "Глобальное информационное поле. Искусственный интеллект."
                ]
            }
        },
    }
</script>
<style>
    .divideThree {
        width: 33%;
        float: left;
    }

    ol {
        text-align: left;
    }
</style>