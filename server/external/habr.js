// библиотека axios - нужна чтобы скачивать данные с сайта
let axios = require('axios');
// библиотека cheerio - для извлечения данных из html по селекторам
const cheerio = require('cheerio');
// функия buildFromDom - моя функция для преобразования html в нужный json-формат
const {buildFromDom} = require('../parsers/html');

// ссылка на мой профиль на Хабре
let myProfileUrl = "https://habr.com/ru/users/pilot114/";

// Функция, использующая приём "замыкание".
// Возвращает функцию, которя при каждом вызове возвращает URL следующей страницы с данными:
// https://habr.com/ru/users/pilot114/favorites/page1
// https://habr.com/ru/users/pilot114/favorites/page2
// https://habr.com/ru/users/pilot114/favorites/page3
// и т.д.
function generator() {
    let pageUrl = myProfileUrl + "favorites/page";
    let page = 0;
    return function () {
        page++;
        return pageUrl + page;
    }
}

// формат данных для получения количества избранных статей
let counterFormat = {
    selector: '.tabs-menu > a:nth-child(3) > h3 > span',
    attr: 'title'
};

// формат данных для получения названий статей и их категорий ("хабов")
// На выходе будет нечто вроде
// [
//      {title: 'Как писать крутой код', hubs: ['js', 'программирование']},
//      {title: 'Зачем всё это?', hubs: ['css', 'html', 'никто не знает']}
// ]
let pageFormat = {
    selector: '.content-list',
    posts: {
        selector: ['.post'],
        title: {
            selector: '.post__title'
        },
        hubs: {
            selector: ['.hub-link'],
        }
    }
};

let options = {
    headers: {
        'Cookie': "web_override=false;" // отдавать старую версию страницы
    }
};

// Сам парсинг - эта функция будет возвращать переменную posts, в которой
// содержиться массив моих избраных статей с Хабра
const getFavorites = async () => {
    // подготавливаем пустой массив под статьи
    let posts = [];

    // скачиваем html из профиля
    let response = await axios.get(myProfileUrl, options);
    // Передаём html в библиотеку (в виде текста), получаем объект с DOM
    const $ = cheerio.load(response.data);
    // Используя описание формата (строка 28), получаем общее число статей
    let totalCount = buildFromDom($, counterFormat); // строка вида "Закладки: 1157"
    totalCount = +totalCount.split(':')[1].trim();

    // Подготавливаем генератор ссылок на страницы, который будем использвать в цикле
    let nextPage = generator();

    // пока ещё есть что скачивать
    while (totalCount > 0) {
        // скачиваем по ссылке из генератора
        let pageData = await axios.get(nextPage(), options);
        // Передаём html в библиотеку (в виде текста), получаем объект с DOM
        let $ = cheerio.load(pageData.data);
        // Используя описание формата (строка 38), получаем интересующие нас данные по статьям (названия и хабы)
        let pagePosts = buildFromDom($, pageFormat).posts;
        // добавляем к массиву новую порцию статей (объединение массивов)
        posts = posts.concat(pagePosts);
        // уменьшаем количество ещё не скаченных статей, чтобы цикл мог завершиться
        totalCount -= 20;
    }
    // ура, дело сделано
    return posts;
};

// Это конструкция просто позволяем "экспортировать" функцию getFavorites.
// Теперь где-нибудь в другом месте проекта её можно будет использовать так:
// let habr = require("@server/external/habr");
// let posts = await habr.getFavorites();
module.exports = {
    getFavorites
};
