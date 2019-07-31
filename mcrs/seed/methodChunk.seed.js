const { ORDINAL, NOMINAL, NUMERICAL } = require("./characteristic.seed");

const baseUrl = "http://example.com/";

const METHOD_CHUNKS = [
  {
    name: "NFR Framework",
    description: "NFR Framework for IS Security",
    provider: "company-b",
    url: "http://example.com/NFR-framework",
    characteristics: [
      {
        id: "impact",
        value: "high",
        type: ORDINAL
      },
      {
        id: "level-of-innovation",
        value: "high",
        type: ORDINAL
      },
      {
        id: "expertise",
        value: "normal",
        type: ORDINAL
      },
      {
        id: "guidance",
        value: "predefined taxonomy",
        type: NOMINAL
      },
      {
        id: "approach",
        value: "explanatory",
        type: NOMINAL
      },
      {
        id: "formalism",
        value: "semi-formal",
        type: NOMINAL
      }
    ]
  },
  {
    name: "KAOS",
    description: "KAOS for IS Security",
    provider: "company-a",
    url: "http://example.com/KAOS",
    characteristics: [
      {
        id: "impact",
        value: "low",
        type: ORDINAL
      },
      {
        id: "level-of-innovation",
        value: "high",
        type: ORDINAL
      },
      {
        id: "expertise",
        value: "high",
        type: ORDINAL
      },
      {
        id: "guidance",
        value: "heuristics",
        type: NOMINAL
      },
      {
        id: "approach",
        value: "exploratory",
        type: NOMINAL
      },
      {
        id: "formalism",
        value: "formal",
        type: NOMINAL
      }
    ]
  },
  {
    name: "Secure Tropos",
    description: "Secure Tropos for IS Security",
    provider: "company-a",
    url: "http://example.com/secure-tropos",
    characteristics: [
      {
        id: "impact",
        value: "high",
        type: ORDINAL
      },
      {
        id: "level-of-innovation",
        value: "low",
        type: ORDINAL
      },
      {
        id: "expertise",
        value: "high",
        type: ORDINAL
      },
      {
        id: "guidance",
        value: "no guidance",
        type: NOMINAL
      },
      {
        id: "approach",
        value: "systemic",
        type: NOMINAL
      },
      {
        id: "formalism",
        value: "formal",
        type: NOMINAL
      }
    ]
  },
  {
    name: "GBRAM",
    description: "GBRAM for IS Security",
    provider: "company-b",
    url: "http://example.com/gbram",
    characteristics: [
      {
        id: "impact",
        value: "low",
        type: ORDINAL
      },
      {
        id: "level-of-innovation",
        value: "high",
        type: ORDINAL
      },
      {
        id: "expertise",
        value: "normal",
        type: ORDINAL
      },
      {
        id: "guidance",
        value: "heuristics",
        type: NOMINAL
      },
      {
        id: "formalism",
        value: "informal",
        type: NOMINAL
      }
    ]
  },
  {
    name: "Misuse Cases",
    description: "Misuse Cases for IS Security",
    provider: "company-a",
    url: "http://example.com/misusecases",
    characteristics: [
      {
        id: "impact",
        value: "normal",
        type: ORDINAL,
        weight: 0.3
      },
      {
        id: "level-of-innovation",
        value: "high",
        type: ORDINAL,
        weight: 0.2
      },
      {
        id: "expertise",
        value: "low",
        type: ORDINAL,
        weight: 0.5
      },
      {
        id: "guidance",
        value: "guidelines",
        type: NOMINAL
      },
      {
        id: "approach",
        value: "explanatory",
        type: NOMINAL
      },
      {
        id: "formalism",
        value: "informal",
        type: NOMINAL
      }
    ]
  }
];

const METHOD_CHUNKS_ADDITIONAL = [
  {
    name: "Acceptance Test Driven Development",
    description:
      "Acceptance test–driven development (ATDD) is a development methodology based on communication between the business customers, the developers, and the testers. ATDD encompasses many of the same practices as specification by example (SBE),[2][3] behavior-driven development (BDD),[4] example-driven development (EDD), and support-driven development also called story test–driven development (SDD). All these processes aid developers and testers in understanding the customer's needs prior to implementation and allow customers to be able to converse in their own domain language. ATDD is closely related to test-driven development (TDD). It differs by the emphasis on developer-tester-business customer collaboration. ATDD encompasses acceptance testing, but highlights writing acceptance tests before developers begin coding.",
    provider: "company-a",
    url: baseUrl + "AcceptanceTestDrivenDevelopment",
    characteristics: [
      {
        id: "management-commitment",
        value: "low",
        type: ORDINAL
      },
      {
        id: "importance",
        value: "normal",
        type: ORDINAL
      },
      {
        id: "expertise",
        value: "high",
        type: ORDINAL
      },
      {
        id: "user-involvement",
        value: "real",
        type: NOMINAL
      },
      {
        id: "impact",
        value: "high",
        type: ORDINAL
      }
    ]
  },
  {
    name: "Agile Development",
    description:
      "Add value to a product by incrementally extending it, ensuring it is usable, releasable and maintainable.",
    provider: "company-a",
    url: baseUrl + "AgileDevelopment",
    characteristics: [
      {
        id: "management-commitment",
        value: "high",
        type: ORDINAL
      },
      {
        id: "user-involvement",
        value: "real",
        type: NOMINAL
      },
      {
        id: "goal-number",
        value: "multi-goals",
        type: NOMINAL
      },
      {
        id: "development-strategy",
        value: "iterative",
        type: NOMINAL
      },
      {
        id: "delivery-strategy",
        value: "incremental",
        type: NOMINAL
      }
    ]
  },
  {
    name: "Agile Retrospective",
    description:
      "Make incremental improvements to the way of working through regular, repeated retrospectives.",
    provider: "company-a",
    url: baseUrl + "AgileRetrospective",
    characteristics: [
      {
        id: "impact",
        value: "high",
        type: ORDINAL
      },
      {
        id: "resistance-and-conflict",
        value: "high",
        type: ORDINAL
      },
      {
        id: "formality",
        value: "low",
        type: ORDINAL
      },
      {
        id: "Variability",
        value: "high",
        type: ORDINAL
      },
      {
        id: "tracing-project",
        value: "strong",
        type: ORDINAL
      }
    ]
  },
  {
    name: "Agile Teaming",
    description:
      "A self-organizing team maximizes its performance by using a highly-collaborative teaming approach.",
    provider: "company-a",
    url: baseUrl + "AgileTeaming",
    characteristics: [
      {
        id: "management-commitment",
        value: "normal",
        type: ORDINAL
      },
      {
        id: "expertise",
        value: "high",
        type: ORDINAL
      },
      {
        id: "resistance-and-conflict",
        value: "high",
        type: ORDINAL
      },
      {
        id: "formality",
        value: "low",
        type: ORDINAL
      }
    ]
  },
  {
    name: "Agile Timeboxing",
    description:
      "Progress the work as a series of timeboxes, and assess and re-plan at the end of each timebox.",
    provider: "company-a",
    url: baseUrl + "AgileTimeboxing",
    characteristics: [
      {
        id: "management-commitment",
        value: "high",
        type: ORDINAL
      },
      {
        id: "time-pressure",
        value: "high",
        type: ORDINAL
      },
      {
        id: "development-strategy",
        value: "iterative",
        type: NOMINAL
      },
      {
        id: "delivery-strategy",
        value: "incremental",
        type: NOMINAL
      },
      {
        id: "tracing-project",
        value: "strong",
        type: ORDINAL
      },
      {
        id: "goal-number",
        value: "multi-goals",
        type: NOMINAL
      }
    ]
  },
  {
    name: "Behavior Driven Development",
    description:
      "In software engineering, behavior-driven development (BDD) is an Agile software development process that encourages collaboration between developers, QA and non-technical or business participants in a software project. It encourages teams to use conversation and concrete examples to formalize a shared understanding of how the application should behave. Although BDD is principally an idea about how software development should be managed by both business interests and technical insight, the practice of BDD does assume the use of specialized software tools to support the development process. BDD is largely facilitated through the use of a simple domain-specific language (DSL) using natural language constructs (e.g., English-like sentences) that can express the behavior and the expected outcomes. BDD helps to focus on the user’s needs and the system’s expected behavior rather than focusing too much on testing the implementation.",
    provider: "company-a",
    url: baseUrl + "BehaviorDrivenDevelopment",
    characteristics: [
      {
        id: "management-commitment",
        value: "high",
        type: ORDINAL
      },
      {
        id: "importance",
        value: "high",
        type: ORDINAL
      },
      {
        id: "clarity-and-stability",
        value: "high",
        type: ORDINAL
      },
      {
        id: "user-involvement",
        value: "real",
        type: NOMINAL
      },
      {
        id: "impact",
        value: "high",
        type: ORDINAL
      }
    ]
  },
  {
    name: "Big Design Up Front",
    description:
      "Big Design Up Front (BDUF) is a software development approach in which the program's design is to be completed and perfected before that program's implementation is started. It is often associated with the waterfall model of software development. Proponents of waterfall model argue that time spent in designing is a worthwhile investment, with the hope that less time and effort will be spent fixing a bug in the early stages of a software product's lifecycle than when that same bug is found and must be fixed later. That is, it is much easier to fix a requirements bug in the requirements phase than to fix that same bug in the implementation phase, as to fix a requirements bug in the implementation phase requires scrapping at least some of the implementation and design work which has already been completed.",
    provider: "company-a",
    url: baseUrl + "BigDesignUpFront",
    characteristics: [
      {
        id: "management-commitment",
        value: "high",
        type: ORDINAL
      },
      {
        id: "importance",
        value: "high",
        type: ORDINAL
      },
      {
        id: "clarity-and-stability",
        value: "high",
        type: ORDINAL
      },
      {
        id: "user-involvement",
        value: "real",
        type: NOMINAL
      },
      {
        id: "impact",
        value: "high",
        type: ORDINAL
      }
    ]
  },
  {
    name: "Continuous Delivery",
    description:
      "Continuous delivery (CD or CDE) is a software engineering approach in which teams produce software in short cycles, ensuring that the software can be reliably released at any time and, when releasing the software, doing so manually. It aims at building, testing, and releasing software with greater speed and frequency. The approach helps reduce the cost, time, and risk of delivering changes by allowing for more incremental updates to applications in production. A straightforward and repeatable deployment process is important for continuous delivery.",
    provider: "company-a",
    url: baseUrl + "ContinuousDelivery",
    characteristics: [
      {
        id: "time-pressure",
        value: "high",
        type: ORDINAL
      },
      {
        id: "expertise",
        value: "high",
        type: ORDINAL
      },
      {
        id: "tracing-project",
        value: "strong",
        type: ORDINAL
      },
      {
        id: "complexity",
        value: "high",
        type: ORDINAL
      },
      {
        id: "impact",
        value: "high",
        type: ORDINAL
      }
    ]
  },
  {
    name: "Continuous Integration",
    description:
      "Continuous integration (CI) is the practice of merging all developer working copies to a shared mainline several times a day. Continuous integration involves integrating early and often, so as to avoid the pitfalls of 'integration hell'.",
    provider: "company-a",
    url: baseUrl + "ContinuousIntegration",
    characteristics: [
      {
        id: "time-pressure",
        value: "high",
        type: ORDINAL
      },
      {
        id: "expertise",
        value: "high",
        type: ORDINAL
      },
      {
        id: "tracing-project",
        value: "strong",
        type: ORDINAL
      },
      {
        id: "complexity",
        value: "high",
        type: ORDINAL
      },
      {
        id: "impact",
        value: "high",
        type: ORDINAL
      }
    ]
  },
  {
    name: "Daily Stand-Up",
    description:
      "Use short, daily whole-team meetings to coordinate the work of the team and raise impediments.",
    provider: "company-a",
    url: baseUrl + "DailyStandUp",
    characteristics: [
      {
        id: "management-commitment",
        value: "high",
        type: ORDINAL
      },
      {
        id: "time-pressure",
        value: "high",
        type: ORDINAL
      },
      {
        id: "impact",
        value: "high",
        type: ORDINAL
      },
      {
        id: "clarity-and-stability",
        value: "high",
        type: ORDINAL
      },
      {
        id: "expertise",
        value: "low",
        type: ORDINAL
      },
      {
        id: "formality",
        value: "low",
        type: ORDINAL
      },
      {
        id: "tracing-project",
        value: "strong",
        type: ORDINAL
      }
    ]
  },
  {
    name: "Pair Programming",
    description:
      "Agile software development technique in which two programmers work together at one workstation. One, the driver, writes code while the other, the observer or navigator,reviews each line of code as it is typed in. The two programmers switch roles frequently. While reviewing, the observer also considers the strategic direction of the work, coming up with ideas for improvements and likely future problems to address. This is intended to free the driver to focus all of their attention on the tactical aspects of completing the current task, using the observer as a safety net and guide. Pair programming increases the man-hours required to deliver code compared to programmers working individually. Experiments yielded diverse results, suggesting increases of between 15% and 100%. However, the resulting code has about 15% fewer defects. Along with code development time, other factors like field support costs and quality assurance also figure in to the return on investment.",
    provider: "company-a",
    url: baseUrl + "PairProgramming",
    characteristics: [
      {
        id: "resistance-and-conflict",
        value: "high",
        type: ORDINAL
      },
      {
        id: "expertise",
        value: "low",
        type: ORDINAL
      },
      {
        id: "tracing-project",
        value: "strong",
        type: ORDINAL
      },
      {
        id: "complexity",
        value: "normal",
        type: ORDINAL
      },
      {
        id: "impact",
        value: "high",
        type: ORDINAL
      }
    ]
  },
  {
    name: "Product Backlog",
    description:
      "Capture what the users of a system want it to do as a priority-ranked list of independently buildable items.",
    provider: "company-a",
    url: baseUrl + "ProductBacklog",
    characteristics: [
      {
        id: "importance",
        value: "high",
        type: ORDINAL
      },
      {
        id: "user-involvement",
        value: "real",
        type: NOMINAL
      },
      {
        id: "clarity-and-stability",
        value: "high",
        type: ORDINAL
      },
      {
        id: "dependency",
        value: "low",
        type: ORDINAL
      },
      {
        id: "realization-strategy",
        value: "incremental",
        type: NOMINAL
      }
    ]
  },
  {
    name: "Product Ownership",
    description:
      "Own, evolve and communicate the vision, and guide the evolution of the product to achieve the vision.",
    provider: "company-a",
    url: baseUrl + "ProductOwnership",
    characteristics: [
      {
        id: "management-commitment",
        value: "high",
        type: ORDINAL
      },
      {
        id: "importance",
        value: "normal",
        type: ORDINAL
      },
      {
        id: "impact",
        value: "high",
        type: ORDINAL
      },
      {
        id: "tracing-project",
        value: "strong",
        type: ORDINAL
      }
    ]
  },
  {
    name: "Specification By Example",
    description:
      "Specification by example (SBE) is a collaborative approach to defining requirements and business-oriented functional tests for software products based on capturing and illustrating requirements using realistic examples instead of abstract statements. It is applied in the context of agile software development methods, in particular behavior-driven development. This approach is particularly successful for managing requirements and functional tests on large-scale projects of significant domain and organisational complexity.",
    provider: "company-a",
    url: baseUrl + "SpecificationByExample",
    characteristics: [
      {
        id: "management-commitment",
        value: "high",
        type: ORDINAL
      },
      {
        id: "importance",
        value: "high",
        type: ORDINAL
      },
      {
        id: "clarity-and-stability",
        value: "high",
        type: ORDINAL
      },
      {
        id: "user-involvement",
        value: "real",
        type: NOMINAL
      },
      {
        id: "impact",
        value: "high",
        type: ORDINAL
      }
    ]
  },
  {
    name: "Test Driven Development",
    description:
      "Test-driven development (TDD) is a software development process that relies on the repetition of a very short development cycle: requirements are turned into very specific test cases, then the software is improved to pass the new tests, only. This is opposed to software development that allows software to be added that is not proven to meet requirements. Writing the tests first: The tests should be written before the functionality that is to be tested. This has been claimed to have many benefits. It helps ensure that the application is written for testability, as the developers must consider how to test the application from the outset rather than adding it later. It also ensures that tests for every feature get written. Additionally, writing the tests first leads to a deeper and earlier understanding of the product requirements, ensures the effectiveness of the test code, and maintains a continual focus on software quality.",
    provider: "company-a",
    url: baseUrl + "TestDrivenDevelopment",
    characteristics: [
      {
        id: "dependency",
        value: "high",
        type: ORDINAL
      },
      {
        id: "expertise",
        value: "high",
        type: ORDINAL
      },
      {
        id: "tracing-project",
        value: "strong",
        type: ORDINAL
      },
      {
        id: "complexity",
        value: "high",
        type: ORDINAL
      },
      {
        id: "impact",
        value: "high",
        type: ORDINAL
      }
    ]
  }
];

module.exports = { METHOD_CHUNKS, METHOD_CHUNKS_ADDITIONAL };
