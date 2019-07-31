const mongoose = require("mongoose");
const TYPES = require("../types.js");

const ProjectCharacteristicSchema = mongoose.Schema({
  id: {
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
    enum: TYPES.map(e => e.name.toLowerCase()),
    required: true,
    lowercase: true
  },
  weight: {
    type: Number
  }
});

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
    characteristics: [ProjectCharacteristicSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Project", ProjectSchema);
