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

const Author = bookshelf.model('Author', {
	tableName: 'authors',
});

const Book = bookshelf.model('Book', {
	tableName: 'books',
});

module.exports = {
	bookshelf,
	Author,
	Book,
};
