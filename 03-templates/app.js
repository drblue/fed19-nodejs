/**
 * express
 */

const express = require('express');
const app = express();
const moment = require('moment');

// set ejs as our template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// register a middleware that logs all requests to the console
app.use((req, res, next) => {
	const now = moment().format('YYYY-MM-DD HH:mm:ss');
	console.log(`${now} - Incoming ${req.method} request for: ${req.url}`);
	next();
});

// respond to GET-requests to `/`
app.get('/', (req, res) => {
	res.send('Hello from the root.');
});

// respond to GET-requests to `/nom`
app.get('/nom', (req, res) => {
	res.send('Halvah powder chupa chups sugar plum carrot cake jelly beans. Topping biscuit chupa chups I love. Sweet roll liquorice sugar plum macaroon sesame snaps sugar plum liquorice cookie topping.');
});

// app.get('/omglol', (req, res) => {
// 	res.send("yolo");
// });

// we can also send objects and Express will stringify them and set
// content-type to application/json automagically
app.get('/api/nom', (req, res) => {
	res.send({ msg: 'Cakes are om-nom-nom.' });
});

// omg, even route parameters! wh0000t
app.get('/users/:userId', (req, res) => {
	// create dummy user object
	const view_data = {
		id: req.params.userId,
		name: 'Anonymous Haxx0r',
		email: 'haxx0r@nsa.gov',
		phone: '1-555-HACKME',
		hobbies: ['hacking', 'sleeping', 'hacking some more'],
	}

	// pass user info to view
	res.render('user_profile.ejs', view_data);
});

// serve static files from `/public` folder
// using the express static middleware
app.use(express.static('public'));

// 404-handler
app.use((req, res, next) => {
	// this is only executed if NO OTHER ROUTE matches the incoming request
	console.warn(`WARNING! Request for ${req.url} was made but no route or file matched!`);
	res.send("Oopsie, that one got away :(");
});

// listen on port 3000
app.listen(3000, () => {
	console.log('Server online at http://localhost:3000');
});
