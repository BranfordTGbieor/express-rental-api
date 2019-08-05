const Joi = require('joi');
const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 13
    },
    isGold: {
        type: Boolean,
        default: false
    }
});


const Customer = mongoose.model('Customers', customerSchema);

//Validation function for the Http requests
function validateCustomers(customers) {
    const schema = {
        name: Joi.string().min(5).required(),
        phone: Joi.string().min(10).max(13).required(),
        isGold: Joi.boolean()
    }

    return Joi.validate(customers, schema);
};



exports.Customer = Customer;
exports.validateCustomers = validateCustomers;