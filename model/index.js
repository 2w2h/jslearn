/**
 * Загружаем домены моделей
 */
module.exports = function () {
    let system = require('./domain/system');
        // base = require('./domain/base'),
        // access = require('./domain/access'),
        // learn = require('./domain/learn');

    console.log(system.models.page);

    // здесь подготавливаем репозитории с моделями
    return function (req, res, next) {
        console.log(req.url);
        next()
    };
};
