module.exports = (app) => {
    const methodChunks = require('../controllers/methodChunk.controller.js');

    // Create a new Method Chunk
    app.post('/method-chunks', methodChunks.create);

    // Retrieve all Method Chunk
    app.get('/method-chunks', methodChunks.findAll);

    // Retrieve a single Method Chunk with methodChunkId
    app.get('/method-chunks/:methodChunkId', methodChunks.findOne);

    // Update a Method Chunk with methodChunkId
    app.put('/method-chunks/:methodChunkId', methodChunks.update);

    // Delete a Method Chunk with methodChunkId
    app.delete('/method-chunks/:methodChunkId', methodChunks.delete);
}