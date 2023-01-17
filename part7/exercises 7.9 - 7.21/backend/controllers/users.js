const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const {
    sanitizeValues,
    validateUsernamePassword,
} = require('../utils/validation');
const { throwInvalidArgumentError } = require('../utils/errorUtil');
const { userExtractor } = require('../utils/middleware');

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {
        url: 1,
        title: 1,
        author: 1,
        id: 1,
    });
    response.json(users);
});

usersRouter.get('/user', userExtractor, async (request, response) => {
    response.status(200).send({
        token: request.token,
        username: request.user.username,
        name: request.user.name,
    });
});

usersRouter.post('/', async (request, response) => {
    const body = request.body;
    const values = [
        body.username ?? throwInvalidArgumentError('Username must not be null'),
        body.name ?? '',
        body.password ?? throwInvalidArgumentError('Password must not be null'),
    ];

    let [username, name, password] = sanitizeValues(values);
    validateUsernamePassword(username, password);

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throwInvalidArgumentError('Username must be unique');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
        username: username,
        name: name,
        passwordHash: passwordHash,
    });

    const savedUser = await newUser.save();
    response.status(201).json(savedUser);
});

module.exports = usersRouter;
