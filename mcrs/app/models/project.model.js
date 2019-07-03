const mongoose = require('mongoose')

const ProjectCharacteristicSchema = mongoose.Schema({
  characteristic: {
    type: String,
    required: true,
    lowercase: true
  },
  optimal_sense: {
    type: String,
    required: true,
    lowercase: true
  },
  type: {
    type: String,
    enum: ['nominal', 'ordinal', 'numerical'],
    required: true,
    lowercase: true
  }
})

const ProjectSchema = mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },
    name: {
      type: String,
      required: true
    },
    description: String,
    provider: {
      type: String,
      required: true,
      lowercase: true
    },
    project: {
      type: String,
      required: true,
      lowercase: true
    },
    characteristics: [ProjectCharacteristicSchema],
    is_deleted: {
      type: Boolean,
      default: false,
      required: true
    }
  }, {
    timestamps: true
  }
)

module.exports = mongoose.model('Project', ProjectSchema)