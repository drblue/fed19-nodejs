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
	get,
	store,
	update,
	destroy,
}
