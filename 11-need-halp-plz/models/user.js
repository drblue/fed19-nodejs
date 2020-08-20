/**
 * User Model
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Declare Model Schema
const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
		trim: true,
	},
});

// Declare Model
const User = mongoose.model('User', UserSchema);

// Export model
module.exports = User;
