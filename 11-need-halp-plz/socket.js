/**
 * SocketIO Server
 */

const debug = require('debug')('halp:socket');
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
 * Get waiting list for room
 */
function getWaitingListForRoom(room) {
	return rooms[room].waitingList;
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
}

/**
 * Handle an incoming request to join a room
 */
function handleJoinRoom({ name, location, schoolclass }, cb) {
	debug(`${name} wants to join #${schoolclass}!`);

	// join room
	this.join(schoolclass);

	// add user to room's list of waiting users
	addUserToRoom(schoolclass, name, location, this.id);

	// get list of waiting users
	const waitingList = getWaitingListForRoom(schoolclass);

	// send back list of waiting users
	cb({
		room: schoolclass,
	});

	// send the updated waiting list to all other users in the room
	this.broadcast.to(schoolclass).emit('updated-waiting-list', {
		room: schoolclass,
		waitingList,
	});

	// profit!
}

module.exports = function(socket) {
	// this = io
	io = this;
	debug(`Client ${socket.id} connected!`);

	socket.on('disconnect', handleUserDisconnect);

	socket.on('get-waiting-list', handleGetWaitingList);
	socket.on('join-room', handleJoinRoom);
}
