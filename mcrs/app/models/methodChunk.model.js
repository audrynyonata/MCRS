const mongoose = require('mongoose')

const MethodChunkCharacteristicSchema = mongoose.Schema({
  characteristic: String,
  value: String,
  type: String
})

const MethodChunkSchema = mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true
    },
    name: String,
    description: String,
    provider_name: String,
    url: String,
    characteristics: [MethodChunkCharacteristicSchema],
    is_deleted: {
      type: Boolean,
      default: false
    }
  }, {
    timestamps: true
  }
)

module.exports = mongoose.model('MethodChunk', MethodChunkSchema)