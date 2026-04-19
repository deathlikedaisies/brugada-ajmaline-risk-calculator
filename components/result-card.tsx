import type { CalculationResult } from "@/lib/calculator";
import { modelConfig } from "@/lib/model-config";

type ResultCardProps = {
  result: CalculationResult;
};

export function ResultCard({ result }: ResultCardProps) {
  return (
    <section
      aria-labelledby="risk-result-heading"
      className="min-w-0 overflow-hidden rounded-lg border border-teal-900/15 bg-white shadow-[0_20px_52px_rgba(24,24,27,0.1)]"
    >
      <div className="bg-teal-50/45 px-4 py-7 sm:px-6 sm:py-8">
        <p className="text-xs font-semibold uppercase text-teal-900">
          Model-based estimate
        </p>
        <p className="mt-7 text-sm font-medium text-zinc-500">
          Estimated probability
        </p>
        <h2
          id="risk-result-heading"
          className="mt-3 text-7xl font-semibold leading-none text-zinc-950 sm:text-8xl"
        >
          {result.percentage.toFixed(1)}%
        </h2>
        <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/80 ring-1 ring-teal-900/10">
          <div
            className="h-full rounded-full bg-teal-700/65 transition-[width] duration-300 ease-out"
            style={{ width: `${Math.min(result.percentage, 100)}%` }}
          />
        </div>
      </div>

      <div className="border-y border-zinc-200 px-4 py-4 sm:px-6">
        <p className="text-sm leading-6 text-zinc-600">
          Relative model-based estimate within this dataset. Research
          interpretation only.
        </p>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Combines the entered clinical, ECG, and genetic predictors using the
          adjusted logistic model.
        </p>
        <div className="mt-4 grid gap-2 text-xs text-zinc-500 sm:grid-cols-2">
          <p className="rounded-md border border-zinc-200 bg-white px-3 py-2">
            Model discrimination (apparent AUC): {modelConfig.auc.toFixed(2)}
          </p>
          <p className="rounded-md border border-zinc-200 bg-white px-3 py-2">
            Derived from n = 1,129 individuals in the ajmaline cohort
          </p>
        </div>
      </div>

      <div className="divide-y divide-zinc-200 px-4 sm:px-6">
        <div className="py-5">
          <h3 className="text-sm font-semibold text-zinc-950">
            Interpretation
          </h3>
          <p className="mt-2 text-sm leading-6 text-zinc-700">
            {result.interpretation}
          </p>
        </div>

        <div className="py-5">
          <h3 className="text-sm font-semibold text-zinc-950">
            Model terms
          </h3>
          <dl className="mt-3 divide-y divide-zinc-200 rounded-md border border-zinc-200 bg-zinc-50/40">
            {result.contributingFactors.map((factor) => (
              <div
                key={factor.label}
                className="grid min-w-0 gap-2 px-3 py-3 text-sm sm:grid-cols-[minmax(0,1fr)_minmax(130px,auto)]"
              >
                <dt className="min-w-0">
                  <span className="block font-medium text-zinc-800">
                    {factor.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-zinc-500">
                    {factor.contributionStrength}
                  </span>
                </dt>
                <dd className="min-w-0 text-zinc-700 sm:text-right">
                  <span className="block break-words">{factor.value}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs leading-5 text-zinc-500">
            Contributions reflect coefficients and inputs; they are not causal
            effects.
          </p>
        </div>

        <details className="py-5">
          <summary className="cursor-pointer rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-900 marker:text-teal-800">
            Model details
          </summary>
          <div className="min-w-0 px-1 pb-1 pt-4 text-sm leading-6 text-zinc-700 sm:px-4">
            <p>
              The calculator applies the {modelConfig.version} coefficients to
              the entered predictors, sums them into a linear predictor, then
              converts that value with the logistic function. Category bands are
              placeholders for interface review.
            </p>
            <dl className="mt-4 grid min-w-0 gap-3 border-l-2 border-zinc-200 pl-4">
              <div className="grid gap-1 sm:flex sm:items-center sm:justify-between sm:gap-4">
                <dt className="text-zinc-600">Linear predictor</dt>
                <dd className="font-mono text-zinc-950">
                  {result.linearPredictor.toFixed(3)}
                </dd>
              </div>
              <div className="grid gap-1 sm:flex sm:items-center sm:justify-between sm:gap-4">
                <dt className="text-zinc-600">Probability</dt>
                <dd className="font-mono text-zinc-950">
                  {result.probability.toFixed(4)}
                </dd>
              </div>
              <div className="grid gap-1 sm:flex sm:items-center sm:justify-between sm:gap-4">
                <dt className="text-zinc-600">Model band</dt>
                <dd className="break-words text-zinc-950 sm:text-right">
                  {result.category}
                </dd>
              </div>
              <div className="grid gap-1 sm:flex sm:items-center sm:justify-between sm:gap-4">
                <dt className="text-zinc-600">Intermediate threshold</dt>
                <dd className="font-mono text-zinc-950">
                  {modelConfig.riskThresholds.intermediate.toFixed(2)}
                </dd>
              </div>
              <div className="grid gap-1 sm:flex sm:items-center sm:justify-between sm:gap-4">
                <dt className="text-zinc-600">Higher threshold</dt>
                <dd className="font-mono text-zinc-950">
                  {modelConfig.riskThresholds.higher.toFixed(2)}
                </dd>
              </div>
            </dl>
            <dl className="mt-4 grid min-w-0 gap-3 border-l-2 border-zinc-200 pl-4">
              {result.contributingFactors.map((factor) => (
                <div
                  key={factor.label}
                  className="grid min-w-0 gap-1 sm:flex sm:items-center sm:justify-between sm:gap-4"
                >
                  <dt className="min-w-0 text-zinc-600">{factor.label}</dt>
                  <dd className="font-mono text-zinc-950">
                    LP {factor.contribution >= 0 ? "+" : ""}
                    {factor.contribution.toFixed(3)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </details>
        <p className="py-4 text-xs text-zinc-500">
          Model performance: AUC = {modelConfig.auc.toFixed(3)} (apparent)
        </p>
      </div>
    </section>
  );
}
