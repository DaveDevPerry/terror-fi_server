const express = require('express');

// Controller functions
const {
	signupUser,
	loginUser,
	updateUser,
	getUsers,
	getUser,
} = require('../controllers/userController');

const router = express.Router();

// get users
router.get('/', getUsers);

// get user
router.get('/:id', getUser);

// Login route
router.post('/login', loginUser);

// Signup route
router.post('/signup', signupUser);

// UPDATE a user
// router.patch('/:id', updateUser);
// UPDATE a user
router.patch('/:id', updateUser);

module.exports = router;
