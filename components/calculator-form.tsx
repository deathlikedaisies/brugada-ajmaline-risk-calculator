"use client";

import { useMemo, useState, type ReactNode } from "react";
import { calculateRisk } from "@/lib/calculator";
import {
  examplePatient,
  examplePatientLabel,
  type ModelInputs,
  type Sex,
} from "@/lib/model-config";
import { ResultCard } from "./result-card";

const initialInputs: ModelInputs = {
  lassoClinicalPgs: 0,
  sex: "male",
  baselineQrs: 90,
  baselineType2or3: false,
  baselineFamilyBrugada: false,
};

export function CalculatorForm() {
  const [inputs, setInputs] = useState<ModelInputs>(initialInputs);
  const result = useMemo(() => calculateRisk(inputs), [inputs]);

  function updateInput<Key extends keyof ModelInputs>(
    key: Key,
    value: ModelInputs[Key],
  ) {
    setInputs((current) => ({
      ...current,
      [key]: value,
    }));
  }

  return (
    <div className="grid gap-7 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)] lg:items-start xl:gap-8">
      <section
        aria-labelledby="calculator-inputs-heading"
        className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-[0_16px_45px_rgba(24,24,27,0.055)]"
      >
        <div className="flex flex-col gap-5 border-b border-zinc-200 bg-white px-5 py-5 sm:px-7 sm:py-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-zinc-500">
              Predictor entry
            </p>
            <h2
              id="calculator-inputs-heading"
              className="mt-2 text-2xl font-semibold text-zinc-950"
            >
              Model inputs
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
              Variables correspond to predictors included in the adjusted logistic
              regression model.
            </p>
          </div>
          <div className="w-full md:max-w-64">
            <button
              type="button"
              onClick={() => setInputs(examplePatient)}
              className="min-h-11 w-full rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-800 shadow-sm transition hover:border-zinc-400 hover:bg-zinc-50"
            >
              Load example case
            </button>
            <p className="mt-2 text-xs leading-5 text-zinc-500">
              {examplePatientLabel}
            </p>
          </div>
        </div>

        <form className="px-5 py-6 sm:px-7 sm:py-7">
          <div className="grid gap-9">
            <InputGroup title="Patient characteristics">
              <RadioGroup
                legend="Sex"
                helperText="Sex (encoded for model input: male = 0, female = 1)."
                name="sex"
                options={[
                  { label: "Male = 0", value: "male" },
                  { label: "Female = 1", value: "female" },
                ]}
                value={inputs.sex}
                onChange={(value) => updateInput("sex", value)}
              />
            </InputGroup>

            <InputGroup title="Clinical history and baseline ECG">
              <BooleanGroup
                legend="Baseline type 2/3 Brugada ECG pattern"
                helperText="Absent = 0, Present = 1"
                name="baselineType2or3"
                value={inputs.baselineType2or3}
                trueLabel="Present"
                falseLabel="Absent"
                onChange={(value) => updateInput("baselineType2or3", value)}
              />

              <NumberField
                id="baseline-qrs"
                label="Baseline QRS duration"
                helperText="Enter baseline QRS duration in milliseconds."
                min={40}
                max={220}
                step={1}
                placeholder="90"
                value={inputs.baselineQrs}
                unit="ms"
                onChange={(value) => updateInput("baselineQrs", value)}
              />

              <BooleanGroup
                legend="Family history of Brugada syndrome"
                helperText="No = 0, Yes = 1"
                name="baselineFamilyBrugada"
                value={inputs.baselineFamilyBrugada}
                trueLabel="Yes"
                falseLabel="No"
                onChange={(value) =>
                  updateInput("baselineFamilyBrugada", value)
                }
              />
            </InputGroup>

            <InputGroup title="Polygenic predictor">
              <NumberField
                id="lasso-clinical-pgs"
                label="LASSO Clinical PGS"
                helperText="Standardized composite polygenic score used in the adjusted model."
                min={-5}
                max={5}
                step={0.1}
                placeholder="0.0"
                value={inputs.lassoClinicalPgs}
                unit="z-score"
                onChange={(value) => updateInput("lassoClinicalPgs", value)}
              />
            </InputGroup>
          </div>
        </form>
      </section>

      <div className="space-y-4 lg:sticky lg:top-24">
        <ResultCard result={result} />
        <section className="rounded-lg border border-rose-200 bg-white p-5 text-sm leading-6 text-zinc-700 shadow-[0_10px_30px_rgba(24,24,27,0.045)]">
          <h2 className="font-semibold text-zinc-950">Important limitation</h2>
          <p className="mt-2">
            This proof of concept uses adjusted model coefficients, while risk
            bands remain placeholder model-based bands. The output is a
            model-based research estimate only; it must not guide patient
            management or replace clinical guidelines, electrophysiology review,
            or physician judgment.
          </p>
        </section>
      </div>
    </div>
  );
}

type InputGroupProps = {
  title: string;
  children: ReactNode;
};

function InputGroup({ title, children }: InputGroupProps) {
  return (
    <section>
      <h3 className="border-b border-zinc-200 pb-3 text-sm font-semibold uppercase text-zinc-500">
        {title}
      </h3>
      <div className="mt-5 grid gap-6">{children}</div>
    </section>
  );
}

type NumberFieldProps = {
  id: string;
  label: string;
  helperText: string;
  min: number;
  max: number;
  step: number;
  placeholder: string;
  value: number;
  unit: string;
  onChange: (value: number) => void;
};

function NumberField({
  id,
  label,
  helperText,
  min,
  max,
  step,
  placeholder,
  value,
  unit,
  onChange,
}: NumberFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-base font-semibold text-zinc-950"
      >
        {label}
      </label>
      <p className="mt-1 text-sm leading-6 text-zinc-600">{helperText}</p>
      <div className="mt-3 flex min-h-12 overflow-hidden rounded-md border border-zinc-300 bg-white shadow-sm transition focus-within:border-teal-700 focus-within:ring-2 focus-within:ring-teal-700/15">
        <input
          id={id}
          type="number"
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.currentTarget.valueAsNumber || 0)}
          className="min-w-0 flex-1 bg-white px-3.5 py-3 text-base text-zinc-950 outline-none"
        />
        <span className="flex min-w-20 items-center justify-center border-l border-zinc-200 bg-zinc-50 px-3 text-sm font-medium text-zinc-600">
          {unit}
        </span>
      </div>
    </div>
  );
}

type RadioGroupProps = {
  legend: string;
  helperText: string;
  name: string;
  options: Array<{ label: string; value: Sex }>;
  value: Sex;
  onChange: (value: Sex) => void;
};

function RadioGroup({
  legend,
  helperText,
  name,
  options,
  value,
  onChange,
}: RadioGroupProps) {
  return (
    <fieldset>
      <legend className="text-base font-semibold text-zinc-950">
        {legend}
      </legend>
      <p className="mt-1 text-sm leading-6 text-zinc-600">{helperText}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-zinc-300 bg-white px-3.5 py-3 text-base font-medium text-zinc-800 shadow-sm transition hover:border-zinc-400 hover:bg-zinc-50 has-[:checked]:border-teal-700 has-[:checked]:bg-teal-50 has-[:checked]:text-teal-950"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="size-4 accent-teal-800"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

type BooleanGroupProps = {
  legend: string;
  helperText: string;
  name: string;
  value: boolean;
  trueLabel: string;
  falseLabel: string;
  onChange: (value: boolean) => void;
};

function BooleanGroup({
  legend,
  helperText,
  name,
  value,
  trueLabel,
  falseLabel,
  onChange,
}: BooleanGroupProps) {
  const options = [
    { label: falseLabel, value: false },
    { label: trueLabel, value: true },
  ];

  return (
    <fieldset>
      <legend className="text-base font-semibold text-zinc-950">
        {legend}
      </legend>
      <p className="mt-1 text-sm leading-6 text-zinc-600">{helperText}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option.label}
            className="flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-zinc-300 bg-white px-3.5 py-3 text-base font-medium text-zinc-800 shadow-sm transition hover:border-zinc-400 hover:bg-zinc-50 has-[:checked]:border-teal-700 has-[:checked]:bg-teal-50 has-[:checked]:text-teal-950"
          >
            <input
              type="radio"
              name={name}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="size-4 accent-teal-800"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
