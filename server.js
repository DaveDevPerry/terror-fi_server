require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// routes
const userRoutes = require('./routes/user');
const songRoutes = require('./routes/songs');
const albumRoutes = require('./routes/albums');
const playlistRoutes = require('./routes/playlists');
const favouritesRoutes = require('./routes/favourites');

app.use(cors());
// middleware
app.use(express.json());
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// routes
app.use('/api/user', userRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/favourites', favouritesRoutes);

// connect to db
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
	})
	.then(() => {
		// listen for requests once connected to db
		app.listen(process.env.PORT, () => {
			console.log(`connected to db & listening on port ${process.env.PORT}`);
		});
	})
	.catch((error) => {
		console.log(error);
	});

