/**
 * Login Controller
 */

const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
	if (!req.user) {
		res.status(401).send({
			status: 'fail',
			data: 'Authentication Required.',
		});
		return;
	}

	// construct jwt payload
	const payload = {
		sub: req.user.get('id'),
		username: req.user.get('username'),
		is_admin: req.user.get('is_admin'),
	};

	// sign payload and get jwt-token
	const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

	res.send({
		status: 'success',
		data: {
			token,
		},
	});
}
