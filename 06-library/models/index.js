// Setting up the database connection
const knex = require('knex')({
	client: 'mysql',
	connection: {
		host: process.env.DB_HOST || 'localhost',
		port: process.env.DB_PORT || 3306,
		user: process.env.DB_USER || 'library',
		password: process.env.DB_PASSWORD || '',
		database: process.env.DB_NAME || 'library',
	}
});

const bookshelf = require('bookshelf')(knex);

const Author = require('./Author')(bookshelf);
const Book = require('./Book')(bookshelf);
const User = require('./User')(bookshelf);

module.exports = {
	bookshelf,
	Author,
	Book,
	User,
};
