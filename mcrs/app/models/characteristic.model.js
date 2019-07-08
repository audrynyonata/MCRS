const mongoose = require("mongoose");
const TYPES = require("../types.js");
const DIMENSIONS = require("../dimensions.js");

const noEmptyArray = v => v.length && !v.includes("");

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
    enum: TYPES.map(e => e.name.toLowerCase()),
    lowercase: true,
    required: true
  }
});

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
      enum: DIMENSIONS.map(e => e.name.toLowerCase()),
      required: true,
      lowercase: true
    },
    description: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Characteristic", CharacteristicSchema);
