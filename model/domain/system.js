let repo = require('../repo');

/**
 * Программные сущности. Являются вторичными по отношению к коду.
 * Сервис reflect основан на этом домене. Модели имеют версионирование,
 * что позволяет смотреть историю изменения схем данных.
 *
 * Заполняется cron задачей, изменения фиксируются в сущность system.log
 */
repo.setName('system');
repo.setModel('system.page', { // сервисы SPA, с фронта
    name: String,
    url: String,
});
repo.setModel('system.route', {
    name: String,
    type: String, // тип апи роута (rpc / rest / graph_ql)
    url: String,
});
repo.setModel('system.domain', { // домены
    name: String,
});
repo.setModel('system.model', { // модели
    domain: String,
    name: String,
});
repo.setModel('system.log', { // лог изменений сущностей выше
    domain: String,
    name: String,
    prev: Object,
    current: Object,
});

module.exports = repo;