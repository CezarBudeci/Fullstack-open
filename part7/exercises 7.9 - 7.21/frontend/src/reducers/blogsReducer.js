import { createSlice } from '@reduxjs/toolkit';
import blogsService from '../services/blogsService';
import { createNotification } from './notificationReducer';
import { MESSAGE, ERROR } from '../utils/constants';
import userService from '../services/loginService';

const handleError = (dispatch, error, action) => {
    if (error.response.status === 401) {
        userService.logout(dispatch);
        dispatch(createNotification('Please log in again', ERROR, 3));
    } else {
        if (action === 'DELETE') {
            dispatch(createNotification('Failed to delete blog', ERROR, 3));
        } else if (action === 'CREATE') {
            dispatch(createNotification('Failed to create blog', ERROR, 3));
        } else if (action === 'COMMENT') {
            dispatch(createNotification('Failed to add comment', ERROR, 3));
        } else {
            dispatch(createNotification('An error has occured', ERROR, 3));
        }
    }
};

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            let blogs = action.payload;
            blogs.sort((a, b) => {
                if (a.likes > b.likes) {
                    return -1;
                }

                if (a.likes < b.likes) {
                    return 1;
                }

                return 0;
            });
            return blogs;
        },
        addBlog(state, action) {
            let payload = action.payload;
            state.push(payload);
        },
        updateBlogAction(state, action) {
            const payload = action.payload;
            const blogToUpdate = state.find(blog => blog.id === payload.id);
            const updatedBlog = {
                ...blogToUpdate,
                likes: payload.likes,
            };
            let updatedState = state.map(blog =>
                blog.id === payload.id ? updatedBlog : blog
            );
            updatedState.sort((a, b) => {
                if (a.likes > b.likes) {
                    return -1;
                }

                if (a.likes < b.likes) {
                    return 1;
                }

                return 0;
            });

            return updatedState;
        },
        addCommentAction(state, action) {
            const payload = action.payload;
            const blogToUpdate = state.find(
                blog => blog.id === payload.blog.id
            );
            const commentToAdd = {
                text: payload.text,
                id: payload.id,
            };
            blogToUpdate.comments.push(commentToAdd);
        },
        removeBlog(state, action) {
            const id = action.payload;
            const blogToDeleteIndex = state.findIndex(blog => blog.id === id);
            let stateCopy = [...state];
            if (blogToDeleteIndex > -1) {
                stateCopy.splice(blogToDeleteIndex, 1);
            }

            return stateCopy;
        },
    },
});

export const {
    setBlogs,
    addBlog,
    updateBlogAction,
    addCommentAction,
    removeBlog,
} = blogsSlice.actions;

export const initializeBlogs = () => {
    return dispatch => {
        return blogsService
            .getAll()
            .then(data => dispatch(setBlogs(data)))
            .catch(err =>
                dispatch(createNotification('Failed to get blogs', ERROR, 3))
            );
    };
};

export const createBlog = blog => {
    return dispatch => {
        return blogsService
            .createBlog(blog)
            .then(data => {
                dispatch(addBlog(data));
                dispatch(
                    createNotification(
                        `A new blog ${data.title} by ${data.author} added`,
                        MESSAGE,
                        3
                    )
                );
            })
            .catch(err => handleError(dispatch, err, 'CREATE'));
    };
};

export const updateBlog = blog => {
    return dispatch => {
        return blogsService
            .updateBlog(blog)
            .then(data => dispatch(updateBlogAction(data)))
            .catch(err => handleError(dispatch, err));
    };
};

export const addComment = (id, comment) => {
    return dispatch => {
        return blogsService
            .addComment(id, comment)
            .then(data => dispatch(addCommentAction(data)))
            .catch(err => handleError(dispatch, err, 'COMMENT'));
    };
};

export const deleteBlog = id => {
    return (dispatch, getState) => {
        const blogToDelete = getState().blogs.find(blog => blog.id === id);
        return blogsService
            .deleteBlog(id)
            .then(() => {
                dispatch(removeBlog(id));
                dispatch(
                    createNotification(
                        `Deleted blog: ${blogToDelete.title} by ${blogToDelete.author}`,
                        MESSAGE,
                        3
                    )
                );
            })
            .catch(err => handleError(dispatch, err, 'DELETE'));
    };
};

export default blogsSlice.reducer;
