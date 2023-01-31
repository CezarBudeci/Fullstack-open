import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/userService';
import { ERROR } from '../utils/constants';
import { createNotification } from './notificationReducer';

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers(state, action) {
            return action.payload;
        },
    },
});

export const { setUsers } = usersSlice.actions;

export const initializeUsers = () => {
    return dispatch => {
        return userService
            .getAllUsers()
            .then(data => dispatch(setUsers(data)))
            .catch(err =>
                dispatch(createNotification('Failed to get users', ERROR, 3))
            );
    };
};

export default usersSlice.reducer;
