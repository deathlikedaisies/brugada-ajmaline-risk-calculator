import type { CalculationResult } from "@/lib/calculator";
import { modelConfig } from "@/lib/model-config";

type ResultCardProps = {
  result: CalculationResult;
};

export function ResultCard({ result }: ResultCardProps) {
  return (
    <section
      aria-labelledby="risk-result-heading"
      className="rounded-lg border border-slate-200 bg-white shadow-sm"
    >
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <p className="text-xs font-semibold uppercase text-slate-500">
            Model-based estimate
          </p>
          <p className="w-fit rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600">
            Research only
          </p>
        </div>
        <p className="mt-4 text-sm font-medium text-slate-600">
          Predicted probability
        </p>
        <h2
          id="risk-result-heading"
          className="mt-1 text-5xl font-semibold tracking-normal text-slate-950"
        >
          {result.percentage.toFixed(1)}%
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Adjusted logistic regression output for research interface review.
          This estimate reflects the combined contribution of clinical, ECG, and
          genetic predictors included in the adjusted model.
        </p>
        <p className="mt-2 text-xs text-slate-500">
          Model discrimination (AUC): {modelConfig.auc.toFixed(2)}
        </p>
      </div>

      <div className="divide-y divide-slate-200 px-5 sm:px-6">
        <div className="py-4">
          <h3 className="text-base font-semibold text-slate-950">
            Plain-language interpretation
          </h3>
          <p className="mt-2 text-base leading-7 text-slate-700">
            {result.interpretation}
          </p>
        </div>

        <div className="py-4">
          <h3 className="text-base font-semibold text-slate-950">
            Main contributing factors
          </h3>
          <dl className="mt-3 divide-y divide-slate-200 border-y border-slate-200">
            {result.contributingFactors.map((factor) => (
              <div
                key={factor.label}
                className="grid gap-2 py-3 text-sm sm:grid-cols-[minmax(0,1fr)_minmax(130px,auto)]"
              >
                <dt>
                  <span className="block font-medium text-slate-800">
                    {factor.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-500">
                    {factor.contributionStrength}
                  </span>
                </dt>
                <dd className="text-slate-700 sm:text-right">
                  <span className="block">{factor.value}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-xs leading-5 text-slate-500">
            Listed by absolute contribution within the adjusted coefficient set.
            Contribution strength labels are descriptive model internals.
          </p>
        </div>

        <details className="py-4">
          <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-slate-900">
            Why this estimate?
          </summary>
          <div className="px-4 pb-1 pt-3 text-sm leading-6 text-slate-700">
            <p>
              The calculator applies the {modelConfig.version} coefficients to
              the entered predictors, sums them into a linear predictor, then
              converts that value with the logistic function. Category bands are
              placeholders for interface review.
            </p>
            <dl className="mt-4 grid gap-3 border-l-2 border-slate-200 pl-4">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-600">Linear predictor</dt>
                <dd className="font-mono text-slate-950">
                  {result.linearPredictor.toFixed(3)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-600">Probability</dt>
                <dd className="font-mono text-slate-950">
                  {result.probability.toFixed(4)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-600">Model band</dt>
                <dd className="text-right text-slate-950">
                  {result.category}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-600">Intermediate threshold</dt>
                <dd className="font-mono text-slate-950">
                  {modelConfig.riskThresholds.intermediate.toFixed(2)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-600">Higher threshold</dt>
                <dd className="font-mono text-slate-950">
                  {modelConfig.riskThresholds.higher.toFixed(2)}
                </dd>
              </div>
            </dl>
            <dl className="mt-4 grid gap-3 border-l-2 border-slate-200 pl-4">
              {result.contributingFactors.map((factor) => (
                <div
                  key={factor.label}
                  className="flex items-center justify-between gap-4"
                >
                  <dt className="text-slate-600">{factor.label}</dt>
                  <dd className="font-mono text-slate-950">
                    LP {factor.contribution >= 0 ? "+" : ""}
                    {factor.contribution.toFixed(3)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </details>
      </div>
    </section>
  );
}
