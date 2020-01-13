/**
 * Загружаем домены моделей
 */
module.exports = function () {
    let domains = {
        system: require('./domain/system'),
        base: require('./domain/base'),
        access: require('./domain/access'),
        learn: require('./domain/learn'),
        external: require('./domain/external'),
    };
    return {
        domains,
        get(modelId) {
            let domain = modelId.split('.')[0];
            domain = this.domains[domain];
            // на бэке получаем модели, на фронте - только схемы
            return domain.models[modelId] || domain.schemas[modelId];
        },
        getCall(callId) {
            let domain = callId.split('.')[0];
            domain = this.domains[domain];
            return domain.calls[callId];
        }
    };
};
