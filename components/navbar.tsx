import Link from "next/link";

const navigation = [
  { href: "/calculator", label: "Calculator" },
  { href: "/about", label: "About" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200/80 bg-white/90 backdrop-blur">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          className="group min-w-0 max-w-full text-base font-semibold text-zinc-950 sm:text-lg"
        >
          <span className="inline-flex size-8 items-center justify-center rounded-md border border-teal-800/20 bg-teal-50 text-sm font-bold text-teal-900 shadow-sm">
            B
          </span>{" "}
          <span className="align-middle">BARC</span>{" "}
          <span className="mt-1 block max-w-full truncate font-normal text-zinc-500 sm:mt-0 sm:inline">
            Proof-of-concept research calculator
          </span>
        </Link>
        <div className="flex flex-wrap gap-1 text-sm font-medium text-zinc-600 sm:justify-end">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 transition hover:bg-zinc-100 hover:text-zinc-950"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
