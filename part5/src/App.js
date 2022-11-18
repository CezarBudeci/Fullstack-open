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
    .catch(err => displayError(`Failed to create blog`));
  };

  const displayMessage = (value) => {
    setMessage(value);
    setTimeout(() => {
      setMessage(undefined);
    }, 3000);
  }

  const displayError = (value) => {
    setError(value);
    setTimeout(() => {
      setError(undefined);
    }, 3000);
  }


  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
    
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
          message = {message}
          error = {error}
        /> : 
        <LoginForm login = {login} message = {message} error = {error} />
      }
    </div>
  )
}

export default App
