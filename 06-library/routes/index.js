const express = require('express');
const router = express.Router();
const auth = require('../controllers/middlewares/auth');

/* GET / */
router.get('/', (req, res) => {
	res.send({ status: 'you had me at EHLO' });
});

router.use('/authors', require('./authors'));
router.use('/books', require('./books'));
router.use('/profile', [auth.basic], require('./profile'));
// router.use('/users', require('./users'));

module.exports = router;
