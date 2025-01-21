const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use('/api', require('./routes/api'));

module.exports = app;