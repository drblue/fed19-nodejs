/**
 * Auth controller
 */

const bcrypt = require('bcrypt');
const debug = require('debug')('halp:auth-controller');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config');

/**
 * Login a user
 *
 * POST /login
 */
const login = async (req, res) => {
	return res.status(405).send({ status: 'error', message: 'Not Implemented' });
}

/**
 * Register a user
 *
 * POST /register
 * {
 *   "email": "some@one.com",
 *   "password": "secret",
 *   "name": "Some One"
 * }
 */
const register = async (req, res) => {
	debug(`User '${req.body.name}' with email '${req.body.email}' wants to register`);

	let hash;
	try {
		hash = await bcrypt.hash(req.body.password, config.PASSWORD_HASH_ROUNDS);

	} catch (error) {
		debug("Exception thrown when hashing the password:", error);
		return res.status(500).send({
			status: 'error',
			message: 'Exception thrown when hashing the password.',
		});
	}

	// Insert user into database
	try {
		const user = await new User({
			email: req.body.email,
			password: hash,
			name: req.body.name,
		}).save();

		if (!user) {
			debug("User could not be created!", user);
			return res.status(500).send({
				status: 'error',
				message: 'User could not be created!',
			});
		}

		return res.send({
			status: 'success',
			data: {
				user,
			},
		});
	} catch (error) {
		debug("User could not be created!");
		return res.status(500).send({
			status: 'error',
			message: 'User could not be created!',
		});
	}
}


module.exports = {
	login,
	register,
}
