/**
 * Routes for cafés
 */

const express = require('express');
const router = express.Router();
const cafeeDb = require('../db/cafee');

// show all cafées
router.get('/', (req, res) => {
	// ask database nicely for a list of all cafés
	cafeeDb.getAll()
	.then(cafees => {
		// once we get the list, send it to the view
		res.render('cafees/index', {
			cafees,
		});
	})
	.catch(error => {
		res.status(500).send('Sorry, database threw an error when trying to get all cafees.');
		throw error;
	});
});

// create new cafe form
router.get('/create', (req, res) => {
	res.render('cafees/create');
});

// create new cafe in db
router.post('/', (req, res) => {
	console.log("Would like to create a new cafee...");

	const cafee = {
		name: req.body.name,
		address: req.body.address,
		city: req.body.city,
	}

	cafeeDb.store(cafee)
	.then(results => {
		console.log("Created a new café with ID", results[0]);
		res.redirect('/cafees/' + results[0]);
	})
	.catch(error => {
		res.status(500).send('Sorry, could not create a new café.');
		throw error;
	});
});

// show specific café
router.get('/:cafeId', (req, res) => {
	const cafeId = req.params.cafeId;

	cafeeDb.get(cafeId)
	.then(cafee => {
		// once we get the café, send it to the view
		res.render('cafees/show', {
			cafee,
		});
	})
	.catch(error => {
		res.status(500).send(`Sorry, database threw an error when trying to get cafee with ID ${cafeId}.`);
		throw error;
	});
});

// show edit café form
router.get('/:cafeId/edit', (req, res) => {
	const cafeId = req.params.cafeId;

	cafeeDb.get(cafeId)
	.then(cafee => {
		// once we get the café, send it to the view
		res.render('cafees/edit', {
			cafee,
		});
	})
	.catch(error => {
		res.status(500).send(`Sorry, database threw an error when trying to get cafee with ID ${cafeId}.`);
		throw error;
	});
});

// update café with form data
router.post('/:cafeId', (req, res) => {
	const cafeId = req.params.cafeId;

	console.log(`Would like to update cafee with ID ${cafeId}...`);

	const cafee = {
		name: req.body.name || 'Default Café Name',
		address: req.body.address,
		city: req.body.city,
	}

	cafeeDb.update(cafeId, cafee)
	.then(() => {
		console.log(`Updated café with ID ${cafeId}`);
		res.redirect('/cafees/' + cafeId);
	})
	.catch(error => {
		res.status(500).send(`Sorry, could not update café with ID ${cafeId}.`);
		throw error;
	});
});

// delete a café from db
router.post('/:cafeId/delete', (req, res) => {
	const cafeId = req.params.cafeId;

	console.log(`Want to delete café with ID ${cafeId}...`);

	cafeeDb.destroy(cafeId)
	.then(() => {
		console.log(`Deleted café with ID ${cafeId}`);
		res.redirect('/cafees');
	})
	.catch(error => {
		res.status(500).send(`Sorry, could not delete café with ID ${cafeId}.`);
		throw error;
	})
});

module.exports = router;
