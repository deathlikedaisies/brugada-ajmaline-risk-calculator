import type { Metadata } from "next";
import { CalculatorForm } from "@/components/calculator-form";

export const metadata: Metadata = {
  title: "Calculator | BARC",
  description:
    "Proof-of-concept Brugada Ajmaline Risk Calculator (BARC).",
};

export default function CalculatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-8 rounded-lg border border-zinc-200 bg-white px-5 py-6 shadow-[0_16px_45px_rgba(24,24,27,0.055)] sm:px-7 sm:py-7">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase text-teal-800">
            Proof-of-concept research calculator
          </p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-zinc-950 sm:text-4xl">
            Brugada Ajmaline Risk Calculator (BARC)
          </h1>
          <p className="mt-4 text-base leading-8 text-zinc-700 sm:text-lg">
            Enter pre-challenge clinical, ECG, and genetic predictors to view a
            model-based research estimate. Values are processed in this page
            only and are not stored.
          </p>
        </div>
        <div className="mt-6 grid gap-3 border-t border-zinc-200 pt-5 text-sm leading-6 text-zinc-600 md:grid-cols-3">
          <p className="rounded-md bg-zinc-50 p-3">
            Designed for clinician and supervisor review of model presentation.
          </p>
          <p className="rounded-md bg-zinc-50 p-3">
            Uses adjusted model coefficients and placeholder category bands.
          </p>
          <p className="rounded-md bg-zinc-50 p-3">
            Not a diagnosis, recommendation, or replacement for guidelines.
          </p>
        </div>
      </div>

      <CalculatorForm />
    </div>
  );
}
