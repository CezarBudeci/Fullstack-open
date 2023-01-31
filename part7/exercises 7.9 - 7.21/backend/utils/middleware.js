const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');
const User = require('../models/user');

const errorHandler = (err, req, res, next) => {
    switch (err.name) {
        case 'ValidationError':
        case 'InvalidArgumentError':
            return res.status(400).json({ error: err.message });
        case 'UnauthorizedError':
            return res.status(401).json({ error: err.message });
        case 'JsonWebTokenError':
            return res.status(401).json({ error: 'Invalid token' });
        case 'TokenExpiredError':
            return res.status(401).json({ error: 'Token expired' });
        case 'CastError':
            return res.status(500).json({ error: err.message });
        default:
            break;
    }

    next(err);
};

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7);
    }

    next();
};

const userExtractor = async (req, res, next) => {
    const decodedToken = jwt.verify(req.token, SECRET);
    if (!decodedToken.id) {
        throwUnauthorizedError('Invalid token');
    }

    const user = await User.findById(decodedToken.id);
    req.user = user;

    next();
};

module.exports = { errorHandler, tokenExtractor, userExtractor };
