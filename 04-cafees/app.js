/**
 * Fika-sugen?
 */

require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const moment = require('moment');
const mysql = require('mysql');

// set ejs as our template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// attach body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// register a middleware that logs all requests to the console
app.use((req, res, next) => {
	console.log(`${moment().format('YYYY-MM-DD HH:mm:ss.SSS')} - Incoming ${req.method} request for: ${req.url}`);
	next();
});

const getDbConnection = () => {
	// connect to database
	const db = mysql.createConnection({
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	});
	db.connect();
	return db;
}

app.get('/cafees/create', (req, res) => {
	res.render('cafees/create');
});

// show specific café
app.get('/cafees/:cafeId', (req, res) => {
	// create sql query
	const sqlQuery = 'SELECT * FROM cafees WHERE id = ?';

	// ask database nicely for the specific café that was requested
	getDbConnection().query(sqlQuery, [req.params.cafeId], (error, results, fields) => {
		// this callback will be executed once the query returns a result
		if (error) {
			// ABORT, ABORT! EJECT!
			res.status(500).send('Sorry, database made a poo-poo.');
			throw error;
		}

		const cafee = (results.length === 1)
			? results[0]
			: false;

		// once we get the café, send it to the view
		res.render('cafees/show', {
			cafee,
		});
	});
});

// show all cafées
app.get('/cafees', (req, res) => {
	// ask database nicely for a list of all cafés
	getDbConnection().query('SELECT * FROM cafees', (error, results, fields) => {
		// this callback will be executed once the query returns a result
		if (error) {
			// ABORT, ABORT! EJECT!
			res.status(500).send('Sorry, database made a poo-poo.');
			throw error;
		}

		// once we get the list, send it to the view
		res.render('cafees/index', {
			cafees: results,
		});
	});
});

// serve static files from `/public` folder
// using the express static middleware
app.use(express.static('public'));

// listen on port 3000
app.listen(3000, () => {
	console.log('Server online at http://localhost:3000');
});
