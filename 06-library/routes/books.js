const express = require('express');
const router = express.Router();
const models = require('../models');

/* GET / */
router.get('/', async (req, res) => {
	const all_books = await models.Book.findAll();

	res.send({
		status: 'success',
		data: {
			books: all_books
		}
	});
});

/* GET /:bookId */
router.get('/:bookId', async (req, res) => {
	const book = await models.Book.findByPk(req.params.bookId);

	res.send({
		status: 'success',
		data: {
			book,
		}
	});
});

module.exports = router;
