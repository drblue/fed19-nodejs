/**
 * Room controller
 */

const debug = require('debug')('halp:room-controller');

/**
 * Get all rooms
 *
 * GET /rooms
 */
const index = async (req, res) => {
	return res.status(405).send({ status: 'error', message: 'Not Implemented' });
}

/**
 * Get a specific room
 *
 * GET /rooms/:roomId
 */
const show = async (req, res) => {
	return res.status(405).send({ status: 'error', message: 'Not Implemented' });
}

/**
 * Add a user to a specific room
 *
 * POST /rooms/:roomId/user
 */
const addUser = async (req, res) => {
	return res.status(405).send({ status: 'error', message: 'Not Implemented' });
}

/**
 * Remove a user from a specific room
 *
 * DELETE /rooms/:roomId/user/:userId
 */
const removeUser = async (req, res) => {
	return res.status(405).send({ status: 'error', message: 'Not Implemented' });
}


module.exports = {
	index,
	show,
	addUser,
	removeUser,
}
