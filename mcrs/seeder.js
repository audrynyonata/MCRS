const fetch = require("node-fetch");

const ORGANISATIONAL = "organisational";
const HUMAN = "human";
const APPLICATION_DOMAIN = "application domain";
const DEVELOPMENT_STRATEGY = "development strategy";

const ORDINAL = "ordinal";
const NOMINAL = "nominal";
const NUMERICAL = "numerical";

const companyA = {
  name: "Company A (Ltd.)",
  email: "company@a.com",
  password: "password",
  description:
    "Company A (Ltd.) has been working in apparel and fashion since 1899.",
  industry: "Apparel and Fashion",
  urls: [
    {
      name: "Company Official Site",
      url: "http://example.com"
    }
  ],
  contacts: [
    {
      name: "John Doe",
      role: "Public & Relation Officer",
      description: "Assisting in any inquiries about the company.",
      email: "john.doe@example.com",
      phone: "(+62) 812 345 6789",
      address: "Centrak Park, 679, CL"
    }
  ],
  related_providers: ["Company Tobacco", "Company C"]
};

const companyTobacco = {
  name: "Company Tobacco",
  email: "company@tobacco.com",
  password: "password",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vehicula hendrerit mollis. Sed gravida augue ut interdum placerat. Maecenas posuere enim nibh. Sed lobortis velit sit amet sapien pharetra, a condimentum turpis laoreet. Donec consectetur lacinia nisi, et sagittis lorem laoreet a. Praesent iaculis gravida magna non imperdiet. Mauris pharetra, quam non semper pulvinar, dolor nulla vehicula nisl, ac dignissim lacus sapien vitae tortor. Etiam vitae pharetra libero, nec vulputate metus. Maecenas sed elementum eros. Mauris libero nisl, semper suscipit rhoncus sit amet, iaculis eget dui. Nulla scelerisque diam id mauris mattis, nec lacinia quam lacinia.",
  industry: "Tobacco"
};

const companyC = {
  name: "Company C",
  email: "company@example.com",
  password: "password",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vehicula hendrerit mollis. Sed gravida augue ut interdum placerat. Maecenas posuere enim nibh. Sed lobortis velit sit amet sapien pharetra, a condimentum turpis laoreet. Donec consectetur lacinia nisi, et sagittis lorem laoreet a. Praesent iaculis gravida magna non imperdiet. Mauris pharetra, quam non semper pulvinar, dolor nulla vehicula nisl, ac dignissim lacus sapien vitae tortor. Etiam vitae pharetra libero, nec vulputate metus. Maecenas sed elementum eros. Mauris libero nisl, semper suscipit rhoncus sit amet, iaculis eget dui. Nulla scelerisque diam id mauris mattis, nec lacinia quam lacinia.",
  industry: "E-learning"
};

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
    body: JSON.stringify([companyTobacco, companyC]),
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

const CHARACTERISTICS = [
  {
    name: "Management commitment",
    characteristic_values: [
      {
        values: ["low", "normal", "high"],
        type: ORDINAL
      }
    ],
    dimension: ORGANISATIONAL
  },
  {
    name: "Importance",
    characteristic_values: [
      {
        values: ["low", "normal", "high"],
        type: ORDINAL
      }
    ],
    dimension: ORGANISATIONAL
  },
  {
    name: "Impact",
    characteristic_values: [
      {
        values: ["low", "normal", "high"],
        type: ORDINAL
      }
    ],
    dimension: ORGANISATIONAL
  },
  {
    name: "Time pressure",
    characteristic_values: [
      {
        values: ["low", "normal", "high"],
        type: ORDINAL
      }
    ],
    dimension: ORGANISATIONAL
  },
  {
    name: "Shortage of resources",
    characteristic_values: [
      {
        values: ["low", "normal", "high"],
        type: ORDINAL
      },
      {
        values: ["human", "means"],
        type: NOMINAL
      },
      {
        values: [
          "financial resources",
          "human resources",
          "temporal resources",
          "informational resources"
        ],
        type: NOMINAL
      }
    ],
    dimension: ORGANISATIONAL
  },
  {
    name: "Size",
    characteristic_values: [
      {
        values: ["low", "normal", "high"],
        type: ORDINAL
      }
    ],
    dimension: ORGANISATIONAL
  },
  {
    name: "Level of innovation",
    characteristic_values: [
      {
        values: ["low", "normal", "high"],
        type: ORDINAL
      },
      {
        values: ["business innovation", "technology innovation"],
        type: NOMINAL
      }
    ],
    dimension: ORGANISATIONAL
  },
  {
    name: "Resistance and conflict",
    characteristic_values: [
      {
        values: ["low", "normal", "high"],
        type: ORDINAL
      }
    ],
    dimension: HUMAN
  },
  {
    name: "Expertise",
    characteristic_values: [
      {
        values: ["low", "normal", "high"],
        type: ORDINAL
      },
      {
        values: ["tester", "developer", "designer", "analyst"],
        type: NOMINAL
      }
    ],
    dimension: HUMAN
  },
  {
    name: "Clarity and stability",
    characteristic_values: [
      {
        values: ["low", "normal", "high"],
        type: ORDINAL
      }
    ],
    dimension: HUMAN
  },
  {
    name: "User involvement",
    characteristic_values: [
      {
        values: ["real", "virtual"],
        type: NOMINAL
      }
    ],
    dimension: HUMAN
  },
  {
    name: "Stakeholder number",
    characteristic_values: [
      {
        values: ["0", "1", "10", "50"],
        type: NUMERICAL
      }
    ],
    dimension: HUMAN
  },
  {
    name: "Formality",
    characteristic_values: [
      {
        values: ["low", "normal", "high"],
        type: ORDINAL
      }
    ],
    dimension: APPLICATION_DOMAIN
  },
  {
    name: "Relationships",
    characteristic_values: [
      {
        values: ["low", "normal", "high"],
        type: ORDINAL
      }
    ],
    dimension: APPLICATION_DOMAIN
  },
  {
    name: "Dependency",
    characteristic_values: [
      {
        values: ["low", "normal", "high"],
        type: ORDINAL
      }
    ],
    dimension: APPLICATION_DOMAIN
  },
  {
    name: "Complexity",
    characteristic_values: [
      {
        values: ["low", "normal", "high"],
        type: ORDINAL
      }
    ],
    dimension: APPLICATION_DOMAIN
  },
  {
    name: "Application type",
    characteristic_values: [
      {
        values: [
          "intra-organization application",
          "inter-organization application",
          "organization-customer application"
        ],
        type: NOMINAL
      }
    ],
    dimension: APPLICATION_DOMAIN
  },
  {
    name: "Application technology",
    characteristic_values: [
      {
        values: [
          "application to develop includes a database",
          "application to develop is distributed",
          "application to develop includes a GUI"
        ],
        type: NOMINAL
      }
    ],
    dimension: APPLICATION_DOMAIN
  },
  {
    name: "Dividing project",
    characteristic_values: [
      {
        values: [
          "one single system",
          "establishing system-oriented subprojects",
          "establishing process-oriented subprojects",
          "establishing hybrid subprojects"
        ],
        type: NOMINAL
      }
    ],
    dimension: APPLICATION_DOMAIN
  },
  {
    name: "Repetitiveness",
    characteristic_values: [
      {
        values: ["low", "medium", "high"],
        type: ORDINAL
      }
    ],
    dimension: APPLICATION_DOMAIN
  },
  {
    name: "Variability",
    characteristic_values: [
      {
        values: ["low", "medium", "high"],
        type: ORDINAL
      }
    ],
    dimension: APPLICATION_DOMAIN
  },
  {
    name: "Variable artefacts",
    characteristic_values: [
      {
        values: [
          "organisational",
          "human",
          "application domain",
          "development strategy"
        ],
        type: NOMINAL
      }
    ],
    dimension: APPLICATION_DOMAIN
  },
  {
    name: "Source system",
    characteristic_values: [
      {
        values: ["code reuse", "functional domain reuse", "interface reuse"],
        type: NOMINAL
      },
      {
        values: ["weak", "medium", "strong"],
        type: ORDINAL
      }
    ],
    dimension: DEVELOPMENT_STRATEGY
  },
  {
    name: "Project organization",
    characteristic_values: [
      {
        values: ["standard", "adapted"],
        type: NOMINAL
      }
    ],
    dimension: DEVELOPMENT_STRATEGY
  },
  {
    name: "Development strategy",
    characteristic_values: [
      {
        values: [
          "outsourcing",
          "iterative",
          "prototyping",
          "phase-wise",
          "title-wise"
        ],
        type: NOMINAL
      }
    ],
    dimension: DEVELOPMENT_STRATEGY
  },
  {
    name: "Realization strategy",
    characteristic_values: [
      {
        values: ["at once", "incremental", "concurrent", "overlapping"],
        type: NOMINAL
      }
    ],
    dimension: DEVELOPMENT_STRATEGY
  },
  {
    name: "Delivery strategy",
    characteristic_values: [
      {
        values: ["at once", "incremental", "evolutionary"],
        type: NOMINAL
      }
    ],
    dimension: DEVELOPMENT_STRATEGY
  },
  {
    name: "Tracing project",
    characteristic_values: [
      {
        values: ["weak", "strong"],
        type: ORDINAL
      }
    ],
    dimension: DEVELOPMENT_STRATEGY
  },
  {
    name: "Goal number",
    characteristic_values: [
      {
        values: ["one goal", "multi-goals"],
        type: NOMINAL
      }
    ],
    dimension: DEVELOPMENT_STRATEGY
  }
];

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

const agileDevelopmentEssentials = {
  name: "Agile Development Essentials",
  description:
    "Add value to a product by incrementally extending it, ensuring it is usable, releasable and maintainable.",
  provider: "Company A (Ltd.)",
  url: "http://example.com/AgileDevelopmentEssentials",
  characteristics: [
    {
      name: "Management Commitment",
      value: "high",
      type: "ordinal"
    },
    {
      name: "User Involvement",
      value: "high",
      type: "ordinal"
    },
    {
      name: "Goal Number",
      value: "multi-goals",
      type: "nominal"
    },
    {
      name: "Development Strategy",
      value: "iterative",
      type: "nominal"
    },
    {
      name: "Delivery Strategy",
      value: "incremental",
      type: "nominal"
    }
  ]
};

const METHOD_CHUNKS = [
  {
    name: "NFR Framework",
    description: "NFR Framework for IS Security",
    provider: "Company Tobacco",
    url: "http://example.com/NFR-framework",
    characteristics: [
      {
        name: "Impact",
        value: "high",
        type: "ordinal"
      },
      {
        name: "Level of innovation",
        value: "high",
        type: "ordinal"
      },
      {
        name: "Expertise",
        value: "normal",
        type: "ordinal"
      },
      {
        name: "Guidance",
        value: "predefined taxonomy",
        type: "nominal"
      },
      {
        name: "Approach",
        value: "explanatory",
        type: "nominal"
      },
      {
        name: "Formalism",
        value: "semi-formal",
        type: "nominal"
      }
    ]
  },
  {
    name: "KAOS",
    description: "KAOS for IS Security",
    provider: "Company A (Ltd.)",
    url: "http://example.com/KAOS",
    characteristics: [
      {
        name: "Impact",
        value: "low",
        type: "ordinal"
      },
      {
        name: "Level of innovation",
        value: "high",
        type: "ordinal"
      },
      {
        name: "Expertise",
        value: "high",
        type: "ordinal"
      },
      {
        name: "Guidance",
        value: "heuristics",
        type: "nominal"
      },
      {
        name: "Approach",
        value: "exploratory",
        type: "nominal"
      },
      {
        name: "Formalism",
        value: "formal",
        type: "nominal"
      }
    ]
  },
  {
    name: "Secure Tropos",
    description: "Secure Tropos for IS Security",
    provider: "Company A (Ltd.)",
    url: "http://example.com/secure-tropos",
    characteristics: [
      {
        name: "Impact",
        value: "high",
        type: "ordinal"
      },
      {
        name: "Level of innovation",
        value: "low",
        type: "ordinal"
      },
      {
        name: "Expertise",
        value: "high",
        type: "ordinal"
      },
      {
        name: "Guidance",
        value: "no guidance",
        type: "nominal"
      },
      {
        name: "Approach",
        value: "systemic",
        type: "nominal"
      },
      {
        name: "Formalism",
        value: "formal",
        type: "nominal"
      }
    ]
  },
  {
    name: "GBRAM",
    description: "GBRAM for IS Security",
    provider: "Company Tobacco",
    url: "http://example.com/gbram",
    characteristics: [
      {
        name: "Impact",
        value: "low",
        type: "ordinal"
      },
      {
        name: "Level of innovation",
        value: "high",
        type: "ordinal"
      },
      {
        name: "Expertise",
        value: "normal",
        type: "ordinal"
      },
      {
        name: "Guidance",
        value: "heuristics",
        type: "nominal"
      },
      {
        name: "Formalism",
        value: "informal",
        type: "nominal"
      }
    ]
  },
  {
    name: "Misuse Cases",
    description: "Misuse Cases for IS Security",
    provider: "Company A (Ltd.)",
    url: "http://example.com/misusecases",
    characteristics: [
      {
        name: "Impact",
        value: "normal",
        type: "ordinal"
      },
      {
        name: "Level of innovation",
        value: "high",
        type: "ordinal"
      },
      {
        name: "Expertise",
        value: "low",
        type: "ordinal"
      },
      {
        name: "Guidance",
        value: "guidelines",
        type: "nominal"
      },
      {
        name: "Approach",
        value: "explanatory",
        type: "nominal"
      },
      {
        name: "Formalism",
        value: "informal",
        type: "nominal"
      }
    ]
  }
];

const seedMethodChunk = () => {
  fetch(`${server}/method-chunks`, {
    method: "POST",
    body: JSON.stringify(METHOD_CHUNKS),
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
