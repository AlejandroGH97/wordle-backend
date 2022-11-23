const express = require('express');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/auth', authRoutes);

module.exports = { router };
