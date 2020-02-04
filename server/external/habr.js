
let axios = require('axios');
const cheerio = require('cheerio')

let domain = "https://habr.com";
let url = domain + "/ru/users/pilot114/favorites/page1/";
// https://habr.com/ru/users/pilot114/favorites/tag/javascript/

// big data boss? )
let htmlFormat = {
    page: {
        selector: '.content-list',
        inner: {
            posts: {
                selector: '.post',
                type: Array,
                inner: {
                    title: {
                        selector: '.post__title'
                    },
                    hubs: {
                        selector: '.post__hubs',
                        inner: {
                            links: {
                                selector: '.hub-links',
                                type: Array
                            }
                        }
                    }
                }
            }
        }
    }
};

/*
page:
{
    posts: [
        {
            title: 'Its Title!',
            hubs: {
                links: ['Разработка веб-сайтов', 'Виртуализация', 'Микросервисы']
            }
        }
    ]
}
*/
function buildFromDom($, format) {
    let root = $('.content-list');
    let posts = $('article', root);
    for (let i in posts) {
        let title = $('.post__title', $(posts[i])).text();
        console.log(title);
    }
    console.log(posts.length);

    return [];
}


function getFavorites() {
    return new Promise(function(resolve) {
        axios.get(url).then(response => {
            const $ = cheerio.load(response.data)
            let posts = buildFromDom($, htmlFormat);

            // console.log(dom.querySelector(tagId));

            // 20 штук
            // let nodes = dom.querySelectorAll(titleClass);
            // for (let i in nodes) {
            //     console.log(nodes[i].structuredText);
            // }
            resolve(posts);
        });
    });
}

module.exports = {
    getFavorites
};
