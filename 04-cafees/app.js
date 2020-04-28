/**
 * Fika-sugen?
 */

require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const moment = require('moment');
const morgan = require('morgan');

// set ejs as our template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// attach body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// log all requests
app.use(morgan('tiny'));

app.use('/cafees', require('./routes/cafee'));
app.use('/categories', require('./routes/categories'));
app.use('/owners', require('./routes/owner'));

app.use('/api/cafees', require('./routes/api/api_cafees_router'));

// serve static files from `/public` folder
// using the express static middleware
app.use(express.static('public'));

// start server
app.listen(process.env.PORT || 3000, () => {
	console.log(`Server online at http://localhost:${process.env.PORT || 3000}`);
});
