const seeder = require("mongoose-seed");
const fetch = require("node-fetch");
const dbConfig = require("./config/database.config.js");
const { companyA, companyB, companyC } = require("./seed/provider.seed");

const server = "http://localhost:4000";
const baseUrlB = "C:/Users/User/Desktop/mcrs/case/mbms-b/browse.html#";
const ORGANISATIONAL = "organisational";
const HUMAN = "human";

const CHARACTERISTICS = [
  {
    name: "Impact",
    characteristicValues: [
      {
        ref: "default",
        values: ["low", "normal", "high"],
        isQuantifiable: true
      }
    ],
    dimension: ORGANISATIONAL
  },
  {
    name: "Level of innovation",
    characteristicValues: [
      {
        ref: "default",
        values: ["low", "normal", "high"],
        isQuantifiable: true
      }
    ],
    dimension: ORGANISATIONAL
  },
  {
    name: "Expertise",
    characteristicValues: [
      {
        ref: "default",
        values: ["low", "normal", "high"],
        isQuantifiable: true
      }
    ],
    dimension: HUMAN
  }
];

const METHOD_CHUNKS = [
  {
    name: "NFR Framework",
    description: "NFR Framework for IS Security",
    url: baseUrlB + "NFR-framework",
    characteristics: [
      {
        id: "impact",
        value: "high"
      },
      {
        id: "level-of-innovation",
        value: "high"
      },
      {
        id: "expertise",
        value: "normal"
      }
    ]
  },
  {
    name: "KAOS",
    description: "KAOS for IS Security",
    url: baseUrlB + "KAOS",
    characteristics: [
      {
        id: "impact",
        value: "low"
      },
      {
        id: "level-of-innovation",
        value: "high"
      },
      {
        id: "expertise",
        value: "high"
      }
    ]
  },
  {
    name: "Secure Tropos",
    description: "Secure Tropos for IS Security",
    url: baseUrlB + "secure-tropos",
    characteristics: [
      {
        id: "impact",
        value: "high"
      },
      {
        id: "level-of-innovation",
        value: "low"
      },
      {
        id: "expertise",
        value: "high"
      }
    ]
  },
  {
    name: "GBRAM",
    description: "GBRAM for IS Security",
    url: baseUrlB + "gbram",
    characteristics: [
      {
        id: "impact",
        value: "low"
      },
      {
        id: "level-of-innovation",
        value: "high"
      },
      {
        id: "expertise",
        value: "normal"
      }
    ]
  },
  {
    name: "Misuse Cases",
    description: "Misuse Cases for IS Security",
    url: baseUrlB + "misusecases",
    characteristics: [
      {
        id: "impact",
        value: "normal"
      },
      {
        id: "level-of-innovation",
        value: "high"
      },
      {
        id: "expertise",
        value: "low"
      }
    ]
  }
];

const providerTest = {
  name: "Provider Test",
  email: "provider@example.com",
  password: "password",
  description: "Provider Test",
  industry: "computer-software",
  contacts: [
    {
      name: "IT Support",
      description: "IT Support is responsible for assisting any inquiries regarding IT services.",
      email: "support@example.com"
    }
  ]
};

const providerUpdate = {
  description: "Updated description",
  urls: [
    {
      name: "Homepage",
      url: "http://homepage"
    }
  ]
};

const characteristicTest = {
  name: "Characteristic Test",
  characteristicValues: [
    {
      ref: "default",
      values: ["low", "normal", "high"],
      isQuantifiable: true
    }
  ],
  dimension: ORGANISATIONAL
};

const characteristicUpdate = {
  characteristicValues: [
    {
      ref: "default",
      values: ["low", "normal", "high"],
      isQuantifiable: true
    },
    {
      ref: "a/b/c",
      values: ["a", "b", "c"],
      isQuantifiable: false
    }
  ]
};

const methodChunkTest = {
  name: "Method Chunk Test",
  description: "This is a test method chunk.",
  url: "http://example.com/method-chunk-test",
  characteristics: [
    {
      id: "characteristic-test",
      value: "normal"
    },
    {
      id: "impact",
      value: "normal"
    },
    {
      id: "level-of-innovation",
      value: "normal"
    },
    {
      id: "expertise",
      value: "normal"
    }
  ]
};

const methodChunkUpdate = {
  description: "Updated description"
};

const projectTest = {
  name: "Project Test",
  characteristics: [
    {
      id: "impact",
      rule: "maximum"
    },
    {
      id: "level-of-innovation",
      rule: "maximum"
    },
    {
      id: "expertise",
      rule: "minimum"
    },
    {
      id: "characteristic-test",
      rule: "maximum"
    }
  ]
};

const projectUpdate = {
  description: "Updated description",
  characteristics: [
    {
      id: "impact",
      rule: "minimum"
    },
    {
      id: "characteristic-test",
      rule: "maximum"
    }
  ]
};

const register = c => {
  return fetch(`${server}/register`, {
    method: "POST",
    body: JSON.stringify(c),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      // console.log(res);
      return res;
    })
    .catch(err => console.log(err));
};

const post = (path, data, message) => {
  return fetch(`${server}${path}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      if (message) process.stdout.write("POST " + path + " " + message + " ");
      return res;
    })
    .catch(err => console.log(err));
};

const put = (path, data, message) => {
  return fetch(`${server}${path}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      if (message) process.stdout.write("PUT " + path + " " + message + " ");
      return res;
    })
    .catch(err => console.log(err));
};

const del = (path, message) => {
  return fetch(`${server}${path}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      process.stdout.write("DELETE " + path + " " + message + " ");
      return res;
    })
    .catch(err => console.log(err));
};

const get = (path, message) => {
  return fetch(`${server}${path}`)
    .then(res => res.json())
    .then(res => {
      process.stdout.write("GET " + path + " " + message + " ");
      return res;
    })
    .catch(err => console.log(err));
};

/****************** MAIN *******************/
var token = "";

const seed = () => {
  return register(companyA)
    .then(res => {
      token = res.token;
      post("/providers", [companyB, companyC]);
      post("/characteristics", CHARACTERISTICS).then(() => {
        post("/method-chunks", METHOD_CHUNKS);
      });
    })
    .catch(err => {
      console.log(err);
    });
};

const test = () => {
  //0
  return get("/", "should return welcome message")
    .then(res => {
      res.message ? console.log("OK") : console.log("FAIL");
      //1
      get("/dimensions", "should return all dimensions").then(res => {
        res.length ? console.log("OK") : console.log("FAIL");
      });

      //2
      get("/industries", "should return all industries").then(res => {
        res.length ? console.log("OK") : console.log("FAIL");
      });

      //2+1
      const authenticate = {
        email: "company@a.com",
        password: "password"
      };
      post("/authenticate", authenticate, "should check email password pair and return token").then(
        res => {
          res.token ? console.log("OK") : console.log("FAIL");
        }
      );

      //3
      register(providerTest).then(res => {
        token = res.token;
        var ok = "FAIL";
        if (token) ok = "OK";
        console.log("POST /register", "should create provider and return valid token", ok);

        //4
        get("/providers", "should return all providers").then(res => {
          res.length == 4 ? console.log("OK") : console.log("FAIL");
        });
        //5
        get("/providers/provider-test", "should return single provider").then(res => {
          res.id == "provider-test" ? console.log("OK") : console.log("FAIL");
        });
        //6
        put("/providers/provider-test", providerUpdate, "should update provider").then(res => {
          res.description == "Updated description" && res.urls.length
            ? console.log("OK")
            : console.log("FAIL");
        });

        //7
        post("/characteristics", characteristicTest, "should create characteristic").then(res => {
          res.id == "characteristic-test" ? console.log("OK") : console.log("FAIL");
          //8
          get("/characteristics", "should return all characteristics").then(res => {
            res.length == 4 ? console.log("OK") : console.log("FAIL");
          });
          //9
          get("/characteristics/characteristic-test", "should return single characteristic").then(
            res => {
              res.id == "characteristic-test" ? console.log("OK") : console.log("FAIL");
            }
          );
          //10
          put(
            "/characteristics/characteristic-test",
            characteristicUpdate,
            "should update characteristic"
          ).then(res => {
            res.characteristicValues.length == 2 ? console.log("OK") : console.log("FAIL");
          });

          //11
          post("/publish", methodChunkTest, "should create method chunk").then(r => {
            r.id == "method-chunk-test" ? console.log("OK") : console.log("FAIL");
            //12
            get("/method-chunks", "should return all method chunks").then(res => {
              res.length == 6 ? console.log("OK") : console.log("FAIL");
            });
            //13
            get("/method-chunks/method-chunk-test", "should return single method chunk").then(
              res => {
                res.id == "method-chunk-test" ? console.log("OK") : console.log("FAIL");
              }
            );
            //13 + 1
            put(
              "/method-chunks/method-chunk-test",
              methodChunkUpdate,
              "should update method chunk"
            ).then(res => {
              res.description == "Updated description" ? console.log("OK") : console.log("FAIL");
            });
          });

          //14
          post("/projects", projectTest, "should create project").then(r => {
            r.id == "provider-test/project-test" ? console.log("OK") : console.log("FAIL");
            //15
            get("/projects", "should return all projects").then(res => {
              res.length == 1 ? console.log("OK") : console.log("FAIL");
            });
            //16
            get("/projects/provider-test/project-test", "should return single project").then(
              res => {
                res.id == "provider-test/project-test" ? console.log("OK") : console.log("FAIL");
              }
            );
            //16 + 1
            put(
              "/projects/provider-test/project-test",
              projectUpdate,
              "should update project"
            ).then(res => {
              res.description == "Updated description" ? console.log("OK") : console.log("FAIL");
            });
            const find = { project: "provider-test/project-test" };
            //16 + 2
            post("/find", find, "should return recommendations").then(res => {
              res.results ? console.log("OK") : console.log("FAIL");
              // 17
              del("/projects/provider-test/project-test", "should delete project").then(res => {
                res.message = "Deleted successfully." ? console.log("OK") : console.log("FAIL");
                //18
                del("/method-chunks/method-chunk-test", "should delete method chunk").then(res => {
                  res.message = "Deleted successfully." ? console.log("OK") : console.log("FAIL");
                });
                //19
                del("/characteristics/characteristic-test", "should delete characteristic").then(
                  res => {
                    res.message = "Deleted successfully." ? console.log("OK") : console.log("FAIL");
                    //20
                    del("/providers/provider-test", "should delete provider").then(res => {
                      res.message = "Deleted successfully."
                        ? console.log("OK")
                        : console.log("FAIL");
                      console.log("Finished.");
                    });
                  }
                );
              });
            });
          });
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// Connect to MongoDB via Mongoose
seeder.connect(dbConfig.url, function() {
  const models = ["Characteristic", "Project", "MethodChunk", "Provider"];

  // Load Mongoose models
  seeder.loadModels([
    "./app/models/characteristic.model.js",
    "./app/models/methodChunk.model.js",
    "./app/models/project.model.js",
    "./app/models/provider.model.js"
  ]);

  // Clear specified collections
  seeder.clearModels(models, function() {
    console.log("Populating database for testing purpose...");
    seed().then(res => {
      console.log("Begin test...");
      test();
    });
    seeder.disconnect();
  });
});
