const express = require('express');
const router = express.Router();
const auth = require('../controllers/middlewares/auth');

/* GET / */
router.get('/', (req, res) => {
	res.send({ status: 'you had me at EHLO' });
});

// Protect all routes below with the middleware `basic` from the `auth` module.
router.use(auth.basic);

router.use('/authors', require('./authors'));
router.use('/books', require('./books'));
router.use('/users', require('./users'));

module.exports = router;
