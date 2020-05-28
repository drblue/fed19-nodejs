/**
 * Movie Controller
 */

const models = require('../models');

/**
 * Get all movies
 *
 * GET /
 */
const index = async (req, res) => {
	res.status(405).send({ status: 'fail', message: 'Method Not Implemented.'});
}

/**
 * Get a movie
 *
 * GET /:movieId
 */
const show = async (req, res) => {
	res.status(405).send({ status: 'fail', message: 'Method Not Implemented.'});
}

/**
 * Create a new movie
 *
 * POST /
 */
const store = async (req, res) => {
	res.status(405).send({ status: 'fail', message: 'Method Not Implemented.'});
}

/**
 * Update a movie
 *
 * PUT /:movieId
 */
const update = async (req, res) => {
	res.status(405).send({ status: 'fail', message: 'Method Not Implemented.'});
}

/**
 * Delete a movie
 *
 * DELETE /:movieId
 */
const destroy = async (req, res) => {
	res.status(405).send({ status: 'fail', message: 'Method Not Implemented.'});
}

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
}
