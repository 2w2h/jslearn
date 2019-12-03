import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/v1/'
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

/**
 * async/await ЗАПРОСЫ
 */
const createUser = async (params) => {
    try {
        const response = await instance.post('/user', params);
        return response.data;
    } catch (error) {
        // console.error(error);
    }
};

export default createUser
