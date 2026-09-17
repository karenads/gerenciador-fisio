import Link from "next/link";

export default function Tratamentos() {
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
              Tratamentos
            </h1>

            <p className="mt-2 text-gray-600">
              Acompanhe e organize os tratamentos dos pacientes.
            </p>
          </div>

          <Link
            href="/home/tratamentos/novo"
            className="w-fit rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-purple-800"
          >
            + Novo tratamento
          </Link>
        </div>

        {/* Lista */}
        <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm">

          <div className="border-b border-purple-100 bg-purple-50 px-6 py-4">
            <h2 className="text-lg font-semibold text-purple-800">
              Tratamentos cadastrados
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
                    Tratamento
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Período
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Sessões
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
                        Atendimento fisioterapêutico
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    Recuperação de joelho
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    01/09/2026 até 30/10/2026
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    5 de 10
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
                      Em andamento
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
                        Atendimento pós-operatório
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    Reabilitação de ombro
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    15/08/2026 até 15/09/2026
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    8 de 8
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      Concluído
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
            Evolução do paciente
          </p>

          <h3 className="mt-2 text-xl font-bold text-gray-800">
            Acompanhamento do tratamento
          </h3>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
            Organize o período do tratamento, acompanhe o número de sessões
            realizadas e mantenha as informações clínicas centralizadas.
          </p>
        </div>

      </div>
    </div>
  );
}