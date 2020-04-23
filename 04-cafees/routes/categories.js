/**
 * Routes for categories
 */

const express = require('express');
const router = express.Router();
const { index, create, store, show, edit, update, destroy } = require('../controllers/category');

router.get('/', index);
router.get('/create', create);
router.post('/', store);
router.get('/:categoryId', show);
router.get('/:categoryId/edit', edit);
router.post('/:categoryId', update);
router.post('/:categoryId/delete', destroy);

module.exports = router;
