let express = require('express');
let router = express.Router();

let rest = require('./http/rest');
let rpc = require('./http/rpc');

const model = require('../../common/index');
const binding = require('../../common/binding');

rpc.router = rest.router = router;

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
for (let resource in binding.rest) {
    if (binding.rest.hasOwnProperty(resource)) {
        rest.buildResource(resource, m.get(binding.rest[resource]));
    }
}
/**
 * Создаём RPC вызовы
 */
rpc.registerEndpoint('/rpc');
for (let i in binding.rpc) {
    let callName = binding.rpc[i];
    rpc.buildCall(callName, m.getCall(callName));
}

module.exports = rest.router;
