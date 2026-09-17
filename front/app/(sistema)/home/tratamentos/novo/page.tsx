import Link from "next/link";

export default function NovoTratamento() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-10 md:px-10">
      <div className="mx-auto w-full max-w-4xl">

        {/* Cabeçalho */}
        <div className="mb-8">
          <Link
            href="/home/tratamentos"
            className="text-sm font-semibold text-purple-700 transition hover:text-purple-900"
          >
            ← Voltar para tratamentos
          </Link>

          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-purple-600">
            FisioCare
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-800 md:text-4xl">
            Novo tratamento
          </h1>

          <p className="mt-2 text-gray-600">
            Preencha os dados para registrar um novo tratamento.
          </p>
        </div>

        {/* Formulário */}
        <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm md:p-8">

          <form className="grid gap-6 md:grid-cols-2">

            {/* Paciente */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Paciente
              </label>

              <select
                defaultValue=""
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              >
                <option value="" disabled>
                  Selecione o paciente
                </option>

                <option value="1">
                  Paciente exemplo
                </option>

                <option value="2">
                  Outro paciente
                </option>
              </select>
            </div>

            {/* Nome do tratamento */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Nome do tratamento
              </label>

              <input
                type="text"
                placeholder="Ex.: Recuperação de joelho"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            {/* Data inicial */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Data inicial
              </label>

              <input
                type="date"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            {/* Data final */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Data final
              </label>

              <input
                type="date"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            {/* Total de sessões */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Total de sessões
              </label>

              <input
                type="number"
                min="1"
                placeholder="Ex.: 10"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Status
              </label>

              <select
                defaultValue="EM_ANDAMENTO"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              >
                <option value="EM_ANDAMENTO">
                  Em andamento
                </option>

                <option value="CONCLUIDO">
                  Concluído
                </option>

                <option value="CANCELADO">
                  Cancelado
                </option>
              </select>
            </div>

            {/* Descrição */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Descrição
              </label>

              <textarea
                rows={5}
                placeholder="Descreva o objetivo e as informações importantes do tratamento..."
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            {/* Botões */}
            <div className="md:col-span-2 flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">

              <Link
                href="/home/tratamentos"
                className="rounded-xl border border-purple-200 px-5 py-3 text-center font-semibold text-purple-700 transition hover:bg-purple-50"
              >
                Cancelar
              </Link>

              <button
                type="submit"
                className="rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-purple-800"
              >
                Cadastrar tratamento
              </button>

            </div>

          </form>

        </div>

      </div>
    </div>
  );
}