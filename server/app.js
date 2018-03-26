const express = require('express');
const morgan = require('morgan'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// mongoose.connect('mongodb://localhost/my-blog', { useMongoClient: true });
// mongoose.connect('mongodb://localhost/my-blog');
mongoose.connect('mongodb://KeeganJustis:12345@ds123919.mlab.com:23919/ocakj')

mongoose.Promise = Promise;




const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send();
})

app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));







module.exports = app;