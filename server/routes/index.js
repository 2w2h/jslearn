let rest = require('./http/rest');
const model = require('../../common/index');
const binding = require('../../common/binding');

// CORS
rest.router.use(function (req, res, next) {
    // Кому какие методы и заголовки разрешаем
    res.setHeader('Access-Control-Allow-Origin', req.get('origin') || 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Разрешать cookie в ajax
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// модели
let m = model();

/**
 * Создаём REST ресурсы и привязываем их к моделям из доменов
 */
for (let resource in binding) {
    rest.buildResource(resource, m.get(binding[resource]));
}

module.exports = rest.router;
