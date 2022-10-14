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

// playlistSchema.post('save', async function (next) {
// 	try {
// 		const user = await User.findByIdAndUpdate(
// 			{ _id: this.user_id },
// 			{ $push: { playlists: this._id } }
// 		);
// 		// console.log(user, 'User in pre save');

// 		return next();
// 	} catch (err) {
// 		return next(err);
// 	}
// });

playlistSchema.post('save', async function (doc, next) {
	try {
		let data = await doc;
		console.log(data, 'doc in post weight');

		const currentUser = await User.findById(data.user_id);

		const user = await User.findByIdAndUpdate(
			{ _id: currentUser._id },
			{ $push: { playlists: data._id } }
		);

		console.log(user, 'updated user with weight id?');
		// let data = await doc
		//   .model("User")
		//   .finOneAndUpdate({ _id: doc._id }, { exampleIDField: "some ID you want to pass" });
	} catch (error) {
		console.log('get -> error', error);
		next(error);
	}
});

module.exports = mongoose.model('Playlist', playlistSchema);
