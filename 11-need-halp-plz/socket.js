/**
 * SocketIO Server
 */

const debug = require('debug')('halp:socket');

/**
 * Handle a user disconnecting
 */
function handleUserDisconnect() {
	debug(`Client ${this.id} disconnected :(`);
}

function handleJoinRoom({ name, location, schoolclass }) {
	debug(`${name} wants to join #${schoolclass}!`);

	// join room
	this.join(schoolclass);

	// add user to room's list of waiting users

	// send back list of waiting users

	// send the updated waiting list to all other users in the room

	// profit!
}

module.exports = function(socket) {
	// this = io
	io = this;
	debug(`Client ${socket.id} connected!`);

	socket.on('disconnect', handleUserDisconnect);

	socket.on('join-room', handleJoinRoom);
}
