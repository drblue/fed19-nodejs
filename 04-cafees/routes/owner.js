/**
 * Routes for owners
 */

const express = require('express');
const router = express.Router();
const { index, create, store, show, edit, update, destroy } = require('../controllers/owner');

router.get('/', index);
router.get('/create', create);
router.post('/', store);
router.get('/:ownerId', show);
router.get('/:ownerId/edit', edit);
router.post('/:ownerId', update);
router.post('/:ownerId/delete', destroy);

module.exports = router;
