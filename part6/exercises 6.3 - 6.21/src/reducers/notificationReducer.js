import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: '',
    id: ''
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return {
                message: action.payload.message,
                id: action.payload.id
            };
        },
        removeNotification(state, action) {
            return {
                message: '',
                id: ''
            };
        }
    }
});

export const { setNotification, removeNotification, getNotification } = notificationSlice.actions;

export const createNotification = (text, time) => {
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

            dispatch(setNotification({ message: text, id: timeoutId }));
        });
    };
}

export default notificationSlice.reducer;