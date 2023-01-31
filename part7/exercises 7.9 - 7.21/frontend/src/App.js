import './styles/App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { initializeBlogs } from './reducers/blogsReducer';
import { setUser } from './reducers/userReducer';
import { createNotification } from './reducers/notificationReducer';

import { ERROR } from './utils/constants';

import userService from './services/userService';
import loginService from './services/loginService';

import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import Users from './components/Users';
import User from './components/User';
import Navbar from './components/Navbar';

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

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
                        navigate('/blogs');
                    } else {
                        navigate('/');
                        throw new Error();
                    }
                })
                .catch(() => {
                    loginService.logout(dispatch);
                    navigate('/');
                    dispatch(
                        createNotification('Please log in again', ERROR, 3)
                    );
                });
        } else {
            navigate('/');
            loginService.logout(dispatch);
        }
    }, [user.token, user.name, user.username]);

    return (
        <div>
            <div>{user && user.token ? <Navbar /> : <></>}</div>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:id" element={<Blog />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<User />} />
            </Routes>
        </div>
    );
};

export default App;
