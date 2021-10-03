/*
    Рекурсивно парсит DOM
    поддерживает поле type = 'text' | 'attr:name' для определения, как именно получать данные из узла

    Пример использования:

    let $ = cheerio.load(pageData.data);
    let pagePosts = buildFromDom($, pageFormat).posts;

    let pageFormat = {
        selector: '.content-list',
        attr: 'title',
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
*/
function buildFromDom($, format, node) {
    node = node || null;

    let selector = format.selector;
    let attr = format.attr || null;

    let keys = Object.keys(format);
    let items = [];

    if (
        keys.length < 2
        ||
        (keys.length < 3 && keys.includes('selector') && keys.includes('attr'))
    ) {
        selector = Array.isArray(selector) ? selector[0] : selector;

        $($(selector, node)).each(function(i, item){
            if (attr) {
                items.push($(item).attr(attr).trim());
            } else {
                items.push($(item).text().trim());
            }
        });
        return items.length === 1 ? items[0] : items;
    // есть вложенные поля - применяем рекурсию
    } else {
        let data = {};
        for (let i in keys) {
            let field = keys[i];
            if (field === 'selector' || field === 'attr') {
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

module.exports = {
    buildFromDom
};
