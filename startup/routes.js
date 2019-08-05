const express = require('express');

const error = require('../middleware/error');
const genre = require('../routes/genre');
const customers = require('../routes/customers');
const movie = require('../routes/movies');
const rental = require('../routes/rentals');
const user = require('../routes/user');
const auth = require('../routes/auth');


module.exports = function(app) {
app.use(express.json());  //express built-in middle-wares
app.use('/api/genres', genre);
app.use('/api/customers', customers);
app.use('/api/movies', movie);
app.use('/api/rentals', rental);
app.use('/api/users', user);
app.use('/api/auth', auth);
app.use(error);
}