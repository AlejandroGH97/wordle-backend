const express = require('express');
const word = require('../models/word');

const router = express.Router();

router.get('/init', async (req, res, next) => {
  try {
    const date = new Date();
    date.setDate(date.getUTCDate());
    dateFilter = new Date(date.setHours(0, 0, 0, 0));

    const [{ value: todaysWord }, [{ values: dictionary }]] = await Promise.all(
      [
        word.findOne({}, { _id: 0, value: 1 }).sort({ pickDate: -1 }),
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
      ]
    );

    res.json({
      todaysWord,
      dictionary,
    });
  } catch (error) {
    res.status(418).send(error);
  }
});

module.exports = router;
