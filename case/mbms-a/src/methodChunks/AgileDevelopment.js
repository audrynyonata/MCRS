export const AgileDevelopment = {
  nameId: "AgileDevelopment",
  name: "Agile Development",
  description:
    "Add value to a product by incrementally extending it, ensuring it is usable, releasable and maintainable.",
  characteristics: [
    {
      id: "management-commitment",
      value: "high"
    },
    {
      id: "user-involvement",
      value: "real"
    },
    {
      id: "goal-number",
      value: "multi-goals"
    },
    {
      id: "development-strategy",
      value: "iterative"
    },
    {
      id: "delivery-strategy",
      value: "incremental"
    }
  ],
  activitySpaces: [
    {
      nameId: "ImplementTheSystem",
      name: "Implement The System",
      description:
        "Build a system by implementing, testing and integrating one or more system elements. This includes bug fixing and unit testing.",
      activities: [
        {
          nameId: "EvolveAReleaseableProduct",
          name: "Evolve a Releasable Product",
          description:
            "Add value to a product and ensure it is usable and of production quality.",
          entryCriterions: {
            alphas: ["ProductBacklogItem.ReadyForDevelopment"],
            workProducts: ["TestCase.TestIdeasCaptured"]
          },
          completionCriterions: {
            alphas: [
              "Requirements.Addressed",
              "ProductBacklogItem.Done",
              "SoftwareSystem.Demonstrable",
              "SoftwareChange.CodeWorking"
            ],
            workProducts: ["TestCase.Scripted"]
          },
          competencies: [
            "StakeholderRepresentation.2",
            "Analysis.2",
            "Development.3",
            "Testing.3"
          ]
        }
      ]
    },
    {
      nameId: "TestTheSystem",
      name: "Test The System",
      description:
        "Verify that the system produced meets the stakeholders’ requirements.",
      activities: [
        {
          nameId: "EvolveAReleaseableProduct",
          name: "Evolve a Releasable Product",
          description:
            "Add value to a product and ensure it is usable and of production quality.",
          entryCriterions: {
            alphas: ["ProductBacklogItem.ReadyForDevelopment"],
            workProducts: ["TestCase.TestIdeasCaptured"]
          },
          completionCriterions: {
            alphas: [
              "Requirements.Addressed",
              "ProductBacklogItem.Done",
              "SoftwareSystem.Demonstrable",
              "SoftwareChange.CodeWorking"
            ],
            workProducts: ["TestCase.Scripted"]
          },
          competencies: [
            "StakeholderRepresentation.2",
            "Analysis.2",
            "Development.3",
            "Testing.3"
          ]
        }
      ]
    }
  ],
  alphas: [
    {
      nameId: "Requirements",
      name: "Requirements",
      description:
        "What the software system must do to address the opportunity and satisfy the stakeholders.",
      workProducts: [
        {
          nameId: "TestCase",
          name: "Test Case",
          description:
            "Defines test inputs and expected results to help evaluate whether a specific aspect of the system works correctly.",
          levelOfDetails: ["TestIdeasCaptured", "Scripted", "Automated"]
        }
      ],
      states: [
        {
          nameId: "Conceived",
          name: "Conceived",
          description: "The need for a new system has been agreed.",
          checklists: [
            "Stakeholders agree system is to be produced",
            "Users identified",
            "Funding stakeholders identified",
            "Opportunity clear"
          ]
        },
        {
          nameId: "Bounded",
          name: "Bounded",
          description: "The purpose and theme of the new system are clear.",
          checklists: [
            "Development stakeholders identified",
            "System purpose agreed",
            "System success clear",
            "Shared solution understanding exists",
            "Requirement's format agreed",
            "Requirements management in place",
            "Prioritization scheme clear",
            "Constraints identified & considered",
            "Assumptions clear"
          ]
        },
        {
          nameId: "Coherent",
          name: "Coherent",
          description:
            "The requirements provide a coherent description of the essential characteristics of the new system.",
          checklists: [
            "Requirements shared",
            "Requirements' origin clear",
            "Rationale clear",
            "Conflicts addressed",
            "Essential characteristics clear",
            "Requirements management in place",
            "Key usage scenarios explained",
            "Priorities clear",
            "Impact understood",
            "Team knows & agrees on what to deliver"
          ]
        },
        {
          nameId: "Acceptable",
          name: "Acceptable",
          description:
            "The requirements describe a system that is acceptable to the stakeholders.",
          checklists: [
            "Acceptable solution described",
            "Change under control",
            "Value to be realized clear",
            "Clear how opportunity addressed",
            "Testable"
          ]
        },
        {
          nameId: "Addressed",
          name: "Addressed",
          description:
            "Enough of the requirements have been addressed to satisfy the need for a new system in a way that is acceptable to the stakeholders.",
          checklists: [
            "Enough addressed to be acceptable",
            "Requirements and system match",
            "Value realized clear",
            "System worth making operational"
          ]
        },
        {
          nameId: "Fulfilled",
          name: "Fulfilled",
          description:
            "The requirements that have been addressed fully satisfy the need for a new system.",
          checklists: [
            "Stakeholders accept requirements",
            "No hindering requirements",
            "Requirements fully satisfied"
          ]
        }
      ],
      subalphaIds: ["ProductBacklogItem"]
    },
    {
      nameId: "ProductBacklogItem",
      name: "Product Backlog Item",
      description: "Something to build into the product to enhance its value.",
      workProducts: [],
      states: [
        {
          nameId: "Identified",
          name: "Identified",
          description:
            "A way to enhance the value of a product has been found. The item is sufficiently well understood that the team responsible for adding it to the product can plan and start the work to get this done.",
          checklists: [
            "A way to enhance the value of a product has been found",
            "The item has an agreed name that is unique and meaningful",
            "There is a shared high-level understanding of what the item is and why it is needed"
          ]
        },
        {
          nameId: "ReadyForDevelopment",
          name: "Ready For Development",
          description:
            "The item is sufficiently well understood that the team responsible for adding it to the product can plan and start the work to get this done.",
          checklists: [
            "The item is well-enough understood by the stakeholders and the team for it to be prioritized for development",
            "The value is understood enough to proceed",
            "The size of the item is understood enough to proceed",
            "The relative priority of the item is agreed"
          ]
        },
        {
          nameId: "Done",
          name: "Done",
          description:
            "The item has been implemented in the product and has been demonstrated to be of adequate quality.",
          checklists: [
            "The item has been included in the product",
            "The stakeholders are happy that the value associated with the item has been realized",
            "The item has been verified as meeting all relevant quality criteria",
            "The item has been validated as being usable and fit-for-purpose"
          ]
        }
      ],
      subalphaIds: []
    },
    {
      nameId: "SoftwareSystem",
      name: "Software System",
      description:
        "A system made up of software, hardware, and data that provides its primary value by the execution of the software.",
      workProducts: [],
      states: [
        {
          nameId: "ArchitectureSelected",
          name: "Architecture Selected",
          description:
            "An architecture has been selected that addresses the key technical risks and any applicable organizational constraints.",
          checklists: [
            "Architecture selection criteria agreed",
            "HW platforms identified",
            "Technologies selected",
            "System boundary known",
            "Decisions on system organization made",
            "Buy, build, reuse decisions made",
            "Key technical risks agreed to"
          ]
        },
        {
          nameId: "Demonstrable",
          name: "Demonstrable",
          description:
            "An executable version of the system is available that demonstrates the architecture is fit for purpose and supports functional and non-functional testing.",
          checklists: [
            "Key architectural characteristics demonstrated",
            "System exercised & performance measured",
            "Critical HW configurations demonstrated",
            "Critical interfaces demonstrated",
            "Integration with environment demonstrated",
            "Architecture accepted as fit-for-purpose"
          ]
        },
        {
          nameId: "Usable",
          name: "Usable",
          description:
            "The system is usable and demonstrates all of the quality characteristics of an operational system.",
          checklists: [
            "System can be operated",
            "System functionality tested",
            "System performance acceptable",
            "Defect levels acceptable",
            "System fully documented",
            "Release content known",
            "Added value clear"
          ]
        },
        {
          nameId: "Ready",
          name: "Ready",
          description:
            "The system (as a whole) has been accepted for deployment in a live environment.",
          checklists: [
            "User documentation available",
            "System accepted as fit-for-purpose",
            "Stakeholders want the system",
            "Operational support in place"
          ]
        },
        {
          nameId: "Operational",
          name: "Operational",
          description: "The system is in use in an operational environment.",
          checklists: [
            "System available for use  ",
            "System live",
            "Agreed service levels supported"
          ]
        },
        {
          nameId: "Retired",
          name: "Retired",
          description: "The system is no longer supported.",
          checklists: [
            "Replaced or discontinued",
            "No longer supported",
            "No authorized users",
            "Updates stopped"
          ]
        }
      ],
      subalphaIds: ["SoftwareChange"]
    },
    {
      nameId: "SoftwareChange",
      name: "Software Change",
      description:
        "A single change to the code-base that is made for a known purpose and is tested before it is integrated.",
      workProducts: [],
      states: [
        {
          nameId: "PurposeClear",
          name: "Purpose Clear",
          description:
            "It is clear what the goal or outcome of the code change is: for example, the new test or tests that need to pass have been written.",
          checklists: [
            "There is a new test or tests that the software change is designed to pass",
            "It is clear which requirement, change request or defect the software change is needed to meet",
            "The change can be made, tested, integrated and retested in a single developer sitting"
          ]
        },
        {
          nameId: "CodeWorking",
          name: "Code Working",
          description:
            "The code has been changed to achieve the purpose of the change and the implementation has been verified against relevant quality criteria.",
          checklists: [
            "The change has been made and tested",
            "The change has been integrated into the main product",
            "The integrated code has been tested",
            "All tests are passing"
          ]
        },
        {
          nameId: "CodeMaintainable",
          name: "Code Maintainable",
          description:
            "Any necessary code refactoring has been done to ensure that the code is not only working but is also maintainable (or, at the very least, no less maintainable than before the change was applied).",
          checklists: [
            "The code meets coding standards",
            "The code has been refactored post the change to ensure it is at least as maintainable as it was before the change was made",
            "All tests are passing"
          ]
        }
      ],
      subalphaIds: []
    },
    {
      nameId: "WayOfWorking",
      name: "Way of Working",
      description:
        "The tailored set of practices and tools used by a team to guide and support their work. The team evolves their way of working alongside their understanding of their mission and their working environment. As their work proceeds they continually reflect on their way of working and adapt it to their current context, if necessary.",
      workProducts: [],
      states: [
        {
          nameId: "PrinciplesEstablished",
          name: "Principles Established",
          description:
            "The principles, and constraints, that shape the way-of-working are established.",
          checklists: [
            "Team actively support principles",
            "Stakeholders agree with principles",
            "Tool needs agreed",
            "Approach recommended",
            "Operational context understood",
            "Practice & tool constraints known"
          ]
        },
        {
          nameId: "FoundationEstablished",
          name: "Foundation Established",
          description:
            "The key practices, and tools, that form the foundation of the way of working are selected and ready for use.",
          checklists: [
            "Key practices & tools selected",
            "Practices needed to start work agreed",
            "Non-negotiable practices & tools identified",
            "Gaps between available and needed way of working understood",
            "Gaps in capability understood",
            "Integrated way of working available"
          ]
        },
        {
          nameId: "InUse",
          name: "In Use",
          description:
            "Some members of the team are using, and adapting, the way-of-working.",
          checklists: [
            "Practices & tools in use",
            "Regularly inspected",
            "Adapted to context",
            "Supported by team",
            "Feedback mechanisms in place",
            "Practices & tools support collaboration"
          ]
        },
        {
          nameId: "InPlace",
          name: "In Place",
          description:
            "All team members are using the way of working to accomplish their work.",
          checklists: [
            "Used by whole team",
            "Accessible to whole team",
            "Inspected and adapted by whole team"
          ]
        },
        {
          nameId: "WorkingWell",
          name: "Working Well",
          description:
            "The team’s way of working is working well for the team.",
          checklists: [
            "Predictable progress being made",
            "Practices naturally applied",
            "Tools naturally support way-of-working",
            "Continually tuned"
          ]
        },
        {
          nameId: "Retired",
          name: "Retired",
          description: "The way of working is no longer in use by the team.",
          checklists: ["No longer in use", "Lessons learned shared"]
        }
      ],
      subalphaIds: []
    }
  ],
  competencies: [
    {
      nameId: "StakeholderRepresentation",
      name: "Stakeholder Representation",
      description:
        "The ability to gather, communicate and balance the needs of other stakeholders, and accurately represent their views. The stakeholder representation competency is the empathic ability to stand in for and accurately reflect the opinions, rights and obligations of other stakeholders.",
      levels: [
        {
          name: "Assists",
          description:
            "Demonstrates a basic understanding of the concepts and can follow instructions."
        },
        {
          name: "Applies",
          description:
            "Able to apply the concepts in simple contexts by routinely applying the experience gained so far."
        },
        {
          name: "Masters",
          description:
            "Able to apply the concepts in most contexts and has the experience to work without supervision."
        },
        {
          name: "Adapts",
          description:
            "Able to apply judgment on when and how to apply the concepts to more complex contexts. Can enable others to apply the concepts."
        },
        {
          name: "Innovates",
          description:
            "A recognized expert, able to extend the concepts to new contexts and inspire others."
        }
      ]
    },
    {
      nameId: "Analysis",
      name: "Analysis",
      description:
        "The ability to understand opportunities and their related stakeholder needs, and transform them into an agreed and consistent set of requirements. The analysis competency is the deductive ability to understand the situation, context, concepts and problems, identify appropriate high-level solutions, and evaluate and draw conclusions by applying logical thinking.",
      levels: [
        {
          name: "Assists",
          description:
            "Demonstrates a basic understanding of the concepts and can follow instructions."
        },
        {
          name: "Applies",
          description:
            "Able to apply the concepts in simple contexts by routinely applying the experience gained so far."
        },
        {
          name: "Masters",
          description:
            "Able to apply the concepts in most contexts and has the experience to work without supervision."
        },
        {
          name: "Adapts",
          description:
            "Able to apply judgment on when and how to apply the concepts to more complex contexts. Can enable others to apply the concepts."
        },
        {
          name: "Innovates",
          description:
            "A recognized expert, able to extend the concepts to new contexts and inspire others."
        }
      ]
    },
    {
      nameId: "Development",
      name: "Development",
      description:
        "The ability to design and program effective software systems following the standards and norms agreed by the team. The development competency is the mental ability to conceive and produce a software system, or one of its elements, for a specific function or end. It enables a team to produce software systems that meet the requirements.",
      levels: [
        {
          name: "Assists",
          description:
            "Demonstrates a basic understanding of the concepts and can follow instructions."
        },
        {
          name: "Applies",
          description:
            "Able to apply the concepts in simple contexts by routinely applying the experience gained so far."
        },
        {
          name: "Masters",
          description:
            "Able to apply the concepts in most contexts and has the experience to work without supervision."
        },
        {
          name: "Adapts",
          description:
            "Able to apply judgment on when and how to apply the concepts to more complex contexts. Can enable others to apply the concepts."
        },
        {
          name: "Innovates",
          description:
            "A recognized expert, able to extend the concepts to new contexts and inspire others."
        }
      ]
    },
    {
      nameId: "Testing",
      name: "Testing",
      description:
        "The ability to test a system, verifying that it is usable and that it meets the requirements. The testing competency is an observational, comparative, detective and destructive ability that enables the system to be tested.",
      levels: [
        {
          name: "Assists",
          description:
            "Demonstrates a basic understanding of the concepts and can follow instructions."
        },
        {
          name: "Applies",
          description:
            "Able to apply the concepts in simple contexts by routinely applying the experience gained so far."
        },
        {
          name: "Masters",
          description:
            "Able to apply the concepts in most contexts and has the experience to work without supervision."
        },
        {
          name: "Adapts",
          description:
            "Able to apply judgment on when and how to apply the concepts to more complex contexts. Can enable others to apply the concepts."
        },
        {
          name: "Innovates",
          description:
            "A recognized expert, able to extend the concepts to new contexts and inspire others."
        }
      ]
    }
  ],
  patterns: [
    {
      name: "Development Roles",
      nameId: "DevelopmentRoles",
      description:
        "Development Role patterns provide guidance on roles and associated responsibilities and competencies required to develop a solution to meet the needs of the stakeholders.",
      alphas: [],
      activities: [],
      competencies: [],
      subpatternIds: ["CrossFunctionalTeam"]
    },
    {
      name: "Cross-Functional Team",
      nameId: "CrossFunctionalTeam",
      description:
        "The team contains all the specialist skills needed to get the whole job done. For a team to evolve a complex product such as a software system, this typically means the team members between them must have all the following competencies: Stakeholder Representation, Analysis, Development, Testing.",
      alphas: [],
      activities: ["EvolveAReleaseableProduct"],
      competencies: [],
      subpatternIds: []
    },
    {
      name: "Technical Excellence",
      nameId: "TechnicalExcellence",
      description:
        "Technical Excellence patterns provide guidance on how to evolve a high-quality technical solution.",
      alphas: [],
      activities: [],
      competencies: [],
      subpatternIds: [
        "ManageTechnicalDebt",
        "SharedOwnership",
        "MinimalDesign",
        "BuildQualityIn",
        "AutomateAsMuchAsPossible",
        "FastFeedbackLoops"
      ]
    },
    {
      name: "Manage Technical Debt",
      nameId: "ManageTechnicalDebt",
      description:
        "If value is built into a product one small value increment at a time, and just enough is done to make the product releasable each time, some desired changes to the code-base may be deferred, such as the fixing of non-critical defects. Each such item of technical debt should be logged, and its subsequent removal prioritized against the adding of more user-requested value into the product.",
      alphas: [],
      activities: ["EvolveAReleaseableProduct"],
      competencies: [],
      subpatternIds: []
    },
    {
      name: "Shared Ownership",
      nameId: "SharedOwnership",
      description:
        "The team takes shared responsibility for the product, and no parts of the software system can be considered “no go areas” for any team members. This reduces the risks and delays associated with bottlenecks and single points-of-failure. Strategies for achieving this include pair-working, including pair-programming, and ensuring all code is unit-tested and refactored, so it is clear, clean and maintainable by anyone.",
      alphas: [],
      activities: ["EvolveAReleaseableProduct"],
      competencies: [],
      subpatternIds: []
    },
    {
      name: "Minimal Design",
      nameId: "MinimalDesign",
      description:
        "Agile teams think hard about design, but focus on adopting the simplest approach to achieving the known things that must be achieved next. This acts to minimize complexity, risk and time-to-value, and maximize return-on-investment. The design strategy is then evolved continuously as more is learned.",
      alphas: [],
      activities: ["EvolveAReleaseableProduct"],
      competencies: [],
      subpatternIds: []
    },
    {
      name: "Build Quality In",
      nameId: "BuildQualityIn",
      description:
        "Quality is planned, designed and built in: The tests that define acceptable quality are agreed before work is started (e.g. at Product Backlog Item and unit test level), An item is not finished until adequate quality has been achieved, Enough design is done to ensure the right approach is taken, and continuous refactoring is done to ensure that the code-base stays robust and maintainable.",
      alphas: [],
      activities: ["EvolveAReleaseableProduct"],
      competencies: [],
      subpatternIds: []
    },
    {
      name: "Automate as Much as Possible",
      nameId: "AutomateAsMuchAsPossible",
      description:
        "If a software system is evolved one increment at a time, while ensuring its quality, many actions are repeated frequently. If these are not automated, they will be too slow and error-prone. For these reasons, actions that should be automated include: Continuous Integration / Build, Code Quality / Unit Tests, Acceptance / Regression Tests, Environment Preparation, Deployment.",
      alphas: [],
      activities: ["EvolveAReleaseableProduct"],
      competencies: [],
      subpatternIds: []
    },
    {
      name: "Fast Feedback Loops",
      nameId: "FastFeedbackLoops",
      description:
        "Key to agile development is getting as much feedback as possible, as early as possible, in order to converge on an accurate solution. To achieve this, tight feedback loops should exist at many levels, including: Pair-Programming, Test-Driven Development, Continuous Integration, Frequent Demonstrations, Validated-learning achieved by releasing early and often.",
      alphas: [],
      activities: ["EvolveAReleaseableProduct"],
      competencies: [],
      subpatternIds: []
    }
  ]
};
