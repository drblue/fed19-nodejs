const express = require('express');
const router = express.Router();

/* GET / */
router.get('/', (req, res) => {
	res.send({ status: 'you had me at EHLO' });
});

router.use('/authors', require('./authors'));
router.use('/books', require('./books'));
router.use('/users', require('./users'));

module.exports = router;
