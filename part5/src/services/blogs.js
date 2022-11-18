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

export default { getAll, createBlog, setToken }