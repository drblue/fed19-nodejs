/**
 * Room routes
 */

const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room_controller');

/* Get all rooms */
router.get('/', roomController.index);

/* Get a room */
router.get('/:roomId', roomController.show);

/* Add user to a room */
router.post('/:roomId/user', roomController.addUser);

/* Delete a user from a room */
router.delete('/:roomId/user/:userId', roomController.removeUser);

module.exports = router;
