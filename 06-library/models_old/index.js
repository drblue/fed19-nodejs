const Sequelize = require('sequelize');

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		port: process.env.DB_PORT || 3306,
		dialect: process.env.DB_TYPE,
	}
);

class Author extends Sequelize.Model {}
Author.init({
	first_name: Sequelize.STRING,
	last_name: Sequelize.STRING,
	birthyear: Sequelize.INTEGER,
}, {
	sequelize,
	modelName: 'authors',
});

class Book extends Sequelize.Model {}
Book.init({
	title: Sequelize.STRING,
	isbn: Sequelize.STRING,
	pages: Sequelize.INTEGER,
	author_id: Sequelize.INTEGER,
}, {
	sequelize,
	modelName: 'books',
});

module.exports = {
	sequelize,
	Author,
	Book,
}
