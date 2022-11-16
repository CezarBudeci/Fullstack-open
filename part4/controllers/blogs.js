const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
    const result = await Blog.find({});
    response.json(result);
})

blogsRouter.post('/', async (request, response) => {
    const requestBody = request.body;
    const blog = new Blog({
        title: requestBody.title,
        author: requestBody.author,
        url: requestBody.url,
        likes: requestBody.likes || 0
    })
    const result = await blog.save();
    response.status(201).json(result);
})

blogsRouter.delete("/:id", async (request, response) => {
    const id = request.params.id;
    if (!id) {
        let error = new Error();
        error.message = "Invalid id";
        error.name = "InvalidArgumentError";
        throw error;
    } 
    await Blog.findByIdAndDelete(id);
    return response.sendStatus(204);
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id;
    const body = request.body;
    if (!id) {
        let error = new Error();
        error.message = "Invalid id";
        error.name = "InvalidArgumentError";
        throw error;
    }

    if (!body || !body.likes) {
        let error = new Error();
        error.message = "Likes must not be null";
        error.name = "InvalidArgumentError";
        throw error;
    }

    const blog = {
        likes: body.likes
    }

    const savedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
    return response.json(savedBlog);
})

module.exports = blogsRouter;