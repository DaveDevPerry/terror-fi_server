const express = require('express');
const {
	getAlbums,
	getAlbum,
	createAlbum,
	// deleteGig,
	// updateGig,
} = require('../controllers/albumController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// this fires the middleware function to ensure all workout routes require authentication
router.use(requireAuth);

// /api/workouts/

// GET all workouts
router.get('/', getAlbums);

// GET a single workout
router.get('/:id', getAlbum);

// POST a new workout
router.post('/', createAlbum);
// DELETE a workout
// router.delete('/:id', deleteGig);
// UPDATE a new workout
// router.patch('/:id', updateGig);

module.exports = router;
