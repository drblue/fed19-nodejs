/**
 * API Routes for owners
 */

const express = require('express');
const router = express.Router();
const { createValidationRules, updateValidationRules } = require('../../db/owners_db');
const { index, store, show, update, destroy } = require('../../controllers/api/api_owner_controller');

// GET /
router.get('/', index);

// POST /
router.post('/', createValidationRules, store);

// GET /:ownerId
router.get('/:ownerId', show);

// PUT /:ownerId
router.put('/:ownerId', updateValidationRules, update);

// DELETE /:ownerId
router.delete('/:ownerId', destroy);

module.exports = router;
