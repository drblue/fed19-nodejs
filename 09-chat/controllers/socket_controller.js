/**
 * Socket Controller
 */

const debug = require('debug')('09-simple-chat:socket_controller');
const users = {};

/**
 * Handle user disconnecting
 */
function handleUserDisconnect() {
	debug(`Socket ${this.id} left the chat :(`);

	// broadcast to all connected sockets that this user has left the chat
	if (users[this.id]) {
		this.broadcast.emit('user-disconnected', users[this.id]);
	}

	// remove user from list of connected users
	delete users[this.id];
}

/**
 * Handle incoming chat-message
 */
function handleChatMsg (msg) {
	debug("Someone sent something nice: '%s'", msg);
	//io.emit('chatmsg', msg); // emit to all connected sockets

	// broadcast to all connected sockets EXCEPT ourselves
	this.broadcast.emit('chatmsg', msg);
}

/**
 * Handle a new user connecting
 */
function handleRegisterUser(username) {
	debug("User '%s' connected to the chat", username);
	users[this.id] = username;

	// broadcast to all connected sockets EXCEPT ourselves
	this.broadcast.emit('new-user-connected', username);
}

module.exports = function(socket) {
	// this = io
	debug(`Client ${socket.id} connected!`);

	socket.on('disconnect', handleUserDisconnect);

	socket.on('chatmsg', handleChatMsg);
	socket.on('register-user', handleRegisterUser);
}
