const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

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
		const user = await User.login(email, password);
		// create a token
		const token = createToken(user._id);

		res.status(200).json({ email, token });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
	// res.json({ msg: 'login user' });
};

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

// update a user
const updateUser = async (req, res) => {
	const { id } = req.params;
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such user' });
	}
	const user = await User.findByIdAndUpdate(
		{ _id: id },
		// second object contains data to update
		{
			// gets all properties in body
			...req.body,
		}
	);
	if (!user) {
		return res.status(404).json({ error: 'No such user' });
	}
	res.status(200).json(user);
};

module.exports = { signupUser, loginUser, updateUser };
