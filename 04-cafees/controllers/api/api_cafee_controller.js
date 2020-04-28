/**
 * API Café Controller
 */

const cafees = require('../../db/cafees_db');
const categories = require('../../db/categories_db');
const owners = require('../../db/owners_db');

// Get index of all cafés
const index = (req, res) => {
	cafees.getAll()
	.then(cafees => {
		res.send(cafees);
	})
	.catch(error => {
		res.status(500).send({
			error: 'Sorry, database threw an error when trying to get all cafees.',
		});
		throw error;
	});
}

// Create a café
const store = (req, res) => {
	res.send({ message: 'POST /'});
};

// Get a specific café
const show = async (req, res) => {
	const cafeId = req.params.cafeId;

	try {
		const cafee = await cafees.get(cafeId);
		if (!cafee) {
			res.status(404).send({
				error: `Sorry, cafee with ID ${cafeId} could not be found.`,
			});
			return;
		}

		cafee.owner = (cafee.owner_id)
			? await owners.get(cafee.owner_id)
			: false;

		cafee.categories = await categories.getForCafee(cafeId);

		res.send(cafee);

	} catch (error) {
		res.status(500).send({
			error: `Sorry, database threw an error when trying to get cafee with ID ${cafeId}.`,
		});
		throw error;
	}
};

// Update a specific café
const update = (req, res) => {
	res.send({ message: 'PUT /' + req.params.cafeId });
};

// Delete a specific café
const destroy = (req, res) => {
	res.send({ message: 'DELETE /' + req.params.cafeId });
};

module.exports = {
	index,
	store,
	show,
	update,
	destroy,
}
