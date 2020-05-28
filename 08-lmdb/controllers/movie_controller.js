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
	try {
		// const movie = await new models.Movie(req.body).save();
		const movies = await models.Movie.find();

		res.send({
			status: 'success',
			data: {
				movies,
			}
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when trying to get all movies.',
		});
		throw error;
	}
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
	try {
		const movie = await new models.Movie(req.body).save();

		res.status(201).send({
			status: 'success',
			data: {
				movie,
			}
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when trying to create new movie.',
		});
		throw error;
	}
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
