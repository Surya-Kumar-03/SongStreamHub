const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	artist: {
		type: String,
		required: true,
	},
	mediaUrl: {
		type: String,
		required: true,
	},
	album: {
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
	owner: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Song', songSchema);
