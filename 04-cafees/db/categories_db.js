/**
 * DB functions for categories
 */

const { body } = require('express-validator');

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
	body('name').trim().isLength({ min: 3 }),
];

const updateValidationRules = [
	body('name').optional().trim().isLength({ min: 3 }),
];

/**
 * Get all categories from db
 */
const getAll = () => {
	return getDbConnection()
		.select()
		.from('categories')
		.orderBy('name');
}

/**
 * Get all categories for a specific café
 *
 * SELECT * FROM `categories` WHERE id IN (
 *   SELECT category_id FROM `cafee_category` WHERE cafee_id = 7
 * )
 */
const getForCafee = (cafee_id) => {
	return getDbConnection()
		.select()
		.from('categories')
		.whereIn('id', function() {
			this.select('category_id')
				.from('cafee_category')
				.where('cafee_id', cafee_id);
		})
		.orderBy('name');
}

/**
 * Get specific category from db
 */
const get = async (category_id) => {
	const rows = await getDbConnection().select().from('categories').where('id', category_id);

	return (rows.length === 1)
		? rows[0]
		: false;
}

module.exports = {
	createValidationRules,
	updateValidationRules,

	getAll,
	getForCafee,
	get,
}
