/**
 * Profile Controller
 */

const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

/**
 * Get authenticated user's profile
 *
 * GET /
 */
const getProfile = async (req, res) => {
	if (!req.user) {
		res.status(401).send({
			status: 'fail',
			data: 'Authentication Required.',
		});
		return;
	}

	res.send({
		status: 'success',
		data: {
			user: req.user,
		}
	});
}

/**
 * Get the authenticated user's books
 *
 * GET /books
 */
const getBooks = async (req, res) => {
	res.status(405).send({
		status: 'error',
		message: 'This is a workshop.',
	});
}

/**
 * Update the authenticated user's profile
 *
 * PUT /
 */
const updateProfile = async (req, res) => {
	res.status(405).send({
		status: 'error',
		message: 'This is also a workshop.',
	});
}

module.exports = {
	getProfile,
	getBooks,
	updateProfile,
}
