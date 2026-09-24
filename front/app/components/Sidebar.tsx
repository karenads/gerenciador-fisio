import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="min-h-screen w-64 border-r border-purple-200 bg-purple-900 p-6 shadow-lg">

      {/* Nome do sistema */}
      <div className="mb-8 flex items-center gap-2 px-2">
        <span className="inline-block h-3 w-3 rounded-full bg-purple-400"></span>

        <span className="text-xl font-bold tracking-wide text-purple-100">
          FisioCare
        </span>
      </div>

      {/* Navegação */}
      <nav className="flex flex-col gap-2">

        <Link
          href="/home"
          className="rounded-xl px-4 py-3 font-medium text-purple-200 transition-all duration-200 hover:bg-purple-800 hover:text-white"
        >
          Home
        </Link>

        <Link
          href="/home/pacientes"
          className="rounded-xl px-4 py-3 font-medium text-purple-200 transition-all duration-200 hover:bg-purple-800 hover:text-white"
        >
          Pacientes
        </Link>

        <Link
          href="/home/tratamentos"
          className="rounded-xl px-4 py-3 font-medium text-purple-200 transition-all duration-200 hover:bg-purple-800 hover:text-white"
        >
          Tratamentos
        </Link>

        <Link
          href="/home/sessoes"
          className="rounded-xl px-4 py-3 font-medium text-purple-200 transition-all duration-200 hover:bg-purple-800 hover:text-white"
        >
          Sessões
        </Link>

      </nav>

    </aside>
  );
}