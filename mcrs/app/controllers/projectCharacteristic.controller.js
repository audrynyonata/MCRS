const ProjectCharacteristic = require('../models/projectCharacteristic.model.js');

exports.create = (req, res) => {
    if(!req.body.characteristic || !req.body.values_group.length || !req.body.dimension) {
        return res.status(400).send({
            message: "Method Chunk content can not be empty"
        });
    }
  
    const characteristic = new ProjectCharacteristic({
        characteristic: req.body.characteristic || "Untitled Characteristic",
        values_group: [{source: "tes", values: ["low", "med", "high"]}],//
        dimension: req.body.dimension,
        description: req.body.description
    });

    characteristic.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while saving."
        });
    });
};

exports.findAll = (req, res) => {
    ProjectCharacteristic.find()
    .then(characteristic => {
        res.send(characteristic);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving."
        });
    });
};

// exports.findOne = (req, res) => {
//     MethodChunk.findById(req.params.methodChunkId)
//     .then(methodChunk => {
//         if(!methodChunk) {
//             return res.status(404).send({
//                 message: "not found with id " + req.params.methodChunkId
//             });            
//         }
//         res.send(methodChunk);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "not found with id " + req.params.methodChunkId
//             });                
//         }
//         return res.status(500).send({
//             message: "Error retrieving with id " + req.params.methodChunkId
//         });
//     });
// };

// exports.update = (req, res) => {
//     // Validate Request
//     if(!req.body.content) {
//         return res.status(400).send({
//             message: "Method Chunk content can not be empty"
//         });
//     }

//     // Find methodChunk and update it with the request body
//     MethodChunk.findByIdAndUpdate(req.params.methodChunkId, {
//         title: req.body.title || "Untitled Method Chunk",
//         content: req.body.content
//     }, {new: true})
//     .then(methodChunk => {
//         if(!methodChunk) {
//             return res.status(404).send({
//                 message: "not found with id " + req.params.methodChunkId
//             });
//         }
//         res.send(methodChunk);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "not found with id " + req.params.methodChunkId
//             });                
//         }
//         return res.status(500).send({
//             message: "Error updating with id " + req.params.methodChunkId
//         });
//     });
// };

// exports.delete = (req, res) => {
//     MethodChunk.findByIdAndRemove(req.params.methodChunkId)
//     .then(methodChunk => {
//         if(!methodChunk) {
//             return res.status(404).send({
//                 message: "not found with id " + req.params.methodChunkId
//             });
//         }
//         res.send({message: "Method Chunk deleted successfully!"});
//     }).catch(err => {
//         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
//             return res.status(404).send({
//                 message: "not found with id " + req.params.methodChunkId
//             });                
//         }
//         return res.status(500).send({
//             message: "Could not delete with id " + req.params.methodChunkId
//         });
//     });
// };