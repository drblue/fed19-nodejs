/**
 * API Routes for cafés
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { index, store, show, update, destroy } = require('../../controllers/api/api_cafee_controller');

// GET /
router.get('/', index);

// POST /
router.post('/', [
	body('name').trim().isLength({ min: 3 }),
	body('address').trim().isLength({ min: 3 }),
	body('city').trim().isLength({ min: 3 }),
], store);

// GET /:cafeId
router.get('/:cafeId', show);

// PUT /:cafeId
router.put('/:cafeId', [
	body('name').optional().trim().isLength({ min: 3 }),
	body('address').optional().trim().isLength({ min: 3 }),
	body('city').optional().trim().isLength({ min: 3 }),
], update);

// DELETE /:cafeId
router.delete('/:cafeId', destroy);

module.exports = router;
