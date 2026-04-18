import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20 lg:px-8">
      <section className="max-w-3xl">
        <p className="text-xs font-semibold uppercase text-cyan-800">
          Proof-of-concept research calculator
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-normal text-slate-950 sm:text-5xl sm:leading-tight">
          Brugada Ajmaline Risk Calculator (BARC)
        </h1>
        <p className="mt-6 text-base leading-8 text-slate-700 sm:text-lg">
          BARC is a proof-of-concept research interface for presenting an
          adjusted logistic regression-based estimate in the setting of
          ajmaline testing for Brugada syndrome. The coefficients reflect the
          adjusted model; displayed bands, where shown in technical details, are
          not validated clinical thresholds.
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
            body: "Inputs follow the adjusted model terms for LASSO Clinical PGS, sex coding, baseline QRS, ECG pattern, and family history.",
          },
          {
            title: "Transparent adjusted model",
            body: "The logistic calculation, model metadata, and placeholder category bands are clearly marked for research review.",
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
