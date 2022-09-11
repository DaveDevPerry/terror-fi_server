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

playlistSchema.pre('save', async function (next) {
	console.log(User, 'User in pre save');
	console.log(next, 'next in pre save');
	console.log(this, 'this in pre save');
	try {
		// if (!this.isModified('password')) {
		// 	return next();
		// }

		return next();
	} catch (err) {
		return next(err);
	}
});

module.exports = mongoose.model('Playlist', playlistSchema);
