const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 4000;

const router = require("./app/routes/index.js");
const methodChunkRouter = require("./app/routes/methodChunk.routes.js");
const characteristicRouter = require("./app/routes/characteristic.routes.js");
const providerRouter = require("./app/routes/provider.routes.js");
const projectRouter = require("./app/routes/project.routes.js");

// create express app
const app = express();

app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// parse cookies in request
var cookieParser = require("cookie-parser");

app.use(cookieParser());

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

// Configuring API documentation
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MCRS API Documentation",
      version: "0.1.0",
      description:
        "Method Chunk Registry System. [GitHub](https://github.com/audrynyonata/mcrs)"
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Development server for testing purposes"
      }
    ]
  },
  apis: ["./app/routes/index.js", "./app/routes/*.routes.js", "./docs/*.yaml"]
};

const swaggerSpec = swaggerJSDoc(options);

// Define docs routes
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: "section.models {display:none;}"
  })
);

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

// Require routes that uses jwt auth
app.use("/", router);
app.use("/method-chunks", methodChunkRouter);
app.use("/characteristics", characteristicRouter);
app.use("/providers", providerRouter);
app.use("/projects", projectRouter);

// listen for requests
app.listen(PORT, () => {
  console.log("Server is listening on port: " + PORT);
});
