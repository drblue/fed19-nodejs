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
	original_title: {
		type: String,
		trim: true,
	},
	poster: {
		type: String,
		trim: true,
	},
	plot: {
		type: String,
		trim: true,
	},
	plot_keywords: [
		{
			type: String,
			trim: true,
			lowercase: true,
		}
	],
	runtime: {
		type: Number,
		default: null,
	},
	release_date: {
		type: Date,
		default: Date.now(),
	},
	tagline: {
		type: String,
		default: null,
	},
	certification: String,
});

// Declare Model
const Movie = mongoose.model('Movie', MovieSchema);

// Export model
module.exports = Movie;
