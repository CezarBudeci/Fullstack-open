import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, updateBlog, deleteBlog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    };

    const [showDetails, setShowDetails] = useState(false);

    const toggleShowDetails = () => {
        setShowDetails(!showDetails);
    };

    const likeBlog = () => {
        const blogToUpdate = {
            id: blog.id,
            likes: blog.likes + 1
        };

        updateBlog(blogToUpdate);
    };

    const removeBlog = () => {
        if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
            deleteBlog(blog.id);
        }
    };

    const checkUser = () => {
        const user = window.localStorage.getItem('user');
        const parsedUser = JSON.parse(user);
        if (parsedUser.username.toString() === blog.user.username.toString()) {
            return true;
        }

        return false;
    };

    return (
        <div style={blogStyle} className = 'blog'>
            {
                showDetails ?
                    <div className='blog-details'>
                        <p>{blog.title} <button className = 'hide-blog' onClick={toggleShowDetails}>hide</button></p>
                        <p>{blog.url}</p>
                        <p>likes {blog.likes} <button className = 'like-blog' onClick = {likeBlog}>like</button></p>
                        <p>{blog.author}</p>
                        {
                            checkUser() ?
                                <button className = 'remove-blog' onClick={removeBlog}>remove</button> :
                                <div />
                        }
                    </div> :
                    <div className='blog-short'>
                        {blog.title} {blog.author} <button className = 'view-blog' onClick={toggleShowDetails}>view</button>
                    </div>
            }


        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    updateBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired
};

export default Blog;