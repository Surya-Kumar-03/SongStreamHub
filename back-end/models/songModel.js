const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  artist: {
    type: String,
  },
  mediaUrl: {
    type: String,
  },
  album: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  duration: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  clicks: {
    type: Number,
  },
  likes: {
    type: Number,
  },
  genre: {
    type: String,
  },
});

module.exports = mongoose.model("Song", songSchema);
