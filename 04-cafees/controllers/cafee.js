/**
 * Cafee controller
 */

const cafeeDb = require('../db/cafee');
const categories = require('../db/categories');
const owners = require('../db/owners');

const index = (req, res) => {
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
};

const create = (req, res) => {
	res.render('cafees/create');
};

const store = (req, res) => {
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
};

const show = async (req, res) => {
	const cafeId = req.params.cafeId;

	try {
		const cafee = await cafeeDb.get(cafeId);
		const owner = (cafee.owner_id)
			? await owners.get(cafee.owner_id)
			: false;
		const cafee_categories = await categories.getForCafee(cafeId);

		console.log("This cafees categories:");
		console.log(cafee_categories);

		// once we get the café, send it to the view
		res.render('cafees/show', {
			cafee,
			categories: cafee_categories,
			owner,
		});

	} catch (error) {
		res.status(500).send(`Sorry, database threw an error when trying to get cafee with ID ${cafeId}.`);
		throw error;
	}
};

const edit = (req, res) => {
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
};

const update = (req, res) => {
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
};

const destroy = (req, res) => {
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
};

module.exports = {
	index,
	create,
	store,
	show,
	edit,
	update,
	destroy,
}
