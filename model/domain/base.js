let repo = require('../repo');
let mongoose = require('mongoose');

let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
/**
 * Самая базовая бизнес-логика
 */
repo.setName('base');
repo.build('base.user', {
    login: String, // строковый идентификатор
    first_name: String, // Имя
    last_name: String, // Фамилия
    active: Boolean, // Признак активности
    password: String, // пароль
    salt: String, // уникальная соль
    email: String, // email
    last_seen: Date, // последнее посещение
    update_at: Date, // время обновления
});
repo.build('base.log', {
    type: String, // какое действие логгируем, если есть (request, db, external)
    user: ObjectId, // кто, ссылка на base.user
    reference: String, // где, ссылка на место в коде
    date: Date, // когда
    duration: Number, // продолжительность действия в миллисекундах
});

module.exports = repo;