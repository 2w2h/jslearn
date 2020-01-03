
let axios = require('axios');
var HTMLParser = require('fast-html-parser');

let domain = "https://habr.com";
let url = domain + "/ru/users/pilot114/favorites/page1/";
// https://habr.com/ru/users/pilot114/favorites/tag/javascript/

let tagId = '#top-tags';
let titleClass = '.post__title';

function printNodesContent(nodes) {
    for (let i in nodes) {
        console.log(nodes[i].structuredText);
    }
}

axios.get(url).then((response) => {
    let dom = HTMLParser.parse(response.data);

    console.log(dom.querySelector(tagId));

    printNodesContent(
        dom.querySelectorAll(titleClass)
    )
});
