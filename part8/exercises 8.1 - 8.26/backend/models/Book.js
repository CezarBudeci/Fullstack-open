const mongoose = require('mongoose');

// NOTE: this package throws an error due to using a deprecrated function of mongoose
// const uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
    },
    published: {
        type: Number,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
    },
    genres: [{ type: String }],
});

// schema.plugin(uniqueValidator);

module.exports = mongoose.model('Book', schema);
