const mongoose = require('mongoose');
const vinylRecordSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
    },
    genre: {
      type: String,
    },
    condition: {
      type: String,
    },
  });
  const VinylRecord = mongoose.model('VinylRecord', vinylRecordSchema);
  module.exports = VinylRecord;