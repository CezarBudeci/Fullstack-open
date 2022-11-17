const { throwInvalidArgumentError } = require('./errorUtil');

const sanitizeValues = (values) => {
    return values.map(element => element.trim());
}

const validateUsernamePassword = (username, password) => {
    if (
            !username ||
            !password ||
            username.length < 3 || 
            password.length < 3
        ) {
            throwInvalidArgumentError('Username and password must be at least 3 characters long');
    }

}

module.exports = { sanitizeValues, validateUsernamePassword };