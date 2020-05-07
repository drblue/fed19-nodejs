const _ = require('lodash');
const { body } = require('express-validator');
const categories = require('./categories_db');
const owners = require('./owners_db');

/**
 * DB functions for cafés
 */

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
 * Custom field validators
 */
const ownerIdValidator = async value => {
	// allow null
	if (value === null) {
		return Promise.resolve();
	}

	// if integer, validate that a owner with that id exists
	if (typeof value === "number") {
		// check that a owner with id `value` exists
		const owner = await owners.get(value);

		return owner
			? Promise.resolve()
			: Promise.reject('Owner does not exist.');
	}

	return Promise.reject('Invalid data type.');
};

/**
 * Validation rules
 */
const createValidationRules = [
	body('name').trim().isLength({ min: 3 }),
	body('address').trim().isLength({ min: 3 }),
	body('city').trim().isLength({ min: 3 }),
	body('owner_id').optional().custom(ownerIdValidator),
];

const updateValidationRules = [
	body('name').optional().trim().isLength({ min: 3 }),
	body('address').optional().trim().isLength({ min: 3 }),
	body('city').optional().trim().isLength({ min: 3 }),
	body('owner_id').optional().custom(ownerIdValidator),
	body('categories').optional().isArray().custom(async values => {
		// bail if element value is not a number
		if (!values.every(Number.isInteger)) {
			return Promise.reject('Invalid value in array.');
		}

		// validate that every value exists in database
		for (let i = 0; i < values.length; i++) {
			const category = await categories.get(values[i]);

			if (!category) {
				return Promise.reject(`Category ${values[i]} does not exist.`);
			}
		}

		// otherwise resolve promise if all is well
		console.log("Categories seems legit!");
	}),
];

/**
 * Get all cafés from db
 */
const getAll = () => {
	return getDbConnection()
		.select()
		.from('cafees')
		.orderBy('name');
}

/**
 * Get all cafés in a specfic category
 *
 * SELECT * FROM cafees WHERE id IN (
 *   SELECT cafee_id FROM cafee_category WHERE category_id = 1
 * )
 */
const getAllInCategory = (category_id) => {
	return getDbConnection()
		.select()
		.from('cafees')
		.whereIn('id', function() {
			this.select('cafee_id')
				.from('cafee_category')
				.where('category_id', category_id);
		})
		.orderBy('name');
}

/**
 * Get all cafés owned by
 */
const getAllOwnedBy = (owner_id) => {
	return getDbConnection()
		.select()
		.from('cafees')
		.where('owner_id', owner_id)
		.orderBy('name');
}

/**
 * Get specific café from db
 */
const get = async (cafeId) => {
	const rows = await getDbConnection().select().from('cafees').where('id', cafeId);

	return (rows.length === 1)
		? rows[0]
		: false;
}

/**
 * Store café in db
 */
const store = (data) => {
	return getDbConnection()
		.insert(data)
		.into('cafees');
}

/**
 * Update café in db
 */
const update = (cafeId, data) => {
	return getDbConnection()
		.table('cafees')
		.update(data)
		.where('id', cafeId);
}

/**
 * Update café categories in db
 */
const updateCategories = async (cafeId, categories) => {
	// 1. Delete all (potentially) existing category-links for this café.
	// SQL: DELETE FROM cafee_category WHERE cafee_id = cafeId
	await getDbConnection()
		.table('cafee_category')
		.where('cafee_id', cafeId)
		.del();

	// 1.5. Return if café should not have any categories.
	if (!categories.length) {
		return;
	}

	// 2. Transform array with category-ids into compaible format
	// [1,2] => [{ cafee_id: 23, category_id: 1 }, { cafee_id: 23, category_id: 2 }]
	// const uniqueCategories = [...new Set(categories)];
	const data = _.uniq(categories).map(category_id => {
		return {
			cafee_id: cafeId,
			category_id,
		}
	});

	// 3. Create category-links for this café.
	// SQL: INSERT INTO cafee_category SET cafee_id = 23, category_id = 1
	// SQL: INSERT INTO cafee_category SET cafee_id = 23, category_id = 2
	return getDbConnection()
		.insert(data)
		.into('cafee_category');

	// 4. Profit 💰.
}

/**
 * Delete café in db
 */
const destroy = (cafeId) => {
	return getDbConnection()
		.table('cafees')
		.where('id', cafeId)
		.del();
}

module.exports = {
	createValidationRules,
	updateValidationRules,

	getAll,
	getAllInCategory,
	getAllOwnedBy,
	get,
	store,
	update,
	updateCategories,
	destroy,
}
