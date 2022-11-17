const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');
const { throwInvalidArgumentError, throwUnauthorizedError } = require('../utils/errorUtil');
const { SECRET } = require('../utils/config');

loginRouter.post('/', async (request, response) => {
    const body = request.body;
    if (!body) {
        throwInvalidArgumentError("Request body must not be null");
    }

    if (!body.username || !body.password) {
        throwInvalidArgumentError("Username and password must not be null");
    }

    const { username, password } = request.body;

    const user = await User.findOne({ username });
    const passwordIsCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordIsCorrect)) {
        throwUnauthorizedError("Invalid credentials");
    }

    const userForToken = {
        username: user.username,
        id: user._id
    };

    const token = jwt.sign(userForToken, SECRET, { expiresIn: 60*30 });

    response.status(200).send({ token, username: user.username, name: user.name });
})


module.exports = loginRouter;