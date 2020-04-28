/**
 * API Routes for cafés
 */

const express = require('express');
const router = express.Router();
const { index, store, show, update, destroy } = require('../../controllers/api/api_cafee_controller');

// GET /
router.get('/', index);

// POST /
router.post('/', store);

// GET /:cafeId
router.get('/:cafeId', show);

// PUT /:cafeId
router.put('/:cafeId', update);

// DELETE /:cafeId
router.delete('/:cafeId', destroy);

module.exports = router;
