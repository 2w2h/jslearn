
let axios = require('axios');
const cheerio = require('cheerio');

let domain = "https://habr.com";
let counterUrl = domain + "/ru/users/pilot114/";


function generator() {
    let pageUrl = domain + "/ru/users/pilot114/favorites/page";
    let page = 0;
    return function() {
        page++;
        return pageUrl + page;
    }
}

let counterFormat = {
        selector: '.tabs-menu > a:nth-child(3) > h3 > span',
}

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
/*
    Рекурсивно парсит DOM, пока только текст
*/
function buildFromDom($, format, node) {
    node = node || null;

    let selector = format.selector;

    nodes = $(selector, node);

    let keys = Object.keys(format);
    let items = [];

    if (keys.length < 2) {
        selector = Array.isArray(selector) ? selector[0] : selector;
        $($(selector, node)).each(function(i, item){
            items.push($(item).text().trim());
        });
        return items.length === 1 ? items[0] : items;
    // есть вложенные поля - применяем рекурсию
    } else {
        let data = {};
        for (let i in keys) {
            let field = keys[i];
            if (field === 'selector') {
                continue;
            }

            let childKeys = Object.keys(format[field]);
            // только для нод-массивов
            if (Array.isArray(format[field].selector) && childKeys.length !== 1) {
                let childSelector = format[field].selector[0];

                let arr = [];
                $($(childSelector, node)).each(function(i, item){
                    arr.push(buildFromDom($, format[field], $(item)));
                });
                data[field] = arr;
            } else {
                // если в функцию передаётся массив нод, она тоже вернёт массив
                data[field] = buildFromDom($, format[field], node[0]);
            }
        }

        return data;
    }
}

const getFavorites = async () => {
    let posts = [];

    response = await axios.get(counterUrl);
    const $ = cheerio.load(response.data);
    let totalCount = +buildFromDom($, counterFormat);

    let nextPage = generator();

    while(totalCount > 0) {
        let pageData = await axios.get(nextPage());
        let $ = cheerio.load(pageData.data);
        let pagePosts = buildFromDom($, pageFormat).posts;
        posts = posts.concat(pagePosts);

        totalCount -= 20;
    }
    return posts;
}

module.exports = {
    getFavorites
};
