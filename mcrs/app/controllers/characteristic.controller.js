const Characteristic = require('../models/characteristic.model.js')
const slugify = require('slugify')

exports.create = (req, res) => {
  const characteristic = new Characteristic({
    id: slugify(req.body.name, { replacement: '-', remove: /[*+~.()'"!:@]/g, lower: true }),
    name: req.body.name,
    dimension: req.body.dimension,
    description: req.body.description,
    characteristic_values: req.body.characteristic_values
  })

  characteristic.save()
    .then(result => {
      res.send(result)
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while saving."
      })
    })
}

exports.findAll = (req, res) => {
  Characteristic.find()
    .then(result => {
      res.send(result)
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving."
      })
    })
}

exports.findOne = (req, res) => {
  Characteristic.findOne({ id: req.params.id.toLowerCase() })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Characteristic ${req.params.id} not found.`
        })
      }
      res.send(result)
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving."
      })
    })
}

exports.update = (req, res) => {
  let doc = {}
  if (req.body.dimension) {
    doc.dimension = req.body.dimension
  }
  if (req.body.description) {
    doc.description = req.body.description
  }
  if (req.body.characteristic_values) {
    doc.characteristic_values = req.body.characteristic_values
  }
  Characteristic.findOneAndUpdate({ id: req.params.id.toLowerCase() }, doc, { new: true })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Characteristic ${req.params.id} not found.`
        })
      }
      res.send(result)
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while updating."
      })
    })
}

exports.softDelete = (req, res) => {
  Characteristic.findOneAndUpdate(req.params.id.toLowerCase(), {
    is_deleted: true
  })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Characteristic ${req.params.id} not found.`
        })
      }
      res.send(result)
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Could not perform delete."
      })
    })
}

exports.hardDelete = (req, res) => {
  Characteristic.findOneAndRemove(req.params.id.toLowerCase())
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Characteristic ${req.params.id} not found.`
        })
      }
      res.send({ message: "Deleted successfully." })
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Could not perform delete."
      })
    })
}