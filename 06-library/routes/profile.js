const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller');
const profileValidationRules = require('../validation_rules/profile');

/* Get resource */
router.get('/', profileController.getProfile);

/* Get resource's books */
router.get('/books', profileController.getBooks);

/* Update a specific resource */
router.put('/', profileValidationRules.updateProfileRules, profileController.updateProfile);

module.exports = router;
