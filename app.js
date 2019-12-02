/*
 * Модули для Node.js
 */
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let firewall = require('helmet');
const mongo = require('mongoose');
/*
 * База данных - подключение, startup-log
 */
mongo.connect('mongodb://127.0.0.1/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const Log = mongo.model('startup', {ping: Boolean});
(new Log({ping: true})).save().then(() => {
    console.log('startup logged!')

    // начиная отсюда мы можем работать с базой
});

/*
 * Настройка модулей
 */
let app = express();
app.use(firewall());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
// отдаём скомпиленный SPA
app.use(express.static(path.join(__dirname, 'public/dist')));
// роутер
app.use('/api/v1/', require('./routes/index'));

/*
 * 404 страница
 */
app.use(function (req, res, next) {
    next(createError(404, null))
});

/*
 * Обработка ошибок
 */
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({error: err})
});

module.exports = app;
