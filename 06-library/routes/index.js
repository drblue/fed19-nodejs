const express = require('express');
const router = express.Router();

/* GET / */
router.get('/', (req, res) => {
	res.send({ status: 'you had me at EHLO' });
});

router.use('/books', require('./books'));

module.exports = router;
