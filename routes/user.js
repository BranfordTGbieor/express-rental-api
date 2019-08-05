const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');


const { validateUser, User } = require('../models/user');
const auth = require('../middleware/auth');


const router = express.Router();

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});


//HTTP GET METHODS
router.get('/', async (req, res) => {
    const user = await User.find().sort('email');
    res.send(user);
});

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404).send('The requested user does not exist');
    }

    res.send(user);
});


//HTTP POST METHOD
router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     let user = await User.findOne({ email:req.body.email });
     if (user) return res.status(400).send('user already exist');

    user = new User(_.pick(req.body, ['name','email','password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id','name','email']));
});


//HTTP PUT METHOD
router.put('/:id', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const user = await User.findByIdAndUpdate(req.params.id, 
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }, { new: true});

    if (!user) return res.status(404).send('The requested user does not exist');

    res.send(user);
});


//HTTP DELETE REQUEST
router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).send('The requested user does not exist');

    res.send('The requested user has been deleted');
});


module.exports = router;


