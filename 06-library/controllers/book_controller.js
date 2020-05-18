/**
 * Book Controller
 */

const models = require('../models');

/**
 * Get all resources
 *
 * GET /
 */
const index = async (req, res) => {
	const all_books = await models.Book.fetchAll();

	res.send({
		status: 'success',
		data: {
			books: all_books
		}
	});
}

/**
 * Get a specific resource
 *
 * GET /:bookId
 */
const show = async (req, res) => {
	const book = await new models.Book({ id: req.params.bookId })
		.fetch({ withRelated: ['author'] });

	res.send({
		status: 'success',
		data: {
			book,
		}
	});
}

/**
 * Store a new resource
 *
 * POST /
 */
const store = (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	});
}

/**
 * Update a specific resource
 *
 * POST /:bookId
 */
const update = (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	});
}

/**
 * Destroy a specific resource
 *
 * DELETE /:bookId
 */
const destroy = (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	});
}

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
}
