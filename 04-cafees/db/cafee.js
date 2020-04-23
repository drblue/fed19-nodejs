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
 * Delete café in db
 */
const destroy = (cafeId) => {
	return getDbConnection()
		.table('cafees')
		.where('id', cafeId)
		.del();
}

module.exports = {
	getAll,
	getAllInCategory,
	getAllOwnedBy,
	get,
	store,
	update,
	destroy,
}
