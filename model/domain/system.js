let repo = require('../repo');

/**
 * Программные сущности. Являются вторичными по отношению к коду.
 * Сервис reflect основан на этом домене. Все сущности имеют версионирование,
 * что позволяет смотреть историю изменения схем данных
 */
repo.setName('system');
repo.build('page', {
    name: String,
    url: String,
}); // с фронта
repo.build('route', {
    type: String, // тип апи роута (rpc / rest / graph_ql)
    url: String,
});
repo.build('domain', {
    domain: String,
    name: String,
});
repo.build('model', {
    domain: String,
    name: String,
});
repo.build('log', {
    domain: String,
    name: String,
});

module.exports = repo;