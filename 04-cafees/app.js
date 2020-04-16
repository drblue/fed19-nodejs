/**
 * Fika-sugen?
 */

const express = require('express');
const app = express();
const moment = require('moment');
const mysql = require('mysql');

// set ejs as our template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// register a middleware that logs all requests to the console
app.use((req, res, next) => {
	console.log(`${moment().format('YYYY-MM-DD HH:mm:ss.SSS')} - Incoming ${req.method} request for: ${req.url}`);
	next();
});

// show specific café
app.get('/cafees/:cafeId', (req, res) => {
	// connect to database
	const db = mysql.createConnection({
		host: 'localhost',
		user: 'www', // AMPPS mySQL default user: root
		password: 'apa', // AMPPS mySQL default password: mysql
		database: 'fika',
	});
	db.connect();

	// ask database nicely for the specific café that was requested
	const sqlQuery = 'SELECT * FROM cafees WHERE id = ' + req.params.cafeId;

	db.query(sqlQuery, (error, results, fields) => {
		// this callback will be executed once the query returns a result
		if (error) {
			// ABORT, ABORT! EJECT!
			res.status(500).send('Sorry, database made a poo-poo.');
			throw error;
		}

		console.log(results);

		// let cafee = false;
		// if (results.length === 1) {
		// 	cafee = results[0];
		// }

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
	// connect to database
	const db = mysql.createConnection({
		host: 'localhost',
		user: 'www', // AMPPS mySQL default user: root
		password: 'apa', // AMPPS mySQL default password: mysql
		database: 'fika',
	});
	db.connect();

	// ask database nicely for a list of all cafés
	db.query('SELECT * FROM cafees', (error, results, fields) => {
		// this callback will be executed once the query returns a result
		if (error) {
			// ABORT, ABORT! EJECT!
			res.status(500).send('Sorry, database made a poo-poo.');
			throw error;
		}

		// console.log(results);

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
