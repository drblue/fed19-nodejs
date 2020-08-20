/**
 * Auth middleware
 */

const debug = require('debug')('halp:auth');
const jwt = require('jsonwebtoken');

const validateJwtToken = (req, res, next) => {
	if (!req.token) {
		return res.status(401).send({
			status: 'error',
			message: 'No token found in request.',
		});
	}

	let payload;
	try {
		// validate token
		payload = jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET);

		debug('Decoded and verified payload:', payload);

		// set payload in request
		req.user = payload;
	} catch (error) {
		debug('Invalid token:', req.token);
		return res.status(403).send({
			status: 'error',
			message: 'Invalid token.',
		});
	}

	next();
}


module.exports = {
	validateJwtToken,
}
