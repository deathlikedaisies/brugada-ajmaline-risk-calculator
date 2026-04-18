import { modelConfig, type ModelInputs } from "./model-config";

export type RiskCategory = "Lower" | "Intermediate" | "Higher";

export type ContributingFactor = {
  label: string;
  value: string;
  contribution: number;
  direction: "Increases estimate" | "Decreases estimate" | "No model contribution";
};

export type CalculationResult = {
  linearPredictor: number;
  probability: number;
  percentage: number;
  category: RiskCategory;
  interpretation: string;
  contributingFactors: ContributingFactor[];
};

export function calculateLinearPredictor(inputs: ModelInputs): number {
  const { coefficients } = modelConfig;

  return (
    modelConfig.intercept +
    coefficients.age * inputs.age +
    coefficients.maleSex * (inputs.sex === "male" ? 1 : 0) +
    coefficients.familyHistory * (inputs.familyHistory ? 1 : 0) +
    coefficients.baselineQrs * inputs.baselineQrs +
    coefficients.type23Ecg * (inputs.type23Ecg ? 1 : 0) +
    coefficients.pgsScore * inputs.pgsScore
  );
}

export function logistic(linearPredictor: number): number {
  return 1 / (1 + Math.exp(-linearPredictor));
}

export function categorizeRisk(probability: number): RiskCategory {
  if (probability >= modelConfig.riskThresholds.higher) {
    return "Higher";
  }

  if (probability >= modelConfig.riskThresholds.intermediate) {
    return "Intermediate";
  }

  return "Lower";
}

export function getInterpretation(category: RiskCategory): string {
  if (category === "Higher") {
    return "This model-based estimate falls in the higher range using placeholder thresholds. It is research output and must not be interpreted as a management recommendation.";
  }

  if (category === "Intermediate") {
    return "This model-based estimate falls in the intermediate range using placeholder thresholds. It should be reviewed only in the context of model development and validation.";
  }

  return "This model-based estimate falls in the lower range using placeholder thresholds. It remains a research estimate and does not rule in or rule out Brugada-related clinical risk.";
}

export function getContributingFactors(
  inputs: ModelInputs,
): ContributingFactor[] {
  const { coefficients } = modelConfig;
  const factors: ContributingFactor[] = [
    {
      label: "Baseline QRS duration",
      value: `${inputs.baselineQrs} ms`,
      contribution: coefficients.baselineQrs * inputs.baselineQrs,
      direction: getContributionDirection(
        coefficients.baselineQrs * inputs.baselineQrs,
      ),
    },
    {
      label: "Age at assessment",
      value: `${inputs.age} years`,
      contribution: coefficients.age * inputs.age,
      direction: getContributionDirection(coefficients.age * inputs.age),
    },
    {
      label: "Type 2/3 ECG pattern",
      value: inputs.type23Ecg ? "Present" : "Absent",
      contribution: coefficients.type23Ecg * (inputs.type23Ecg ? 1 : 0),
      direction: getContributionDirection(
        coefficients.type23Ecg * (inputs.type23Ecg ? 1 : 0),
      ),
    },
    {
      label: "Family history",
      value: inputs.familyHistory ? "Present" : "Absent",
      contribution: coefficients.familyHistory * (inputs.familyHistory ? 1 : 0),
      direction: getContributionDirection(
        coefficients.familyHistory * (inputs.familyHistory ? 1 : 0),
      ),
    },
    {
      label: "Polygenic score",
      value: `${inputs.pgsScore.toFixed(1)} standardized units`,
      contribution: coefficients.pgsScore * inputs.pgsScore,
      direction: getContributionDirection(coefficients.pgsScore * inputs.pgsScore),
    },
    {
      label: "Sex",
      value: inputs.sex === "male" ? "Male" : "Female",
      contribution: coefficients.maleSex * (inputs.sex === "male" ? 1 : 0),
      direction: getContributionDirection(
        coefficients.maleSex * (inputs.sex === "male" ? 1 : 0),
      ),
    },
  ];

  return factors
    .sort(
      (first, second) =>
        Math.abs(second.contribution) - Math.abs(first.contribution),
    )
    .slice(0, 4);
}

function getContributionDirection(
  contribution: number,
): ContributingFactor["direction"] {
  if (contribution > 0) {
    return "Increases estimate";
  }

  if (contribution < 0) {
    return "Decreases estimate";
  }

  return "No model contribution";
}

export function calculateRisk(inputs: ModelInputs): CalculationResult {
  const linearPredictor = calculateLinearPredictor(inputs);
  const probability = logistic(linearPredictor);
  const category = categorizeRisk(probability);

  return {
    linearPredictor,
    probability,
    percentage: probability * 100,
    category,
    interpretation: getInterpretation(category),
    contributingFactors: getContributingFactors(inputs),
  };
}
