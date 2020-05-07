/**
 * API Café Controller
 */

const { body, matchedData, validationResult } = require('express-validator');

const cafees = require('../../db/cafees_db');
const categories = require('../../db/categories_db');
const owners = require('../../db/owners_db');

// Get index of all cafés
const index = (req, res) => {
	cafees.getAll()
	.then(cafees => {
		res.send({
			status: 'success',
			data: {
				cafees,
			}
		});
	})
	.catch(error => {
		res.status(500).send({
			status: 'error',
			message: 'Sorry, database threw an error when trying to get all cafees.',
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
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}

	// 2. extract valid data
	const validData = matchedData(req);

	try {
		// 3. insert valid data into database
		const result = await cafees.store(validData);
		if (result.length !== 1) {
			res.status(500).send({
				status: 'error',
				message: 'Unexpected result when inserting cafee into database.',
			});
			return;
		}

		const cafeeId = result[0];
		const cafee = await cafees.get(cafeeId);

		res.send({
			status: 'success',
			data: {
				cafee,
			}
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: `Sorry, database threw an error when trying to store a new cafee.`,
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
				status: 'fail',
				data: null,
				message: `Sorry, cafee with ID ${cafeId} could not be found.`,
			});
			return;
		}

		cafee.owner = (cafee.owner_id)
			? await owners.get(cafee.owner_id)
			: false;

		cafee.categories = await categories.getForCafee(cafeId);

		// res.send(cafee);
		res.send({
			status: 'success',
			data: {
				cafee: {
					id: cafee.id,
					name: cafee.name,
					address: cafee.address,
					city: cafee.city,
					owner: cafee.owner,
					categories: cafee.categories,
				}
			}
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: `Sorry, database threw an error when trying to get cafee with ID ${cafeId}.`,
		});
		throw error;
	}
};

// Update a specific café
const update = async (req, res) => {
	const cafeId = req.params.cafeId;

	// 1. check validation result
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(`Validation for updating café with ID ${cafeId} failed:`, errors.array());
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}

	// 2. extract valid data
	const validData = matchedData(req);

	// 3. check that we actually have any data to try to update
	if (!Object.keys(validData).length) {
		res.status(400).send({ error: 'No data.' });
		return;
	}

	if (validData.categories) {
		await cafees.updateCategories(cafeId, validData.categories);
		delete validData.categories;
	}

	try {
		// 4. update database entry with the new data
		const result = await cafees.update(cafeId, validData);
		if (!result) {
			res.status(404).send({
				status: 'fail',
				data: null,
				message: `No cafee with ID ${cafeId} to update.`,
			});
			return;
		}

		const cafee = await cafees.get(cafeId);

		res.send({
			status: 'success',
			data: {
				cafee
			}
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: `Sorry, database threw an error when trying to update cafee with ID ${cafeId}.`,
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
				status: 'fail',
				data: null,
				message: `No cafee with ID ${cafeId} to destroy.`,
			});
			return;
		}

		res.send({
			status: 'success',
			data: null,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: `Sorry, database threw an error when trying to destroy cafee with ID ${cafeId}.`,
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
