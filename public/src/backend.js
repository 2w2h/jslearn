import axios from 'axios'

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

/**
 * async/await запросы
 *
 * save - create / update (если с _id)
 * load - find / read (если с _id)
 * remove - delete
 */
const save = async (params) => {
    try {
        let urlId = params._id ? ('/' + params._id) : '';
        const response = await instance.post('/user' + urlId, params);
        return response.data;
    } catch (error) {
        // console.error(error);
    }
};
const load = async (params) => {
    try {
        let urlId = params._id ? ('/' + params._id) : '';
        const response = await instance.get('/user' + urlId, params);
        return response.data;
    } catch (error) {
        // console.error(error);
    }
};
const remove = async (params) => {
    try {
        const response = await instance.delete('/user/' + params._id, params);
        return response.data;
    } catch (error) {
        // console.error(error);
    }
};

let User = {
    toJson: () => JSON.parse(JSON.stringify(User)),
    save, load, remove,

    login: null, // строковый идентификатор
    first_name: null, // Имя
    last_name: null, // Фамилия
    active: null, // Признак активности
    password: null, // пароль
    salt: null, // уникальная соль
    email: null, // email
    last_seen: null, // последнее посещение
    update_at: null, // время обновления
};

export default User;
