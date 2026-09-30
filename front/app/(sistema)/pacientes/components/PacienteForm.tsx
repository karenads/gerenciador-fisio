'use client'

import { Paciente, PacienteFormProps } from "@/app/types/paciente";
import axios from "@/node_modules/axios/index";
import Link from "@/node_modules/next/link";
import { useRouter } from "@/node_modules/next/navigation";
import { useState } from "react";

export default function PacienteForm({
  pacienteExistente
}: PacienteFormProps) {

  const router = useRouter();

  // Se estiver editando, utiliza o paciente existente.
  // Se estiver cadastrando, cria um paciente novo com status ATIVO.
  const [paciente, setPaciente] = useState<Paciente>(
    pacienteExistente ||
    new Paciente(
      null,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "ATIVO"
    )
  );

  // Atualiza o campo que foi alterado no formulário
  // mantendo o status atual do paciente.
  const handlerChange = (
    campo:
      | "nome"
      | "cpf"
      | "telefone"
      | "email"
      | "dataNascimento"
      | "endereco"
      | "observacoes",
    valor: string
  ) => {
    setPaciente(
      valorAnterior =>
        new Paciente(
          valorAnterior.id,
          campo === "nome" ? valor : valorAnterior.nome,
          campo === "cpf" ? valor : valorAnterior.cpf,
          campo === "telefone" ? valor : valorAnterior.telefone,
          campo === "email" ? valor : valorAnterior.email,
          campo === "dataNascimento"
            ? valor
            : valorAnterior.dataNascimento,
          campo === "endereco" ? valor : valorAnterior.endereco,
          campo === "observacoes"
            ? valor
            : valorAnterior.observacoes,
          valorAnterior.status
        )
    );
  };

  const handlerSalvar = async (formData: FormData) => {
    try {

      const token = localStorage.getItem("token");

      // EDITAR
      if (pacienteExistente) {

        const dadosRetorno = await axios.put(
          "http://localhost:8080/pacientes/" + paciente.id,
          paciente,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (dadosRetorno.status == 200) {
          alert("Paciente foi atualizado com sucesso!");
        } else {
          alert(dadosRetorno.data);
          return;
        }

      // CADASTRAR
      } else {

        const dadosRetorno = await axios.post(
          "http://localhost:8080/pacientes",
          paciente,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (
          dadosRetorno.status == 200 ||
          dadosRetorno.status == 201
        ) {
          alert("Paciente foi salvo com sucesso!");
        } else {
          alert(dadosRetorno.data);
          return;
        }
      }

      router.push("/home/pacientes");
      router.refresh();

    } catch (error) {

      console.error(error);
      alert("Erro ao salvar paciente!");

    }
  };

  return (
    <form action={handlerSalvar} className="space-y-6">

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Nome */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Nome completo
          </label>

          <input
            name="nome"
            value={paciente.nome}
            onChange={(e) => handlerChange("nome", e.target.value)}
            required
            type="text"
            placeholder="Digite o nome do paciente"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* CPF */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            CPF
          </label>

          <input
            name="cpf"
            value={paciente.cpf}
            onChange={(e) => handlerChange("cpf", e.target.value)}
            required
            type="text"
            placeholder="000.000.000-00"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* Telefone */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Telefone
          </label>

          <input
            name="telefone"
            value={paciente.telefone}
            onChange={(e) => handlerChange("telefone", e.target.value)}
            required
            type="text"
            placeholder="(00) 00000-0000"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* E-mail */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            E-mail
          </label>

          <input
            name="email"
            value={paciente.email}
            onChange={(e) => handlerChange("email", e.target.value)}
            required
            type="email"
            placeholder="paciente@email.com"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* Data de nascimento */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Data de nascimento
          </label>

          <input
            name="dataNascimento"
            value={paciente.dataNascimento}
            onChange={(e) =>
              handlerChange("dataNascimento", e.target.value)
            }
            required
            type="date"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* Endereço */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Endereço
          </label>

          <input
            name="endereco"
            value={paciente.endereco}
            onChange={(e) =>
              handlerChange("endereco", e.target.value)
            }
            type="text"
            placeholder="Digite o endereço do paciente"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* Observações */}
        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700">
            Observações
          </label>

          <textarea
            name="observacoes"
            value={paciente.observacoes}
            onChange={(e) =>
              handlerChange("observacoes", e.target.value)
            }
            placeholder="Informações adicionais sobre o paciente..."
            rows={4}
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

      </div>

      {/* Botões */}
      <div className="flex items-center justify-end gap-4 border-t border-purple-100 pt-4">

        <Link
          href="/home/pacientes"
          className="rounded-xl border border-purple-200 px-5 py-3 text-center font-semibold text-purple-700 transition hover:bg-purple-50"
        >
          Cancelar
        </Link>

        <button
          type="submit"
          className="rounded-xl bg-purple-700 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-purple-800"
        >
          Salvar
        </button>

      </div>

    </form>
  );
}