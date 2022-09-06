const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const songSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
		},
		artistName: {
			type: String,
			required: true,
			unique: false,
		},
		albumTitle: {
			type: String,
			required: true,
			unique: false,
		},
		fileUrl: {
			type: String,
			required: true,
			unique: true,
		},
		artworkUrl: {
			type: String,
			required: true,
			unique: true,
		},
		user_id: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Song', songSchema);
