import { companyA, companyB, companyC } from "./seed/provider.seed";
import { CHARACTERISTICS } from "./seed/characteristic.seed";
import {
  METHOD_CHUNKS,
  METHOD_CHUNKS_ADDITIONAL
} from "./seed/methodChunk.seed";
import { testProject } from "./seed/project.seed";

const fetch = require("node-fetch");

const register = () => {
  return fetch(`${server}/register`, {
    method: "POST",
    body: JSON.stringify(companyA),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => console.log(err));
};

const seedProvider = () => {
  fetch(`${server}/providers`, {
    method: "POST",
    body: JSON.stringify([companyB, companyC]),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => console.log(err));
};

const seedCharacteristic = () => {
  fetch(`${server}/characteristics`, {
    method: "POST",
    body: JSON.stringify(CHARACTERISTICS),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => console.log(err));
};

const seedMethodChunk = () => {
  fetch(`${server}/method-chunks`, {
    method: "POST",
    body: JSON.stringify(METHOD_CHUNKS.concat(METHOD_CHUNKS_ADDITIONAL)),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => console.log(err));
};

const seedProject = () => {
  fetch(`${server}/projects`, {
    method: "POST",
    body: JSON.stringify(testProject),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => console.log(err));
};

/****************** MAIN *******************/
const server = "http://localhost:4000";
var token = "";

const seed = () => {
  register().then(res => {
    token = res.token;
    seedProvider();
    seedCharacteristic();
    seedMethodChunk();
    seedProject();
  });
};

const dbConfig = require("./config/database.config.js");
const seeder = require("mongoose-seed");

// Connect to MongoDB via Mongoose
seeder.connect(dbConfig.url, function() {
  // Load Mongoose models
  seeder.loadModels([
    "./app/models/characteristic.model.js",
    "./app/models/methodChunk.model.js",
    "./app/models/project.model.js",
    "./app/models/provider.model.js"
  ]);

  // Clear specified collections
  seeder.clearModels(
    ["Characteristic", "MethodChunk", "Project", "Provider"],
    function() {
      seed();
      seeder.disconnect();
    }
  );
});
