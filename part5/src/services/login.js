import axios from 'axios';

const baseUrl = '/api/login';

const login = (username, password) => {
    return axios
        .post(baseUrl, { username, password })
        .then(res => res.data);
};

export default { login };