/**
 * Routes for cafés
 */

const express = require('express');
const router = express.Router();
const { index, create, store, show, edit, update, destroy } = require('../controllers/cafee_controller');

// show all cafées
router.get('/', index);

// create new cafe form
router.get('/create', create);

// create new cafe in db
router.post('/', store);

// show specific café
router.get('/:cafeId', show);

// show edit café form
router.get('/:cafeId/edit', edit);

// update café with form data
router.post('/:cafeId', update);

// delete a café from db
router.post('/:cafeId/delete', destroy);

module.exports = router;
