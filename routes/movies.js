const express = require('express');

const { validateMovie, Movie } = require('../models/movies');
const { Genre } = require('../models/genre');


const router = express.Router();


//HTTP GET METHODS
router.get('/', async (req, res) => {
    const movie = await Movie.find().sort('title');
    res.send(movie);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        res.status(404).send('The movie you are requesting does not exist');
    }

    res.send(movie);
});


//HTTP POST METHOD
router.post('/', async (req, res) => {
    const { error } = validateMovie(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     const genre = await Genre.findById(req.body.genreId);
     if (!genre) return status(404).send('Invalid genre!');

    let movie = new Movie({ 
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    movie = await movie.save();
    res.send(movie);
});


//HTTP PUT METHOD
router.put('/:id', async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const movie = await Movie.findByIdAndUpdate(req.params.id, {title: req.body.title}, { new: true});
    if (!movie) return res.status(404).send('The requested movie does not exist');

    res.send(movie);
});


//HTTP DELETE REQUEST
router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(404).send('The requested movie does not exist');

    res.send('The requested movie has been deleted');
});


module.exports = router;


