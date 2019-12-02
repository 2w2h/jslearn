let repo = require('../repo');
let mongoose = require('mongoose');

let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
/**
 * Модели для сервиса самообучения
 */
repo.setName('learn');
repo.build('learn.project', {
    name: String, // название
    description: String, // описание
    tags: [String] // тэги
});
repo.build('learn.worklog', {
    hours: Number, // часы
    description: Number, // описание
    project: ObjectId, // ссылка на learn.project
});

module.exports = repo;