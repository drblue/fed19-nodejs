/**
 * API Café Controller
 */

const { matchedData, validationResult } = require('express-validator');

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
const store = async (req, res) => {
	// 1. check validation result
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("Validation for a new café failed:", errors.array());
		res.status(422).send({ errors: errors.array() });
		return;
	}

	// 2. extract valid data
	const validData = matchedData(req);

	try {
		// 3. insert valid data into database
		const result = await cafees.store(validData);
		if (result.length !== 1) {
			res.status(500).send({
				error: 'Unexpected result when inserting cafee into database.',
			});
			return;
		}

		const cafeeId = result[0];
		const cafee = await cafees.get(cafeeId);

		res.send(cafee);

	} catch (error) {
		res.status(500).send({
			error: `Sorry, database threw an error when trying to store a new cafee.`,
		});
		throw error;
	}
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

		// res.send(cafee);
		res.send({
			id: cafee.id,
			name: cafee.name,
			address: cafee.address,
			city: cafee.city,
			owner: cafee.owner,
			categories: cafee.categories,
		});

	} catch (error) {
		res.status(500).send({
			error: `Sorry, database threw an error when trying to get cafee with ID ${cafeId}.`,
		});
		throw error;
	}
};

// Update a specific café
const update = async (req, res) => {
	const cafeId = req.params.cafeId;

	const data = {
		name: req.body.name,
		address: req.body.address,
		city: req.body.city,
	};

	try {
		const result = await cafees.update(cafeId, data);
		if (!result) {
			res.status(404).send({
				error: `No cafee with ID ${cafeId} to update.`,
			});
			return;
		}

		const cafee = await cafees.get(cafeId);

		res.send(cafee);

	} catch (error) {
		res.status(500).send({
			error: `Sorry, database threw an error when trying to update cafee with ID ${cafeId}.`,
		});
		throw error;
	}
};

// Delete a specific café
const destroy = async (req, res) => {
	const cafeId = req.params.cafeId;

	try {
		const result = await cafees.destroy(cafeId);
		if (!result) {
			res.status(404).send({
				error: `No cafee with ID ${cafeId} to destroy.`,
			});
			return;
		}

		res.send({ status: 'success' });

	} catch (error) {
		res.status(500).send({
			error: `Sorry, database threw an error when trying to destroy cafee with ID ${cafeId}.`,
		});
		throw error;
	}
};

module.exports = {
	index,
	store,
	show,
	update,
	destroy,
}
