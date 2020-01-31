let repo = require('../repo');
let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;

// https://mongoosejs.com/docs/validation.html
// TODO: предусмотреть методы для установки валидации только на фронте или только на бэке.

/**
 * Самая базовая бизнес-логика
 */
repo.setName('base');
repo.setModel('base.user', {
    login: {type: String, required: true}, // строковый идентификатор
    active: {type: Boolean, required: true}, // Признак активности
    password: {type: String, required: true}, // пароль
    salt: {type: String, required: false}, // уникальная соль
    update_at: {type: String, required: false}, // время обновления
    first_name: {type: String, required: false}, // Имя
    last_name: {type: String, required: false}, // Фамилия
    email: {type: String, required: false}, // email
    last_seen: {type: String, required: false}, // последнее посещение
});
repo.setModel('base.log', {
    type: String, // какое действие логгируем, если есть (request, db, external)
    user: ObjectId, // кто, ссылка на base.user
    reference: String, // где, ссылка на место в коде
    date: Date, // когда
    duration: Number, // продолжительность действия в миллисекундах
});

module.exports = repo;
