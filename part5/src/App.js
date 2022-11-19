import './styles/App.css';
import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const login = (username, password) => {
        loginService
            .login(username, password)
            .then((data) => {
                setUser(data);
                blogService.setToken(data.token);
                window.localStorage.setItem('user', JSON.stringify(data));
            })
            .catch(err => displayError(err.response.status === 401 ? 'Wrong username or password' : 'Login failed'));
    };

    const logout = () => {
        window.localStorage.removeItem('user');
        setUser(null);
        blogService.setToken(null);
    };

    const createBlog = (blog) => {
        blogService
            .createBlog(blog)
            .then((data) => {
                setBlogs([...blogs, data]);
                displayMessage(`A new blog ${data.title} by ${data.author} added`);
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    logout();
                    displayError('Please log in again');
                } else {
                    displayError('Failed to create blog');
                }
            });
    };

    const updateBlog = (blog) => {
        blogService
            .updateBlog(blog)
            .then(() => {
                let blogsCopy = [...blogs];
                blogsCopy = blogsCopy.map(item => {
                    if (item.id === blog.id) {
                        return { ...item, likes: blog.likes };
                    }
                    return item;
                });
                blogsCopy = sortBlogs(blogsCopy);
                setBlogs([...blogsCopy]);
            })
            .catch(() => displayError('Failed to update blog'));
    };

    const deleteBlog = (id) => {
        blogService
            .deleteBlog(id)
            .then(() => {
                let blogsCopy = [...blogs];
                blogsCopy = blogsCopy.filter(item => item.id !== id);
                setBlogs([...blogsCopy]);
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    logout();
                    displayError('Please log in again');
                } else {
                    displayError('Failed to create blog');
                }
            });
    };

    const displayMessage = (value) => {
        setMessage(value);
        setTimeout(() => {
            setMessage(undefined);
        }, 3000);
    };

    const displayError = (value) => {
        setError(value);
        setTimeout(() => {
            setError(undefined);
        }, 3000);
    };

    const sortBlogs = (unsortedBlogs) => {
        const sortedArray = unsortedBlogs.sort((a, b) => {
            if (a.likes > b.likes) {
                return -1;
            }

            if (a.likes < b.likes) {
                return 1;
            }

            return 0;
        });

        return sortedArray;
    };

    useEffect(() => {
        const loggedInUser = window.localStorage.getItem('user');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
        blogService.getAll().then((blogs) => {
            blogs = sortBlogs(blogs);
            setBlogs(blogs);
        });

    }, []);

    return (
        <div>
            {
                user && user.token ?
                    <Blogs
                        blogs = {blogs}
                        user = {user}
                        logout = {logout}
                        createBlog = {createBlog}
                        updateBlog = {updateBlog}
                        deleteBlog = {deleteBlog}
                        message = {message}
                        error = {error}
                    /> :
                    <LoginForm login = {login} message = {message} error = {error} />
            }
        </div>
    );
};

export default App;
