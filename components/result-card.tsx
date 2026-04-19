import type { CalculationResult } from "@/lib/calculator";
import { modelConfig } from "@/lib/model-config";
import { BrandLogo } from "./brand-logo";

type ResultCardProps = {
  result: CalculationResult;
};

export function ResultCard({ result }: ResultCardProps) {
  return (
    <section
      aria-labelledby="risk-result-heading"
      className="min-w-0 overflow-hidden rounded-lg border border-[#8f3f3f]/25 bg-white shadow-[0_24px_60px_rgba(24,24,27,0.12)]"
    >
      <div className="bg-rose-50/45 px-4 py-8 sm:px-7 sm:py-10">
        <div className="flex items-center justify-center gap-3">
          <BrandLogo className="size-9" />
          <p className="text-xs font-semibold uppercase text-[#743434]">
            Model-based estimate
          </p>
        </div>
        <p className="mt-8 text-center text-xs font-semibold uppercase text-zinc-500">
          Estimated probability
        </p>
        <h2
          id="risk-result-heading"
          className="mt-3 text-center text-6xl font-bold leading-none text-zinc-950 sm:text-8xl"
        >
          {result.percentage.toFixed(1)}%
        </h2>
        <div className="mt-7 h-2 overflow-hidden rounded-full bg-white/85 ring-1 ring-[#8f3f3f]/15">
          <div
            className="h-full rounded-full bg-[#8f3f3f]/70 transition-all duration-500 ease-out"
            style={{ width: `${Math.min(result.percentage, 100)}%` }}
          />
        </div>
        <p className="mx-auto mt-5 max-w-sm text-center text-sm leading-6 text-zinc-600">
          Model-derived probability based on internal performance.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <span className="rounded-full border border-[#eadfdf] bg-white px-3 py-1.5 text-xs font-medium text-zinc-600">
            AUC: {modelConfig.auc.toFixed(2)}
          </span>
          <span className="rounded-full border border-[#eadfdf] bg-white px-3 py-1.5 text-xs font-medium text-zinc-600">
            n = 1,129 (ajmaline cohort)
          </span>
        </div>
      </div>

      <div className="divide-y divide-[#eadfdf] px-4 sm:px-7">
        <div className="py-5">
          <h3 className="text-sm font-semibold text-[#743434]">
            Interpretation
          </h3>
          <p className="mt-2 text-sm leading-6 text-zinc-700">
            {result.interpretation}
          </p>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            Combines the entered clinical, ECG, and genetic predictors using the
            adjusted logistic model.
          </p>
        </div>

        <div className="py-5">
          <h3 className="text-sm font-semibold text-[#743434]">
            Model terms
          </h3>
          <dl className="mt-3 divide-y divide-[#eadfdf] rounded-md border border-[#eadfdf] bg-rose-50/20">
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
          <summary className="cursor-pointer rounded-md border border-[#eadfdf] bg-rose-50/25 px-4 py-3 text-sm font-semibold text-[#743434] marker:text-[#8f3f3f]">
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
