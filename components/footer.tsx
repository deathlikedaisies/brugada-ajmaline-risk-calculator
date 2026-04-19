export function Footer() {
  return (
    <footer className="border-t border-zinc-200/80 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-7 text-sm leading-6 text-zinc-600 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium text-zinc-800">
            Type 1 Brugada Ajmaline Response Calculator (BARC) research proof of
            concept.
          </p>
          <p>No authentication, backend storage, or patient data persistence.</p>
        </div>
        <p className="text-xs text-zinc-500">
          Created by Dominic S Zimmerman et al.
        </p>
      </div>
    </footer>
  );
}
