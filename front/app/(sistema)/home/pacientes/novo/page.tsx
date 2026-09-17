import Link from "next/link";

export default function NovoPaciente() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-10 md:px-10">
      <div className="mx-auto w-full max-w-4xl">

        {/* Topo */}
        <div className="mb-8">
          <Link
            href="/home/pacientes"
            className="text-sm font-semibold text-purple-700 hover:text-purple-900"
          >
            ← Voltar para pacientes
          </Link>

          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-purple-600">
            FisioCare
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-800 md:text-4xl">
            Novo paciente
          </h1>

          <p className="mt-2 text-gray-600">
            Preencha os dados abaixo para cadastrar um novo paciente.
          </p>
        </div>

        {/* Formulário */}
        <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm md:p-8">

          <form className="grid gap-6 md:grid-cols-2">

            {/* Nome */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Nome completo
              </label>

              <input
                type="text"
                placeholder="Digite o nome do paciente"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            {/* CPF */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                CPF
              </label>

              <input
                type="text"
                placeholder="000.000.000-00"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            {/* Data nascimento */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Data de nascimento
              </label>

              <input
                type="date"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            {/* Telefone */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Telefone
              </label>

              <input
                type="text"
                placeholder="(00) 00000-0000"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                E-mail
              </label>

              <input
                type="email"
                placeholder="paciente@email.com"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            {/* Endereço */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Endereço
              </label>

              <input
                type="text"
                placeholder="Digite o endereço"
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
                placeholder="Adicione observações sobre o paciente..."
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            {/* Botões */}
            <div className="md:col-span-2 flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">

              <Link
                href="/home/pacientes"
                className="rounded-xl border border-purple-200 px-5 py-3 text-center font-semibold text-purple-700 transition hover:bg-purple-50"
              >
                Cancelar
              </Link>

              <button
                type="submit"
                className="rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-purple-800"
              >
                Cadastrar paciente
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
}