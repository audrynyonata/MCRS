const express = require('express');
const router = express.Router();
const methodChunks = require('../controllers/methodChunk.controller.js');

// Create a new Method Chunk
router.post('/', methodChunks.create);

// Retrieve all Method Chunk
router.get('/', methodChunks.findAll);

// // Retrieve a single Method Chunk with methodChunkId
// router.get('/:methodChunkId', methodChunks.findOne);

// // Update a Method Chunk with methodChunkId
// router.put('/:methodChunkId', methodChunks.update);

// // Delete a Method Chunk with methodChunkId
// router.delete('/:methodChunkId', methodChunks.delete);

module.exports = router;