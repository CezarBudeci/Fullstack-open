import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Notification from './Notification';
import Togglable from './Toggable';
import userService from '../services/loginService';

const Blogs = () => {
    const blogFormRef = useRef();
    const dispatch = useDispatch();

    const blogs = useSelector(state => state.blogs);
    const stateUser = useSelector(state => state.user);

    return (
        <div>
            <h2>blogs</h2>
            <Notification />
            <p>
                {stateUser.name} logged in
                <button onClick={() => userService.logout(dispatch)}>
                    logout
                </button>
            </p>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm ref={blogFormRef} />
            </Togglable>
            <div className="blogs">
                {blogs.map(blog => (
                    <Blog key={blog.id} blog={blog} />
                ))}
            </div>
        </div>
    );
};

export default Blogs;
