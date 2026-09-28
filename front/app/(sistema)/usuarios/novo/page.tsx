import Link from "next/link";
import UsuarioForm from "../components/UsuarioForm";

export default function CadastroUsuario() {

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-10 md:px-10">
      <div className="mx-auto max-w-4xl space-y-8">

        <div>
          <Link
            href="/usuarios"
            className="inline-flex items-center gap-2 text-sm font-medium text-purple-700 transition hover:text-purple-900"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-purple-200 bg-white transition hover:border-purple-400">
              ←
            </span>

            Voltar para listagem
          </Link>
        </div>

        <div>
          <p className="mb-2 text-sm font-bold tracking-[3px] text-purple-600">
            FISIOCARE
          </p>

          <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
            Novo Usuário
          </h1>

          <p className="mt-2 text-gray-600">
            Preencha os dados para registrar um novo usuário.
          </p>
        </div>

        <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm md:p-8">
          <UsuarioForm />
        </div>

      </div>
    </div>
  );
}