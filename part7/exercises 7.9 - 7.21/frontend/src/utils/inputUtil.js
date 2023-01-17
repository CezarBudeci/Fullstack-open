import { createNotification } from '../reducers/notificationReducer';
import { ERROR } from './constants';

export const validateTextInput = (dispatch, value) => {
    value.trim();

    if (value) {
        return value;
    } else {
        dispatch(createNotification('Check your inputs', ERROR, 3));
        return null;
    }
};
