const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// mongo uses _id for id property
const createToken = (_id) => {
	// {payload headline_band} , secret, expires 3 days
	return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// login user
const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		// login() is the static method of user
		// const user = await User.login(email, password).populate({
		// 	path: 'playlists',
		// });
		const user = await User.login(email, password);
		// create a token
		const token = createToken(user._id);

		const username = user.username;
		const favourites = user.favourites;
		const playlists = user.playlists;
		const userId = user._id;
		const defaultAnimation = user.defaultAnimation;
		const defaultView = user.defaultView;

		console.log(user, 'loginUser backend');
		res.status(200).json({
			email,
			token,
			username,
			favourites,
			playlists,
			userId,
			defaultAnimation,
			defaultView,
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
	// res.json({ msg: 'login user' });
};

// get users
const getUsers = async (req, res) => {
	const users = await User.find({});
	try {
		res.status(200).json({ users });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// WORKING PRE FAVOURITES
// // login user
// const loginUser = async (req, res) => {
// 	const { email, password } = req.body;
// 	try {
// 		// login() is the static method of user
// 		const user = await User.login(email, password);
// 		// create a token
// 		const token = createToken(user._id);

// 		res.status(200).json({ email, token });
// 	} catch (error) {
// 		res.status(400).json({ error: error.message });
// 	}
// 	// res.json({ msg: 'login user' });
// };

// signup user
const signupUser = async (req, res) => {
	const { email, password, username } = req.body;
	try {
		// signup() is the static method of user
		const user = await User.signup(email, password, username);
		// create a token
		const token = createToken(user._id);

		res.status(200).json({ email, token });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// get user
const getUser = async (req, res) => {
	const { id } = req.params;
	const user = await User.findById(id);
	try {
		res.status(200).json({ user });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// update a user
// const updateUser = async (req, res) => {
// 	const { id } = req.params;
// 	const { clonedFavs } = req.body;
// 	// const favs = { ...req.body };
// 	// console.log(favs, 'fav');
// 	// console.log(id, 'id');
// 	// check if id exists
// 	if (!mongoose.Types.ObjectId.isValid(id)) {
// 		return res.status(404).json({ error: 'No such user' });
// 	}
// 	const user = await User.findByIdAndUpdate(
// 		{ _id: id },
// 		{ favourites: clonedFavs },
// 		// second object contains data to update
// 		{
// 			// gets all properties in body
// 			// ...req.body,
// 			// favourites: req.body.favourites.push(songId),
// 			// favourites: ...favourites,songId,
// 			// ...req.body,
// 			// first_name: first_name,
// 		}
// 	);
// 	if (!user) {
// 		return res.status(404).json({ error: 'No such user' });
// 	}
// 	console.log('here', user);
// 	res.status(200).json(user);
// };
const updateUser = async (req, res) => {
	const { id } = req.params;
	const { songId } = req.body;
	const favs = { ...req.body };
	console.log(favs, 'fav');
	console.log(id, 'id');
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such user' });
	}
	const user = await User.findByIdAndUpdate(
		{ _id: id },
		{ ...req.body, $push: { favourites: songId } },
		// second object contains data to update
		{
			// gets all properties in body
			// ...req.body,
			// favourites: req.body.favourites.push(songId),
			// favourites: ...favourites,songId,
			// ...req.body,
			// first_name: first_name,
		}
	);
	if (!user) {
		return res.status(404).json({ error: 'No such user' });
	}
	res.status(200).json(user);
};
// // update a user
// const updateUser = async (req, res) => {
// 	const { id } = req.params;
// 	// check if id exists
// 	if (!mongoose.Types.ObjectId.isValid(id)) {
// 		return res.status(404).json({ error: 'No such user' });
// 	}
// 	const user = await User.findByIdAndUpdate(
// 		{ _id: id },
// 		// second object contains data to update
// 		{
// 			// gets all properties in body
// 			...req.body,
// 		}
// 	);
// 	if (!user) {
// 		return res.status(404).json({ error: 'No such user' });
// 	}
// 	res.status(200).json(user);
// };

module.exports = { signupUser, loginUser, updateUser, getUsers, getUser };
