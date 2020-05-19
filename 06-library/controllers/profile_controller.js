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
	// Check that we have Authorization header
	if (!req.headers.authorization) {
		res.status(401).send({
			status: 'fail',
			data: 'Authentication Required.',
		});
		return;
	}

	// Split authorization header into its pieces
	// "Bearer eyJhbGciOi[..]JtbLU"
	const [authType, token] = req.headers.authorization.split(' ');

	// Check that the Authorization type is Bearer
	if (authType.toLowerCase() !== "bearer") {
		res.status(401).send({
			status: 'fail',
			data: 'Authentication Required.',
		});
		return;
	}

	// Validate token and extract payload
	let payload = null;

	try {
		payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
	} catch (err) {
		res.status(403).send({
			status: 'fail',
			data: 'Authentication Failed.',
		});
		throw err;
	}

	// retrieve authenticated user's profile
	let user = null;
	try {
		user = await new User({ id: payload.sub }).fetch();
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
// const getProfile = async (req, res) => {
// 	if (!req.user) {
// 		res.status(401).send({
// 			status: 'fail',
// 			data: 'Authentication Required.',
// 		});
// 		return;
// 	}

// 	res.send({
// 		status: 'success',
// 		data: {
// 			user: req.user,
// 		}
// 	});
// }

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
	await req.user.load('books');
	const books = req.user.related('books');

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
	if (!req.user) {
		res.status(401).send({
			status: 'fail',
			data: 'Authentication Required.',
		});
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
		const updatedUser = await req.user.save(validData);

		res.send({
			status: 'success',
			data: {
				user: updatedUser,
			},
		});

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
	updateProfile,
}
