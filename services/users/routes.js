const express = require('express');
const usersRoutes = require('./routes/users');

const router = express.Router();

router.use('/users', usersRoutes);

module.exports = { router };
