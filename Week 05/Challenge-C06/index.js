'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3977;


mongoose.connect('mongodb://localhost:27017/bookInfo',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
    })
    .then(() => console.log('connection to database succesful!'))
    .catch (err => console.error('Error trying to connect to Mongo DB', err))

    app.listen(port, function() {
        console.log(`Bookshelf server listening at http://localhost:${port}`);
    });

  