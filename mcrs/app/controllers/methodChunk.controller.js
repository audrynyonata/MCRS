const MethodChunk = require("../models/methodChunk.model.js");
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
    MethodChunk.insertMany(req.body)
      .then(result => res.send(result))
      .catch(err => {
        console.log("Create bulk method chunk", err);
        res.status(400).send({
          message: err.message || "Some error occurred while saving."
        });
      });
  } else {
    const methodChunk = new MethodChunk({
      id: slugify(req.body.name, {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        lower: true
      }),
      name: req.body.name,
      description: req.body.description,
      provider: req.body.provider,
      url: req.body.url,
      characteristics: req.body.characteristics
    });

    methodChunk
      .save()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log("Create MC", err);
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
  if (req.query.provider) {
    criteria.provider = {
      $regex: new RegExp(req.query.provider, "g"),
      $options: "i"
    };
  }
  if (req.query.characteristics_name) {
    criteria["characteristics.name"] = {
      $regex: new RegExp(req.query.characteristics_name, "g"),
      $options: "i"
    };
  }
  if (req.query.characteristics_value) {
    criteria["characteristics.value"] = {
      $regex: new RegExp(req.query.characteristics_value, "g"),
      $options: "i"
    };
  }
  if (req.query.characteristics_type) {
    criteria["characteristics.type"] = {
      $regex: new RegExp(req.query.characteristics_type, "g"),
      $options: "i"
    };
  }
  MethodChunk.find(criteria)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log("Find all MC", err);
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving."
      });
    });
};

exports.findOne = (req, res) => {
  MethodChunk.findOne({ id: req.params.id.toLowerCase() })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Method Chunk ${req.params.id} not found.`
        });
      }
      res.send(result);
    })
    .catch(err => {
      console.log("Find one MC", err);
      return res.status(400).send({
        message: err.message || "Some error occurred while retrieving."
      });
    });
};

exports.update = (req, res) => {
  let doc = {};
  if (req.body.provider) {
    doc.provider = req.body.provider;
  }
  if (req.body.url) {
    doc.url = req.body.url;
  }
  if (req.body.description) {
    doc.description = req.body.description;
  }
  if (req.body.characteristics) {
    doc.characteristics = req.body.characteristics;
  }

  MethodChunk.findOneAndUpdate({ id: req.params.id.toLowerCase() }, doc, {
    new: true
  })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Method Chunk ${req.params.id} not found.`
        });
      }
      res.send(result);
    })
    .catch(err => {
      console.log("Update MC", err);
      return res.status(400).send({
        message: err.message || "Some error occurred while updating."
      });
    });
};

exports.delete = (req, res) => {
  MethodChunk.findOneAndRemove({ id: req.params.id.toLowerCase() })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Method Chunk ${req.params.id} not found.`
        });
      }
      res.send({ message: "Deleted successfully." });
    })
    .catch(err => {
      console.log("Hard delete MC", err);
      return res.status(400).send({
        message: err.message || "Colud not perform delete."
      });
    });
};
