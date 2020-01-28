
let axios = require('axios');
let HTMLParser = require('htmlParser');

let domain = "https://habr.com";
let url = domain + "/ru/users/pilot114/favorites/page1/";
// https://habr.com/ru/users/pilot114/favorites/tag/javascript/

// big data boss? )
let htmlFormat = {
    'post': {
        'selector': '.post',
        'inner': {
            'title': {
                'selector': '.post__title'
            },
            'hubs': {
                'selector': '.post__hubs',
                'inner': {
                    'links': {
                        'selector': '.hub-links',
                        'type': Array
                    }
                }
            }
        }
    }
};

function getFavorites() {
    return new Promise(function(resolve) {
        axios.get(url).then(response => {
            let dom = HTMLParser.parse(response.data);

            // console.log(dom.querySelector(tagId));

            // 20 штук
            let nodes = dom.querySelectorAll(titleClass);
            for (let i in nodes) {
                console.log(nodes[i].structuredText);
            }
            resolve(nodes);
        });
    });
}

module.exports = {
    getFavorites
};