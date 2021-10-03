let axios = require('axios');
const cheerio = require('cheerio');
const {buildFromDom} = require('../parsers/html');

// https://www.litres.ru/znaniya-navyki/uchebnaya-nauchnaya-literatura
// https://www.litres.ru/knigi-nauka-obrazovanie/nauchno-populyarnaya-literatura
// https://www.litres.ru/kompyuternaya-literatura

function generator() {
    let url = "https://www.litres.ru/kompyuternaya-literatura/page-";
    let page = 0;
    return () => url + ++page + '/?lite=1';
}

let pageFormat = {
    selector: '.books_box',
    books: {
        selector: ['.art-item'],
        author: {
            selector: '.art__author',
        },
        name: {
            selector: '.art__name',
        },
        image: {
            selector: '.cover-image-wrapper > a',
            attr: 'href',
        },
    }
};

const getPopular = async () => {
    let books = [];
    let nextPage = generator();

    let pageCount = 5;

    while (pageCount) {
        let pageData = await axios.get(nextPage());
        let $ = cheerio.load(pageData.data);
        let pageBooks = buildFromDom($, pageFormat).books;
        books = books.concat(pageBooks);

        pageCount -= 1;
    }
    return books;
};

module.exports = {
    getPopular
};
