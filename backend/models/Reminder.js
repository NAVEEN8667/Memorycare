const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Reminder", reminderSchema);
