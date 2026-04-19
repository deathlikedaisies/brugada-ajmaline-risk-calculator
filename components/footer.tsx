export function Footer() {
  return (
    <footer className="border-t border-zinc-200/80 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-7 text-sm leading-6 text-zinc-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="font-medium text-zinc-800">
          Brugada Ajmaline Risk Calculator research proof of concept.
        </p>
        <p>No authentication, backend storage, or patient data persistence.</p>
      </div>
    </footer>
  );
}
