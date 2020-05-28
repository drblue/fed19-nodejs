/**
 * Models
 */

const mongoose = require('mongoose');

// Connect to database
mongoose.connect(process.env.DB_CONNECTION, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	// we're connected!
	console.log("We're connected to MongoDB Atlas! 🥳");
});

// Set up the models we want to use in our app

// Movie Schema
const MovieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	runtime: {
		type: Number,
		default: null,
	},
	releaseDate: {
		type: Date,
		default: Date.now(),
	},
	certification: String,
});

// Movie Model
const Movie = mongoose.model('Movie', MovieSchema);

// Export all the things
module.exports = {
	Movie,
	mongoose,
}
