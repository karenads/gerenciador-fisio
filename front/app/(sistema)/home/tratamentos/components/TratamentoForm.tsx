'use client'

import { Tratamento, TratamentoFormProps } from "@/app/types/tratamento";
import axios from "@/node_modules/axios/index";
import Link from "@/node_modules/next/link";
import { useRouter } from "@/node_modules/next/navigation";
import { useState } from "react";

export default function TratamentoForm({
  tratamentoExistente
}: TratamentoFormProps) {

  const router = useRouter();

  // Se estiver editando, utiliza o tratamento existente.
  // Se estiver cadastrando, cria um tratamento vazio.
  const [tratamento, setTratamento] = useState<Tratamento>(
    tratamentoExistente ||
    new Tratamento(
      null,
      "",
      "",
      "",
      "",
      0,
      0,
      ""
    )
  );

  // Atualiza os campos de texto e data
  const handlerChange = (
    campo: "nome" | "descricao" | "dataInicio" | "dataFinal" | "status",
    valor: string
  ) => {
    setTratamento(
      valorAnterior =>
        new Tratamento(
          valorAnterior.id,
          campo === "nome" ? valor : valorAnterior.nome,
          campo === "descricao" ? valor : valorAnterior.descricao,
          campo === "dataInicio" ? valor : valorAnterior.dataInicio,
          campo === "dataFinal" ? valor : valorAnterior.dataFinal,
          valorAnterior.totalSessoes,
          valorAnterior.sessoesRealizadas,
          campo === "status" ? valor : valorAnterior.status
        )
    );
  };

  // Atualiza os campos numéricos
  const handlerChangeNumero = (
    campo: "totalSessoes" | "sessoesRealizadas",
    valor: number
  ) => {
    setTratamento(
      valorAnterior =>
        new Tratamento(
          valorAnterior.id,
          valorAnterior.nome,
          valorAnterior.descricao,
          valorAnterior.dataInicio,
          valorAnterior.dataFinal,
          campo === "totalSessoes" ? valor : valorAnterior.totalSessoes,
          campo === "sessoesRealizadas"
            ? valor
            : valorAnterior.sessoesRealizadas,
          valorAnterior.status
        )
    );
  };

  const handlerSalvar = async (formData: FormData) => {

    // Editar
    if (tratamentoExistente) {

      // COLOCAR A URL DO PUT DO SWAGGER AQUI
      const url = "";

      if (!url) {
        alert("Endpoint de edição ainda não configurado.");
        return;
      }

      const dadosRetorno = await axios.put<number>(
        url,
        tratamento
      );

      if (dadosRetorno.status == 200) {
        alert("Tratamento foi salvo com sucesso!");
      } else {
        alert(dadosRetorno.data);
        return;
      }

    // Cadastrar
    } else {

      // COLOCAR A URL DO POST DO SWAGGER AQUI
      const url = "";

      if (!url) {
        alert("Endpoint de cadastro ainda não configurado.");
        return;
      }

      const dadosRetorno = await axios.post<number>(
        url,
        tratamento
      );

      if (dadosRetorno.status == 200) {
        alert("Tratamento foi salvo com sucesso!");
      } else {
        alert(dadosRetorno.data);
        return;
      }
    }

    router.push("/home/tratamentos");
  };

  return (
    <form action={handlerSalvar} className="space-y-6">

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Nome */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Nome do tratamento
          </label>

          <input
            name="nome"
            value={tratamento.nome}
            onChange={(e) => handlerChange("nome", e.target.value)}
            required
            type="text"
            placeholder="Digite o nome do tratamento"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Status
          </label>

          <input
            name="status"
            value={tratamento.status}
            onChange={(e) => handlerChange("status", e.target.value)}
            type="text"
            placeholder="Digite o status"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* Data de início */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Data de início
          </label>

          <input
            name="dataInicio"
            value={tratamento.dataInicio}
            onChange={(e) => handlerChange("dataInicio", e.target.value)}
            required
            type="datetime-local"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* Data final */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Data final
          </label>

          <input
            name="dataFinal"
            value={tratamento.dataFinal}
            onChange={(e) => handlerChange("dataFinal", e.target.value)}
            type="datetime-local"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* Total de sessões */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Total de sessões
          </label>

          <input
            name="totalSessoes"
            value={tratamento.totalSessoes}
            onChange={(e) =>
              handlerChangeNumero("totalSessoes", Number(e.target.value))
            }
            min={0}
            type="number"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* Sessões realizadas */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Sessões realizadas
          </label>

          <input
            name="sessoesRealizadas"
            value={tratamento.sessoesRealizadas}
            onChange={(e) =>
              handlerChangeNumero(
                "sessoesRealizadas",
                Number(e.target.value)
              )
            }
            min={0}
            type="number"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* Descrição */}
        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700">
            Descrição
          </label>

          <textarea
            name="descricao"
            value={tratamento.descricao}
            onChange={(e) => handlerChange("descricao", e.target.value)}
            rows={4}
            placeholder="Descreva o tratamento..."
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

      </div>

      {/* Botões */}
      <div className="flex items-center justify-end gap-4 border-t border-purple-100 pt-4">

        <Link
          href="/home/tratamentos"
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