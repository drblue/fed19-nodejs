/**
 * Owner controller
 */

const index = (req, res) => {
	res.send('Owner index route');
};

const create = (req, res) => {
	res.status(501).send('Creating a owner is not yet implemented.');
};

const store = (req, res) => {
	res.status(501).send('Storing a new owner is not yet implemented.');
};

const show = (req, res) => {
	res.send('Owner show route ID: ' + req.params.ownerId);
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
