/**
 * Fika-sugen?
 */

require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const moment = require('moment');
const morgan = require('morgan');

const cafeeRouter = require('./routes/cafee');
const categoriesRouter = require('./routes/categories');
const ownerRouter = require('./routes/owner');

// set ejs as our template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// attach body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// log all requests
app.use(morgan('tiny'));

app.use('/cafees', cafeeRouter);
app.use('/categories', categoriesRouter);
app.use('/owners', ownerRouter);

// serve static files from `/public` folder
// using the express static middleware
app.use(express.static('public'));

// listen on port 3000
app.listen(3000, () => {
	console.log('Server online at http://localhost:3000');
});
