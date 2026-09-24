import Link from "next/link";

export default function PacienteForm() {
  return (
    <form className="grid gap-6 md:grid-cols-2">

      {/* Nome */}
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Nome completo
        </label>

        <input
          name="nome"
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
          name="cpf"
          type="text"
          placeholder="000.000.000-00"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
        />
      </div>

      {/* Data de nascimento */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Data de nascimento
        </label>

        <input
          name="dataNascimento"
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
          name="telefone"
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
          name="email"
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
          name="endereco"
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
          name="observacoes"
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
  );
}