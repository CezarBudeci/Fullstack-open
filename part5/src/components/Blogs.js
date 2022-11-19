import { useRef } from 'react';
import PropTypes from 'prop-types';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Notification from './Notification';
import Togglable from './Toggable';

const Blogs = (props) => {
    const blogFormRef = useRef();

    const createBlog = (blog) => {
        blogFormRef.current.toggleVisible();
        props.createBlog(blog);
    };

    return (
        <div>
            <h2>blogs</h2>
            {
                props.message && <Notification type = "MESSAGE" text = {props.message} />
            }
            {
                props.error && <Notification type = "ERROR" text = {props.error} />
            }
            <p>{props.user.name} logged in <button onClick={props.logout}>logout</button></p>
            <Togglable buttonLabel = "new blog" ref = {blogFormRef}>
                <BlogForm createBlog = {createBlog} />
            </Togglable>
            {props.blogs.map(blog =>
                <Blog key = {blog.id} blog = {blog} updateBlog = {props.updateBlog} deleteBlog = {props.deleteBlog} />
            )}
        </div>
    );
};

Blogs.propTypes = {
    createBlog: PropTypes.func.isRequired,
    updateBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    message: PropTypes.string,
    error: PropTypes.string,
    blogs: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
};

export default Blogs;