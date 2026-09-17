import Link from "next/link";

export default function NovaSessao() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-10 md:px-10">
      <div className="mx-auto w-full max-w-4xl">

        {/* Cabeçalho */}
        <div className="mb-8">
          <Link
            href="/home/sessoes"
            className="text-sm font-semibold text-purple-700 transition hover:text-purple-900"
          >
            ← Voltar para sessões
          </Link>

          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-purple-600">
            FisioCare
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-800 md:text-4xl">
            Nova sessão
          </h1>

          <p className="mt-2 text-gray-600">
            Registre uma nova sessão de fisioterapia.
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

            {/* Data */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Data
              </label>

              <input
                type="date"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            {/* Horário */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Horário
              </label>

              <input
                type="time"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            {/* Descrição */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Descrição
              </label>

              <input
                type="text"
                placeholder="Ex.: Mobilidade e fortalecimento"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            {/* Observações */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Observações
              </label>

              <textarea
                rows={5}
                placeholder="Registre observações sobre a sessão..."
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            {/* Sessão realizada */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-purple-700"
                />

                Sessão já realizada
              </label>
            </div>

            {/* Botões */}
            <div className="md:col-span-2 flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">

              <Link
                href="/home/sessoes"
                className="rounded-xl border border-purple-200 px-5 py-3 text-center font-semibold text-purple-700 transition hover:bg-purple-50"
              >
                Cancelar
              </Link>

              <button
                type="submit"
                className="rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-purple-800"
              >
                Cadastrar sessão
              </button>

            </div>

          </form>
        </div>

      </div>
    </div>
  );
}