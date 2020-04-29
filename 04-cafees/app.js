/**
 * Fika-sugen?
 */

require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const { body, matchedData, validationResult } = require('express-validator');
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

app.use('/cafees', require('./routes/cafees_router'));
app.use('/categories', require('./routes/categories_router'));
app.use('/owners', require('./routes/owners_router'));

app.use('/api/cafees', require('./routes/api/api_cafees_router'));

app.post('/api/test', [
	body('name').trim().isLength({ min: 3 }),
	body('address').exists().trim().isString(),
	body('city').isString().notEmpty(),
], (req, res) => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		res.status(422).send({ errors: result.array() });
		return;
	}

	console.log("Incoming body:", req.body);

	const validData = matchedData(req);
	console.log("Valid data", validData);

	res.send({ status: 'success' });
})

// serve static files from `/public` folder
// using the express static middleware
app.use(express.static('public'));

// start server
app.listen(process.env.PORT || 3000, () => {
	console.log(`Server online at http://localhost:${process.env.PORT || 3000}`);
});
