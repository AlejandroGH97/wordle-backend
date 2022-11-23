const bcrypt = require('bcryptjs');
const express = require('express');
const { generateAccessToken } = require('@wordle/auth-middleware');
const User = require('../models/user');
const router = express.Router();

router.post('/signup', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      username: username,
    });
    if (user) {
      res.status(400).send({ message: 'Username Already Taken.' });
    } else {
      await User.create({
        username: username,
        password: bcrypt.hashSync(password, 8),
      });
      res.send({ message: 'User registered successfully.' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    username: username,
  });

  if (!user) {
    return res.status(401).send({ message: 'Invalid User.' });
  }

  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send({ message: 'Invalid User.' });
  }

  const token = generateAccessToken(user._id);
  res.send({ token });
});

module.exports = router;
