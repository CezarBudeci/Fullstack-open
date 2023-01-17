import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    message: '',
    type: '',
    id: '',
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return {
                message: action.payload.message,
                type: action.payload.type,
                id: action.payload.id,
            };
        },
        removeNotification(state, action) {
            return {
                message: '',
                type: '',
                id: '',
            };
        },
    },
});

export const { setNotification, removeNotification } =
    notificationSlice.actions;

export const createNotification = (text, type, time) => {
    return (dispatch, getState) => {
        return new Promise(() => {
            const timeInMillis = time * 1000;
            const existingNotification = getState().notification;

            if (existingNotification.id) {
                clearTimeout(existingNotification.id);
            }

            const timeoutId = setTimeout(() => {
                dispatch(removeNotification());
            }, timeInMillis);

            dispatch(setNotification({ message: text, type, id: timeoutId }));
        });
    };
};

export default notificationSlice.reducer;
