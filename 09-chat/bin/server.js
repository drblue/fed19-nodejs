#!/usr/bin/env node

/**
 * Module dependencies.
 */

require('dotenv').config();

const app = require('../app');
const debug = require('debug')('09-simple-chat:server');
const http = require('http');
const SocketIO = require('socket.io');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
const io = SocketIO(server);

const users = {};

io.on('connection', (socket) => {
	debug("A client connected!");

	socket.on('disconnect', () => {
		debug(`Socket ${socket.id} left the chat :(`);

		// broadcast to all connected sockets that this user has left the chat
		socket.broadcast.emit('user-disconnected', users[socket.id]);

		// remove user from list of connected users
		delete users[socket.id];
	});

	socket.on('user-connected', username => {
		debug("User '%s' connected to the chat", username);
		users[socket.id] = username;

		// broadcast to all connected sockets EXCEPT ourselves
		socket.broadcast.emit('user-connected', username);
	});

	socket.on('chatmsg', (msg) => {
		debug("Someone sent something nice: '%s'", msg);
		//io.emit('chatmsg', msg); // emit to all connected sockets

		// broadcast to all connected sockets EXCEPT ourselves
		socket.broadcast.emit('chatmsg', msg);
	});
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
