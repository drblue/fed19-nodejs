const express = require('express');
const router = express.Router();
const models = require('../models');

/* GET / */
router.get('/', async (req, res) => {
	// const all_books = await models.Book.fetchAll();
	const all_books = await new models.Book({}).fetchAll();

	res.send({
		status: 'success',
		data: {
			books: all_books
		}
	});
});

/* GET /:bookId */
router.get('/:bookId', async (req, res) => {
	const book = await new models.Book({ id: req.params.bookId }).fetch({ withRelated: ['author', 'users'] });    // select * from books where id = 1
	// const book = await models.Book.findByPk(req.params.bookId);

	res.send({
		status: 'success',
		data: {
			book,
		}
	});
});

module.exports = router;
