import type { Metadata } from "next";
import { modelConfig } from "@/lib/model-config";

export const metadata: Metadata = {
  title: "About | BARC",
  description: "Model explanation for the BARC proof-of-concept calculator.",
};

export default function AboutPage() {
  const predictors = [
    "Age at ajmaline challenge",
    "Sex recorded for model input",
    "Family history of Brugada syndrome or sudden cardiac death",
    "Baseline QRS duration before ajmaline administration",
    "Baseline type 2 or type 3 Brugada ECG pattern",
    "Standardized Brugada-associated polygenic score",
  ];

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
      <p className="text-xs font-semibold uppercase text-cyan-800">
        Model explanation
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
        About the BARC proof of concept
      </h1>
      <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">
        BARC is a browser-only research interface for reviewing how a candidate
        logistic regression model might present a model-based estimate in the
        context of Brugada syndrome ajmaline provocation testing.
      </p>

      <div className="mt-8 space-y-8 text-base leading-8 text-slate-700">
        <section>
          <h2 className="text-xl font-semibold text-slate-950">
            What the model is
          </h2>
          <p className="mt-3">
            The current implementation is a placeholder logistic regression
            model. It combines an intercept with weighted predictor values to
            calculate a linear predictor, then applies the logistic function to
            return a probability. The coefficient values, category thresholds,
            and example patient are illustrative and are not derived from a
            locked or validated clinical model.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-950">
            Inputs included
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            {predictors.map((predictor) => (
              <li key={predictor}>{predictor}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-950">
            Intended use
          </h2>
          <p className="mt-3">
            This application is intended for academic discussion, user-interface
            review, and research collaboration around a candidate Brugada
            ajmaline risk model. It is not intended for routine clinical care,
            patient triage, diagnostic classification, treatment selection, or
            replacement of electrophysiology expertise.
          </p>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">
            Placeholder model status
          </h2>
          <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-medium text-slate-600">Model name</dt>
              <dd className="text-slate-950">{modelConfig.name}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-600">Version</dt>
              <dd className="text-slate-950">{modelConfig.version}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-600">Intercept</dt>
              <dd className="font-mono text-slate-950">
                {modelConfig.intercept}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-slate-600">Status</dt>
              <dd className="text-slate-950">{modelConfig.status}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-600">
                Intermediate threshold
              </dt>
              <dd className="font-mono text-slate-950">
                {modelConfig.riskThresholds.intermediate}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-slate-600">Higher threshold</dt>
              <dd className="font-mono text-slate-950">
                {modelConfig.riskThresholds.higher}
              </dd>
            </div>
          </dl>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-950">
            Major limitations
          </h2>
          <p className="mt-3">
            The proof of concept has not undergone clinical validation,
            calibration assessment, external validation, subgroup performance
            review, decision-curve analysis, or governance review for deployment
            in patient care. Its estimates should be treated as research
            interface outputs only.
          </p>
        </section>
      </div>
    </div>
  );
}
