/**
 * Movie Model
 */

const mongoose = require('mongoose');

// Declare Model Schema
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

// Declare Model
const Movie = mongoose.model('Movie', MovieSchema);

// Export model
module.exports = Movie;
