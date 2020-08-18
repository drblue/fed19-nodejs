/**
 * Room controller
 */

const debug = require('debug')('halp:room-controller');
const models = require('../models');

/**
 * Get all rooms
 *
 * GET /rooms
 */
const index = async (req, res) => {
	try {
		const rooms = await models.Room.find();

		return res.send({
			status: 'success',
			data: {
				rooms,
			}
		});

	} catch (error) {
		debug("Exception thrown in room_controller@index", error);

		return res.status(500).send({
			status: 'error',
			message: error.message,
		});
	}
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
