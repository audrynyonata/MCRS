const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const PORT = 4000;

const methodChunkRouter = require("./app/routes/methodChunk.routes.js");
const characteristicRouter = require("./app/routes/characteristic.routes.js");
const providerRouter = require("./app/routes/provider.routes.js");
const projectRouter = require("./app/routes/project.routes.js");

const provider = require("./app/controllers/provider.controller.js");
const methodChunk = require("./app/controllers/methodChunk.controller.js");

const DIMENSIONS = require("./app/dimensions.js");
const INDUSTRIES = require("./app/industries.js");
const TYPES = require("./app/types.js");

// create express app
const app = express();

app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// parse cookies in request
var cookieParser = require("cookie-parser");

app.use(cookieParser());

// Configuring jwt auth
const jwt = require("./config/jwt.config.js");

app.use(jwt());

app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(err.status).send({ message: err.message });
    return;
  }
  next();
});

// Configuring API documentation
const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  info: {
    title: "MCRS",
    version: "0.0.0",
    description: "Method Chunk Registry System"
  },
  host: "localhost:4000",
  basePath: "/"
};

const options = {
  swaggerDefinition,
  apis: ["server.js", "./app/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.get("/docs", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to MCRS." });
});

app.get("/login", (req, res) => {
  res.sendFile("login.html", { root: path.join(__dirname, "public") });
});

app.post("/authenticate", (req, res) => {
  provider.authenticate(req, res);
});

app.get("/register", (req, res) => {
  res.sendFile("register.html", { root: path.join(__dirname, "public") });
});

app.post("/register", (req, res) => {
  provider.create(req, res);
});

app.get("/dimensions", (req, res) => {
  res.json(DIMENSIONS);
});

/**
 * @swagger
 * /list:
 *   get:
 *     summary: List all the animals
 *     description: Returns a list of all the animals, optionally sorted
 *     tags:
 *       - animals
 *     parameters:
 *       - in: query
 *         name: sort
 *         type: string
 *         required: false
 *         enum:
 *           - yes
 *           - no
 *     responses:
 *       200:
 *         description: List of animals
 *         schema:
 *           type: object
 *           properties:
 *             animals:
 *               type: array
 *               description: all the animals
 *               items:
 *                 type: string
 */
app.get("/industries", (req, res) => {
  res.json(INDUSTRIES);
});

app.get("/types", (req, res) => {
  res.json(TYPES);
});

// TO-DO: FIND API
app.post("/find", (req, res) => {
  res.json({ message: "Welcome to MCRS." });
});

app.post("/publish", (req, res) => {
  res.json({ message: "Welcome to MCRS." });
});

// Require routes
app.use("/method-chunks", methodChunkRouter);
app.use("/characteristics", characteristicRouter);
app.use("/providers", providerRouter);
app.use("/projects", projectRouter);

// listen for requests
app.listen(PORT, () => {
  console.log("Server is listening on port: " + PORT);
});
