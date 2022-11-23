const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  statistics: {
    1: { type: Number, required: true, default: 0 },
    2: { type: Number, required: true, default: 0 },
    3: { type: Number, required: true, default: 0 },
    4: { type: Number, required: true, default: 0 },
    5: { type: Number, required: true, default: 0 },
    6: { type: Number, required: true, default: 0 },
    fail: { type: Number, required: true, default: 0 },
  },
  pickDate: { type: Date },
});

module.exports = mongoose.model('User', userSchema);
