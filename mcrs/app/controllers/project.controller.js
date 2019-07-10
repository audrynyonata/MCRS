const Project = require("../models/project.model.js");
const slugify = require("slugify");

exports.create = (req, res) => {
  if (req.body.length) {
    req.body.forEach(e => {
      e.id =
        slugify(`${e.provider}`, {
          replacement: "-",
          remove: /[*+~.()'"!:@]/g,
          lower: true
        }) +
        "/" +
        slugify(`${e.name}`, {
          replacement: "-",
          remove: /[*+~.()'"!:@]/g,
          lower: true
        });

      e.project = slugify(`${e.name}`, {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        lower: true
      });
      e.provider = slugify(`${e.provider}`, {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        lower: true
      });
    });
    Project.insertMany(req.body)
      .then(result => res.send(result))
      .catch(err => {
        console.log("Create bulk project", err);
        res.status(400).send({
          message: err.message || "Some error occurred while saving."
        });
      });
  } else {
    const project = new Project({
      id:
        slugify(`${req.body.provider}`, {
          replacement: "-",
          remove: /[*+~.()'"!:@]/g,
          lower: true
        }) +
        "/" +
        slugify(`${req.body.name}`, {
          replacement: "-",
          remove: /[*+~.()'"!:@]/g,
          lower: true
        }),
      name: req.body.name,
      project: slugify(`${req.body.name}`, {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        lower: true
      }),
      provider: slugify(`${req.body.provider}`, {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        lower: true
      }),
      description: req.body.description,
      characteristics: req.body.characteristics
    });

    project
      .save()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log("Create project", err);
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
  if (req.query.project) {
    criteria.project = {
      $regex: new RegExp(req.query.project, "g"),
      $options: "i"
    };
  }
  if (req.query.characteristics_name) {
    criteria["characteristics.name"] = {
      $regex: new RegExp(req.query.characteristics_name, "g"),
      $options: "i"
    };
  }
  if (req.query.characteristics_optimal_sense) {
    criteria["characteristics.optimal_sense"] = {
      $regex: new RegExp(req.query.characteristics_optimal_sense, "g"),
      $options: "i"
    };
  }
  if (req.query.characteristics_type) {
    criteria["characteristics.type"] = {
      $regex: new RegExp(req.query.characteristics_type, "g"),
      $options: "i"
    };
  }
  var sort = {};
  if (req.query.sort) {
    switch (req.query.order) {
      case "desc":
      case "DESC":
      case "dsc":
      case "DSC":
        sort[req.query.sort] = -1;
        break;
      default:
        sort[req.query.sort] = 1;
        break;
    }
  }
  Project.find(criteria)
    .sort(sort)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log("Find all project", err);
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving."
      });
    });
};

exports.findOne = (req, res) => {
  Project.findOne({
    provider: req.params.provider_id.toLowerCase(),
    project: req.params.project_id.toLowerCase()
  })
    .then(result => {
      console.log("a", req.params.provider_id, req.params.project_id);
      if (!result) {
        return res.status(404).send({
          message: `Project ${req.params.provider_id}/${
            req.params.project_id
          } not found.`
        });
      }
      res.send(result);
    })
    .catch(err => {
      console.log("Find one project", err);
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving."
      });
    });
};

exports.update = (req, res) => {
  let doc = {};
  if (req.body.description) {
    doc.description = req.body.description;
  }
  if (req.body.characteristics) {
    doc.characteristics = req.body.characteristics;
  }
  Project.findOneAndUpdate(
    {
      provider: req.params.provider_id.toLowerCase(),
      project: req.params.project_id.toLowerCase()
    },
    doc,
    { new: true }
  )
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Project ${req.params.provider_id}/${
            req.params.project_id
          } not found.`
        });
      }
      res.send(result);
    })
    .catch(err => {
      console.log("Update project", err);
      res.status(400).send({
        message: err.message || "Some error occurred while updating."
      });
    });
};

exports.delete = (req, res) => {
  Project.findOneAndRemove({
    provider: req.params.provider_id.toLowerCase(),
    project: req.params.project_id.toLowerCase()
  })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Project ${req.params.provider_id}/${
            req.params.project_id
          } not found.`
        });
      }
      res.send({ message: "Deleted successfully." });
    })
    .catch(err => {
      console.log("Soft delete project", err);
      res.status(400).send({
        message: err.message || "Could not perform delete."
      });
    });
};
