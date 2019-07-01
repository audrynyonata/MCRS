const mongoose = require('mongoose');

const ProjectCharacteristicSchema = mongoose.Schema({
  characteristic: String,
  values_group: [{source: String, values: [String]}],
  dimension: String,
  description: String,
  is_deleted: {type: Boolean, default: false}
}, {
  timestamps: true
});

module.exports = mongoose.model('ProjectCharacteristic', ProjectCharacteristicSchema);