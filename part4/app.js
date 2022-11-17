const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('express-async-errors');

const config = require('./utils/config');
const { info, error } = require('./utils/logger');
const loginRouter = require('./controllers/login');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const { errorHandler, tokenExtractor } = require('./utils/middleware');

const app = express();


mongoose
    .connect(config.MONGODB_URL)
    .then(() => info('Successfully conneted to MongoDb'))
    .catch(err => error('Error connecting to MongoDb: ', err.message));

app.use(cors());
app.use(express.json());
app.use(tokenExtractor);
app.use('/api/login', loginRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use(errorHandler);

module.exports = app;