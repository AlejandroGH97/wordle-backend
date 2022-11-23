const express = require('express');
const gameRoutes = require('./routes/game');

const router = express.Router();

router.use('/game', gameRoutes);

module.exports = { router };
