/**
 * Загружаем домены моделей
 */
module.exports = function () {
    let domains = {
        system: require('./domain/system'),
        base: require('./domain/base'),
        access: require('./domain/access'),
        learn: require('./domain/learn'),
    };
    return {
        domains,
        get(modelId) {
            let domain = modelId.split('.')[0];
            // на бэке получаем модели, на фронте - только схемы
            return this.domains[domain].models[modelId] || this.domains[domain].schemas[modelId];
        }
    };
};
