const express = require('express');
const mongoose = require('mongoose');

const genre = require('./routes/genre');
const customers = require('./routes/customers');
const movie = require('./routes/movies');

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('connected to the database'))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());  //express built-in middle-wares
app.use('/api/genres', genre);
app.use('/api/customers', customers);
app.use('/api/movies', movie);


//API port configuration
let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});