/**
 * Category controller
 */

const cafees = require('../db/cafee');
const categories = require('../db/categories');

/**
 * Show index of all categories.
 */
const index = (req, res) => {
	// get all categories from db
	categories.getAll()
	.then(categories => {
		// render categories index view and pass along the data
		res.render('categories/index', { categories });
	})
	.catch(error => {
		res.status(500).send('Sorry, database threw an error when trying to get all categories.');
		throw error;
	});
};

const create = (req, res) => {
	res.status(501).send('Creating a category is not yet implemented.');
};

const store = (req, res) => {
	res.status(501).send('Storing a new category is not yet implemented.');
};

/**
 * Show a single category.
 */
const show = async (req, res) => {
	const categoryId = req.params.categoryId;

	try {
		const category = await categories.get(categoryId);
		const category_cafees = await cafees.getAllInCategory(categoryId);

		// render category show view and pass along the data
		res.render('categories/show', {
			category,
			cafees: category_cafees,
		});

	} catch (error) {
		res.status(500).send(`Sorry, database threw an error.`);
		throw error;
	}
};

const edit = (req, res) => {
	res.status(501).send('Editing a category is not yet implemented.');
};

const update = (req, res) => {
	res.status(501).send('Updating a category is not yet implemented.');
};

const destroy = (req, res) => {
	res.status(501).send('Destroying a category is not yet implemented.');
};

module.exports = {
	index,
	create,
	store,
	show,
	edit,
	update,
	destroy,
};
