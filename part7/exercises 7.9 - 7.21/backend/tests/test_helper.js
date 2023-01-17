const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(user => user.toJSON());
};

const getToken = async () => {
    await User.deleteMany({});
    const user = new User({
        username: 'test',
        passwordHash: await bcrypt.hash('test', 10)
    });
    const savedUser = await user.save();
    const token = jwt.sign({ username: savedUser.username, id: savedUser._id }, SECRET, { expiresIn: 60*30 });
    return token;
}


module.exports = { blogsInDb, usersInDb, getToken };