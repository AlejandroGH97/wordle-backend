const express = require('express');
const { authenticateToken } = require('@wordle/auth-middleware');
const word = require('../models/word');

const router = express.Router();

router.get('/init', async (req, res, next) => {
  try {
    const date = new Date();
    date.setDate(date.getUTCDate());
    dateFilter = new Date(date.setHours(0, 0, 0, 0));

    const [todaysWord, [{ values: dictionary }]] = await Promise.all([
      word
        .findOne({}, { _id: 0, value: 1, description: 1 })
        .sort({ pickDate: -1 }),
      word.aggregate([
        {
          $group: {
            _id: null,
            values: {
              $push: '$value',
            },
          },
        },
      ]),
    ]);

    res.json({
      todaysWord,
      dictionary,
    });
  } catch (error) {
    res.status(418).send(error);
  }
});

router.post('/finish', authenticateToken, async (req, res, next) => {
  const { value: wordValue, tries } = req.body;
  const updateKey = `statistics.${tries}`;
  const updatedWord = await word.findOneAndUpdate(
    { value: wordValue },
    {
      $inc: {
        [updateKey]: 1,
      },
    },
    { returnDocument: 'after' },
  );
  res.send(updatedWord.statistics);
});

module.exports = router;
