
const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  query: {
    type: String,
    required: true,
  },
  parsedQuery: {
    type: Object,
    required: true,
  },
  selectedOption: {
    type: Object,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('History', HistorySchema);
