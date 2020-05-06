/**
 * API Owner Controller
 */

const { body, matchedData, validationResult } = require('express-validator');

const cafees = require('../../db/cafees_db');
const owners = require('../../db/owners_db');

// Get index of all owners
const index = (req, res) => {
	owners.getAll()
	.then(owners => {
		res.send({
			status: 'success',
			data: {
				owners,
			}
		});
	})
	.catch(error => {
		res.status(500).send({
			status: 'error',
			message: 'Sorry, database threw an error when trying to get all owners.',
		});
		throw error;
	});
}

// Create a owner
const store = async (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: `Sorry, storing new owners is not yet implemented.`,
	});
};

// Get a specific owner
const show = async (req, res) => {
	const ownerId = req.params.ownerId;

	try {
		const owner = await owners.get(ownerId);
		if (!owner) {
			res.status(404).send({
				status: 'fail',
				data: null,
				message: `Sorry, owner with ID ${ownerId} could not be found.`,
			});
			return;
		}

		owner.cafees = await cafees.getAllOwnedBy(ownerId);

		res.send({
			status: 'success',
			data: {
				owner,
			}
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: `Sorry, database threw an error when trying to get owner with ID ${ownerId}.`,
		});
		throw error;
	}
};

// Update a specific owner
const update = async (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: `Sorry, updating a owner is not yet implemented.`,
	});
};

// Delete a specific owner
const destroy = async (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: `Sorry, destroying a owner is not yet implemented.`,
	});
};

module.exports = {
	index,
	store,
	show,
	update,
	destroy,
}
