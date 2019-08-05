const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');


const { User } = require('../models/user');


const router = express.Router();


//HTTP POST METHOD
router.post('/', async (req, res) => {
    const { error } = authValidation(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     const user = await User.findOne({ email:req.body.email });
     if (!user) return res.status(400).send('Invalid email!');

     const validPassword = await bcrypt.compare(req.body.password, user.password);
     if (!validPassword) return res.status(400).send('Invalid password!');

     const token = user.generateAuthToken();
     res.send(token);

     res.send(true);
});


//auth validation method
function authValidation(req) {
    const schema = {
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(5).required()
    }

    return Joi.validate(req, schema);
};



module.exports = router;


