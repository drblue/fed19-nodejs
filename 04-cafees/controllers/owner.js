/**
 * Owner controller
 */

const owners = require('../db/owners');

const index = (req, res) => {
	// get all owners from db
	owners.getAll()
	.then(owners => {
		// render owners index view and pass along the data
		res.render('owners/index', { owners });
	})
	.catch(error => {
		res.status(500).send('Sorry, database threw an error when trying to get all owners.');
		throw error;
	});
};

const create = (req, res) => {
	res.status(501).send('Creating a owner is not yet implemented.');
};

const store = (req, res) => {
	res.status(501).send('Storing a new owner is not yet implemented.');
};

const show = (req, res) => {
	const ownerId = req.params.ownerId;

	owners.get(ownerId)
	.then(owner => {
		// render owner show view and pass along the data
		res.render('owners/show', { owner });
	})
	.catch(error => {
		res.status(500).send(`Sorry, database threw an error when trying to get owner with ID ${ownerId}.`);
		throw error;
	});
};

const edit = (req, res) => {
	res.status(501).send('Editing a owner is not yet implemented.');
};

const update = (req, res) => {
	res.status(501).send('Updating a owner is not yet implemented.');
};

const destroy = (req, res) => {
	res.status(501).send('Destroying a owner is not yet implemented.');
};

module.exports = {
	index,
	create,
	store,
	show,
	edit,
	update,
	destroy,
};
