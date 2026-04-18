import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20 lg:px-8">
      <section className="max-w-3xl">
        <p className="text-xs font-semibold uppercase text-cyan-800">
          Proof-of-concept research calculator
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-normal text-slate-950 sm:text-5xl sm:leading-tight">
          Brugada Ajmaline Risk Calculator
        </h1>
        <p className="mt-6 text-base leading-8 text-slate-700 sm:text-lg">
          BARC is a restrained research prototype for presenting a model-based
          estimate in the setting of Brugada syndrome ajmaline challenge. The
          current coefficients and risk thresholds are placeholders and are not
          validated for clinical decision-making.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/calculator"
            className="inline-flex justify-center rounded-md bg-cyan-800 px-5 py-3 text-base font-semibold text-white hover:bg-cyan-900"
          >
            Open calculator
          </Link>
          <Link
            href="/about"
            className="inline-flex justify-center rounded-md border border-slate-300 px-5 py-3 text-base font-semibold text-slate-800 hover:bg-slate-100"
          >
            Read model notes
          </Link>
        </div>
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Clinician-readable predictors",
            body: "Inputs use electrophysiology-oriented wording for age at challenge, baseline ECG findings, family history, and polygenic score.",
          },
          {
            title: "Transparent placeholder model",
            body: "The logistic calculation, coefficient status, and category thresholds are clearly marked as proof-of-concept material.",
          },
          {
            title: "Browser-only operation",
            body: "No authentication, backend, database, analytics, or patient data storage is included.",
          },
        ].map((item) => (
          <article
            key={item.title}
            className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-slate-950">
              {item.title}
            </h2>
            <p className="mt-3 leading-7 text-slate-700">{item.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
