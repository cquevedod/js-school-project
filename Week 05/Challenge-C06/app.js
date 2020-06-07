
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();
const data = require('./getData');

/*load paths*/
const user_routes = require('./routes/userRoute');
const book_routes = require('./routes/bookRoute');

app.use(bodyparser.urlencoded({ extended:false }));
app.use(bodyparser.json());

app.use(cors());

app.use('/api', user_routes); 
app.use('/api', book_routes); 

app.get('/test', (req, res) => {
  res.status(200).send({message: 'Test succesful'})
});

app.get('/api/populateDB', (req, res) => {
  data.populateDB(req, res);
});

module.exports = app;