/**
 * Movie Model
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Declare Model Schema
const MovieSchema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
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
		// min: 0,
		validate(value) {
			if (value < 0) throw new Error("Just because you thought the movie was bad, it shouldn't have a negative runtime.");
		}
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
	genres: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Genre',
		}
	],
	actors: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Person',
		}
	],
	director: {
		type: Schema.Types.ObjectId,
		ref: 'Person',
		default: null,
	},
});

// Declare Model
const Movie = mongoose.model('Movie', MovieSchema);

// Export model
module.exports = Movie;
