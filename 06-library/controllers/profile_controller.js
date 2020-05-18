/**
 * Profile Controller
 */

const { matchedData, validationResult } = require('express-validator');
const { User } = require('../models');

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
	if (!req.user) {
		res.status(401).send({
			status: 'fail',
			data: 'Authentication Required.',
		});
		return;
	}

	// query db for books this user has
	const userId = req.user.get('id');
	const user = await new User({ id: userId }).fetch({ withRelated: 'books' });
	const books = user.related('books');

	res.send({
		status: 'success',
		data: {
			books,
		},
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
