const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const { SECRET } = require('../utils/config');
const { throwUnauthorizedError, throwInvalidArgumentError } = require('../utils/errorUtil');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
    const result = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(result);
})

blogsRouter.post('/', userExtractor, async (request, response) => {
    const decodedToken = jwt.verify(request.token, SECRET);
    if (!decodedToken.id) {
        throwUnauthorizedError('Invalid token');
    }
    const requestBody = request.body;
    const user = request.user;
    const blog = new Blog({
        title: requestBody.title,
        author: requestBody.author,
        url: requestBody.url,
        likes: requestBody.likes || 0,
        user: user._id
    })
    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();
    response.status(201).json(result);
})

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
    const decodedToken = jwt.verify(request.token, SECRET);
    if (!decodedToken.id) {
        throwUnauthorizedError('Invalid token');
    }

    const id = request.params.id;
    if (!id) {
        throwInvalidArgumentError('Invalid id');
    } 

    const blog = await Blog.findById(id);
    if (!blog) {
        throwInvalidArgumentError('Invalid id');
    }
    
    if (!(blog.user.toString() === decodedToken.id.toString())) {
        throwUnauthorizedError('Invalid token');
    }
    const user = request.user;
    await Blog.findByIdAndDelete(id);
    user.blogs = user.blogs.filter(item => item.toString() != id.toString());
    user.save();
    return response.sendStatus(204);
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id;
    const body = request.body;
    if (!id) {
        throwInvalidArgumentError('Invalid id');
    }

    if (!body || !body.likes) {
        throwInvalidArgumentError('Likes must not be null');
    }

    const blog = {
        likes: body.likes
    }

    const savedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
    return response.json(savedBlog);
})

module.exports = blogsRouter;