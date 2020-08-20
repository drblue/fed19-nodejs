/**
 * Models
 */

const debug = require('debug')('halp:models');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

// Connect to database
mongoose.connect(process.env.DB_CONNECTION, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	// we're connected!
	debug("We're connected to MongoDB Atlas! 🥳");
});

// Set up the models we want to use in our app
const models = {};
models.Room = require('./room');
models.User = require('./user');

// Export all the things
module.exports = {
	mongoose,
	...models,
}
