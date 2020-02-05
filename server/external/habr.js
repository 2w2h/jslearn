
let axios = require('axios');
const cheerio = require('cheerio');

let domain = "https://habr.com";
let url = domain + "/ru/users/pilot114/favorites/page1/";
// https://habr.com/ru/users/pilot114/favorites/tag/javascript/

/*
    Рекурсивно парсит DOM, пока только текст
*/
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
        selector: '.post',
        // title: {
        //     selector: '.post__title'
        // },
        // links: {
        //     selector: '.hub-links',
        // }
    }
};
// TODO
function buildFromDom($, format, data, node) {
    data = data || {};
    console.log('query node: ', format.selector);
    nodes = $(format.selector, node);

    $(node).each(function(i, item){
        console.log(item.name);
    });

    delete format.selector;

    let keys = Object.keys(format);

    //  leaf case
    if (keys.length === 0) {
        let items = [];
        $(node).each(function(i, item){
            console.log('query leaf: ', format.selector);
            items.push($(format.selector, item).text().trim());
        });
        return items.length < 2 ? items.shift() : items;
    }

    for (let i in keys) {
        data[keys[i]] = buildFromDom($, format[keys[i]], {}, node);
    }

    return data;

    // let page = {};
    // let root = $('.content-list');
    //
    // page.posts = [];
    //
    // let posts = $('.post', root);
    // $(posts).each(function(i, post){
    //     let postData = {};
    //
    //     postData.title = $('.post__title', post).text().trim();
    //     postData.links = [];
    //
    //     let links = $('.hub-link', post);
    //     $(links).each(function(i, link){
    //         postData.links.push($(link).text().trim());
    //     });
    //
    //     page.posts.push(postData);
    // });
    //
    // return page;
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
