let rest = require('./http/rest');
const model = require('../model/index');

// модели
let m = model();

/**
 * Создаём REST ресурсы и привязываем их к моделям из доменов
 */
rest.buildResource('user', m.get('base.user'));
rest.buildResource('project', m.get('learn.project'));
rest.buildResource('worklog', m.get('learn.worklog'));

module.exports = rest.router;
