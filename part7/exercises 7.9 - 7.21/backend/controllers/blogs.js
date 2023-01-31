const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const { SECRET } = require('../utils/config');
const {
    throwUnauthorizedError,
    throwInvalidArgumentError,
} = require('../utils/errorUtil');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
    const result = await Blog.find({})
        .populate('user', {
            username: 1,
            name: 1,
        })
        .populate('comments', { text: 1 });
    response.json(result);
});

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
        user: user._id,
    });
    let result = await blog.save();
    result = await Blog.findById(result._id).populate('user', {
        username: 1,
        name: 1,
    });
    user.blogs = user.blogs.concat(result._id);
    await user.save();
    response.status(201).json(result);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
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

    let commentIdsToDelete = [];
    blog.comments.map(comment => {
        commentIdsToDelete.push(comment._id);
    });

    if (commentIdsToDelete.length > 0) {
        await Comment.deleteMany({
            _id: {
                $in: commentIdsToDelete,
            },
        });
    }
    await Blog.findByIdAndDelete(id);
    user.blogs = user.blogs.filter(item => item.toString() != id.toString());
    user.save();
    return response.sendStatus(204);
});

blogsRouter.put('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, SECRET);
    if (!decodedToken.id) {
        throwUnauthorizedError('Invalid token');
    }

    const id = request.params.id;
    const body = request.body;
    if (!id) {
        throwInvalidArgumentError('Invalid id');
    }

    if (!body || !body.likes) {
        throwInvalidArgumentError('Likes must not be null');
    }

    const blog = {
        likes: body.likes,
    };

    const savedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
    return response.json(savedBlog);
});

blogsRouter.post('/:id/comments', async (request, response) => {
    const decodedToken = jwt.verify(request.token, SECRET);
    if (!decodedToken.id) {
        throwUnauthorizedError('Invalid token');
    }

    const body = request.body;
    const blogId = request.params.id;
    if (!body.text) {
        throwInvalidArgumentError('Invalid comment text');
    }
    if (!blogId) {
        throwInvalidArgumentError('Invalid blog id');
    }

    const existingBlog = await Blog.findById(blogId);

    if (!existingBlog) {
        throwInvalidArgumentError(`Failed to get blog by id: ${blogId}`);
    }

    const newComment = new Comment({
        text: body.text,
        blog: existingBlog.id,
    });

    let result = await newComment.save();
    result = await Comment.findById(result._id).populate('blog', {
        title: 1,
        author: 1,
        url: 1,
    });

    existingBlog.comments = existingBlog.comments.concat(result._id);
    await existingBlog.save();
    response.status(201).json(result);
});

module.exports = blogsRouter;
