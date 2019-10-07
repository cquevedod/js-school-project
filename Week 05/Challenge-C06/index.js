'use strict'

require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3977;

mongoose.connect('mongodb://localhost:27017/bookInfo',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false 
})
.then(() => console.log('Connection to database succesful!'))
.catch (err => console.error('Error trying to connect to Mongo DB', err))

app.listen(port, function() {
  console.log(`Server listening at http://localhost:${port}`);
});


  