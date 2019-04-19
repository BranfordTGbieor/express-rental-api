const express = require('express');

const { validateGenre, Genre } = require('../models/genre');


const router = express.Router();


//HTTP GET METHODS
router.get('/', async (req, res) => {
    const genre = await Genre.find().sort('name');
    res.send(genre);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) {
        res.status(404).send('The genre you are requesting does not exist');
    }

    res.send(genre);
});


//HTTP POST METHOD
router.post('/', async (req, res) => {
    const { error } = validateGenre(req.body);
     if(error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name});
    genre = await genre.save();
    res.send(genre);
});


//HTTP PUT METHOD
router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, { new: true});
    if (!genre) return res.status(404).send('The requested genre does not exist');

    res.send(genre);
});


//HTTP DELETE REQUEST
router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('The requested genre does not exist');

    res.send('The requested genre has been deleted');
});


module.exports = router;


