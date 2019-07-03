const mongoose = require('mongoose');

const ProviderUrlSchema = mongoose.Schema({
  name: String,
  url: String
})

const ProviderContactSchema = mongoose.Schema({
  name: String,
  role: String,
  description: String,
  email: String,
  phone: String
})

const ProviderSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  password: String,
  name: String,
  description: String,
  industry: String,
  urls: [ProviderUrlSchema],
  contacts: [ProviderContactSchema],
  related_providers: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Provider', ProviderSchema);