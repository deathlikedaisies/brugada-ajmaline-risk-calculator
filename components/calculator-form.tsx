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
  age: 45,
  sex: "female",
  familyHistory: false,
  baselineQrs: 98,
  type23Ecg: false,
  pgsScore: 0,
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
    <div className="grid gap-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)] lg:items-start">
      <section
        aria-labelledby="calculator-inputs-heading"
        className="rounded-lg border border-slate-200 bg-white shadow-sm"
      >
        <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-5 sm:px-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500">
              Predictor entry
            </p>
            <h2
              id="calculator-inputs-heading"
              className="mt-1 text-2xl font-semibold tracking-normal text-slate-950"
            >
              Clinical, ECG, and genetic predictors
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Enter predictor values available before or at ajmaline challenge.
              The estimate updates immediately as values change.
            </p>
          </div>
          <div className="md:max-w-64">
            <button
              type="button"
              onClick={() => setInputs(examplePatient)}
              className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              Load demo patient
            </button>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              {examplePatientLabel}
            </p>
          </div>
        </div>

        <form className="px-5 py-6 sm:px-6">
          <div className="grid gap-8">
            <InputGroup title="Patient characteristics">
              <NumberField
                id="age"
                label="Age at ajmaline challenge"
                helperText="Age in years at provocation testing or index assessment."
                min={0}
                max={120}
                step={1}
                placeholder="45"
                value={inputs.age}
                unit="years"
                onChange={(value) => updateInput("age", value)}
              />

              <RadioGroup
                legend="Sex recorded for model input"
                helperText="Sex variable as represented in the placeholder model."
                name="sex"
                options={[
                  { label: "Female", value: "female" },
                  { label: "Male", value: "male" },
                ]}
                value={inputs.sex}
                onChange={(value) => updateInput("sex", value)}
              />
            </InputGroup>

            <InputGroup title="Clinical history and baseline ECG">
              <BooleanGroup
                legend="Family history of Brugada syndrome or sudden cardiac death"
                helperText="Documented Brugada syndrome or unexplained sudden cardiac death in a clinically relevant relative."
                name="familyHistory"
                value={inputs.familyHistory}
                trueLabel="Present"
                falseLabel="Absent"
                onChange={(value) => updateInput("familyHistory", value)}
              />

              <NumberField
                id="baseline-qrs"
                label="Baseline QRS duration"
                helperText="Resting ECG QRS duration before ajmaline administration."
                min={40}
                max={220}
                step={1}
                placeholder="100"
                value={inputs.baselineQrs}
                unit="ms"
                onChange={(value) => updateInput("baselineQrs", value)}
              />

              <BooleanGroup
                legend="Baseline type 2 or type 3 Brugada ECG pattern"
                helperText="Type 2 or type 3 Brugada ECG pattern before drug challenge."
                name="type23Ecg"
                value={inputs.type23Ecg}
                trueLabel="Present"
                falseLabel="Absent"
                onChange={(value) => updateInput("type23Ecg", value)}
              />
            </InputGroup>

            <InputGroup title="Genetic predictor">
              <NumberField
                id="pgs-score"
                label="Standardized polygenic score"
                helperText="Standardized Brugada-associated PGS value."
                min={-5}
                max={5}
                step={0.1}
                placeholder="0.0"
                value={inputs.pgsScore}
                unit="standardized"
                onChange={(value) => updateInput("pgsScore", value)}
              />
            </InputGroup>
          </div>
        </form>
      </section>

      <div className="space-y-4 lg:sticky lg:top-6">
        <ResultCard result={result} />
        <section className="rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700 shadow-sm">
          <h2 className="font-semibold text-slate-950">Important limitation</h2>
          <p className="mt-2">
            This proof of concept uses placeholder coefficients and placeholder
            risk thresholds. The output is a model-based research estimate only;
            it must not guide patient management or replace clinical guidelines,
            electrophysiology review, or physician judgment.
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
      <h3 className="border-b border-slate-200 pb-2 text-sm font-semibold uppercase text-slate-500">
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
        className="block text-base font-semibold text-slate-950"
      >
        {label}
      </label>
      <p className="mt-1 text-sm leading-6 text-slate-600">{helperText}</p>
      <div className="mt-2 flex rounded-md border border-slate-300 bg-white focus-within:border-cyan-700 focus-within:ring-2 focus-within:ring-cyan-700/15">
        <input
          id={id}
          type="number"
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.currentTarget.valueAsNumber || 0)}
          className="min-w-0 flex-1 rounded-l-md px-3 py-3 text-base text-slate-950 outline-none"
        />
        <span className="flex items-center border-l border-slate-200 px-3 text-sm font-medium text-slate-600">
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
      <legend className="text-base font-semibold text-slate-950">
        {legend}
      </legend>
      <p className="mt-1 text-sm leading-6 text-slate-600">{helperText}</p>
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-3 rounded-md border border-slate-300 px-3 py-3 text-base text-slate-800 has-[:checked]:border-cyan-700 has-[:checked]:bg-cyan-50 has-[:checked]:text-cyan-950"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="size-4 accent-cyan-800"
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
      <legend className="text-base font-semibold text-slate-950">
        {legend}
      </legend>
      <p className="mt-1 text-sm leading-6 text-slate-600">{helperText}</p>
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option.label}
            className="flex cursor-pointer items-center gap-3 rounded-md border border-slate-300 px-3 py-3 text-base text-slate-800 has-[:checked]:border-cyan-700 has-[:checked]:bg-cyan-50 has-[:checked]:text-cyan-950"
          >
            <input
              type="radio"
              name={name}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="size-4 accent-cyan-800"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
