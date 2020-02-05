
let axios = require('axios');
const cheerio = require('cheerio');

let domain = "https://habr.com";
let url = domain + "/ru/users/pilot114/favorites/page1/";
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

// big data boss? )
let htmlFormat = {
    selector: '.content-list',
    posts: {
        selector: ['.post'],
        title: {
            selector: '.post__title'
        },
        links: {
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
    delete format.selector;

    nodes = $(selector, node);

    // если больше нет ключей, nodes - это данные, выбираем и выходим (может быть массивом)
    let keys = Object.keys(format);
    let items = [];

    if (keys.length === 0) {
        selector = Array.isArray(selector) ? selector.shift() : selector;
        console.log('query leaf: ', selector);

        $(nodes).each(function(i, item){
            items.push($(item).text().trim());
        });
        return items.length < 2 ? items.shift() : items;
    // есть вложенные поля - применяем рекурсию
    } else {
        let data = {};
        for (let i in keys) {
            let field = keys[i];

            if (Array.isArray(format[field].selector)) {
                selector = format[field].selector.shift();
                console.log('query node: ', selector);

                let arr = [];
                $($(selector, node)).each(function(i, item){
                    arr.push(buildFromDom($, format[field], item));
                });
                data[field] = arr;
            } else {
                console.log('query node: ', selector);
                // если в функцию передаётся массив нод, она тоже вернёт массив
                data[field] = buildFromDom($, format[field], nodes);
            }
        }

        return data;
    }
}

function getFavorites() {
    return new Promise(function(resolve) {
        axios.get(url).then(response => {
            const $ = cheerio.load(response.data);
            let data = buildFromDom($, htmlFormat);
            resolve(data);
        });
    });
}

module.exports = {
    getFavorites
};
