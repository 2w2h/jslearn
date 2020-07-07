let repo = require('../repo');

/**
 * Модели управления доступом
 */
repo.setName('access');
repo.setModel('access.auth', {});
repo.setModel('access.roles', {});

module.exports = repo;