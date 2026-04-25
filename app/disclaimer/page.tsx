import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | BARC",
  description: "Research-use disclaimer for the BARC proof-of-concept calculator.",
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <p className="text-xs font-semibold uppercase text-[#8f3f3f]">
        Research-use disclaimer
      </p>
      <h1 className="mt-4 text-3xl font-semibold leading-tight text-zinc-950 sm:text-4xl">
        Disclaimer
      </h1>
      <div className="mt-10 space-y-6 rounded-lg border border-zinc-200 bg-white p-5 text-base leading-8 text-zinc-700 shadow-[0_16px_45px_rgba(24,24,27,0.055)] sm:p-7">
        <section>
          <h2 className="text-xl font-semibold text-zinc-950">
            Not for clinical decision-making
          </h2>
          <p className="mt-3">
            BARC is a proof-of-concept research application. Its output is a
            model score percentile generated from adjusted analysis
            coefficients; any displayed category bands are placeholders for
            interface review. The percentile is relative to the derivation
            cohort distribution and is not an absolute clinical risk. It is not
            a medical device or clinically validated tool. It is also not a
            diagnostic test, treatment recommendation, or clinical management
            pathway.
          </p>
        </section>

        <section className="border-t border-zinc-200 pt-6">
          <h2 className="text-xl font-semibold text-zinc-950">
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

        <section className="border-t border-zinc-200 pt-6">
          <h2 className="text-xl font-semibold text-zinc-950">
            Validation status
          </h2>
          <p className="mt-3">
            The current implementation has not been validated for routine
            clinical care. It has not been assessed for calibration,
            discrimination, transportability, subgroup performance, clinical
            utility, regulatory compliance, or prospective impact on outcomes.
          </p>
        </section>

        <section className="border-t border-zinc-200 pt-6">
          <h2 className="text-xl font-semibold text-zinc-950">
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
