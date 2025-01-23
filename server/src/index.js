const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/api');

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);

module.exports = app;