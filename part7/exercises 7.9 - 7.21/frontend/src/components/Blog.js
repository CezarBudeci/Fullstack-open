import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
    updateBlog,
    deleteBlog,
    updateBlogShowDetails,
} from '../reducers/blogsReducer';

const Blog = ({ blog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    };

    const dispatch = useDispatch();
    const stateUser = useSelector(state => state.user);

    const toggleShowDetails = () => {
        dispatch(
            updateBlogShowDetails({ ...blog, showDetails: !blog.showDetails })
        );
    };

    const likeBlog = () => {
        const blogToUpdate = { ...blog, likes: blog.likes + 1 };

        dispatch(updateBlog(blogToUpdate));
    };

    const removeBlog = () => {
        if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
            dispatch(deleteBlog(blog.id));
        }
    };

    const checkUser = () => {
        if (stateUser.username.toString() === blog.user.username.toString()) {
            return true;
        }

        return false;
    };

    return (
        <div style={blogStyle} className="blog">
            {blog.showDetails ? (
                <div className="blog-details">
                    <p>
                        {blog.title}{' '}
                        <button
                            className="hide-blog"
                            onClick={toggleShowDetails}>
                            hide
                        </button>
                    </p>
                    <p>{blog.url}</p>
                    <p>
                        likes {blog.likes}{' '}
                        <button className="like-blog" onClick={likeBlog}>
                            like
                        </button>
                    </p>
                    <p>{blog.author}</p>
                    {checkUser() ? (
                        <button className="remove-blog" onClick={removeBlog}>
                            remove
                        </button>
                    ) : (
                        <div />
                    )}
                </div>
            ) : (
                <div className="blog-short">
                    {blog.title} {blog.author}{' '}
                    <button className="view-blog" onClick={toggleShowDetails}>
                        view
                    </button>
                </div>
            )}
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
};

export default Blog;
