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
 * Search for movies
 */
const search = async (req, res) => {
	console.log("Want to search for:", req.query.q);
	res.send({ status: 'success' });
}

/**
 * Get a movie
 *
 * GET /:movie
 */
const show = async (req, res) => {
	try {
		const movie = await models.Movie.findOne(getMovieFilter(req.params.movie))
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
 * PUT /:movie
 */
const update = async (req, res) => {
	try {
		const movie = await models.Movie.findOneAndUpdate(
			getMovieFilter(req.params.movie),
			req.body,
			{ new: true }
		);

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
 * DELETE /:movie
 */
const destroy = async (req, res) => {
	try {
		const movie = await models.Movie.findOneAndRemove(getMovieFilter(req.params.movie));

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
 * Add actors to a movie
 *
 * POST /:movie/actors
 * {
 *   "people": ["5ed4cd8d7543355d1767aa0f"]
 * }
 */
const addActors = async (req, res) => {
	try {
		const people = req.body.people;

		const data = {
			$push: {
				actors: people,
			}
		}
		const movie = await models.Movie.findByIdAndUpdate(req.params.movieId, data, { new: true });

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
 * Remove an actor from a movie
 *
 * DELETE /:movie/actors/:personId
 */
const removeActor = async (req, res) => {
	try {
		const personId = req.params.personId;

		const data = {
			$pull: {
				actors: personId,
			}
		}
		const movie = await models.Movie.findByIdAndUpdate(req.params.movieId, data, { new: true });

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

const getMovieFilter = movie => {
	return {
		$or: [
			{ slug: movie },
			{ _id: movie }
		]
	}
}

module.exports = {
	index,
	search,
	show,
	store,
	update,
	destroy,
	addActors,
	removeActor,
}
