/**
 * Socket Controller
 */

const debug = require('debug')('09-simple-chat:socket_controller');
const rooms = [
	{
		name: 'general',
		users: {},
	},
	{
		name: 'lieutenant',
		users: {},
	},
	{
		name: 'private',
		users: {},
	},
];
const users = {};

let io = null;

/**
 * Get room names
 */
function getListOfRoomNames() {
	return rooms.map(room => room.name);
}

/**
 * Get usernames of online users in room
 */
function getOnlineUsersInRoom(roomName) {
	const room = getRoomByName(roomName);
	return Object.values(room.users);
}

/**
 * Get room by roomName
 */
function getRoomByName(roomName) {
	return rooms.find(room => room.name === roomName);
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
		this.broadcast.emit('online-users', getOnlineUsersInRoom(""));
	}
}

/**
 * Handle incoming chat-message
 */
function handleChatMsg(incomingMsg) {
	debug("Someone sent something nice: '%s'", incomingMsg);
	//io.emit('chatmsg', msg); // emit to all connected sockets

	const msg = {
		time: Date.now(),
		content: incomingMsg.content,
		username: users[this.id],
	}

	// broadcast to all connected sockets EXCEPT ourselves
	this.broadcast.emit('chatmsg', msg);
}

/**
 * Handle a request for rooms
 */
function handleGetRoomList(callback) {
	callback(getListOfRoomNames());
}

/**
 * Handle a new user connecting
 */
function handleRegisterUser(roomName, username, callback) {
	debug("User '%s' wants to connect to the room '%s'", username, roomName);

	// join the requested room
	this.join(roomName);

	// add user to room's list of online users
	const room = getRoomByName(roomName);
	room.users[this.id] = username;
	// addUserToRoom(this.id, username, room);
	// removeUserFromRoom(this.id, room);

	callback({
		joinChat: true,
		usernameInUse: false,
		onlineUsers: getOnlineUsersInRoom(roomName),
	});

	// broadcast to all connected sockets in the room EXCEPT ourselves
	this.broadcast.to(roomName).emit('new-user-connected', username);

	// broadcast online users in room to all connected sockets EXCEPT ourselves
	this.broadcast.to(roomName).emit('online-users', getOnlineUsersInRoom(roomName));
}

module.exports = function(socket) {
	// this = io
	io = this;
	debug(`Client ${socket.id} connected!`);

	socket.on('disconnect', handleUserDisconnect);

	socket.on('chatmsg', handleChatMsg);
	socket.on('get-room-list', handleGetRoomList);
	socket.on('register-user', handleRegisterUser);
}
