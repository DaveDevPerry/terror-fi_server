const mongoose = require('mongoose');
const User = require('./userModel');

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

playlistSchema.post('save', async function (next) {
	try {
		const user = await User.findByIdAndUpdate(
			{ _id: this.user_id },
			{ $push: { playlists: this._id } }
		);
		// console.log(user, 'User in pre save');

		return next();
	} catch (err) {
		return next(err);
	}
});

module.exports = mongoose.model('Playlist', playlistSchema);
