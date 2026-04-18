export type Sex = "female" | "male";

export type ModelInputs = {
  age: number;
  sex: Sex;
  familyHistory: boolean;
  baselineQrs: number;
  type23Ecg: boolean;
  pgsScore: number;
};

export type ModelCoefficientKey =
  | "age"
  | "maleSex"
  | "familyHistory"
  | "baselineQrs"
  | "type23Ecg"
  | "pgsScore";

export type ModelConfig = {
  name: string;
  version: string;
  status: "placeholder";
  intendedUse: string;
  intercept: number;
  coefficients: Record<ModelCoefficientKey, number>;
  riskThresholds: {
    intermediate: number;
    higher: number;
  };
};

export const modelConfig: ModelConfig = {
  name: "BARC proof-of-concept logistic model",
  version: "placeholder-0.1",
  status: "placeholder",
  intendedUse:
    "Research interface demonstration only; not validated for routine clinical care.",
  intercept: -3.2,
  coefficients: {
    age: 0.018,
    maleSex: 0.42,
    familyHistory: 0.58,
    baselineQrs: 0.012,
    type23Ecg: 0.76,
    pgsScore: 0.35,
  },
  riskThresholds: {
    // Placeholder category thresholds for UI review only.
    intermediate: 0.08,
    higher: 0.2,
  },
};

export const examplePatient: ModelInputs = {
  age: 42,
  sex: "male",
  familyHistory: true,
  baselineQrs: 104,
  type23Ecg: true,
  pgsScore: 0.8,
};

export const examplePatientLabel =
  "42-year-old male, family history present, baseline QRS 104 ms, type 2/3 ECG present, PGS 0.8";
