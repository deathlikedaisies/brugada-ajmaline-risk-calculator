export type Sex = "male" | "female";

export type ModelInputs = {
  lassoClinicalPgs: number;
  sex: Sex;
  baselineQrs: number;
  baselineType2or3: boolean;
  baselineFamilyBrugada: boolean;
};

export type ModelCoefficientKey =
  | "lassoClinicalPgs"
  | "sex"
  | "baselineQrs"
  | "baselineType2or3"
  | "baselineFamilyBrugada";

export type ModelConfig = {
  name: string;
  version: string;
  status: "proof-of-concept";
  formula: string;
  intendedUse: string;
  pgsInputNote: string;
  auc: number;
  aic: number;
  intercept: number;
  coefficients: Record<ModelCoefficientKey, number>;
  riskThresholds: {
    intermediate: number;
    higher: number;
  };
};

export const modelConfig: ModelConfig = {
  name: "BARC adjusted logistic regression model",
  version: "adjusted-logistic-0.1",
  status: "proof-of-concept",
  formula:
    "Pheno ~ LASSO_Clinical_Samples_pgs + Sex + baselineQRS + baseline.type2or3 + baseline.family.brugada",
  intendedUse:
    "Research interface demonstration only; not validated for routine clinical care.",
  pgsInputNote: "LASSO Clinical PGS is entered as a standardized z-score.",
  auc: 0.8133623,
  aic: 1008.132,
  intercept: -8.24611961,
  coefficients: {
    lassoClinicalPgs: 1.08438989,
    sex: 0.86091433,
    baselineQrs: 0.05922689,
    baselineType2or3: 1.06164985,
    baselineFamilyBrugada: 0.55983774,
  },
  riskThresholds: {
    // Placeholder category bands for UI review only; not validated thresholds.
    intermediate: 0.2,
    higher: 0.5,
  },
};

export const examplePatient: ModelInputs = {
  lassoClinicalPgs: 0.4,
  sex: "female",
  baselineQrs: 95,
  baselineType2or3: true,
  baselineFamilyBrugada: false,
};

export const examplePatientLabel =
  "Female = 1, standardized example PGS 0.4 for demonstration, baseline QRS 95 ms, type 2/3 ECG present, family history no";

export function getSexModelValue(sex: Sex): 0 | 1 {
  // Source data: Sex was coded 1 = male and 2 = female. The analysis script
  // transformed it with as.numeric(factor(Sex)) - 1, yielding male = 0,
  // female = 1. The UI preserves that model coding.
  return sex === "female" ? 1 : 0;
}
