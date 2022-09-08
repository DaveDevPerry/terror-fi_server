const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playlistSchema = new Schema(
	{
		// id: {
		// 	type: Number,
		// 	required: true,
		// 	unique: true,
		// },
		name: {
			type: String,
			required: true,
			unique: true,
		},
		songs: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Song',
					required: false,
				},
			],
		},
		user_id: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Playlist', playlistSchema);
