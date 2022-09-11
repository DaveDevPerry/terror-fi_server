const express = require('express');
const {
	getPlaylists,
	getPlaylist,
	createPlaylist,
	deletePlaylist,
	updatePlaylist,
} = require('../controllers/playlistController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// this fires the middleware function to ensure all workout routes require authentication
router.use(requireAuth);

// /api/workouts/

// GET all workouts
router.get('/', getPlaylists);

// GET a single workout
router.get('/:id', getPlaylist);

// POST a new workout
router.post('/', createPlaylist);
// DELETE a workout
router.delete('/:id', deletePlaylist);
// UPDATE a new workout
router.patch('/:id', updatePlaylist);

module.exports = router;
