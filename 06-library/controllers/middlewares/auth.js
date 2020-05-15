/**
 * Authentication middleware
 */

const bcrypt = require('bcrypt');
const { User } = require('../../models');

const basic = async (req, res, next) => {
	console.log("Hello from auth.basic!");

	// check if Authorization header exists, otherwise bail
	if (!req.headers.authorization) {
		res.status(401).send({
			status: 'fail',
			data: 'Authorization required',
		});
		return;
	}

	// "Basic a2FsbGUyMDAwOnNjcmlwdC1raWRxd2Vxd2Vxd2Vxd2Vxd2Vxd2Vxd2U="
	// =>
	// [0] = "Basic"
	// [1] = "a2FsbGUyMDAwOnNjcmlwdC1raWRxd2Vxd2Vxd2Vxd2Vxd2Vxd2Vxd2U="
	const [authSchema, base64Payload] = req.headers.authorization.split(' ');

	if (authSchema.toLowerCase() !== "basic") {
		// not ours to authenticate
		next();
	}

	const decodedPayload = Buffer.from(base64Payload, 'base64').toString('ascii');

	// kalle:omg-food
	const [username, password] = decodedPayload.split(':');

	// find user with the username (bail if no such user exists)
	const user = await new User({ username }).fetch({ require: false });
	if (!user) {
		res.status(401).send({
			status: 'fail',
			data: 'Authorization failed',
		});
		return;
	}
	const hash = user.get('password');

	// hash the incoming cleartext password using the salt from the db
	// and compare if the generated hash matches the db-hash
	const result = await bcrypt.compare(password, hash);

	if (!result) {
		res.status(401).send({
			status: 'fail',
			data: 'Authorization failed',
		});
		return;
	}

	// now that we have authenticated the user and know that he/she/it is who it claims to be
	// attach the user object to the request, so that other parts of the api can use the user
	req.user = user;

	next();
}

module.exports = {
	basic,
}
