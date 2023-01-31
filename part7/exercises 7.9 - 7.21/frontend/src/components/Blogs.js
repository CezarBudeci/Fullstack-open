import { useRef } from 'react';
import { useSelector } from 'react-redux';
import BlogForm from './BlogForm';
import Notification from './Notification';
import Togglable from './Toggable';
import { Link } from 'react-router-dom';

const Blogs = () => {
    const blogFormRef = useRef();

    const blogs = useSelector(state => state.blogs);

    return (
        <div>
            <Notification />
            <h2>blogs</h2>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm ref={blogFormRef} />
            </Togglable>
            <div className="blogs">
                {blogs.map(blog => (
                    <p key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Blogs;
