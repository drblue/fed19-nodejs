/**
 * Owner controller
 */

const owners = require('../db/owners_db');
const cafees = require('../db/cafees_db');

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

const show = async (req, res) => {
	const ownerId = req.params.ownerId;

	try {
		const owner = await owners.get(ownerId);
		const owner_cafees = await cafees.getAllOwnedBy(ownerId);

		// render owner show view and pass along the data
		res.render('owners/show', { owner, cafees: owner_cafees });

	} catch (error) {
		res.status(500).send(`Sorry, database threw an error.`);
		throw error;
	}
};

const showPromiseBased = (req, res) => {
	const ownerId = req.params.ownerId;

	Promise.all([
		owners.get(ownerId),
		cafees.getAllOwnedBy(ownerId),
	])
	.then(([ owner, owner_cafees ]) => {
		res.render('owners/show', { owner, cafees: owner_cafees });
	})
	.catch(error => {
		res.status(500).send(`Sorry, database threw an error.`);
		throw error;
	})
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
