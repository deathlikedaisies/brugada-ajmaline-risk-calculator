import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | BARC",
  description: "Research-use disclaimer for the BARC proof-of-concept calculator.",
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
      <p className="text-xs font-semibold uppercase text-cyan-800">
        Research-use disclaimer
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
        Disclaimer
      </h1>
      <div className="mt-8 space-y-8 rounded-lg border border-slate-200 bg-white p-6 text-base leading-8 text-slate-700 shadow-sm">
        <section>
          <h2 className="text-xl font-semibold text-slate-950">
            Not for clinical decision-making
          </h2>
          <p className="mt-3">
            BARC is a proof-of-concept research application. Its output is a
            model-based estimate generated from placeholder coefficients and
            placeholder category thresholds. It is not a medical device, a
            diagnostic test, a treatment recommendation, or a clinical
            management pathway.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-950">
            Relationship to clinical care
          </h2>
          <p className="mt-3">
            The estimate must not replace professional judgment, institutional
            protocols, contemporary guidelines, electrophysiology consultation,
            or individualized patient assessment. It must not be used to decide
            whether to perform testing, discharge a patient, implant a device,
            prescribe therapy, restrict activity, or reassure a patient.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-950">
            Validation status
          </h2>
          <p className="mt-3">
            The current implementation has not been validated for routine
            clinical care. It has not been assessed for calibration,
            discrimination, transportability, subgroup performance, clinical
            utility, regulatory compliance, or prospective impact on outcomes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-950">
            Data handling
          </h2>
          <p className="mt-3">
            The app does not authenticate users, create accounts, store patient
            data, transmit calculator values to a backend, or maintain a
            database. Calculations occur in the browser session.
          </p>
        </section>
      </div>
    </div>
  );
}
