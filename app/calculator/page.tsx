import type { Metadata } from "next";
import { CalculatorForm } from "@/components/calculator-form";

export const metadata: Metadata = {
  title: "Calculator | BARC",
  description:
    "Proof-of-concept Brugada Ajmaline Risk Calculator (BARC).",
};

export default function CalculatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:py-10 lg:px-8">
      <div className="mb-8 rounded-lg border border-slate-200 bg-white px-5 py-6 shadow-sm sm:px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase text-cyan-800">
            Proof-of-concept research calculator
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
            Brugada Ajmaline Risk Calculator (BARC)
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-700 sm:text-lg">
            Enter pre-challenge clinical, ECG, and genetic predictors to view a
            model-based research estimate. Values are processed in this page
            only and are not stored.
          </p>
        </div>
        <div className="mt-5 grid gap-3 border-t border-slate-200 pt-5 text-sm leading-6 text-slate-600 md:grid-cols-3">
          <p>Designed for clinician and supervisor review of model presentation.</p>
          <p>Uses adjusted model coefficients and placeholder category bands.</p>
          <p>Not a diagnosis, recommendation, or replacement for guidelines.</p>
        </div>
      </div>

      <CalculatorForm />
    </div>
  );
}
