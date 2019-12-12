let mongoose = require('mongoose');

// для боя
// mongoose.set('autoIndex', false);

// если поле type - нужно делать перечисляемым (по умолчанию, оно используется??? https://mongoosejs.com/docs/schematypes.html#type-key)
// tags, active и пр. - при создании модели показывать подсказки, наводящие вопросы
// автополе - update_at

let repo = {
    name: null,
    schemas: {},
    models: {},
    setName(name) {
        this.name = name;
    },
    setModel(name, schema) {
        /**
         * 1. Создание схемы
         */
        let schemaObj = new mongoose.Schema(schema);
        /**
         * 2. Добавление функционала (просто пример)
         * model.find().byName('fido').exec(...);
         */
        // schemaObj.methods.printId = function () {
        //     console.log("My id is " + this._id);
        // };
        // schemaObj.query.byName = function(name) {
        //     return this.where({ name: new RegExp(name, 'i') });
        // };
        // schemaObj.virtual('fullName').get(function () {
        //     return this.first_name + ' ' + this.last_name;
        // });
        this.schemas[name] = schemaObj;
        /**
         * 3. Компиляция модели. На фронте будет пустой
         */
        this.models[name] = mongoose.model(name, schemaObj);
    }
};

/**
 * 4. Использование
 */
// let user = data.create('base.user', { name: 'Иван' })
// но вообще, модели должны инжектиться сверху (декларативно)
// user.save((err, user) => {
//     if (err) return console.error(err);
//     user.whois();
// });
// // user.find({ name: /^Ив/ }, callback);
// user.find((err, users) => {
//     if (err) return console.error(err);
//     console.log(users);
// });

module.exports = repo;
