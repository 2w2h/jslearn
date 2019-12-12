import axios from 'axios'
import rest from './rest'

const instance = axios.create({
    baseURL: 'http://' + window.location.hostname + ':3000/api/v1/'
});

instance.interceptors.request.use(function (config) {
    // перед отправкой можно запустить валидацию
    return config;
}, function (error) {
    // console.log(error.toJSON());
    // ошибка запроса?
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    // 2xx статусы
    return response;
}, function (error) {
    // console.log(error.toJSON());
    // не 2xx статусы
    return Promise.reject(error);
});

rest.setDriver(instance);

// TODO: получение других моделей
let User = rest.getResource('user');

export default User;
