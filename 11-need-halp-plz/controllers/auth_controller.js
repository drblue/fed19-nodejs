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
	// get user from database
	let user;
	try {
		user = await User.findOne({ email: req.body.email });

		if (!user) {
			return res.status(403).send({
				status: 'fail',
				message: 'Authentication failed.'
			});
		}
	} catch (error) {
		debug(`Exception thrown when retrieving user with email '${req.body.email}' from db:`, error);
		return res.status(500).send({
			status: 'fail',
			message: 'Authentication failed.'
		});
	}

	// validate password against stored hash
	if (!await bcrypt.compare(req.body.password, user.password)) {
		debug(`Password for '${req.body.email}' did not match hash:`);
		return res.status(403).send({
			status: 'fail',
			message: 'Authentication failed.'
		});
	}

	// construct payload
	const payload = {
		data: user,
	}

	// sign payload and get access-token
	const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFETIME || '1d' });

	// send token as response
	return res.status(200).send({
		status: 'success',
		data: {
			access_token,
		},
	});
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
