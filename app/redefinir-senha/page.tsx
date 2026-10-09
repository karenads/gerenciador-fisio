import Link from "next/link";

export default function RedefinirSenha() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-10">
      <div className="mx-auto flex min-h-[80vh] w-full max-w-md items-center justify-center">

        <div className="w-full rounded-2xl border border-purple-100 bg-white p-8 shadow-lg">

          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-600">
              FisioCare
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-800">
              Redefinir senha
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Digite sua nova senha para recuperar o acesso ao sistema.
            </p>
          </div>

          <form className="space-y-6">

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Nova senha
              </label>

              <input
                type="password"
                placeholder="Digite sua nova senha"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Confirmar nova senha
              </label>

              <input
                type="password"
                placeholder="Digite novamente sua senha"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-purple-800"
            >
              Redefinir senha
            </button>

          </form>

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-sm font-semibold text-purple-700 transition hover:text-purple-900"
            >
              ← Voltar para o login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}