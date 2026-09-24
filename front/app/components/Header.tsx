export default function Header() {
  return (
    <header className="w-full border-b border-purple-100 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-6 md:px-8">

        {/* Identificação */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 font-bold text-purple-700">
            F
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-800">
              FisioCare
            </p>

            <p className="text-xs text-gray-500">
              Sistema de gestão
            </p>
          </div>
        </div>

        {/* Botão sair */}
        <button
          className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
        >
          Sair
        </button>

      </div>
    </header>
  );
}