
let axios = require('axios');
const cheerio = require('cheerio');

let domain = "https://habr.com";
let counterUrl = domain + "/ru/users/pilot114/";
let pageUrl = domain + "/ru/users/pilot114/favorites/page1/";
// https://habr.com/ru/users/pilot114/favorites/tag/javascript/


// function buildFromDom($, format) {
//     let page = {};
//     let root = $('.content-list');
//
//     page.posts = [];
//
//     let posts = $('.post', root);
//     $(posts).each(function(i, post){
//         let postData = {};
//
//         postData.title = $('.post__title', post).text().trim();
//         postData.links = [];
//
//         let links = $('.hub-link', post);
//         $(links).each(function(i, link){
//             postData.links.push($(link).text().trim());
//         });
//
//         page.posts.push(postData);
//     });
//
//     return page;
// }

let counterFormat = {
    selector: '.tabs-menu > a:nth-child(3) > h3 > span',
}

// big data boss? )
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

function pagination(totalCount) {
    let loadCount = 0;

}

function getFavorites() {
    return new Promise(function(resolve) {
        axios.get(counterUrl).then(response => {
            const $ = cheerio.load(response.data);
            let counter = +buildFromDom($, counterFormat)[1];

            axios.get(pageUrl).then(response => {
                const $ = cheerio.load(response.data);
                let data = buildFromDom($, pageFormat);
                resolve(data);
            });
        });
    });
}

module.exports = {
    getFavorites
};
