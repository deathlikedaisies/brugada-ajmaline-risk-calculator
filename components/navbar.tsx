import Link from "next/link";

const navigation = [
  { href: "/calculator", label: "Calculator" },
  { href: "/about", label: "About" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/95">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8"
      >
        <Link
          href="/"
          className="max-w-full text-lg font-semibold tracking-normal text-slate-950"
        >
          BARC{" "}
          <span className="block font-normal text-slate-500 sm:inline">
            Proof-of-concept research calculator
          </span>
        </Link>
        <div className="flex flex-wrap gap-2 text-sm font-medium text-slate-700">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 hover:bg-stone-100 hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
