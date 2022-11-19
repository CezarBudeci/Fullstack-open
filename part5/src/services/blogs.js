import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const createBlog = (blog) => {
    return axios
        .post(baseUrl, blog,
            {
                headers: {
                    'Authorization': token
                }
            }
        )
        .then(res => res.data);
};

const updateBlog = (blog) => {
    return axios
        .put(`${baseUrl}/${blog.id}`, blog)
        .then(res => res.data);
};

const deleteBlog = (id) => {
    return axios
        .delete(`${baseUrl}/${id}`,
            {
                headers: {
                    'Authorization': token
                }
            }
        )
        .then(res => res.data);
};

export default { getAll, createBlog, setToken, updateBlog, deleteBlog };