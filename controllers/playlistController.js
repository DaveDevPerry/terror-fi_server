const Playlist = require('../models/playlistModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

// get all gigs
const getPlaylists = async (req, res) => {
	const user_id = req.user._id;
	console.log('here');
	// only finds gigs that match user_id
	const playlists = await Playlist.find({ user_id }).sort({ createdAt: -1 });
	res.status(200).json(playlists);
};

// get a single workout
const getPlaylist = async (req, res) => {
	const { id } = req.params;
	console.log('here');
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such playlist' });
	}
	const playlist = await Playlist.findById(id).populate({
		path: 'songs',
	});
	if (!playlist) {
		return res.status(404).json({ error: 'No such playlist' });
	}
	res.status(200).json(playlist);
};

// create new workout
const createPlaylist = async (req, res) => {
	const { name, songs } = req.body;
	console.log(name, 'name');
	// const { title, title, reps } = req.body;

	// handles ui error message if not all fields are complete
	const emptyFields = [];

	// if (!title) {
	// 	emptyFields.push('title');
	// }
	if (!name) {
		emptyFields.push('name');
	}
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
	if (emptyFields.length > 0) {
		return res
			.status(400)
			.json({ error: 'Please fill in all the fields', emptyFields });
	}

	// add doc to db
	try {
		// user._id comes from middleware VITAL FOR gigs SPECIFIC TO A USER
		const user_id = req.user._id;
		const playlist = await Playlist.create({
			name,
			songs,
			user_id,
		});
		// gig.support_bands.push()
		res.status(200).json(playlist);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// delete a workout
const deletePlaylist = async (req, res) => {
	const { id } = req.params;
	// console.log(id, 'id backend');
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such playlist' });
	}
	const plUserId = await Playlist.findById({ _id: id });
	// console.log(plUserId, 'plUserId');
	// console.log(plUserId.user_id, 'plUserId');
	const userId = await plUserId.user_id;
	// console.log(plUserId[0].user_id, 'plUserId');
	const playlist = await Playlist.findOneAndDelete({ _id: id });
	const user = await User.findByIdAndUpdate(
		{ _id: userId },
		{ $pull: { playlists: { $in: id } } }
	);
	// console.log(user, 'user updated in playlist controller?');
	if (!playlist) {
		return res.status(404).json({ error: 'No such playlist' });
	}
	res.status(200).json(playlist);
};

// update a playlist
const updatePlaylist = async (req, res) => {
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
	const playlist = await Playlist.findByIdAndUpdate(
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
	if (!playlist) {
		return res.status(404).json({ error: 'No such playlist' });
	}
	res.status(200).json(playlist);
};

module.exports = {
	getPlaylists,
	getPlaylist,
	createPlaylist,
	deletePlaylist,
	updatePlaylist,
};
