const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  email: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  password: {
    type: String,
    min: 3,
    max: 4096,
    required: true,
  },
  isGold: {
    type: Boolean,
    default: false,
    required: true,
  },
  remainingQuota: {
    type: Number,
    min: 0,
    max: 100,
    default: 50,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  resetQuotaTime: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
