const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },
  description: {
    type: String,
    required: true,
    min: 5,
    max: 510,
  },
  timeOfEvent: {
    type: Date,
    required: true,
  },
  upcoming: {
    type: Boolean,
    required: true,
    default: true,
  },
  marked: {
    type: Boolean,
    required: true,
    default: false,
  },
  completed: {
    type: Boolean,
    required: true,
    default: true,
  },
  archived: {
    type: Boolean,
    required: true,
    default: false,
  },
  isImportant: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("event", eventSchema);
