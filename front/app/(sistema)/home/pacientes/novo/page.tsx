import Link from "@/node_modules/next/link";
import SessaoForm from "@/app/(sistema)/home/sessoes/components/SessaoForm";

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
          <SessaoForm />
        </div>

      </div>
    </div>
  );
}