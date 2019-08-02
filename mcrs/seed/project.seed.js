const testProject = {
  name: "Test Project",
  provider: "company-a-ltd",
  description: "IS security chunks evaluation.",
  characteristics: [
    {
      characteristic: "impact",
      rule: "maximum"
    },
    {
      characteristic: "level-of-innovation",
      rule: "maximum"
    },
    {
      characteristic: "expertise",
      rule: "minimum"
    },
    {
      characteristic: "guidance",
      ref: "predefined taxonomy/heuristics/guidelines",
      rule: "preference_list",
      value: ["predefined taxonomy", "heuristics", "guidelines"]
    },
    {
      characteristic: "approach",
      ref: "systemic/exploratory/explanatory",
      rule: "preference_list",
      value: ["systemic", "exploratory", "explanatory"]
    },
    {
      characteristic: "formalism",
      ref: "formal/semi-formal/informal",
      rule: "preference_list",
      value: ["formal", "semi-formal", "informal"]
    }
  ]
};

module.exports = { testProject };
