/**
 * DB functions for owners
 */

const { body } = require('express-validator');

const getDbConnection = () => {
	return require('knex')({
		client: 'mysql',
		connection: {
			host: process.env.DB_HOST || 'localhost',
			port: process.env.DB_PORT || 3306,
			user: process.env.DB_USER || 'fika',
			password: process.env.DB_PASSWORD || '',
			database: process.env.DB_NAME || 'fika',
		},
	}).debug(true);
}

/**
 * Validation rules
 */
const createValidationRules = [
	body('first_name').trim().isLength({ min: 1 }),
	body('last_name').trim().isLength({ min: 1 }),
	body('email').optional().trim().isEmail(),
	body('phone').optional().trim().isLength({ min: 8 }),
];

const updateValidationRules = [
	body('first_name').trim().isLength({ min: 1 }),
	body('last_name').trim().isLength({ min: 1 }),
	body('email').optional().trim().isEmail(),
	body('phone').optional().trim().isLength({ min: 8 }),
];

/**
 * Get all owners from db
 */
const getAll = () => {
	return getDbConnection()
		.select()
		.from('owners')
		.orderBy('first_name')
		.orderBy('last_name');
}

/**
 * Get specific owner from db
 */
const get = async (ownerId) => {
	const result = await getDbConnection().select().from('owners').where('id', ownerId);

	return (result.length === 1)
		? result[0]
		: false;
}

module.exports = {
	createValidationRules,
	updateValidationRules,

	getAll,
	get,
}
