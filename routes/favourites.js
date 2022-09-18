const express = require('express');
const {
	getFavourites,
	// getPlaylist,
	createFavourites,
	// deletePlaylist,
	updateFavourites,
} = require('../controllers/favouritesController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// this fires the middleware function to ensure all workout routes require authentication
router.use(requireAuth);

// /api/workouts/

// GET all workouts
router.get('/', getFavourites);

// GET a single workout
// router.get('/:id', getPlaylist);

// POST a new workout
router.post('/', createFavourites);
// DELETE a workout
// router.delete('/:id', deletePlaylist);
// UPDATE a new workout
router.patch('/:id', updateFavourites);

module.exports = router;
