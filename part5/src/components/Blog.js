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
        <div style={blogStyle}>
            {
                showDetails ?
                    <div>
                        <p>{blog.title} <button onClick={toggleShowDetails}>hide</button></p>
                        <p>{blog.url}</p>
                        <p>likes {blog.likes} <button onClick = {likeBlog}>like</button></p>
                        <p>{blog.author}</p>
                        {
                            checkUser() ?
                                <button onClick={removeBlog}>remove</button> :
                                <div />
                        }
                    </div> :
                    <div>
                        {blog.title} {blog.author} <button onClick={toggleShowDetails}>view</button>
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