"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/calculator", label: "Calculator" },
  { href: "/about", label: "About" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:min-h-20 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          className="group flex min-w-0 max-w-full items-start gap-3 text-base font-bold text-zinc-950 sm:items-center sm:text-lg"
        >
          <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-teal-900/15 bg-teal-50 text-sm font-bold text-teal-950 shadow-sm transition group-hover:border-teal-800/30">
            B
          </span>
          <span className="min-w-0">
            <span className="block leading-5">BARC</span>
            <span className="mt-0.5 block text-sm font-normal leading-5 text-zinc-500 sm:inline sm:text-base">
              Proof-of-concept research calculator
            </span>
          </span>
        </Link>
        <div className="flex flex-wrap gap-2 text-sm font-medium text-zinc-600 sm:justify-end">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`rounded-md px-3.5 py-2 transition hover:bg-zinc-100 hover:text-zinc-950 focus-visible:bg-zinc-100 ${
                pathname === item.href
                  ? "bg-teal-50 text-teal-950 ring-1 ring-teal-900/10"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
