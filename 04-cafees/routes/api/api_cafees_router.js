/**
 * API Routes for cafés
 */

const express = require('express');
const router = express.Router();
const { createCafeeValidationRules, updateCafeeValidationRules,
	index, store, show, update, destroy } = require('../../controllers/api/api_cafee_controller');

// GET /
router.get('/', index);

// POST /
router.post('/', createCafeeValidationRules, store);

// GET /:cafeId
router.get('/:cafeId', show);

// PUT /:cafeId
router.put('/:cafeId', updateCafeeValidationRules, update);

// DELETE /:cafeId
router.delete('/:cafeId', destroy);

module.exports = router;
