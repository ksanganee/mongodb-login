const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  progress: {
    1: [Number],
    2: [Number],
    3: [Number],
    4: [Number],
    5: [Number],
    6: [Number],
  },
}, {
  timestamps: true
});

const User = mongoose.model("User", UserSchema)

module.exports = User;
