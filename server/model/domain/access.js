let repo = require('../repo');

/**
 * Модели управления доступом
 */
repo.setName('access');
repo.build('access.auth', {});
repo.build('access.roles', {});

module.exports = repo;