const { authenticateToken } = require('@wordle/auth-middleware');
const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/finish', authenticateToken, async (req, res, next) => {
  const updateKey = `statistics.${req.body.tries}`;
  const user = await User.findOneAndUpdate(
    { _id: req.userId },
    {
      $inc: {
        [updateKey]: 1,
      },
    },
    { returnDocument: 'after' },
  );
  if (!user) {
    return res.status(401).send({ message: 'Invalid User.' });
  }
  return res.send(user.statistics);
});

router.get('/stats', authenticateToken, async (req, res, next) => {
  const userStats = await User.findById(req.userId, {
    _id: 0,
    username: 0,
    password: 0,
  });
  res.send(userStats);
});

module.exports = router;
