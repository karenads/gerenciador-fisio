import Link from "next/link";

export default function Pacientes() {
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
              Pacientes
            </h1>

            <p className="mt-2 text-gray-600">
              Gerencie os pacientes cadastrados no sistema.
            </p>
          </div>

          <Link
            href="/home/pacientes/novo"
            className="w-fit rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-purple-800"
          >
            + Novo paciente
          </Link>
        </div>

        {/* Lista de pacientes */}
        <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm">
          <div className="border-b border-purple-100 bg-purple-50 px-6 py-4">
            <h2 className="text-lg font-semibold text-purple-800">
              Lista de pacientes
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-sm text-gray-500">
                  <th className="px-6 py-4 font-semibold">
                    Nome
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    CPF
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Telefone
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
                <tr className="border-b border-gray-100 transition hover:bg-purple-50/50">
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-semibold text-gray-800">
                        Paciente exemplo
                      </p>

                      <p className="text-sm text-gray-500">
                        paciente@email.com
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    000.000.000-00
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    (00) 00000-0000
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
                      Em acompanhamento
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <button className="font-semibold text-purple-700 transition hover:text-purple-900">
                      Visualizar
                    </button>
                  </td>
                </tr>

                <tr className="transition hover:bg-purple-50/50">
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-semibold text-gray-800">
                        Outro paciente
                      </p>

                      <p className="text-sm text-gray-500">
                        outro@email.com
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    111.111.111-11
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    (00) 99999-9999
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      Ativo
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

        {/* Informações inferiores */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
              Organização
            </p>

            <h3 className="mt-2 text-xl font-bold text-gray-800">
              Dados centralizados
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Mantenha as informações dos pacientes organizadas para
              facilitar o acompanhamento durante todo o tratamento.
            </p>
          </div>

          <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
              FisioCare
            </p>

            <h3 className="mt-2 text-xl font-bold text-gray-800">
              Cuidado individualizado
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Acompanhe cada paciente de forma próxima, organizada e
              humanizada.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}