import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
        <div className="max-w-3xl">
          <div className="mb-5 flex items-center gap-3">
            <BrandLogo className="size-11" />
            <p className="text-xs font-semibold uppercase text-[#8f3f3f]">
              Proof-of-concept research calculator
            </p>
          </div>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-zinc-950 sm:text-5xl lg:text-6xl">
            Type 1{" "}
            <span className="inline-block whitespace-nowrap">
              <strong className="accent-letter">B</strong>rugada
            </span>{" "}
            <span className="inline-block whitespace-nowrap">
              <strong className="accent-letter">A</strong>jmaline
            </span>{" "}
            <span className="inline-block whitespace-nowrap">
              <strong className="accent-letter">R</strong>esponse
            </span>{" "}
            <span className="inline-block whitespace-nowrap">
              <strong className="accent-letter">C</strong>alculator
            </span>{" "}
            <span className="text-[#8f3f3f]">(BARC)</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-700 sm:text-lg">
            BARC is a proof-of-concept research interface for presenting an
            adjusted logistic regression-based estimate in the setting of
            ajmaline testing for Brugada syndrome. The coefficients reflect the
            adjusted model; displayed bands, where shown in technical details, are
            not validated clinical thresholds.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/calculator"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#8f3f3f] px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-[#743434]"
            >
              Open calculator
            </Link>
            <Link
              href="/about"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-zinc-300 bg-white px-5 py-3 text-base font-semibold text-zinc-800 shadow-sm transition hover:border-zinc-400 hover:bg-zinc-50"
            >
              Read model notes
            </Link>
          </div>
        </div>

        <aside className="rounded-lg border border-zinc-200 bg-white p-5 shadow-[0_18px_50px_rgba(24,24,27,0.07)]">
          <p className="text-xs font-semibold uppercase text-zinc-500">
            Interface status
          </p>
          <dl className="mt-5 divide-y divide-zinc-200 border-y border-zinc-200">
            <div className="py-4">
              <dt className="text-sm font-medium text-zinc-600">
                Model framing
              </dt>
              <dd className="mt-1 text-base font-semibold text-zinc-950">
                Adjusted logistic regression
              </dd>
            </div>
            <div className="py-4">
              <dt className="text-sm font-medium text-zinc-600">
                Operating mode
              </dt>
              <dd className="mt-1 text-base font-semibold text-zinc-950">
                Browser-only calculation
              </dd>
            </div>
            <div className="py-4">
              <dt className="text-sm font-medium text-zinc-600">
                Intended context
              </dt>
              <dd className="mt-1 text-base font-semibold text-zinc-950">
                Academic review
              </dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="mt-14 grid gap-4 md:grid-cols-3">
        {[
          {
            eyebrow: "Predictors",
            title: "Clinician-readable inputs",
            body: "Inputs follow the adjusted model terms for LASSO Clinical PGS, sex coding, baseline QRS, ECG pattern, and family history.",
          },
          {
            eyebrow: "Transparency",
            title: "Adjusted model display",
            body: "The logistic calculation, model metadata, and placeholder category bands are clearly marked for research review.",
          },
          {
            eyebrow: "Data handling",
            title: "Browser-only operation",
            body: "No authentication, backend, database, analytics, or patient data storage is included.",
          },
        ].map((item) => (
          <article
            key={item.title}
            className="min-h-full rounded-lg border border-zinc-200 bg-white p-6 shadow-[0_10px_30px_rgba(24,24,27,0.045)]"
          >
            <p className="text-xs font-semibold uppercase text-[#8f3f3f]">
              {item.eyebrow}
            </p>
            <h2 className="mt-3 text-lg font-semibold text-zinc-950">
              {item.title}
            </h2>
            <p className="mt-3 leading-7 text-zinc-700">{item.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
