import axios from 'axios';
import userService from './userService';
import { resetUser } from '../reducers/userReducer';

const baseUrl = '/api/login';

const login = (username, password) => {
    return axios.post(baseUrl, { username, password }).then(res => res.data);
};

const logout = dispatch => {
    window.localStorage.removeItem('user');
    dispatch(resetUser());
    userService.setToken(null);
};

export default { login, logout };
