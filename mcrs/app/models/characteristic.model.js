const mongoose = require('mongoose')

const noEmptyArray = v => v.length && !v.includes("")

const CharacteristicValueSchema = mongoose.Schema({
  values: {
    type: [String],
    validate: {
      validator: noEmptyArray,
      message: "Array must have at least 1 element"
    },
    lowercase: true
  },
  type: {
    type: String,
    enum: ['nominal', 'ordinal', 'numerical'],
    lowercase: true,
    required: true
  }
})

const CharacteristicSchema = mongoose.Schema(
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
    characteristic_values: {
      type: [CharacteristicValueSchema],
      validate: {
        validator: noEmptyArray,
        message: "Array must have at least 1 element"
      }
    },
    dimension: {
      type: String,
      required: true,
      lowercase: true
    },
    description: String,
    is_deleted: {
      type: Boolean,
      default: false,
      required: true
    }
  }, {
    timestamps: true
  }
)

module.exports = mongoose.model('Characteristic', CharacteristicSchema)