import axios from 'axios'
import rest from './rest'
import rpc from './rpc'

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
rpc.setDriver(instance);

// TODO: получение других моделей REST
let User = rest.getResource('user');

// TODO: получение других вызовов RPC
let githubStars = rpc.getCall('external.githubGetStars');
let githubStarsAddDesc = rpc.getCall('external.githubStarsAddDesc');

export {
    User,
    githubStars,
    githubStarsAddDesc
};
