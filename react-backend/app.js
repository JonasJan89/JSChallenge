const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const requestHandler = require('./handlers/requestHandler.js');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(requestHandler);

module.exports = app;
