/**
 * SocketIO Server
 */

const debug = require('debug')('halp:socket');
const jwt = require('jsonwebtoken');
const rooms = {};

/**
 * Add a user to a room
 */
function addUserToRoom(room, name, location, socketId) {
	if (typeof rooms[room] === 'undefined') {
		rooms[room] = {
			waitingList: [],
		};
	}

	rooms[room].waitingList.push({
		socketId,
		name,
		location,
		waitingSince: Math.round(Date.now() / 1000),
	});
}

/**
 * Remove user from a room
 */
function removeUserFromRoom(room, socketId) {
	// remove user from the room's waiting list
	const waitingList = getWaitingListForRoom(room).filter(user => user.socketId !== socketId);
	setWaitingListForRoom(room, waitingList);

	// send the updated waiting list to all users in the room
	io.to(room).emit('updated-waiting-list', {
		room,
		waitingList,
	});
}

/**
 * Get waiting list for room
 */
function getWaitingListForRoom(room) {
	return rooms[room].waitingList;
}

/**
 * Set waiting list for room
 */
function setWaitingListForRoom(room, waitingList) {
	return rooms[room].waitingList = waitingList;
}

/**
 * Handle get waiting list for a room
 */
function handleGetWaitingList(room, cb) {
	cb({
		room,
		waitingList: getWaitingListForRoom(room),
	});
}

/**
 * Handle a user disconnecting
 */
function handleUserDisconnect() {
	debug(`Client ${this.id} disconnected :(`);

	const room = Object.keys(rooms).find(room =>
		rooms[room].waitingList.find(user =>
			user.socketId === this.id
		)
	)

	if (room) {
		debug(`Found socket still in room '${room}, removing...'`);
		removeUserFromRoom(room, this.id);
	}
}

/**
 * Handle an incoming request to join a room
 */
function handleJoinRoom(data, cb) {
	let payload;
	try {
		payload = jwt.verify(data.access_token, process.env.ACCESS_TOKEN_SECRET);
	} catch (error) {
		cb({
			joined: false,
			invalidToken: true,
		});
	}

	debug(`${payload.data.name} wants to join #${data.room}!`);

	// join room
	this.join(data.room);

	// add user to room's list of waiting users
	addUserToRoom(data.room, payload.data.name, '', this.id);

	// get list of waiting users
	const waitingList = getWaitingListForRoom(data.room);

	// send back list of waiting users
	cb({
		joined: true,
		waitingList,
	});

	// send the updated waiting list to all other users in the room
	this.broadcast.to(data.room).emit('updated-waiting-list', {
		waitingList,
	});

	// profit!
}

/**
 * Handle an request to leave a room
 */
function handleLeaveRoom(room) {
	debug(`User with socketId ${this.id} wants to leave ${room}`);

	// remove user from waiting list
	removeUserFromRoom(room, this.id);

	// actually leave the socket-room
	this.leave(room);
}

module.exports = function(socket) {
	// this = io
	io = this;
	debug(`Client ${socket.id} connected!`);

	socket.on('disconnect', handleUserDisconnect);

	socket.on('get-waiting-list', handleGetWaitingList);
	socket.on('join-room', handleJoinRoom);
	socket.on('leave-room', handleLeaveRoom);
}
