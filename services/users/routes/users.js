const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/finish', (req, res, next) => {
  res.json({ msg: 'Ganaste' });
});

router.get('/stats', async (req, res, next) => {
  const userStats = await User.findOne(
    {},
    { _id: 0, username: 0, password: 0 },
  );
  res.send(userStats);
});

module.exports = router;
