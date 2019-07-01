const mongoose = require('mongoose');

const MethodChunkSchema = mongoose.Schema({
  name: String,
  description: String,
  characteristics: [{characteristic: String, value: String}],
  provider: String,
  source: String
}, {
  timestamps: true
});

module.exports = mongoose.model('MethodChunk', MethodChunkSchema);