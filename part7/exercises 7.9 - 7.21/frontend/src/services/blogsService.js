import axios from 'axios';
import userService from './userService';

const baseUrl = '/api/blogs';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const createBlog = blog => {
    return axios
        .post(baseUrl, blog, {
            headers: {
                Authorization: userService.getToken(),
            },
        })
        .then(res => res.data);
};

const updateBlog = blog => {
    return axios
        .put(`${baseUrl}/${blog.id}`, blog, {
            headers: {
                Authorization: userService.getToken(),
            },
        })
        .then(res => res.data);
};

const addComment = (blogId, comment) => {
    return axios
        .post(`${baseUrl}/${blogId}/comments`, comment, {
            headers: {
                Authorization: userService.getToken(),
            },
        })
        .then(res => res.data);
};

const deleteBlog = id => {
    return axios
        .delete(`${baseUrl}/${id}`, {
            headers: {
                Authorization: userService.getToken(),
            },
        })
        .then(res => res.data);
};

export default { getAll, createBlog, updateBlog, addComment, deleteBlog };
