"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
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
  const [hasPolygenicInput, setHasPolygenicInput] = useState(false);
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
    <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1.04fr)_minmax(340px,0.96fr)] lg:items-start xl:gap-10">
      <section
        aria-labelledby="calculator-inputs-heading"
        className="min-w-0 overflow-hidden rounded-lg border border-[#eadfdf] bg-white shadow-[0_10px_30px_rgba(24,24,27,0.045)]"
      >
        <div className="flex flex-col gap-5 border-b border-[#eadfdf] bg-rose-50/30 px-4 py-5 sm:px-6 sm:py-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-[#8f3f3f]">
              Predictor entry
            </p>
            <h2
              id="calculator-inputs-heading"
              className="mt-2 text-xl font-semibold text-zinc-950 sm:text-2xl"
            >
              Model inputs
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
              Predictors included in the adjusted logistic regression model.
            </p>
          </div>
          <div className="w-full md:max-w-64">
            <button
              type="button"
              onClick={() => {
                setHasPolygenicInput(true);
                setInputs(examplePatient);
              }}
              className="min-h-12 w-full rounded-md border border-[#eadfdf] bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-sm transition hover:border-[#d9c0c0] hover:bg-rose-50/40 hover:text-zinc-950"
            >
              Load example case
            </button>
            <p className="mt-2 text-xs leading-5 text-zinc-500">
              {examplePatientLabel}
            </p>
          </div>
        </div>

        <form className="px-4 py-6 sm:px-6 sm:py-7">
          <div className="grid gap-9">
            <InputGroup title="Clinical inputs">
              <RadioGroup
                legend="Sex"
                helperText="Model coding: male = 0, female = 1."
                name="sex"
                options={[
                  { label: "Male = 0", value: "male" },
                  { label: "Female = 1", value: "female" },
                ]}
                value={inputs.sex}
                onChange={(value) => updateInput("sex", value)}
              />

              <BooleanGroup
                legend="Baseline type 2/3 Brugada ECG pattern"
                helperText="Absent = 0, present = 1."
                name="baselineType2or3"
                value={inputs.baselineType2or3}
                trueLabel="Present"
                falseLabel="Absent"
                onChange={(value) => updateInput("baselineType2or3", value)}
              />

              <NumberField
                id="baseline-qrs"
                label="Baseline QRS duration"
                helperText="Baseline QRS duration in milliseconds."
                min={40}
                max={220}
                step={1}
                placeholder="90"
                value={inputs.baselineQrs}
                unit="ms"
                stripLeadingZero
                onChange={(value) => updateInput("baselineQrs", value)}
              />

              <BooleanGroup
                legend="Family history of Brugada syndrome"
                helperText="No = 0, yes = 1."
                name="baselineFamilyBrugada"
                value={inputs.baselineFamilyBrugada}
                trueLabel="Yes"
                falseLabel="No"
                onChange={(value) =>
                  updateInput("baselineFamilyBrugada", value)
                }
              />
            </InputGroup>

            <InputGroup title="Polygenic input (advanced)" advanced>
              <NumberField
                id="lasso-clinical-pgs"
                label="Standardized polygenic score (z-score)"
                helperText="This value must be derived using a validated genomic pipeline and entered as a standardized z-score."
                min={-5}
                max={5}
                step={0.1}
                placeholder="0.0"
                value={inputs.lassoClinicalPgs}
                unit="z-score"
                hasValue={hasPolygenicInput}
                onEmpty={() => setHasPolygenicInput(false)}
                onChange={(value) => {
                  setHasPolygenicInput(true);
                  updateInput("lassoClinicalPgs", value);
                }}
              />
              <div className="rounded-md border border-[#eadfdf] bg-rose-50/25 p-3 text-xs leading-5 text-zinc-600">
                Entering an arbitrary or non-standardized genetic score will
                produce an invalid model estimate.
              </div>
              <details className="rounded-md border border-[#eadfdf] bg-white">
                <summary className="cursor-pointer px-3 py-3 text-sm font-semibold text-[#743434] marker:text-[#8f3f3f]">
                  What counts as a valid PGS?
                </summary>
                <div className="border-t border-[#eadfdf] px-3 py-3 text-sm leading-6 text-zinc-600">
                  <p>
                    A valid polygenic input should be derived from genome-wide
                    genotyping or sequencing, pass appropriate genetic QC, be
                    imputed if required by the scoring pipeline, and use the
                    same score definition with model-compatible weights.
                  </p>
                  <p className="mt-2">
                    The score should be standardized as a z-score in a
                    comparable population and interpreted cautiously with
                    attention to ancestry compatibility.
                  </p>
                </div>
              </details>
            </InputGroup>
          </div>
        </form>
      </section>

      <div className="min-w-0 space-y-5 lg:sticky lg:top-24">
        <div className="rounded-lg border border-[#eadfdf] bg-rose-50/30 p-3 shadow-[0_16px_44px_rgba(24,24,27,0.06)] sm:p-4">
          {hasPolygenicInput ? (
            <ResultCard result={result} />
          ) : (
            <MissingPolygenicInputCard />
          )}
        </div>
        <section className="rounded-lg border border-[#eadfdf] bg-rose-50/20 p-4 text-sm leading-6 text-zinc-700 shadow-[0_6px_18px_rgba(24,24,27,0.025)] sm:p-5">
          <h2 className="font-semibold text-zinc-950">Important limitation</h2>
          <p className="mt-2">
            This proof of concept uses adjusted model coefficients, while
            category bands remain placeholder model-based bands. The output is a
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
  advanced?: boolean;
  children: ReactNode;
};

function InputGroup({ title, advanced = false, children }: InputGroupProps) {
  return (
    <section
      className={
        advanced
          ? "rounded-lg border border-[#eadfdf] bg-rose-50/20 p-4"
          : undefined
      }
    >
      <h3 className="border-b border-[#eadfdf] pb-2.5 text-xs font-semibold uppercase text-[#8f3f3f]">
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
  stripLeadingZero?: boolean;
  hasValue?: boolean;
  onEmpty?: () => void;
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
  stripLeadingZero = false,
  hasValue = true,
  onEmpty,
  onChange,
}: NumberFieldProps) {
  const [displayValue, setDisplayValue] = useState(() =>
    hasValue ? String(value) : "",
  );
  const isEditingRef = useRef(false);

  useEffect(() => {
    if (!isEditingRef.current) {
      setDisplayValue(hasValue ? String(value) : "");
    }
  }, [hasValue, value]);

  function handleChange(rawValue: string) {
    const nextValue =
      stripLeadingZero && /^0\d/.test(rawValue)
        ? rawValue.replace(/^0+(?=\d)/, "")
        : rawValue;

    setDisplayValue(nextValue);

    if (nextValue === "") {
      onEmpty?.();
      return;
    }

    const numericValue = Number(nextValue);

    if (Number.isFinite(numericValue)) {
      onChange(numericValue);
    }
  }

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-zinc-900"
      >
        {label}
      </label>
      <p className="mt-1 text-xs leading-5 text-zinc-500">{helperText}</p>
      <div className="mt-2.5 flex min-h-12 overflow-hidden rounded-md border border-zinc-300 bg-white shadow-sm transition focus-within:border-[#8f3f3f] focus-within:ring-2 focus-within:ring-[#8f3f3f]/15">
        <input
          id={id}
          type="number"
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          value={displayValue}
          onFocus={() => {
            isEditingRef.current = true;
          }}
          onBlur={() => {
            isEditingRef.current = false;
          }}
          onChange={(event) => handleChange(event.currentTarget.value)}
          className="min-w-0 flex-1 bg-white px-4 py-3 text-base text-zinc-950 outline-none"
        />
        <span className="flex min-w-20 items-center justify-center border-l border-zinc-200 bg-zinc-50/80 px-3 text-sm font-medium text-zinc-400">
          {unit}
        </span>
      </div>
    </div>
  );
}

function MissingPolygenicInputCard() {
  return (
    <section className="min-w-0 rounded-lg border border-[#8f3f3f]/20 bg-white p-5 shadow-[0_18px_48px_rgba(24,24,27,0.08)] sm:p-6">
      <p className="text-xs font-semibold uppercase text-[#743434]">
        Adjusted model estimate unavailable
      </p>
      <h2 className="mt-3 text-xl font-semibold leading-tight text-zinc-950">
        Valid standardized PGS required
      </h2>
      <p className="mt-3 text-sm leading-6 text-zinc-600">
        The adjusted BARC model includes the standardized polygenic score term.
        No clinical-only model is implemented in this interface, so an estimate
        is not shown until a valid model-compatible PGS z-score is entered.
      </p>
      <p className="mt-3 rounded-md border border-[#eadfdf] bg-rose-50/25 p-3 text-xs leading-5 text-zinc-600">
        Polygenic input not provided. The adjusted model requires a valid
        standardized PGS input.
      </p>
    </section>
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
      <legend className="text-sm font-semibold text-zinc-900">
        {legend}
      </legend>
      <p className="mt-1 text-xs leading-5 text-zinc-500">{helperText}</p>
      <div className="mt-2.5 grid grid-cols-2 gap-1 rounded-lg border border-[#eadfdf] bg-rose-50/35 p-1">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex min-h-12 cursor-pointer items-center justify-center rounded-md border border-transparent px-3 py-2.5 text-center text-sm font-semibold text-zinc-500 transition hover:text-zinc-950 has-[:checked]:border-[#8f3f3f]/75 has-[:checked]:bg-white has-[:checked]:text-[#743434] has-[:checked]:shadow-sm has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#8f3f3f]/20"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <span className="break-words">{option.label}</span>
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
      <legend className="text-sm font-semibold text-zinc-900">
        {legend}
      </legend>
      <p className="mt-1 text-xs leading-5 text-zinc-500">{helperText}</p>
      <div className="mt-2.5 grid grid-cols-2 gap-1 rounded-lg border border-[#eadfdf] bg-rose-50/35 p-1">
        {options.map((option) => (
          <label
            key={option.label}
            className="flex min-h-12 cursor-pointer items-center justify-center rounded-md border border-transparent px-3 py-2.5 text-center text-sm font-semibold text-zinc-500 transition hover:text-zinc-950 has-[:checked]:border-[#8f3f3f]/75 has-[:checked]:bg-white has-[:checked]:text-[#743434] has-[:checked]:shadow-sm has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#8f3f3f]/20"
          >
            <input
              type="radio"
              name={name}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <span className="break-words">{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
