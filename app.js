const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const mongoose = require('mongoose');

const genre = require('./routes/genre');
const customers = require('./routes/customers');
const movie = require('./routes/movies');
const rental = require('./routes/rentals');
const user = require('./routes/user');

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('connected to the database'))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());  //express built-in middle-wares
app.use('/api/genres', genre);
app.use('/api/customers', customers);
app.use('/api/movies', movie);
app.use('/api/rentals', rental);
app.use('/api/users', user);


//API port configuration
let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});