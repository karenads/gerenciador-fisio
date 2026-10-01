/*
  Link é utilizado para navegar entre páginas
  utilizando o sistema de rotas do Next.js.
*/
import Link from "@/node_modules/next/link";

/*
  Importa o formulário de paciente.

  Como a pasta pacientes agora está
  diretamente dentro de (sistema),
  o caminho correto é:

  app/(sistema)/pacientes/components/PacienteForm
*/
import PacienteForm from "@/app/(sistema)/pacientes/components/PacienteForm";

/*
  Página responsável pelo cadastro
  de um novo paciente.
*/
export default function NovoPaciente() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-10 md:px-10">
      <div className="mx-auto w-full max-w-4xl">
        {/* ==================== CABEÇALHO ==================== */}

        <div className="mb-8">
          {/*
            Link utilizado para voltar
            para a listagem de pacientes.

            Como pacientes agora está diretamente
            dentro de (sistema), a rota correta é:

            /pacientes
          */}
          <Link
            href="/pacientes"
            className="text-sm font-semibold text-purple-700 transition hover:text-purple-900"
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
            Cadastre um novo paciente no sistema.
          </p>
        </div>

        {/* ==================== FORMULÁRIO ==================== */}

        <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm md:p-8">
          {/*
            Reutiliza o componente PacienteForm.

            Como nenhuma propriedade pacienteExistente
            foi enviada, o formulário entende que
            está em modo de cadastro e utiliza POST.
          */}
          <PacienteForm />
        </div>
      </div>
    </div>
  );
}
