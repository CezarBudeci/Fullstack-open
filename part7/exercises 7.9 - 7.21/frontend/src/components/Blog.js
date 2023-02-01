import { useDispatch, useSelector } from 'react-redux';
import { updateBlog, addComment, deleteBlog } from '../reducers/blogsReducer';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Notification from './Notification';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    margin-top: 50px;
`;

const BLOG = styled.div`
    background-color: white;
    margin-top: 50px;
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    border-radius: 20px;
    border: 2px solid #0b990b;
    box-shadow: 1px 1px 2px #0b990b;
`;

const Button = styled.button`
    border-radius: 20px;
    border: 2px solid #0b990b;
    background-color: rgba(186, 255, 186, 0.5);
    padding: 0 10px;
    min-height: 26px;
    &:hover {
        border: 2px solid #0b990b;
        box-shadow: 0px 0px 5px #0b990b;
        cursor: pointer;
    }
    &:active {
        border: 2px solid #0b990b;
        outline: none;
        box-shadow: none;
        cursor: pointer;
        background-color: white;
    }
`;

const RemoveButton = styled.button`
    border-radius: 20px;
    border: 2px solid #c75f5f;
    background-color: #facfcf;
    padding: 0 10px;
    min-height: 26px;
    &:hover {
        border: 2px solid #c75f5f;
        box-shadow: 0px 0px 5px #c75f5f;
        cursor: pointer;
    }
    &:active {
        border: 2px solid #c75f5f;
        outline: none;
        box-shadow: none;
        cursor: pointer;
        background-color: white;
    }
`;

const Input = styled.input`
    border-radius: 20px;
    border: 2px solid #0b990b;
    min-height: 20px;
    &:focus {
        border: 2px solid #0b990b;
        outline: none;
        box-shadow: 0px 0px 5px #0b990b;
    }
`;

const Form = styled.form`
    display: flex;
    gap: 10px;
`;

const Ul = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Li = styled.li`
    margin: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #0b990b;
    padding: 10px;
`;

const Blog = () => {
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
        <Container>
            <Notification />
            {blog && (
                <BLOG>
                    <h2>{blog.title}</h2>
                    <div>
                        <a href={blog.url}>{blog.url}</a>
                    </div>
                    <div>
                        {blog.likes} likes{' '}
                        <Button className="like-blog" onClick={likeBlog}>
                            Like
                        </Button>
                    </div>
                    <div>added by {blog.author}</div>
                    {checkUser() && (
                        <RemoveButton
                            className="remove-blog"
                            onClick={removeBlog}>
                            Remove
                        </RemoveButton>
                    )}
                    <h2>Comments</h2>
                    <div>
                        <Form onSubmit={e => handleSubmit(e)}>
                            <Input type="text" name="commentText" />
                            <Button>add comment</Button>
                        </Form>
                    </div>
                    <Ul>
                        {blog.comments &&
                            blog.comments.map(comment => (
                                <Li key={comment.id}>{comment.text}</Li>
                            ))}
                    </Ul>
                </BLOG>
            )}
        </Container>
    );
};

export default Blog;
