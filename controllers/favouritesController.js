const Favourites = require('../models/favouritesModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

// get all gigs
const getFavourites = async (req, res) => {
	const user_id = req.user._id;
	console.log('here');
	// only finds gigs that match user_id
	const favourites = await Favourites.find({ user_id });
	res.status(200).json(favourites);
};

// get a single workout
// const getPlaylist = async (req, res) => {
// 	const { id } = req.params;
// 	console.log('here');
// 	// check if id exists
// 	if (!mongoose.Types.ObjectId.isValid(id)) {
// 		return res.status(404).json({ error: 'No such playlist' });
// 	}
// 	const playlist = await Playlist.findById(id).populate({
// 		path: 'songs',
// 	});
// 	if (!playlist) {
// 		return res.status(404).json({ error: 'No such playlist' });
// 	}
// 	res.status(200).json(playlist);
// };

// create new workout
const createFavourites = async (req, res) => {
	const { songs } = req.body;
	console.log(songs, 'songs');
	// const { title, title, reps } = req.body;

	// handles ui error message if not all fields are complete
	// const emptyFields = [];

	// if (!title) {
	// 	emptyFields.push('title');
	// }
	// if (!name) {
	// 	emptyFields.push('name');
	// }
	// if (!albumTitle) {
	// 	emptyFields.push('albumTitle');
	// }
	// if (!fileUrl) {
	// 	emptyFields.push('fileUrl');
	// }
	// if (!artistName) {
	// 	emptyFields.push('artistName');
	// }
	// if (!artworkUrl) {
	// 	emptyFields.push('artworkUrl');
	// }
	// if (emptyFields.length > 0) {
	// 	return res
	// 		.status(400)
	// 		.json({ error: 'Please fill in all the fields', emptyFields });
	// }

	// add doc to db
	try {
		// user._id comes from middleware VITAL FOR gigs SPECIFIC TO A USER
		const user_id = req.user._id;
		const favourites = await Favourites.create({
			songs,
			user_id,
		});
		// gig.support_bands.push()
		res.status(200).json(favourites);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// delete a workout
// const deleteFavourites = async (req, res) => {
// 	const { id } = req.params;
// 	// console.log(id, 'id backend');
// 	// check if id exists
// 	if (!mongoose.Types.ObjectId.isValid(id)) {
// 		return res.status(404).json({ error: 'No such favourites' });
// 	}
// 	const plUserId = await Favourites.findById({ _id: id });
// 	// console.log(plUserId, 'plUserId');
// 	// console.log(plUserId.user_id, 'plUserId');
// 	const userId = await plUserId.user_id;
// 	// console.log(plUserId[0].user_id, 'plUserId');
// 	const playlist = await Favourites.findOneAndDelete({ _id: id });
// 	const user = await User.findByIdAndUpdate(
// 		{ _id: userId },
// 		{ $pull: { playlists: { $in: id } } }
// 	);
// 	// console.log(user, 'user updated in playlist controller?');
// 	if (!playlist) {
// 		return res.status(404).json({ error: 'No such playlist' });
// 	}
// 	res.status(200).json(playlist);
// };

// update a playlist
const updateFavourites = async (req, res) => {
	const { id } = req.params;
	const { songId } = req.body;
	// console.log(songId, 'songId');
	// const favs = { ...req.body };
	// console.log(favs, 'fav');
	// console.log(id, 'id');
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such user' });
	}
	const favourites = await Favourites.findByIdAndUpdate(
		{ _id: id },
		{ ...req.body, $push: { songs: songId } }
		// second object contains data to update
		// {
		// gets all properties in body
		// ...req.body,
		// favourites: req.body.favourites.push(songId),
		// favourites: ...favourites,songId,
		// ...req.body,
		// first_name: first_name,
		// }
	);
	if (!favourites) {
		return res.status(404).json({ error: 'No such favourites' });
	}
	res.status(200).json(favourites);
};

module.exports = {
	getFavourites,
	// getPlaylist,
	createFavourites,
	// deleteFavourites,
	updateFavourites,
};
