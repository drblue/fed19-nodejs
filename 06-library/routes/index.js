const express = require('express');
const router = express.Router();
const auth = require('../controllers/middlewares/auth');

/* GET / */
router.get('/', (req, res) => {
	res.send({ status: 'you had me at EHLO' });
});

router.use('/authors', require('./authors'));
router.use('/books', require('./books'));

// add ability to login and get a JWT
router.post('/login', require('../controllers/login_controller'));

// add ability to validate JWT's
router.use('/profile', [auth.validateJwtToken], require('./profile'));

router.use('/users', require('./users'));

module.exports = router;
