const mongoose = require('mongoose')

const MethodChunkCharacteristicSchema = mongoose.Schema({
  characteristic: {
    type: String,
    required: true,
    lowercase: true
  },
  value: {
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

const MethodChunkSchema = mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },
    name: {
      type: String,
      unique: true,
      required: true
    },
    description: String,
    provider: {
      type: String,
      required: true,
      lowercase: true,
    },
    url: {
      type: String,
      required: true,
      lowercase: true
    },
    characteristics: [MethodChunkCharacteristicSchema],
    is_deleted: {
      type: Boolean,
      default: false,
      required: true
    }
  }, {
    timestamps: true
  }
)

module.exports = mongoose.model('MethodChunk', MethodChunkSchema)