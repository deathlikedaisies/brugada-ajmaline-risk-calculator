import {
  getSexModelValue,
  modelConfig,
  type ModelInputs,
} from "./model-config";

export type RiskCategory =
  | "Lower placeholder model-based band"
  | "Intermediate placeholder model-based band"
  | "Higher placeholder model-based band";

export type ContributingFactor = {
  label: string;
  value: string;
  contribution: number;
  contributionStrength:
    | "Strong positive contribution"
    | "Moderate positive contribution"
    | "Small positive contribution"
    | "Moderate negative contribution"
    | "Small negative contribution"
    | "No material contribution";
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
  const sexModelValue = getSexModelValue(inputs.sex);

  return (
    modelConfig.intercept +
    coefficients.lassoClinicalPgs * inputs.lassoClinicalPgs +
    coefficients.sex * sexModelValue +
    coefficients.baselineQrs * inputs.baselineQrs +
    coefficients.baselineType2or3 * (inputs.baselineType2or3 ? 1 : 0) +
    coefficients.baselineFamilyBrugada *
      (inputs.baselineFamilyBrugada ? 1 : 0)
  );
}

export function logistic(linearPredictor: number): number {
  return 1 / (1 + Math.exp(-linearPredictor));
}

export function categorizeRisk(probability: number): RiskCategory {
  if (probability >= modelConfig.riskThresholds.higher) {
    return "Higher placeholder model-based band";
  }

  if (probability >= modelConfig.riskThresholds.intermediate) {
    return "Intermediate placeholder model-based band";
  }

  return "Lower placeholder model-based band";
}

export function getInterpretation(category: RiskCategory): string {
  if (category === "Higher placeholder model-based band") {
    return "The predicted probability falls in the higher placeholder model-based band. This band is for interface review only and is not a clinical action threshold.";
  }

  if (category === "Intermediate placeholder model-based band") {
    return "The predicted probability falls in the intermediate placeholder model-based band. This should be interpreted only as proof-of-concept research output.";
  }

  return "The predicted probability falls in the lower placeholder model-based band. This remains a research estimate and does not rule in or rule out Brugada-related clinical risk.";
}

export function getContributingFactors(
  inputs: ModelInputs,
): ContributingFactor[] {
  const { coefficients } = modelConfig;
  const sexModelValue = getSexModelValue(inputs.sex);
  const factors: ContributingFactor[] = [
    {
      label: "Baseline QRS duration",
      value: `${inputs.baselineQrs} ms`,
      contribution: coefficients.baselineQrs * inputs.baselineQrs,
      contributionStrength: getContributionStrength(
        coefficients.baselineQrs * inputs.baselineQrs,
      ),
    },
    {
      label: "LASSO Clinical PGS",
      value: `${inputs.lassoClinicalPgs.toFixed(2)} z-score`,
      contribution: coefficients.lassoClinicalPgs * inputs.lassoClinicalPgs,
      contributionStrength: getContributionStrength(
        coefficients.lassoClinicalPgs * inputs.lassoClinicalPgs,
      ),
    },
    {
      label: "Sex (model input)",
      value: `${inputs.sex === "female" ? "Female" : "Male"} = ${sexModelValue}`,
      contribution: coefficients.sex * sexModelValue,
      contributionStrength: getContributionStrength(
        coefficients.sex * sexModelValue,
      ),
    },
    {
      label: "Baseline type 2/3 Brugada ECG pattern",
      value: inputs.baselineType2or3 ? "Present = 1" : "Absent = 0",
      contribution:
        coefficients.baselineType2or3 * (inputs.baselineType2or3 ? 1 : 0),
      contributionStrength: getContributionStrength(
        coefficients.baselineType2or3 * (inputs.baselineType2or3 ? 1 : 0),
      ),
    },
    {
      label: "Family history of Brugada syndrome",
      value: inputs.baselineFamilyBrugada ? "Yes = 1" : "No = 0",
      contribution:
        coefficients.baselineFamilyBrugada *
        (inputs.baselineFamilyBrugada ? 1 : 0),
      contributionStrength: getContributionStrength(
        coefficients.baselineFamilyBrugada *
          (inputs.baselineFamilyBrugada ? 1 : 0),
      ),
    },
  ];

  return factors.sort(
    (first, second) =>
      Math.abs(second.contribution) - Math.abs(first.contribution),
  );
}

function getContributionStrength(
  contribution: number,
): ContributingFactor["contributionStrength"] {
  const magnitude = Math.abs(contribution);

  if (magnitude < 0.05) {
    return "No material contribution";
  }

  if (contribution >= 0.75) {
    return "Strong positive contribution";
  }

  if (contribution >= 0.25) {
    return "Moderate positive contribution";
  }

  if (contribution > 0) {
    return "Small positive contribution";
  }

  if (contribution <= -0.25) {
    return "Moderate negative contribution";
  }

  return "Small negative contribution";
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
