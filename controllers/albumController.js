const Album = require('../models/albumModel');
const mongoose = require('mongoose');

// get all gigs
const getAlbums = async (req, res) => {
	// const user_id = req.user._id;

	// only finds gigs that match user_id
	const albums = await Album.find({}).sort({ createdAt: -1 });
	res.status(200).json(albums);
};
// const getAlbums = async (req, res) => {
// 	const user_id = req.user._id;

// 	// only finds gigs that match user_id
// 	const albums = await Album.find({ user_id }).sort({ createdAt: -1 });
// 	res.status(200).json(albums);
// };

// get a single workout
const getAlbum = async (req, res) => {
	const { id } = req.params;
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such album' });
	}
	const album = await Album.findById(id);
	if (!album) {
		return res.status(404).json({ error: 'No such album' });
	}
	res.status(200).json(album);
};

// create new workout
const createAlbum = async (req, res) => {
	const { id, title, artistName, albumId, coverUrl, fileUrls, artworkUrls } =
		req.body;
	// console.log(gig, 'gig');
	// const { title, title, reps } = req.body;

	// handles ui error message if not all fields are complete
	const emptyFields = [];

	// if (!title) {
	// 	emptyFields.push('title');
	// }
	if (!title) {
		emptyFields.push('title');
	}
	// if (!albumTitle) {
	// 	emptyFields.push('albumTitle');
	// }
	// if (!fileUrl) {
	// 	emptyFields.push('fileUrl');
	// }
	if (!artistName) {
		emptyFields.push('artistName');
	}
	// if (!artworkUrl) {
	// 	emptyFields.push('artworkUrl');
	// }
	if (emptyFields.length > 0) {
		return res
			.status(400)
			.json({ error: 'Please fill in all the fields', emptyFields });
	}

	// add doc to db
	try {
		// user._id comes from middleware VITAL FOR gigs SPECIFIC TO A USER
		const user_id = req.user._id;
		const album = await Album.create({
			id,
			title,
			artistName,
			albumId,
			coverUrl,
			fileUrls,
			artworkUrls,
			user_id,
		});
		// gig.support_bands.push()
		res.status(200).json(album);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// delete a workout
// const deleteGig = async (req, res) => {
// 	const { id } = req.params;
// 	// check if id exists
// 	if (!mongoose.Types.ObjectId.isValid(id)) {
// 		return res.status(404).json({ error: 'No such gig' });
// 	}
// 	const gig = await Gig.findOneAndDelete({ _id: id });
// 	if (!gig) {
// 		return res.status(404).json({ error: 'No such gig' });
// 	}
// 	res.status(200).json(gig);
// };

// update a gig
// const updateGig = async (req, res) => {
// 	const { id } = req.params;
// 	// check if id exists
// 	if (!mongoose.Types.ObjectId.isValid(id)) {
// 		return res.status(404).json({ error: 'No such gig' });
// 	}
// 	const gig = await Gig.findByIdAndUpdate(
// 		{ _id: id },
// 		// second object contains data to update
// 		{
// 			// gets all properties in body
// 			...req.body,
// 		}
// 	);
// 	if (!gig) {
// 		return res.status(404).json({ error: 'No such gig' });
// 	}
// 	res.status(200).json(gig);
// };

module.exports = {
	getAlbums,
	getAlbum,
	createAlbum,
	// deleteGig,
	// updateGig,
};
