const mongoose = require('mongoose');

const CharacteristicValueSchema = mongoose.Schema({
  values: [String],
  type: String
})

const CharacteristicSchema = mongoose.Schema({
  characteristic: {
    type: String,
    unique: true
  },
  characteristic_values: [CharacteristicValueSchema],
  domain: String,
  is_deleted: {
    type: Boolean, 
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Characteristic', CharacteristicSchema);