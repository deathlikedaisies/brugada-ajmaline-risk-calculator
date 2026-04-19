import type { Metadata } from "next";
import { modelConfig } from "@/lib/model-config";

export const metadata: Metadata = {
  title: "About | BARC",
  description: "Model explanation for the BARC proof-of-concept calculator.",
};

export default function AboutPage() {
  const predictors = [
    "LASSO Clinical PGS, entered as a standardized z-score",
    "Sex, encoded for model input",
    "Baseline QRS duration in milliseconds",
    "Baseline type 2 or type 3 Brugada ECG pattern",
    "Family history of Brugada syndrome",
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <p className="text-xs font-semibold uppercase text-[#8f3f3f]">
        Model explanation
      </p>
      <h1 className="mt-4 text-3xl font-semibold leading-tight text-zinc-950 sm:text-4xl">
        About the BARC proof of concept
      </h1>
      <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-700">
        BARC is a browser-only research interface for presenting an adjusted
        logistic regression estimate in the context of Brugada syndrome
        ajmaline provocation testing. This interface is intended to demonstrate
        how a multivariable model may be translated into a clinician-facing
        tool. The model integrates clinical, ECG, and polygenic predictors
        derived from the adjusted analysis framework.
      </p>

      <div className="mt-10 space-y-6 text-base leading-8 text-zinc-700">
        <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-[0_10px_30px_rgba(24,24,27,0.045)]">
          <h2 className="text-xl font-semibold text-zinc-950">
            What the model is
          </h2>
          <p className="mt-3">
            The current implementation uses the adjusted logistic regression
            model specified as: {modelConfig.formula}. It combines the intercept
            with weighted predictor values to calculate a linear predictor, then
            applies the logistic function to return a predicted probability. It
            remains a proof-of-concept research implementation and is not
            validated for routine clinical use. This model reflects internal
            performance only and has not undergone external validation. No
            calibration assessment or recalibration has been performed.
          </p>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-[0_10px_30px_rgba(24,24,27,0.045)]">
          <h2 className="text-xl font-semibold text-zinc-950">
            Inputs included
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            {predictors.map((predictor) => (
              <li key={predictor}>{predictor}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-[0_10px_30px_rgba(24,24,27,0.045)]">
          <h2 className="text-xl font-semibold text-zinc-950">
            Intended use
          </h2>
          <p className="mt-3">
            This application is intended for academic discussion, user-interface
            review, and research collaboration around the adjusted Brugada
            ajmaline model. It is not intended for routine clinical care,
            patient triage, diagnostic classification, treatment selection,
            guideline replacement, or replacement of electrophysiology expertise.
          </p>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-[0_10px_30px_rgba(24,24,27,0.045)]">
          <h2 className="text-xl font-semibold text-zinc-950">
            Model status and performance
          </h2>
          <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-medium text-zinc-600">Model name</dt>
              <dd className="text-zinc-950">{modelConfig.name}</dd>
            </div>
            <div>
              <dt className="font-medium text-zinc-600">Version</dt>
              <dd className="text-zinc-950">{modelConfig.version}</dd>
            </div>
            <div>
              <dt className="font-medium text-zinc-600">Intercept</dt>
              <dd className="font-mono text-zinc-950">
                {modelConfig.intercept}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-zinc-600">Status</dt>
              <dd className="text-zinc-950">{modelConfig.status}</dd>
            </div>
            <div>
              <dt className="font-medium text-zinc-600">AUC</dt>
              <dd className="font-mono text-zinc-950">{modelConfig.auc}</dd>
            </div>
            <div>
              <dt className="font-medium text-zinc-600">AIC</dt>
              <dd className="font-mono text-zinc-950">{modelConfig.aic}</dd>
            </div>
            <div>
              <dt className="font-medium text-zinc-600">PGS input</dt>
              <dd className="text-zinc-950">{modelConfig.pgsInputNote}</dd>
            </div>
            <div>
              <dt className="font-medium text-zinc-600">
                Intermediate band threshold
              </dt>
              <dd className="font-mono text-zinc-950">
                {modelConfig.riskThresholds.intermediate}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-zinc-600">Higher band threshold</dt>
              <dd className="font-mono text-zinc-950">
                {modelConfig.riskThresholds.higher}
              </dd>
            </div>
          </dl>
        </section>

        <p className="px-1 text-sm leading-6 text-zinc-500">
          Created by Dominic S Zimmerman et al.
        </p>

        <section className="rounded-lg border border-rose-200 bg-white p-6 shadow-[0_10px_30px_rgba(24,24,27,0.045)]">
          <h2 className="text-xl font-semibold text-zinc-950">
            Major limitations
          </h2>
          <p className="mt-3">
            The proof of concept has not undergone clinical validation,
            calibration assessment, external validation, subgroup performance
            review, decision-curve analysis, or governance review for deployment
            in routine patient care. Its estimates should be treated as research
            interface outputs only, even though the displayed coefficients come
            from the adjusted analysis model.
          </p>
        </section>
      </div>
    </div>
  );
}
