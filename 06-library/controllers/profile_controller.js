/**
 * Profile Controller
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { matchedData, validationResult } = require('express-validator');
const { User } = require('../models');

/**
 * Get authenticated user's profile
 *
 * GET /
 */
const getProfile = async (req, res) => {
	// retrieve authenticated user's profile
	let user = null;
	try {
		user = await User.fetchById(req.user.data.id);
	} catch (err) {
		res.sendStatus(404);
		throw err;
	}

	// send (parts of) user profile to requester
	res.send({
		status: 'success',
		data: {
			user: {
				username: user.get('username'),
				first_name: user.get('first_name'),
				last_name: user.get('last_name'),
			},
		}
	});
}

/**
 * Get the authenticated user's books
 *
 * GET /books
 */
const getBooks = async (req, res) => {
	// query db for user and eager load the books relation
	let user = null;
	try {
		user = await User.fetchById(req.user.data.id, { withRelated: 'books' });
	} catch (err) {
		console.error(err);
		res.sendStatus(404);
		return;
	}

	// get this user's books
	const books = user.related('books');

	res.send({
		status: 'success',
		data: {
			books,
		},
	});
}

/**
 * Add a book to the authenticated user's collection
 *
 * POST /books
 * {
 *   "book_id": 4
 * }
 */
const addBook = async (req, res) => {
	// 0. get book id to add (req.body.book_id)

	// 1. make sure book we want to add actually exists

	// 2. attach book to user (create a row in books_users for this book and user)

	// 2.1. fetch User model

	// 2.2. on User model, call attach() on the books() relation and pass the Book model

	// 2.3. Profit?

	// 3. return 201 Created if successful
	res.sendStatus(500).send({ status: 'error', message: 'Not Implemented.' });
}

/**
 * Update the authenticated user's profile
 *
 * PUT /
 */
const updateProfile = async (req, res) => {
	// query db for user
	let user = null;
	try {
		user = await User.fetchById(req.user.data.id);
	} catch (err) {
		console.error(err);
		res.sendStatus(404);
		return;
	}

	// Finds the validation errors in this request and wraps them in an object with handy functions
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("Update profile request failed validation:", errors.array());
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}

	const validData = matchedData(req);

	// if request contains password, hash it
	if (validData.password) {
		try {
			validData.password = await bcrypt.hash(validData.password, User.hashSaltRounds)
		} catch (err) {
			res.status(500).send({
				status: 'error',
				message: 'Exception thrown when hashing the password.',
			});
			throw error;
		}
	}

	try {
		await user.save(validData);
		res.sendStatus(204); // Successfully processed request but returned no content

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when updating profile.',
		});
		throw error;
	}
}

module.exports = {
	getProfile,
	getBooks,
	addBook,
	updateProfile,
}
