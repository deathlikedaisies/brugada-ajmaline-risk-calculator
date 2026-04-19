import type { Metadata } from "next";
import { CalculatorForm } from "@/components/calculator-form";

export const metadata: Metadata = {
  title: "Calculator | BARC",
  description:
    "Proof-of-concept Brugada Ajmaline Risk Calculator (BARC).",
};

export default function CalculatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-10 lg:px-8">
      <div className="mb-6 rounded-lg border border-zinc-200 bg-white px-4 py-4 shadow-[0_10px_26px_rgba(24,24,27,0.04)] sm:mb-8 sm:px-6 sm:py-6">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase text-teal-800">
            Proof-of-concept research calculator
          </p>
          <h1 className="mt-3 text-2xl font-semibold leading-tight text-zinc-950 sm:mt-4 sm:text-4xl">
            Brugada Ajmaline Risk Calculator (BARC)
          </h1>
          <p className="mt-3 text-sm leading-6 text-zinc-700 sm:mt-4 sm:text-lg sm:leading-8">
            <span className="sm:hidden">
              Enter pre-challenge predictors for a browser-only research
              estimate.
            </span>
            <span className="hidden sm:inline">
              Enter pre-challenge clinical, ECG, and genetic predictors to view
              a model-based research estimate. Values are processed in this page
              only and are not stored.
            </span>
          </p>
        </div>
        <div className="mt-4 border-t border-zinc-200 pt-3 text-xs leading-5 text-zinc-500 sm:mt-6 sm:pt-4 sm:text-sm">
          <p>
            Adjusted coefficients. Browser-only calculation. Research interface
            review only.
          </p>
        </div>
      </div>

      <CalculatorForm />
    </div>
  );
}
