const provider = require("../controllers/provider.controller.js");
const methodChunk = require("../controllers/methodChunk.controller.js");

const DIMENSIONS = require("../dimensions.js");
const INDUSTRIES = require("../industries.js");

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
 *                   url: "http://localhost:4000/method-chunks/kanban-board"
 *                   characteristics: [
 *                     {
 *                       characteristic: "impact",
 *                       value: "high"
 *                     }
 *                   ]
 *                 - name: "Sprint retrospective"
 *                   url: "http://localhost:4000/method-chunks/sprint-retrospective"
 *                   characteristics: [
 *                     {
 *                       characteristic: "delivery-strategy",
 *                       value: "incremental"
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

/**
 * @swagger
 * /find:
 *   post:
 *     description: Find ranked method chunk recommendation according to project characteristics
 *     tags:
 *       - Publish & Find Method Chunk
 *     requestBody:
 *       description: Project id
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               project:
 *                 type: string
 *                 description: slug-type id of the project name
 *           examples:
 *             default:
 *               value:
 *                 project: company-a-ltd/test-project
 *     responses:
 *       '200':
 *         description: Return ranked method chunk recommendation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 project:
 *                   type: string
 *                   description: slug-type id of the project name
 *                   example: company-a-ltd/test-project
 *                 model:
 *                   type: string
 *                   description: multi-criteria algorithm model that is used. Currently available are `WeightedSum` and `TOPSIS`.
 *                   example: WeightedSum
 *                 result:
 *                   type: array
 *                   description: array of recommended method chunks sorted by best rank
 *                   items:
 *                     type: object
 *                     properties:
 *                       methodChunk:
 *                         type: string
 *                         description: slug-type id of method chunk name
 *                         example: AgileDevelopment
 *                       rank:
 *                         type: integer
 *                         description: rank of method chunk (`1` = most recommended)
 *                         example: 1
 *                       score:
 *                         type: float
 *                         description: numerical score of method chunk by the algorithm. In `WeightedSum` it uses points/sum. In `TOPSIS` it uses closeness.
 *                         example: 8
 */
router.post("/find", (req, res) => {
  axios
    .post("http://localhost:5000/find", {
      project: req.body.project
    })
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log("Find", err);
      return res.status(400).send({
        message: err.message || "Some error occurred while finding."
      });
    });
  return;
});

router.get("/find/:provider/:project", (req, res) => {
  axios
    .post("http://localhost:5000/find", {
      project: req.params.provider + "/" + req.params.project
    })
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log("Find", err);
      return res.status(400).send({
        message: err.message || "Some error occurred while finding."
      });
    });
  return;
});
// TO-DO
// router.get("/find2", (req, res) => {
//   MethodChunk.find()
//     .then(result => {
//       let runPy = new Promise((resolve, reject) => {
//         const { spawn } = require("child_process");
//         const pyProg = spawn("python", [
//           path.join(__dirname, "./../mcdm.py"),
//           JSON.stringify(testProject.characteristics),
//           JSON.stringify(result)
//         ]);
//         pyProg.stdout.on("data", data => {
//           resolve(data);
//         });
//         pyProg.stderr.on("data", data => {
//           reject(data);
//         });
//       });

//       runPy
//         .then(result => {
//           var resultString = result.toString("utf8");
//           res.send(resultString);
//         })
//         .catch(err => {
//           console.log("MCDM", err.toString("utf8"));
//           res.status(500).send({
//             message: err.message || "Some error occurred while retrieving."
//           });
//         });
//     })
//     .catch(err => {
//       console.log("Find all MC", err);
//       res.status(400).send({
//         message: err.message || "Some error occurred while retrieving."
//       });
//     });
// });

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
