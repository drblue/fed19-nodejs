/**
 * API Routes for cafés
 */

const express = require('express');
const router = express.Router();
const { createValidationRules, updateValidationRules } = require('../../db/cafees_db');
const { index, store, show, update, destroy } = require('../../controllers/api/api_cafee_controller');

// GET /
router.get('/', index);

// POST /
router.post('/', createValidationRules, store);

// GET /:cafeId
router.get('/:cafeId', show);

// PUT /:cafeId
router.put('/:cafeId', updateValidationRules, update);

// DELETE /:cafeId
router.delete('/:cafeId', destroy);

module.exports = router;
