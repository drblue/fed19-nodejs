/**
 * SocketIO Server
 */

const debug = require('debug')('halp:socket');

module.exports = function(socket) {
	// this = io
	io = this;
	debug(`Client ${socket.id} connected!`);

	// socket.on('disconnect', handleUserDisconnect);
}
