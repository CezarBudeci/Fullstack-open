const mongoose = require('mongoose');

// NOTE: this package throws an error due to using a deprecrated function of mongoose
// const uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
    },
    born: {
        type: Number,
    },
});

// schema.plugin(uniqueValidator);

module.exports = mongoose.model('Author', schema);
