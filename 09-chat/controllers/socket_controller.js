/**
 * Socket Controller
 */

const debug = require('debug')('09-simple-chat:socket_controller');
const users = {};

let io = null;

/**
 * Get usernames of online users
 */
function getOnlineUsers() {
	return Object.values(users);
}

/**
 * Handle user disconnecting
 */
function handleUserDisconnect() {
	debug(`Client ${this.id} disconnected :(`);

	if (users[this.id]) {
		// broadcast to all connected sockets that this user has left the chat
		this.broadcast.emit('user-disconnected', users[this.id]);

		// remove user from list of connected users
		delete users[this.id];

		// broadcast online users to all connected sockets EXCEPT ourselves
		this.broadcast.emit('online-users', getOnlineUsers());
	}
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
function handleRegisterUser(username, callback) {
	debug("User '%s' connected to the chat", username);
	users[this.id] = username;
	callback({
		joinChat: true,
		usernameInUse: false,
		onlineUsers: getOnlineUsers(),
	});

	// broadcast to all connected sockets EXCEPT ourselves
	this.broadcast.emit('new-user-connected', username);

	// broadcast online users to all connected sockets EXCEPT ourselves
	this.broadcast.emit('online-users', getOnlineUsers());
}

module.exports = function(socket) {
	// this = io
	io = this;
	debug(`Client ${socket.id} connected!`);

	socket.on('disconnect', handleUserDisconnect);

	socket.on('chatmsg', handleChatMsg);
	socket.on('register-user', handleRegisterUser);
}
