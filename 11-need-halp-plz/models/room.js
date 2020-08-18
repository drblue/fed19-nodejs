/**
 * Room Model
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Declare Model Schema
const RoomSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	// waitingList: [
	// 	{
	// 		type: Schema.Types.ObjectId,
	// 		ref: 'User',
	// 	}
	// ],
});

// Declare Model
const Room = mongoose.model('Room', RoomSchema);

// Export model
module.exports = Room;
