const express = require('express');

const { validateUser, User } = require('../models/user');


const router = express.Router();


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

     const user = await User.findOne({ email:req.body.email });
     if (user) return res.status(400).send('user already exist');

       user = new User({ 
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    user = await user.save();
    res.send(user);
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


