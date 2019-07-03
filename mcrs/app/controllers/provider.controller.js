const Provider = require('../models/provider.model.js')
const slugify = require('slugify')

exports.create = (req, res) => {
  const provider = new Provider({
    id: slugify(req.body.name, { replacement: '-', remove: /[*+~.()'"!:@]/g, lower: true }),
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    description: req.body.description,
    industry: req.body.industry,
    urls: req.body.urls,
    contacts: req.body.contacts,
    related_providers: req.body.related_providers
  })

  provider.save()
    .then(result => {
      res.send(result)
    }).catch(err => {
      console.log("Create provider", err)
      res.status(400).send({
        message: err.message || "Some error occurred while saving."
      })
    })
}

exports.findAll = (req, res) => {
  Provider.find()
    .then(result => {
      res.send(result)
    }).catch(err => {
      console.log("Find all provider", err)
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving."
      })
    })
}

exports.findOne = (req, res) => {
  Provider.findOne({ id: req.params.id.toLowerCase() })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Provider ${req.params.id} not found.`
        })
      }
      res.send(result)
    }).catch(err => {
      console.log("Find one provider", err)
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving."
      })
    })
}

exports.update = (req, res) => {
  Provider.findOne({ id: req.params.id.toLowerCase() })
    .then(result => {
      if (req.body.description) {
        result.description = req.body.description
      }
      if (req.body.industry) {
        result.industry = req.body.industry
      }
      if (req.body.urls) {
        result.urls = req.body.urls
      }
      if (req.body.contacts) {
        result.contacts = req.body.contacts
      }
      if (req.body.related_providers) {
        result.related_providers = req.body.related_providers
      }
      if (req.body.password) {
        result.password = req.body.password
      }
      result.save((err, record) => {
        if (err) {
          console.log(err)
          res.status(400).send({
            message: err.message || "Some error occurred while updating."
          })
        } else {
          res.send(record)
        }
      })
    }).catch(err => {
      console.log("Update provider", err)
      res.status(400).send({
        message: err.message || "Some error occurred while updating."
      })
    })
}

exports.softDelete = (req, res) => {
  Provider.findOneAndUpdate(req.params.id.toLowerCase(), {
    is_deleted: true
  })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Provider ${req.params.id} not found.`
        })
      }
      res.send(result)
    }).catch(err => {
      console.log("Soft delete provider", err)
      res.status(400).send({
        message: err.message || "Could not perform delete."
      })
    })
}

exports.hardDelete = (req, res) => {
  Provider.findOneAndRemove(req.params.id.toLowerCase())
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Provider ${req.params.id} not found.`
        })
      }
      res.send({ message: "Deleted successfully." })
    }).catch(err => {
      console.log("Hard delete provider", err)
      res.status(400).send({
        message: err.message || "Could not perform delete."
      })
    })
}