/**
 * Movie routes
 */

const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie_controller');

/* Get all movies */
router.get('/', movieController.index);

/* Get a movie */
router.get('/:movieId', movieController.show);

/* Create a new movie */
router.post('/', movieController.store);

/* Update a movie */
router.put('/:movieId', movieController.update);

/* Delete a movie */
router.delete('/:movieId', movieController.destroy);

/* Add actors to a movie */
router.post('/:movieId/actors', movieController.addActors);

/* Delete an actor from a movie */
router.delete('/:movieId/actors/:personId', movieController.removeActor);

module.exports = router;
