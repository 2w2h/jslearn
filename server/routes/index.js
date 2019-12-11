let rest = require('./http/rest');
const model = require('../../model/index');

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
rest.buildResource('user', m.get('base.user'));
rest.buildResource('project', m.get('learn.project'));
rest.buildResource('worklog', m.get('learn.worklog'));

module.exports = rest.router;
