let data = require('../repo');

/**
 * Модели для сервиса самообучения
 */
data.build('learn.project', {
    name: String, // название
    description: String, // описание
    tags: [String] // тэги
});
data.build('learn.worklog', {
    hours: Number, // часы
    description: Number, // описание
    project: ObjectId, // ссылка на learn.project
});