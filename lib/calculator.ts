import {
  getSexModelValue,
  modelConfig,
  type ModelInputs,
} from "./model-config";
import { calculateDerivationPercentile } from "./percentiles";

export type RiskCategory =
  | "Lower placeholder model-based band"
  | "Intermediate placeholder model-based band"
  | "Higher placeholder model-based band";

export type ContributingFactor = {
  label: string;
  value: string;
  contribution: number;
  contributionStrength:
    | "Positive coefficient contribution"
    | "Negative or minimal coefficient contribution";
};

export type CalculationResult = {
  linearPredictor: number;
  probability: number;
  percentage: number;
  percentile: number;
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

export function getInterpretation(): string {
  return "This percentile represents the patient's relative position within the derivation cohort distribution and reflects internal model performance. It should not be interpreted as an absolute or externally generalizable clinical risk.";
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
      label: "Sex",
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
  return contribution > 0
    ? "Positive coefficient contribution"
    : "Negative or minimal coefficient contribution";
}

export function calculateRisk(inputs: ModelInputs): CalculationResult {
  const linearPredictor = calculateLinearPredictor(inputs);
  const probability = logistic(linearPredictor);
  const percentile = calculateDerivationPercentile(linearPredictor);
  const category = categorizeRisk(probability);

  return {
    linearPredictor,
    probability,
    percentage: probability * 100,
    percentile,
    category,
    interpretation: getInterpretation(),
    contributingFactors: getContributingFactors(inputs),
  };
}
