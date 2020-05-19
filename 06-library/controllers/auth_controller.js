/**
 * Auth Controller
 */

const jwt = require('jsonwebtoken');
const { User } = require('../models');

/**
 * Issue a access-token and a refresh-token for a user
 *
 * POST /login
 */
const login = async (req, res) => {
	const user = await User.login(req.body.username, req.body.password);
	if (!user) {
		res.status(401).send({
			status: 'fail',
			data: 'Authentication Required.',
		});
		return;
	}

	// construct jwt payload
	const payload = {
		sub: user.get('id'),
		username: user.get('username'),
		is_admin: user.get('is_admin'),
	};

	// sign payload and get access-token
	const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFETIME || '1h' });

	// sign payload and get refresh-token
	const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFETIME || '1w' });

	res.send({
		status: 'success',
		data: {
			access_token,
			refresh_token,
		},
	});
}

/**
 * Issue a new access-token using a refresh-token
 *
 * POST /refresh
 */
const refresh = (req, res) => {
	const token = getTokenFromHeaders(req);
	if (!token) {
		res.status(401).send({
			status: 'fail',
			data: 'No token found in request headers.'
		});
		return;
	}

	try {
		// verify token using the refresh token secret
		const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
		delete payload.iat; // issued at time
		delete payload.exp; // expires at time

		// issue a new token using the access token secret
		const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFETIME || '1h' });

		// send the access token to the client
		res.send({
			status: 'success',
			data: {
				access_token,
			}
		})

	} catch (err) {
		res.status(403).send({
			status: 'fail',
			data: 'Invalid token.',
		});
		return;
	}
}

/**
 * Get token from HTTP headers
 */
const getTokenFromHeaders = (req) => {
	// Check that we have Authorization header
	if (!req.headers.authorization) {
		return false;
	}

	// Split authorization header into its pieces
	// "Bearer eyJhbGciOi[..]JtbLU"
	const [authType, token] = req.headers.authorization.split(' ');

	// Check that the Authorization type is Bearer
	if (authType.toLowerCase() !== "bearer") {
		return false;
	}

	return token;
}

module.exports = {
	login,
	refresh,
	getTokenFromHeaders,
}
