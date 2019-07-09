// Data array containing seed data - documents organized by Model
const ORGANISATIONAL = "organisational";
const HUMAN = "human";
const APPLICATION_DOMAIN = "application domain";
const DEVELOPMENT_STRATEGY = "development strategy";

const ORDINAL = "ordinal";
const NOMINAL = "nominal";
const NUMERICAL = "numerical";

const data = [
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

module.exports = data;
