const Characteristic = require("../models/characteristic.model.js");
const slugify = require("slugify");

exports.create = (req, res) => {
  if (req.body.length) {
    req.body.forEach(
      e =>
        (e.id = slugify(e.name, {
          replacement: "-",
          remove: /[*+~.()'"!:@]/g,
          lower: true
        }))
    );
    Characteristic.insertMany(req.body)
      .then(result => res.send(result))
      .catch(err => {
        console.log("Create bulk characteristic", err);
        res.status(400).send({
          message: err.message || "Some error occurred while saving."
        });
      });
  } else {
    const characteristic = new Characteristic({
      id: slugify(req.body.name, {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        lower: true
      }),
      name: req.body.name,
      dimension: req.body.dimension,
      description: req.body.description,
      characteristic_values: req.body.characteristic_values
    });

    characteristic
      .save()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log("Create characteristic", err);
        res.status(400).send({
          message: err.message || "Some error occurred while saving."
        });
      });
  }
};

exports.findAll = (req, res) => {
  var criteria = {};
  if (req.query.name) {
    criteria.name = {
      $regex: new RegExp(req.query.name, "g"),
      $options: "i"
    };
  }
  if (req.query.description) {
    criteria.description = {
      $regex: new RegExp(req.query.description, "g"),
      $options: "i"
    };
  }
  if (req.query.dimension) {
    criteria.dimension = {
      $regex: new RegExp(req.query.dimension, "g"),
      $options: "i"
    };
  }
  if (req.query.characteristics_type) {
    criteria["characteristic_values.type"] = {
      $regex: new RegExp(req.query.characteristics_type, "g"),
      $options: "i"
    };
  }
  if (req.query.characteristics_value) {
    criteria["characteristic_values.values"] = {
      $regex: new RegExp(req.query.characteristics_value, "g"),
      $options: "i"
    };
  }
  Characteristic.find(criteria)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log("Find all characteristic", err);
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving."
      });
    });
};

exports.findOne = (req, res) => {
  Characteristic.findOne({ id: req.params.id.toLowerCase() })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Characteristic ${req.params.id} not found.`
        });
      }
      res.send(result);
    })
    .catch(err => {
      console.log("Find one characteristic", err);
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving."
      });
    });
};

exports.update = (req, res) => {
  let doc = {};
  if (req.body.dimension) {
    doc.dimension = req.body.dimension;
  }
  if (req.body.description) {
    doc.description = req.body.description;
  }
  if (req.body.characteristic_values) {
    doc.characteristic_values = req.body.characteristic_values;
  }
  Characteristic.findOneAndUpdate({ id: req.params.id.toLowerCase() }, doc, {
    new: true
  })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Characteristic ${req.params.id} not found.`
        });
      }
      res.send(result);
    })
    .catch(err => {
      console.log("Update characteristic", err);
      res.status(400).send({
        message: err.message || "Some error occurred while updating."
      });
    });
};

exports.delete = (req, res) => {
  Characteristic.findOneAndRemove({ id: req.params.id.toLowerCase() })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Characteristic ${req.params.id} not found.`
        });
      }
      res.send({ message: "Deleted successfully." });
    })
    .catch(err => {
      console.log("Hard delete characteristic", err);
      res.status(400).send({
        message: err.message || "Could not perform delete."
      });
    });
};
