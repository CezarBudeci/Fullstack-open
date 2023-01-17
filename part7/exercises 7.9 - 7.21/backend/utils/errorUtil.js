const throwInvalidArgumentError = (message) => {
    const error = new Error();
    error.name = 'InvalidArgumentError';
    error.message = message;
    throw error;
}

const throwUnauthorizedError = (message) => {
    const error = new Error();
    error.name = 'UnauthorizedError';
    error.message = message;
    throw error;
}

module.exports = { throwInvalidArgumentError, throwUnauthorizedError };