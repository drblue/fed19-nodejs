const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller');
const profileValidationRules = require('../validation_rules/profile');

/* Get resource */
router.get('/', profileController.getProfile);

/* Get resource's books */
router.get('/books', profileController.getBooks);

/* Add a book to this user's collection */
router.post('/books', profileController.addBook);

/* Update a specific resource */
router.put('/', profileValidationRules.updateProfileRules, profileController.updateProfile);

module.exports = router;
