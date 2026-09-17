import Link from "next/link";

export default function Sessoes() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-10 md:px-10">
      <div className="mx-auto w-full max-w-7xl">

        {/* Cabeçalho */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-purple-600">
              FisioCare
            </p>

            <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
              Sessões
            </h1>

            <p className="mt-2 text-gray-600">
              Organize e acompanhe as sessões de fisioterapia dos pacientes.
            </p>
          </div>

          <Link
            href="/home/sessoes/nova"
            className="w-fit rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-purple-800"
          >
            + Nova sessão
          </Link>
        </div>

        {/* Lista */}
        <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm">

          <div className="border-b border-purple-100 bg-purple-50 px-6 py-4">
            <h2 className="text-lg font-semibold text-purple-800">
              Sessões agendadas
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">

              <thead>
                <tr className="border-b border-gray-100 text-sm text-gray-500">
                  <th className="px-6 py-4 font-semibold">
                    Paciente
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Data
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Horário
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Descrição
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Status
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody>

                {/* Exemplo 1 */}
                <tr className="border-b border-gray-100 transition hover:bg-purple-50/50">

                  <td className="px-6 py-5">
                    <div>
                      <p className="font-semibold text-gray-800">
                        Paciente exemplo
                      </p>

                      <p className="text-sm text-gray-500">
                        Tratamento de recuperação
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    16/09/2026
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    14:30
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    Mobilidade e fortalecimento
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      Realizada
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <button className="font-semibold text-purple-700 transition hover:text-purple-900">
                      Visualizar
                    </button>
                  </td>
                </tr>

                {/* Exemplo 2 */}
                <tr className="transition hover:bg-purple-50/50">

                  <td className="px-6 py-5">
                    <div>
                      <p className="font-semibold text-gray-800">
                        Outro paciente
                      </p>

                      <p className="text-sm text-gray-500">
                        Tratamento pós-operatório
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    18/09/2026
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    10:00
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    Avaliação e exercícios funcionais
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                      Pendente
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <button className="font-semibold text-purple-700 transition hover:text-purple-900">
                      Visualizar
                    </button>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

        {/* Informação complementar */}
        <div className="mt-8 rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
            Acompanhamento
          </p>

          <h3 className="mt-2 text-xl font-bold text-gray-800">
            Evolução por sessão
          </h3>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
            Cada sessão permite acompanhar o progresso do paciente,
            registrar observações e manter o histórico do tratamento
            organizado.
          </p>
        </div>

      </div>
    </div>
  );
}