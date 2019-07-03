const mongoose = require('mongoose');

const ProjectCharacteristicSchema = mongoose.Schema({
  characteristic: String,
  optimal_sense: String,
  type: String
})

const ProjectSchema = mongoose.Schema({
  name: String,
  description: String,
  provider_id: String,
  characteristics: [ProjectCharacteristicSchema],
  is_deleted: {
    type: Boolean, 
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', ProjectSchema);