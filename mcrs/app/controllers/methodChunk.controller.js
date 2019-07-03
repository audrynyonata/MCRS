const MethodChunk = require('../models/methodChunk.model.js')
const slugify = require('slugify')

exports.create = (req, res) => {
  const methodChunk = new MethodChunk({
    id: slugify(req.body.name, { replacement: '-', remove: /[*+~.()'"!:@]/g, lower: true }),
    name: req.body.name,
    description: req.body.description,
    provider: req.body.provider,
    url: req.body.url,
    characteristics: req.body.characteristics
  })

  methodChunk.save()
    .then(result => {
      res.send(result)
    }).catch(err => {
      console.log("Create MC", err)
      res.status(400).send({
        message: err.message || "Some error occurred while saving."
      })
    })
}

exports.findAll = (req, res) => {
  MethodChunk.find()
    .then(result => {
      res.send(result)
    }).catch(err => {
      console.log("Find all MC", err)
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving."
      })
    })
}

exports.findOne = (req, res) => {
  MethodChunk.findOne({ id: req.params.id.toLowerCase() })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Method Chunk ${req.params.id} not found.`
        })
      }
      res.send(result)
    }).catch(err => {
      console.log("Find one MC", err)
      return res.status(400).send({
        message: err.message || "Some error occurred while retrieving."
      })
    })
}

exports.update = (req, res) => {
  let doc = {}
  if (req.body.provider) {
    doc.provider = req.body.provider
  }
  if (req.body.url) {
    doc.url = req.body.url
  }
  if (req.body.description) {
    doc.description = req.body.description
  }
  if (req.body.characteristics) {
    doc.characteristics = req.body.characteristics
  }

  MethodChunk.findOneAndUpdate({ id: req.params.id.toLowerCase() }, doc, { new: true })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Method Chunk ${req.params.id} not found.`
        })
      }
      res.send(result)
    }).catch(err => {
      console.log("Update MC", err)
      return res.status(400).send({
        message: err.message || "Some error occurred while updating."
      })
    })
}

exports.softDelete = (req, res) => {
  MethodChunk.findOneAndUpdate({ id: req.params.id.toLowerCase() }, {
    is_deleted: true
  }, { new: true })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Method Chunk ${req.params.id} not found.`
        })
      }
      res.send(result)
    }).catch(err => {
      console.log("Soft delete MC", err)
      return res.status(400).send({
        message: err.message || "Colud not perform delete."
      })
    })

}

exports.hardDelete = (req, res) => {
  MethodChunk.findOneAndRemove({ id: req.params.id.toLowerCase() })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Method Chunk ${req.params.id} not found.`
        })
      }
      res.send({ message: "Deleted successfully." })
    }).catch(err => {
      console.log("Hard delete MC", err)
      return res.status(400).send({
        message: err.message || "Colud not perform delete."
      })
    })
}