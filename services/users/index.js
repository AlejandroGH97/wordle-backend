const cors = require('cors');
const express = require('express');
const { router } = require('./routes');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'PROD';
const app = express();

mongoose
  .connect(
    env == 'PROD'
      ? process.env.MONGO_CONNECTION_STRING
      : process.env.MONGO_TEST,
    { useNewUrlParser: true },
  )
  .then(() => {
    app.use(cors());
    app.use(express.json());
    app.use(router);
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  });

module.exports = app;
