const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./routes'));

module.exports = app;
