/**
 * DB functions for owners
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
 * Get all owners from db
 *
 * @todo: sort by first_name followed by last_name
 */
const getAll = () => {
	return getDbConnection()
		.select()
		.from('owners');
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
	getAll,
	get,
}
