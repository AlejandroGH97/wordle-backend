const mongoose = require('mongoose');
const { Schema } = mongoose;

const wordSchema = new Schema({
  value: { type: String, required: true },
  description: { type: String, required: true },
  statistics: {
    1: { type: Number, required: true },
    2: { type: Number, required: true },
    3: { type: Number, required: true },
    4: { type: Number, required: true },
    5: { type: Number, required: true },
    6: { type: Number, required: true },
    fail: { type: Number, required: true },
  },
  pickDate: { type: Date },
});

module.exports = mongoose.model('Word', wordSchema);
