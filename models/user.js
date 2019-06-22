const Joi = require('joi');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    }
});

const User = mongoose.model('User', userSchema);

//Input validation method
function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).required(),
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(5).required()
    }

    return Joi.validate(user, schema);
};


exports.validateUser = validateUser;
exports.User = User;
exports.userSchema = userSchema;