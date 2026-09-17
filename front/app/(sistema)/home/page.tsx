import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-10 md:px-10">

      {/* Cabeçalho */}
      <div className="mx-auto w-full max-w-7xl">

        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-purple-600">
            FisioCare
          </p>

          <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
            Bem-vindo ao sistema de gestão
          </h1>

          <p className="mt-3 max-w-2xl text-gray-600">
            Organize pacientes, tratamentos e sessões de fisioterapia
            de forma simples, prática e humanizada.
          </p>
        </div>

        {/* Cards principais */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

          {/* Pacientes */}
          <Link
            href="/home/pacientes"
            className="group rounded-2xl border border-purple-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-lg"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-xl font-bold text-purple-700">
              P
            </div>

            <h2 className="text-xl font-bold text-gray-800">
              Pacientes
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Consulte e gerencie os pacientes cadastrados no sistema.
            </p>

            <p className="mt-5 text-sm font-semibold text-purple-700">
              Acessar pacientes →
            </p>
          </Link>

          {/* Tratamentos */}
          <Link
            href="/home/tratamentos"
            className="group rounded-2xl border border-purple-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-lg"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-xl font-bold text-purple-700">
              T
            </div>

            <h2 className="text-xl font-bold text-gray-800">
              Tratamentos
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Acompanhe os tratamentos e a evolução de cada paciente.
            </p>

            <p className="mt-5 text-sm font-semibold text-purple-700">
              Acessar tratamentos →
            </p>
          </Link>

          {/* Sessões */}
          <Link
            href="/home/sessoes"
            className="group rounded-2xl border border-purple-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-lg"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-xl font-bold text-purple-700">
              S
            </div>

            <h2 className="text-xl font-bold text-gray-800">
              Sessões
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Organize e acompanhe as sessões realizadas pelos pacientes.
            </p>

            <p className="mt-5 text-sm font-semibold text-purple-700">
              Acessar sessões →
            </p>
          </Link>

          {/* Usuários */}
          <Link
            href="/home/usuarios"
            className="group rounded-2xl border border-purple-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-lg"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-xl font-bold text-purple-700">
              U
            </div>

            <h2 className="text-xl font-bold text-gray-800">
              Usuários
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Gerencie os profissionais e usuários cadastrados.
            </p>

            <p className="mt-5 text-sm font-semibold text-purple-700">
              Acessar usuários →
            </p>
          </Link>

        </div>

        {/* Bloco inferior */}
        <div className="mt-10 rounded-2xl bg-purple-700 p-7 text-white shadow-lg md:p-9">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-200">
            Nosso propósito
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Tecnologia que organiza, cuidado que aproxima.
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-purple-100">
            O FisioCare foi pensado para facilitar a rotina do profissional
            de fisioterapia e permitir mais tempo para aquilo que realmente
            importa: o cuidado com o paciente.
          </p>
        </div>

      </div>
    </div>
  );
}