let rest = require('./rest');

rest.buildResource('user');
rest.buildResource('project');
rest.buildResource('worklog');

module.exports = rest.router;
