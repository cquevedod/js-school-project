const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect('mongodb://localhost:27017/bookInfo', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
   .then(() => console.log('Connection to database succesful!'))
   .catch(err => console.error('Error trying to connect to Mongo DB', err))
}