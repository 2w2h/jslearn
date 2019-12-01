let rest = require('./http/rest');

rest.buildResource('user');
rest.buildResource('project');
rest.buildResource('worklog');

module.exports = rest.router;
