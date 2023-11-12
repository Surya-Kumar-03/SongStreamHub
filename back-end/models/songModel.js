const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	artistId: {
		type: String,
		required: true,
	},
	ownerId: {
		type: String,
		required: true,
	},
	mediaUrl: {
		type: String,
		required: true,
	},
	thumbnail: {
		type: String,
		required: true,
	},
	duration: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	clicks: {
		type: Number,
	},
	likes: {
		type: Number,
	},
	genre: {
		type: String,
	},
});

module.exports = mongoose.model('Song', songSchema);
