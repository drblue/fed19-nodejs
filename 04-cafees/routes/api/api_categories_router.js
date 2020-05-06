/**
 * API Routes for categories
 */

const express = require('express');
const router = express.Router();
const { createValidationRules, updateValidationRules } = require('../../db/categories_db');
const { index, store, show, update, destroy } = require('../../controllers/api/api_category_controller');

// GET /
router.get('/', index);

// POST /
router.post('/', createValidationRules, store);

// GET /:categoryId
router.get('/:categoryId', show);

// PUT /:categoryId
router.put('/:categoryId', updateValidationRules, update);

// DELETE /:categoryId
router.delete('/:categoryId', destroy);

module.exports = router;
