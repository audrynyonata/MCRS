const Provider = require("../models/provider.model.js");
const slugify = require("slugify");
const config = require("../../config/config.json");
const jwt = require("jsonwebtoken");

exports.authenticate = (req, res) => {
  const provider = Provider.findOne({ email: req.body.email })
    .then(result => {
      if (!result) {
        return res.status(401).send({
          message: "Email and password doesn't match."
        });
      }
      result.comparePassword(req.body.password, function(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          const token = jwt.sign({ sub: provider.email }, config.secret);
          res.cookie("token", token);
          res.send({ token });
        } else {
          res.status(401).send({
            message: "Email and password doesn't match."
          });
        }
      });
    })
    .catch(err => {
      console.log("Authenticate", err);
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving."
      });
    });
};

exports.create = (req, res) => {
  const provider = new Provider({
    id: slugify(req.body.name, {
      replacement: "-",
      remove: /[*+~.()'"!:@]/g,
      lower: true
    }),
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    description: req.body.description,
    industry: req.body.industry || null,
    urls: req.body.urls,
    contacts: req.body.contacts,
    related_providers: req.body.related_providers
  });

  provider
    .save()
    .then(result => {
      const token = jwt.sign({ sub: provider.email }, config.secret);
      res.cookie("token", token);
      res.send({ result, token });
    })
    .catch(err => {
      console.log("Create provider", err);
      res.status(400).send({
        message: err.message || "Some error occurred while saving."
      });
    });
};

exports.findAll = (req, res) => {
  Provider.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log("Find all provider", err);
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving."
      });
    });
};

exports.findOne = (req, res) => {
  Provider.findOne({ id: req.params.id.toLowerCase() })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Provider ${req.params.id} not found.`
        });
      }
      res.send(result);
    })
    .catch(err => {
      console.log("Find one provider", err);
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving."
      });
    });
};

exports.update = (req, res) => {
  Provider.findOne({ id: req.params.id.toLowerCase() })
    .then(result => {
      if (req.body.description) {
        result.description = req.body.description;
      }
      if (req.body.industry) {
        result.industry = req.body.industry;
      }
      if (req.body.urls) {
        result.urls = req.body.urls;
      }
      if (req.body.contacts) {
        result.contacts = req.body.contacts;
      }
      if (req.body.related_providers) {
        result.related_providers = req.body.related_providers;
      }
      if (req.body.password) {
        result.password = req.body.password;
      }
      result.save((err, record) => {
        if (err) {
          console.log(err);
          res.status(400).send({
            message: err.message || "Some error occurred while updating."
          });
        } else {
          res.send(record);
        }
      });
    })
    .catch(err => {
      console.log("Update provider", err);
      res.status(400).send({
        message: err.message || "Some error occurred while updating."
      });
    });
};

exports.softDelete = (req, res) => {
  Provider.findOneAndUpdate(req.params.id.toLowerCase(), {
    is_deleted: true
  })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Provider ${req.params.id} not found.`
        });
      }
      res.send(result);
    })
    .catch(err => {
      console.log("Soft delete provider", err);
      res.status(400).send({
        message: err.message || "Could not perform delete."
      });
    });
};

exports.hardDelete = (req, res) => {
  Provider.findOneAndRemove(req.params.id.toLowerCase())
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Provider ${req.params.id} not found.`
        });
      }
      res.send({ message: "Deleted successfully." });
    })
    .catch(err => {
      console.log("Hard delete provider", err);
      res.status(400).send({
        message: err.message || "Could not perform delete."
      });
    });
};
