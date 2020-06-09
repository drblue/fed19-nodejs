/**
 * Socket Controller
 */

const debug = require('debug')('09-simple-chat:socket_controller');
const users = {};

module.exports = (socket) => {
	debug("A client connected!");

	socket.on('disconnect', () => {
		debug(`Socket ${socket.id} left the chat :(`);

		// broadcast to all connected sockets that this user has left the chat
		if (users[socket.id]) {
			socket.broadcast.emit('user-disconnected', users[socket.id]);
		}

		// remove user from list of connected users
		delete users[socket.id];
	});

	socket.on('register-user', username => {
		debug("User '%s' connected to the chat", username);
		users[socket.id] = username;

		// broadcast to all connected sockets EXCEPT ourselves
		socket.broadcast.emit('new-user-connected', username);
	});

	socket.on('chatmsg', (msg) => {
		debug("Someone sent something nice: '%s'", msg);
		//io.emit('chatmsg', msg); // emit to all connected sockets

		// broadcast to all connected sockets EXCEPT ourselves
		socket.broadcast.emit('chatmsg', msg);
	});
}
