const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const albumSchema = new Schema(
	{
		id: {
			type: Number,
			required: true,
			unique: true,
		},
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
		fileUrls: [
			{
				type: String,
				required: true,
				unique: true,
			},
		],
		artworkUrls: [
			{
				type: String,
				required: true,
				unique: true,
			},
		],
		coverUrl: {
			type: String,
			required: true,
			unique: false,
		},
		user_id: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Album', albumSchema);
