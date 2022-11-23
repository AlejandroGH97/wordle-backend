const cors = require('cors');
const express = require('express');
const { router } = require('./routes');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true })
  .then(() => {
    const app = express();
    app.use(cors());
    app.use(express.json())
    app.use(router);
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  });
