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
function getOnlineUsersInRoom(room) {
	return Object.values(room.users);
}

/**
 * Get room by roomName
 */
function getRoomByName(roomName) {
	return rooms.find(room => room.name === roomName);
}

/**
 * Get username by id
 */
function getUsernameById(id) {
	const room = getRoomByUserId(id);
	return room.users[id];
}

/**
 * Get room by user id
 */
function getRoomByUserId(id) {
	return rooms.find(room => room.users.hasOwnProperty(id))
}

/**
 * Handle user disconnecting
 */
function handleUserDisconnect() {
	debug(`Client ${this.id} disconnected :(`);

	const room = getRoomByUserId(this.id);
	if (!room) {
		return;
	}

	// broadcast to all connected users in the room that this user has left the chat
	this.broadcast.to(room.name).emit('user-disconnected', room.users[this.id]);

	// remove user from list of connected users
	delete room.users[this.id];

	// broadcast online users in room to all connected users in the room EXCEPT ourselves
	this.broadcast.to(room.name).emit('online-users', getOnlineUsersInRoom(room));
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
		username: getUsernameById(this.id, incomingMsg.room),
	}

	// broadcast to all connected sockets EXCEPT ourselves
	this.broadcast.to(incomingMsg.room).emit('chatmsg', msg);
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
	debug("User '%s' (%s) wants to connect to the room '%s'", username, this.id, roomName);

	// join the requested room
	this.join(roomName);

	// add user to room's list of online users
	const room = getRoomByName(roomName);
	room.users[this.id] = username;

	callback({
		joinChat: true,
		usernameInUse: false,
		onlineUsers: getOnlineUsersInRoom(room),
	});

	// broadcast to all connected sockets in the room EXCEPT ourselves
	this.broadcast.to(roomName).emit('new-user-connected', username);

	// broadcast online users in room to all connected sockets EXCEPT ourselves
	this.broadcast.to(roomName).emit('online-users', getOnlineUsersInRoom(room));
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
