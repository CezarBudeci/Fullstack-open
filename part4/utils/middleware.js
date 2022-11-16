const errorHandler = (err, req, res, next) => {
    switch (err.name) {
        case 'ValidationError':
        case 'InvalidArgumentError':
            return res.status(400).json({ error: err.message });
        case 'CastError':
            return res.status(500).json({ error: err.message });
        default:
            break;
    }

    next(err);
}

module.exports = { errorHandler };