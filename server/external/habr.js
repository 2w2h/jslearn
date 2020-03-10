
let axios = require('axios');
const cheerio = require('cheerio');
const {buildFromDom} = require('../parser/html');

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
};

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

const getFavorites = async () => {
    let posts = [];

    let response = await axios.get(counterUrl);
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
};

module.exports = {
    getFavorites
};
