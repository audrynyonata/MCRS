const provider = require("../controllers/provider.controller.js");
const methodChunk = require("../controllers/methodChunk.controller.js");
const MethodChunk = require("../models/methodChunk.model.js");

const DIMENSIONS = require("../dimensions.js");
const INDUSTRIES = require("../industries.js");
const TYPES = require("../types.js");

const path = require("path");
const axios = require("axios");
const express = require("express");
const router = express.Router();

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
 *                 email: "company@example.com"
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

/**
 * @swagger
 * /publish:
 *   post:
 *     description: Create a method chunk and add to the list. For bulk insert, see `bulk` in examples.
 *     tags:
 *       - Publish & Find Method Chunk
 *     requestBody:
 *       description: Method Chunk info
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MethodChunkInput'
 *           examples:
 *             default:
 *               $ref: '#/components/examples/MethodChunkInputExample'
 *             bulk:
 *               value:
 *                 - name: "Kanban Board"
 *                   provider: "Company Tobacco"
 *                   url: "http://localhost:4000/method-chunks/kanban-board"
 *                 - name: "Sprint retrospective"
 *                   provider: "Company C"
 *                   url: "http://localhost:4000/method-chunks/sprint-retrospective"
 *                   characteristics: [
 *                     {
 *                       name: "delivery strategy",
 *                       value: "incremental",
 *                       type: "nominal"
 *                     }
 *                   ]
 *     responses:
 *       200:
 *         description: Add a method chunk
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MethodChunk'
 *             examples:
 *               default:
 *                 $ref: '#/components/examples/MethodChunkExample'
 *     security:
 *       - bearerAuth: []
 */
router.post("/publish", (req, res) => {
  methodChunk.create(req, res);
});

router.get("/find", (req, res) => {
  // project.create(req, res);
  const testProject = {
    name: "Test Project",
    provider: "Company A (Ltd.)",
    description: "IS security chunks evaluation.",
    characteristics: [
      {
        name: "Impact",
        optimal_sense: "maximum",
        type: "ordinal"
      },
      {
        name: "Level of innovation",
        optimal_sense: "maximum",
        type: "ordinal"
      },
      {
        name: "Expertise",
        optimal_sense: "minimum",
        type: "ordinal"
      },
      {
        name: "Guidance",
        optimal_sense: "predefined taxonomy",
        type: "nominal"
      },
      {
        name: "Approach",
        optimal_sense: "systemic",
        type: "nominal"
      },
      {
        name: "Formalism",
        optimal_sense: "formal",
        type: "nominal"
      }
    ]
  };
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

router.get("/find2", (req, res) => {
  const testProject = {
    name: "Test Project",
    provider: "Company A (Ltd.)",
    description: "IS security chunks evaluation.",
    characteristics: [
      {
        name: "Impact",
        optimal_sense: "maximum",
        type: "ordinal"
      },
      {
        name: "Level of innovation",
        optimal_sense: "maximum",
        type: "ordinal"
      },
      {
        name: "Expertise",
        optimal_sense: "minimum",
        type: "ordinal"
      },
      {
        name: "Guidance",
        optimal_sense: "predefined taxonomy",
        type: "nominal"
      },
      {
        name: "Approach",
        optimal_sense: "systemic",
        type: "nominal"
      },
      {
        name: "Formalism",
        optimal_sense: "formal",
        type: "nominal"
      }
    ]
  };
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

/**
 * @swagger
 * /types:
 *   get:
 *     description: Return list of all characteristics value type
 *     tags:
 *       - Other Resources
 *     responses:
 *       200:
 *         description: List of all characteristics value type
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: slug-type id of data type name
 *                   name:
 *                     type: string
 *                     description: name of data type
 *                   description:
 *                     type: string
 *                     description: a brief description about this data type
 *             example: [
 *               {
 *                 "id": "ordinal",
 *                 "name": "Ordinal",
 *                 "description": "Non-quantifiable / qualitative data that can be ordered / sorted."
 *               },
 *               {
 *                 "id": "nominal",
 *                 "name": "Nominal",
 *                 "description": "Non-quantifiable / qualitative data for unordered categories."
 *               },
 *               {
 *                 "id": "numerical",
 *                 "name": "Numerical",
 *                 "description": "Quantifiable / quantitative data in numbers (interval vs. ratio, discrete vs. continuous)."
 *               }
 *             ]
 */
router.get("/types", (req, res) => {
  res.json(TYPES);
});

module.exports = router;
