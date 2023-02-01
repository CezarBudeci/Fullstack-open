import { useRef } from 'react';
import { useSelector } from 'react-redux';
import BlogForm from './BlogForm';
import Notification from './Notification';
import Togglable from './Toggable';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    margin-top: 50px;
`;

const BlogsContainer = styled.div`
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

const BlogLink = styled(Link)`
    color: black;
    &:link,
    &:visited {
        text-decoration: none;
    }
    &:hover {
        text-decoration: underline;
    }
`;

const P = styled.p`
    margin: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #0b990b;
    padding: 10px;
`;

const Blogs = () => {
    const blogFormRef = useRef();

    const blogs = useSelector(state => state.blogs);

    return (
        <Container>
            <Notification />
            <h2>Blogs</h2>
            <Togglable buttonLabel="New blog" ref={blogFormRef}>
                <BlogForm ref={blogFormRef} />
            </Togglable>
            {blogs.length > 0 && (
                <BlogsContainer>
                    {blogs.map(blog => (
                        <P key={blog.id}>
                            <BlogLink to={`/blogs/${blog.id}`}>
                                {blog.title}
                            </BlogLink>
                        </P>
                    ))}
                </BlogsContainer>
            )}
        </Container>
    );
};

export default Blogs;
