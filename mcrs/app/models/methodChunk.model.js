const mongoose = require('mongoose');

const MethodChunkSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('MethodChunk', MethodChunkSchema);