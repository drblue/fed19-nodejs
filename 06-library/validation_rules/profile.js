/**
 * Profile Validation Rules
 */

const { body } = require('express-validator');
const { Book } = require('../models');

const addBookRules = [
	body('book_id').custom(value => Book.fetchById(value)),
];

const updateProfileRules = [
	body('password').optional().isLength({ min: 3 }),
	body('first_name').optional().isLength({ min: 2 }),
	body('last_name').optional().isLength({ min: 2 }),
];

module.exports = {
	addBookRules,
	updateProfileRules,
}
