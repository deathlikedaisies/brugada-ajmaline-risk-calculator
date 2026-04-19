import type { CalculationResult } from "@/lib/calculator";
import { modelConfig } from "@/lib/model-config";

type ResultCardProps = {
  result: CalculationResult;
};

export function ResultCard({ result }: ResultCardProps) {
  return (
    <section
      aria-labelledby="risk-result-heading"
      className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-[0_16px_45px_rgba(24,24,27,0.06)]"
    >
      <div className="border-b border-zinc-200 px-5 py-6 sm:px-7">
        <p className="text-xs font-semibold uppercase text-zinc-500">
          Model-based estimate
        </p>
        <p className="mt-5 text-sm font-medium text-zinc-600">
          Model-estimated probability (research output)
        </p>
        <h2
          id="risk-result-heading"
          className="mt-1 text-5xl font-semibold text-zinc-950 sm:text-6xl"
        >
          {result.percentage.toFixed(1)}%
        </h2>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-100">
          <div
            className="h-full rounded-full bg-teal-800"
            style={{ width: `${Math.min(result.percentage, 100)}%` }}
          />
        </div>
        <p className="mt-4 text-sm leading-6 text-zinc-600">
          This value represents a model-derived probability based on internal
          model performance and is intended for research interpretation.
        </p>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Adjusted logistic regression output for research interface review.
          This model-based estimate reflects the combined contribution of
          clinical, ECG, and genetic predictors included in the adjusted model.
        </p>
        <div className="mt-4 grid gap-2 text-xs text-zinc-500 sm:grid-cols-2">
          <p className="rounded-md bg-zinc-50 px-3 py-2">
            Model discrimination (apparent AUC): {modelConfig.auc.toFixed(2)}
          </p>
          <p className="rounded-md bg-zinc-50 px-3 py-2">
            Derived from n = 1,129 individuals in the ajmaline cohort
          </p>
        </div>
      </div>

      <div className="divide-y divide-zinc-200 px-5 sm:px-7">
        <div className="py-5">
          <h3 className="text-base font-semibold text-zinc-950">
            Interpretation
          </h3>
          <p className="mt-2 text-base leading-7 text-zinc-700">
            {result.interpretation}
          </p>
        </div>

        <div className="py-5">
          <h3 className="text-base font-semibold text-zinc-950">
            Model terms
          </h3>
          <dl className="mt-4 divide-y divide-zinc-200 rounded-md border border-zinc-200">
            {result.contributingFactors.map((factor) => (
              <div
                key={factor.label}
                className="grid gap-2 px-3 py-3 text-sm sm:grid-cols-[minmax(0,1fr)_minmax(130px,auto)]"
              >
                <dt>
                  <span className="block font-medium text-zinc-800">
                    {factor.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-zinc-500">
                    {factor.contributionStrength}
                  </span>
                </dt>
                <dd className="text-zinc-700 sm:text-right">
                  <span className="block">{factor.value}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs leading-5 text-zinc-500">
            Displayed contributions reflect model coefficients and input values
            and should not be interpreted as independent or causal effects.
          </p>
        </div>

        <details className="py-5">
          <summary className="cursor-pointer rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-900 marker:text-teal-800">
            Model details
          </summary>
          <div className="px-1 pb-1 pt-4 text-sm leading-6 text-zinc-700 sm:px-4">
            <p>
              The calculator applies the {modelConfig.version} coefficients to
              the entered predictors, sums them into a linear predictor, then
              converts that value with the logistic function. Category bands are
              placeholders for interface review.
            </p>
            <dl className="mt-4 grid gap-3 border-l-2 border-zinc-200 pl-4">
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
                <dd className="text-zinc-950 sm:text-right">
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
            <dl className="mt-4 grid gap-3 border-l-2 border-zinc-200 pl-4">
              {result.contributingFactors.map((factor) => (
                <div
                  key={factor.label}
                  className="grid gap-1 sm:flex sm:items-center sm:justify-between sm:gap-4"
                >
                  <dt className="text-zinc-600">{factor.label}</dt>
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
