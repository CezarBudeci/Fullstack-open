import './styles/App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { initializeBlogs } from './reducers/blogsReducer';
import { setUser } from './reducers/userReducer';

import userService from './services/userService';
import loginService from './services/loginService';

import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import { createNotification } from './reducers/notificationReducer';
import { ERROR } from './utils/constants';

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    useEffect(() => {
        const loggedInUser = window.localStorage.getItem('user');
        const parsedLoggedInUser = JSON.parse(loggedInUser);
        if (parsedLoggedInUser) {
            userService.setToken(parsedLoggedInUser.token);
            userService
                .getCurrentUser()
                .then(data => {
                    if (
                        parsedLoggedInUser.token === data.token &&
                        parsedLoggedInUser.name === data.name &&
                        parsedLoggedInUser.username === data.username
                    ) {
                        dispatch(setUser(data));
                        dispatch(initializeBlogs());
                    } else {
                        throw new Error();
                    }
                })
                .catch(() => {
                    loginService.logout(dispatch);
                    dispatch(
                        createNotification('Please log in again', ERROR, 3)
                    );
                });
        }
    }, []);

    return <div>{user && user.token ? <Blogs /> : <LoginForm />}</div>;
};

export default App;
