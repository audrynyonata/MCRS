const provider = require("../controllers/provider.controller.js");

const DIMENSIONS = require("../dimensions.js");
const INDUSTRIES = require("../industries.js");
const TYPES = require("../types.js");

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
 *                   type: String
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
 *                   type: String
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
 *                   type: String
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjb21wYW55QGEuY29tIiwiaWF0IjoxNTYyNjAyNDg3fQ"
 *
 */
router.post("/register", (req, res) => {
  provider.register(req, res);
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

// TO-DO: FIND API
router.post("/find", (req, res) => {
  res.json({ message: "Welcome to MCRS." });
});

// TO-DO: PUBLISH API
router.post("/publish", (req, res) => {
  res.json({ message: "Welcome to MCRS." });
});

module.exports = router;
