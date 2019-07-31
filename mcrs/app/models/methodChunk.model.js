const mongoose = require("mongoose");
const TYPES = require("../types.js");

const MethodChunkCharacteristicSchema = mongoose.Schema({
  id: {
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
    enum: TYPES.map(e => e.name.toLowerCase()),
    required: true,
    lowercase: true
  }
});

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
      lowercase: true
    },
    url: {
      type: String,
      required: true
    },
    characteristics: [MethodChunkCharacteristicSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("MethodChunk", MethodChunkSchema);
