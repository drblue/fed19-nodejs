/**
 * API Category Controller
 */

const { body, matchedData, validationResult } = require('express-validator');

const cafees = require('../../db/cafees_db');
const categories = require('../../db/categories_db');
const owners = require('../../db/owners_db');

// Get index of all categories
const index = (req, res) => {
	categories.getAll()
	.then(categories => {
		res.send({
			status: 'success',
			data: {
				categories,
			}
		});
	})
	.catch(error => {
		res.status(500).send({
			status: 'error',
			message: 'Sorry, database threw an error when trying to get all categories.',
		});
		throw error;
	});
}

// Create a category
const store = async (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: `Sorry, storing new categories is not yet implemented.`,
	});
};

// Get a specific category
const show = async (req, res) => {
	const categoryId = req.params.categoryId;

	try {
		const category = await categories.get(categoryId);
		if (!category) {
			res.status(404).send({
				status: 'fail',
				data: null,
				message: `Sorry, category with ID ${categoryId} could not be found.`,
			});
			return;
		}

		category.cafees = await cafees.getAllInCategory(categoryId);

		res.send({
			status: 'success',
			data: {
				category,
			}
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: `Sorry, database threw an error when trying to get category with ID ${categoryId}.`,
		});
		throw error;
	}
};

// Update a specific category
const update = async (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: `Sorry, updating a category is not yet implemented.`,
	});
};

// Delete a specific category
const destroy = async (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: `Sorry, destroying a category is not yet implemented.`,
	});
};

module.exports = {
	index,
	store,
	show,
	update,
	destroy,
}
