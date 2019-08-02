const provider = require("../controllers/provider.controller.js");
const methodChunk = require("../controllers/methodChunk.controller.js");
const MethodChunk = require("../models/methodChunk.model.js");

const DIMENSIONS = require("../dimensions.js");
const INDUSTRIES = require("../industries.js");

const path = require("path");
const axios = require("axios");
const express = require("express");
const router = express.Router();

router.get("/test/method-chunks", (req, res) => {
  const { METHOD_CHUNKS } = require("../../seed/methodChunk.seed");
  res.send(METHOD_CHUNKS);
});

/**
 * @swagger
 * /:
 *   get:
 *     description: Check if connected successfully
 *     tags:
 *       - Basic Functionality
 *     responses:
 *       200:
 *         description: Return welcome message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Welcome to MCRS."
 *
 */
router.get("/", (req, res) => {
  res.json({ message: "Welcome to MCRS." });
});

/**
 * @swagger
 * /authenticate:
 *   post:
 *     description: Get authorization token
 *     tags:
 *       - Basic Functionality
 *     requestBody:
 *       description: Provider account credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: valid, registered email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: password
 *           examples:
 *             default:
 *               value:
 *                 email: "company@a.com"
 *                 password: "password"
 *     responses:
 *       200:
 *         description: Return auth token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjb21wYW55QGEuY29tIiwiaWF0IjoxNTYyNjAyNDg3fQ"
 *
 */
router.post("/authenticate", (req, res) => {
  provider.authenticate(req, res);
});

/**
 * @swagger
 * /register:
 *   post:
 *     description: Register & get authorization token
 *     tags:
 *       - Basic Functionality
 *     requestBody:
 *       description: Provider account
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ProviderInput"
 *           examples:
 *             default:
 *               $ref: "#/components/examples/ProviderInputExample"
 *     responses:
 *       200:
 *         description: Create provider account & return auth token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjb21wYW55QGEuY29tIiwiaWF0IjoxNTYyNjAyNDg3fQ"
 *
 */
router.post("/register", (req, res) => {
  provider.register(req, res);
});

// TO-DO
/**
 * @swagger
 * /publish:
 *   post:
 *     description: Create a method chunk and add to the list. For bulk insert, see `bulk` in examples.
 *     tags:
 *       - Publish & Find Method Chunk
 */
router.post("/publish", (req, res) => {
  methodChunk.create(req, res);
});

router.get("/find2", (req, res) => {
  // project.create(req, res);
  const { testProject } = require("../../seed/project.seed");
  axios
    .post("http://localhost:5000/find", {
      project: testProject
    })
    .then(function(response) {
      console.log(response);
      res.send(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
  return;
});

router.get("/find", (req, res) => {
  MethodChunk.find()
    .then(result => {
      let runPy = new Promise((resolve, reject) => {
        const { spawn } = require("child_process");
        const pyProg = spawn("python", [
          path.join(__dirname, "./../mcdm.py"),
          JSON.stringify(testProject.characteristics),
          JSON.stringify(result)
        ]);
        pyProg.stdout.on("data", data => {
          resolve(data);
        });
        pyProg.stderr.on("data", data => {
          reject(data);
        });
      });

      runPy
        .then(result => {
          var resultString = result.toString("utf8");
          res.send(resultString);
        })
        .catch(err => {
          console.log("MCDM", err.toString("utf8"));
          res.status(500).send({
            message: err.message || "Some error occurred while retrieving."
          });
        });
    })
    .catch(err => {
      console.log("Find all MC", err);
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving."
      });
    });
});

/**
 * @swagger
 * /dimensions:
 *   get:
 *     description: Return list of all project charateristic dimensions
 *     tags:
 *       - Other Resources
 *     responses:
 *       200:
 *         description: List of all project characteristic dimensions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: slug-type id of dimension name
 *                   name:
 *                     type: string
 *                     description: name of dimension
 *                   description:
 *                     type: string
 *                     description: a brief description about this dimension
 *             example: [
 *               {
 *                 id: "application-domain",
 *                 name: "Application Domain",
 *                 description: "Application Domain dimension consists of characteristic related to application."
 *               },
 *               {
 *                 id: "development-strategy",
 *                 name: "Development Strategy",
 *                 description: "Development Strategy dimension consists of characteristic related to development"
 *               }
 *             ]
 *
 */
router.get("/dimensions", (req, res) => {
  res.json(DIMENSIONS);
});

/**
 * @swagger
 * /industries:
 *   get:
 *     description: Return list of all provider company industries
 *     tags:
 *       - Other Resources
 *     responses:
 *       200:
 *         description: List of all provider company industries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: slug-type id of industry name
 *                   name:
 *                     type: string
 *                     description: name of industry
 *             example: [
 *               {
 *                 id: "airlines-aviation",
 *                 name: "Airlines/Aviation"
 *               },
 *              {
 *                 id: "apparel-and-fashion",
 *                 name: "Apparel and Fashion"
 *              }
 *             ]
 */
router.get("/industries", (req, res) => {
  res.json(INDUSTRIES);
});

module.exports = router;
