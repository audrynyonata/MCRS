const Project = require('../models/project.model.js')
const slugify = require('slugify')

exports.create = (req, res) => {
  const project = new Project({
    id: slugify(`${req.body.provider_id}/${req.body.project}`, { replacement: '-', remove: /[*+~.()'"!:@]/g, lower: true }),
    project: req.body.project,
    project_id: slugify(`${req.body.project}`, { replacement: '-', remove: /[*+~.()'"!:@]/g, lower: true }),
    provider_id: req.body.provider_id,
    description: req.body.description,
    characteristics: req.body.characteristics
  })

  project.save()
    .then(result => {
      res.send(result)
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while saving."
      })
    })
}

exports.findAll = (req, res) => {
  Project.find()
    .then(result => {
      res.send(result)
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving."
      })
    })
}

exports.findOne = (req, res) => {
  Project.findOne({ provider_id: req.params.provider_id.toLowerCase(), project_id: req.params.project_id.toLowerCase() })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Project ${req.params.provider_id}/${req.params.project_id} not found.`
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
  if (req.body.description) {
    doc.description = req.body.description
  }
  if (req.body.characteristics) {
    doc.characteristics = req.body.characteristics
  }
  Project.findOneAndUpdate({ provider_id: req.params.provider_id.toLowerCase(), project_id: req.params.project_id.toLowerCase() }, doc, { new: true })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Project ${req.params.provider_id}/${req.params.project_id} not found.`
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
  Project.findOneAndUpdate({ provider_id: req.params.provider_id.toLowerCase(), project_id: req.params.project_id.toLowerCase() }, {
    is_deleted: true
  })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Project ${req.params.provider_id}/${req.params.project_id} not found.`
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
  Project.findOneAndRemove({ provider_id: req.params.provider_id.toLowerCase(), project_id: req.params.project_id.toLowerCase() })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Project ${req.params.provider_id}/${req.params.project_id} not found.`
        })
      }
      res.send({ message: "Deleted successfully." })
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Could not perform delete."
      })
    })
}