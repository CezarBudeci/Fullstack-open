import { forwardRef } from 'react';
import { createBlog } from '../reducers/blogsReducer';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const Input = styled.input`
    border-radius: 20px;
    border: 2px solid #0b990b;
    min-height: 20px;
    width: 100%;
    &:focus {
        border: 2px solid #0b990b;
        outline: none;
        box-shadow: 0px 0px 5px #0b990b;
    }
`;

const InputContainer = styled.div`
    display: flex;
    width: 70%;
    justify-content: center;
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

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 70%;
`;

const BlogForm = forwardRef((props, ref) => {
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        const blog = {
            title: e.target.title.value,
            author: e.target.author.value,
            url: e.target.url.value,
        };
        dispatch(createBlog(blog));
        ref.current.toggleVisible();
        e.target.title.value = '';
        e.target.author.value = '';
        e.target.url.value = '';
    };

    return (
        <Form onSubmit={e => handleSubmit(e)}>
            <div>
                <h2>Create new</h2>
            </div>
            <InputContainer>
                <Input type="text" name="title" placeholder="Title" />
            </InputContainer>
            <InputContainer>
                <Input type="text" name="author" placeholder="Author" />
            </InputContainer>
            <InputContainer>
                <Input type="text" name="url" placeholder="URL" />
            </InputContainer>
            <div>
                <Button type="submit">Create</Button>
            </div>
        </Form>
    );
});

export default BlogForm;
