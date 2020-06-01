/**
 * Movie Controller
 */

const debug = require('debug')('08-lmdb:movie-controller');
const models = require('../models');

/**
 * Get all movies
 *
 * GET /
 */
const index = async (req, res) => {
	try {
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
	try {
		const movie = await models.Movie.findById(req.params.movieId)
			.populate('actors', 'name')
			.populate('director', 'name')
			.populate('genres');

		if (!movie) {
			res.sendStatus(404);
			return;
		}

		res.send({
			status: 'success',
			data: {
				movie,
			}
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: error.message,
		});
		throw error;
	}
}

/**
 * Create a new movie
 *
 * POST /
 */
const store = async (req, res) => {
	try {
		const movie = await new models.Movie(req.body).save();
		debug('New movie created: %j', req.body);

		res.status(201).send({
			status: 'success',
			data: {
				movie,
			}
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: error.message,
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
	try {
		const movie = await models.Movie.findByIdAndUpdate(req.params.movieId, req.body, { new: true });

		if (!movie) {
			res.sendStatus(404);
			return;
		}

		res.send({
			status: 'success',
			data: {
				movie,
			}
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: error.message,
		});
		throw error;
	}
}

/**
 * Delete a movie
 *
 * DELETE /:movieId
 */
const destroy = async (req, res) => {
	try {
		const movie = await models.Movie.findByIdAndRemove(req.params.movieId);

		if (!movie) {
			res.sendStatus(404);
			return;
		}

		res.send({
			status: 'success',
			data: {
				movie,
			}
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: error.message,
		});
		throw error;
	}
}

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
}
