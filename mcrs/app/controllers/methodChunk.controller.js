const MethodChunk = require('../models/methodChunk.model.js');

// Create and Save a new Method Chunk
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Method Chunk content can not be empty"
        });
    }

    // Create a Method Chunk
    const methodChunk = new MethodChunk({
        title: req.body.title || "Untitled Method Chunk", 
        content: req.body.content
    });

    // Save Method Chunk in the database
    methodChunk.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Method Chunk."
        });
    });
};

// Retrieve and return all Method Chunks from the database.
exports.findAll = (req, res) => {
    MethodChunk.find()
    .then(methodChunks => {
        res.send(methodChunks);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving method chunks."
        });
    });
};

// Find a single Method Chunk with a methodChunkId
exports.findOne = (req, res) => {
    MethodChunk.findById(req.params.methodChunkId)
    .then(methodChunk => {
        if(!methodChunk) {
            return res.status(404).send({
                message: "Method Chunk not found with id " + req.params.methodChunkId
            });            
        }
        res.send(methodChunk);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Method Chunk not found with id " + req.params.methodChunkId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Method Chunk with id " + req.params.methodChunkId
        });
    });
};

// Update a methodChunk identified by the methodChunkId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Method Chunk content can not be empty"
        });
    }

    // Find methodChunk and update it with the request body
    MethodChunk.findByIdAndUpdate(req.params.methodChunkId, {
        title: req.body.title || "Untitled Method Chunk",
        content: req.body.content
    }, {new: true})
    .then(methodChunk => {
        if(!methodChunk) {
            return res.status(404).send({
                message: "Method Chunk not found with id " + req.params.methodChunkId
            });
        }
        res.send(methodChunk);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Method Chunk not found with id " + req.params.methodChunkId
            });                
        }
        return res.status(500).send({
            message: "Error updating Method Chunk with id " + req.params.methodChunkId
        });
    });
};

// Delete a methodChunk with the specified methodChunkId in the request
exports.delete = (req, res) => {
    MethodChunk.findByIdAndRemove(req.params.methodChunkId)
    .then(methodChunk => {
        if(!methodChunk) {
            return res.status(404).send({
                message: "Method Chunk not found with id " + req.params.methodChunkId
            });
        }
        res.send({message: "Method Chunk deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Method Chunk not found with id " + req.params.methodChunkId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Method Chunk with id " + req.params.methodChunkId
        });
    });
};