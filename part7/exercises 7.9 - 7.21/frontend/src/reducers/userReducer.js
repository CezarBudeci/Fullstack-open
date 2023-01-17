import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/loginService';
import userService from '../services/userService';
import { createNotification } from './notificationReducer';
import { ERROR } from '../utils/constants';

const initialState = {
    name: '',
    token: '',
    username: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            return action.payload;
        },
        resetUser(state, action) {
            return initialState;
        },
    },
});

export const { setUser, resetUser } = userSlice.actions;

export const login = (username, password) => {
    return dispatch => {
        return loginService
            .login(username, password)
            .then(data => {
                dispatch(setUser(data));
                userService.setToken(data.token);
                window.localStorage.setItem('user', JSON.stringify(data));
            })
            .catch(err =>
                dispatch(
                    createNotification(
                        err.response.status === 401
                            ? 'Wrong username or password'
                            : 'Login failed',
                        ERROR,
                        3
                    )
                )
            );
    };
};

export default userSlice.reducer;
