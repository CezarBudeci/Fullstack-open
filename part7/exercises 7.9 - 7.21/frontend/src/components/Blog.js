import { useDispatch, useSelector } from 'react-redux';
import { updateBlog, addComment, deleteBlog } from '../reducers/blogsReducer';
import { useNavigate, useParams } from 'react-router-dom';

const Blog = () => {
    // const blogStyle = {
    //     paddingTop: 10,
    //     paddingLeft: 2,
    //     border: 'solid',
    //     borderWidth: 1,
    //     marginBottom: 5,
    // };

    const id = useParams().id;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const stateUser = useSelector(state => state.user);
    const blog = useSelector(state => state.blogs.find(blog => blog.id === id));

    const likeBlog = () => {
        const blogToUpdate = { ...blog, likes: blog.likes + 1 };

        dispatch(updateBlog(blogToUpdate));
    };

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(addComment(blog.id, { text: e.target.commentText.value }));

        e.target.commentText.value = '';
    };

    const removeBlog = () => {
        if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
            dispatch(deleteBlog(blog.id));
            navigate(-1);
        }
    };

    const checkUser = () => {
        if (stateUser.username.toString() === blog.user.username.toString()) {
            return true;
        }

        return false;
    };

    return (
        <div className="blog">
            {blog && (
                <div>
                    <h2>{blog.title}</h2>
                    <div>
                        <a href={blog.url}>{blog.url}</a>
                    </div>
                    <div>
                        {blog.likes} likes{' '}
                        <button className="like-blog" onClick={likeBlog}>
                            like
                        </button>
                    </div>
                    <div>added by {blog.author}</div>
                    {checkUser() && (
                        <button className="remove-blog" onClick={removeBlog}>
                            remove
                        </button>
                    )}
                    <h2>comments</h2>
                    <div>
                        <form onSubmit={e => handleSubmit(e)}>
                            <input type="text" name="commentText" />
                            <button>add comment</button>
                        </form>
                    </div>
                    <ul>
                        {blog.comments &&
                            blog.comments.map(comment => (
                                <li key={comment.id}>{comment.text}</li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Blog;
