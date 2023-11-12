const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	bio: {
		type: String,
		default: '',
	},
	genres: {
		type: [String],
		default: [],
	},
	followers: {
		type: Number,
		default: 0,
	},
	songs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Song', 
		},
	],
});

module.exports = mongoose.model('Artist', artistSchema);
