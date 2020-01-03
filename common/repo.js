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
    calls: {},
    setName(name) {
        this.name = name;
    },
    // TODO: 3 параметр - объект с методами объекта
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
    },
    setCall(name, call) {
        this.calls[name] = call;
    }
};

module.exports = repo;
