import axios from 'axios';

const baseUrl = '/api/users';
let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`;
};

const getToken = () => token;

const getCurrentUser = () => {
    return axios
        .get(`${baseUrl}/user`, {
            headers: {
                Authorization: getToken(),
            },
        })
        .then(res => res.data);
};

export default { setToken, getToken, getCurrentUser };
