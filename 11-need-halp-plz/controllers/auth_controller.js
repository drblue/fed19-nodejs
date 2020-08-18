/**
 * Auth controller
 */

const debug = require('debug')('halp:auth-controller');

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
 */
const register = async (req, res) => {
	return res.status(405).send({ status: 'error', message: 'Not Implemented' });
}


module.exports = {
	login,
	register,
}
