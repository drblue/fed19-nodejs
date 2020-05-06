/**
 * Fika-sugen?
 */

require('dotenv').config();
const express = require('express');

const app = express();
const { body, matchedData, validationResult } = require('express-validator');
const morgan = require('morgan');

// set ejs as our template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// attach body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// allow cors
const cors = require('cors');
app.use(cors());

// log all requests
app.use(morgan('tiny'));

// HTML endpoints
app.use('/cafees', require('./routes/cafees_router'));
app.use('/categories', require('./routes/categories_router'));
app.use('/owners', require('./routes/owners_router'));

// API endpoints
app.use('/api/cafees', require('./routes/api/api_cafees_router'));
app.use('/api/categories', require('./routes/api/api_categories_router'));
app.use('/api/owners', require('./routes/api/api_owners_router'));

// serve static files from `/public` folder
// using the express static middleware
app.use(express.static('public'));

// start server
app.listen(process.env.PORT || 3000, () => {
	console.log(`Server online at http://localhost:${process.env.PORT || 3000}`);
});
