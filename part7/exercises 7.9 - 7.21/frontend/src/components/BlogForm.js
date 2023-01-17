import { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { createBlog } from '../reducers/blogsReducer';
import { useDispatch } from 'react-redux';

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
    };

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <h2>Create new</h2>
                </div>
                <div>
                    title: <input type="text" name="title" />
                </div>
                <div>
                    author: <input type="text" name="author" />
                </div>
                <div>
                    url: <input type="text" name="url" />
                </div>
                <div>
                    <button type="submit">create</button>
                </div>
            </form>
        </div>
    );
});

export default BlogForm;
