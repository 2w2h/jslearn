let repo = require('../repo');
let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * Модели для сервиса самообучения
 */
repo.setName('learn');
repo.setModel('learn.project', {
    name: String, // название
    description: String, // описание
    tags: [String] // тэги
});
repo.setModel('learn.worklog', {
    hours: Number, // часы
    description: Number, // описание
    project: ObjectId, // ссылка на learn.project
});

module.exports = repo;