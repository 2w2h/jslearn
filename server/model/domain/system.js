let repo = require('../repo');

/**
 * Программные сущности. Являются вторичными по отношению к коду.
 * Сервис reflect основан на этом домене. Модели имеют версионирование,
 * что позволяет смотреть историю изменения схем данных.
 *
 * Заполняется cron задачей, изменения фиксируются в сущность system.log
 */
repo.setName('system');
repo.build('system.page', { // сервисы SPA, с фронта
    name: String,
    url: String,
});
repo.build('system.route', {
    name: String,
    type: String, // тип апи роута (rpc / rest / graph_ql)
    url: String,
});
repo.build('system.domain', { // домены
    name: String,
});
repo.build('system.model', { // модели
    domain: String,
    name: String,
});
repo.build('system.log', { // лог изменений сущностей выше
    domain: String,
    name: String,
    prev: Object,
    current: Object,
});

module.exports = repo;