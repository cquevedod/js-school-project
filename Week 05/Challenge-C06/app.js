'use strict';

const express = require('express');
const bodyparser = require('body-parser');

let app = express();
const data = require('./getData');

//load paths
const user_routes = require('./routes/userRoute');
const book_routes = require('./routes/bookRoute')

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

// set headers http

// base paths (/api/...)

//Middleware, before make request have 'api' adelante, 
// Se carga la ruta que se tenga configurada.
app.use('/api', user_routes); 
app.use('/api', book_routes); 

app.get('/test', (req, res) => {
    res.status(200).send({message: 'Welcome to the test response'})
});

// const baseUrl = '/api/';

app.get(`/api/populateDB`, (req, res) => {
  data.populateDB(req, res);
});


module.exports = app;