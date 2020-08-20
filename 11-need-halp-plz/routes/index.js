/**
 * Express Routes
 */

const express = require('express');
const router = express.Router();
const { extractToken } = require('@permettezmoideconstruire/express-jwt');
const authController = require('../controllers/auth_controller');
const { validateJwtToken } = require('../controllers/middleware/auth');

router.use(extractToken());

router.get('/', (req, res) => {
	res.json({
		status: 'success',
	});
});

router.post('/login', authController.login);
router.post('/register', authController.register);

router.use('/rooms', [validateJwtToken], require('./rooms'));

module.exports = router;
