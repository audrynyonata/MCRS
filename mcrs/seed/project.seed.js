import { ORDINAL, NOMINAL, NUMERICAL } from "./characteristic.seed";

export const testProject = {
  name: "Test Project",
  provider: "company-a-ltd",
  description: "IS security chunks evaluation.",
  characteristics: [
    {
      id: "impact",
      optimal_sense: "maximum",
      type: ORDINAL
    },
    {
      id: "level-of-innovation",
      optimal_sense: "maximum",
      type: ORDINAL
    },
    {
      id: "expertise",
      optimal_sense: "minimum",
      type: ORDINAL
    },
    {
      id: "guidance",
      optimal_sense: "predefined taxonomy",
      type: NOMINAL
    },
    {
      id: "approach",
      optimal_sense: "systemic",
      type: NOMINAL
    },
    {
      id: "formalism",
      optimal_sense: "formal",
      type: NOMINAL
    }
  ]
};
