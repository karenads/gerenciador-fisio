'use client'

import { Sessao, SessaoFormProps } from "@/app/types/sessao";
import axios from "@/node_modules/axios/index";
import Link from "@/node_modules/next/link";
import { useRouter } from "@/node_modules/next/navigation";
import { useState } from "react";

export default function SessaoForm({ sessaoExistente }: SessaoFormProps) {
  const router = useRouter();

  const [sessao, setSessao] = useState<Sessao>(
    sessaoExistente ||
    new Sessao(null, "", "", "", "", false, "ATIVO")
  );

  const handlerChange = (
    campo: "data" | "horario" | "descricao" | "observacoes",
    valor: string
  ) => {
    setSessao(
      valorAnterior =>
        new Sessao(
          valorAnterior.id,
          campo === "data" ? valor : valorAnterior.data,
          campo === "horario" ? valor : valorAnterior.horario,
          campo === "descricao" ? valor : valorAnterior.descricao,
          campo === "observacoes" ? valor : valorAnterior.observacoes,
          valorAnterior.realizada,
          valorAnterior.status
        )
    );
  };

  const handlerRealizada = (valor: boolean) => {
    setSessao(
      valorAnterior =>
        new Sessao(
          valorAnterior.id,
          valorAnterior.data,
          valorAnterior.horario,
          valorAnterior.descricao,
          valorAnterior.observacoes,
          valor,
          valorAnterior.status
        )
    );
  };

  const handlerSalvar = async (formData: FormData) => {
    try {
      const token = localStorage.getItem("token");

      // EDITAR
      if (sessaoExistente) {

        var dadosRetorno = await axios.put(
          "http://localhost:8080/sessoes/" + sessao.id,
          sessao,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (dadosRetorno.status == 200) {
          alert("Sessão foi atualizada com sucesso!");
        } else {
          alert(dadosRetorno.data);
          return;
        }

      // CADASTRAR
      } else {

        var dadosRetorno = await axios.post(
          "http://localhost:8080/sessoes",
          sessao,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (dadosRetorno.status == 200 || dadosRetorno.status == 201) {
          alert("Sessão foi salva com sucesso!");
        } else {
          alert(dadosRetorno.data);
          return;
        }
      }

      router.push("/home/sessoes");
      router.refresh();

    } catch (error) {
      console.error("Erro ao salvar sessão:", error);
      alert("Erro ao salvar sessão!");
    }
  };

  return (
    <form action={handlerSalvar} className="space-y-6">

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Data */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Data
          </label>

          <input
            name="data"
            value={sessao.data}
            onChange={(e) => handlerChange("data", e.target.value)}
            required
            type="date"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* Horário */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Horário
          </label>

          <input
            name="horario"
            value={sessao.horario}
            onChange={(e) => handlerChange("horario", e.target.value)}
            required
            type="time"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* Descrição */}
        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700">
            Descrição
          </label>

          <input
            name="descricao"
            value={sessao.descricao}
            onChange={(e) => handlerChange("descricao", e.target.value)}
            required
            type="text"
            placeholder="Digite a descrição da sessão"
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
            value={sessao.observacoes}
            onChange={(e) => handlerChange("observacoes", e.target.value)}
            placeholder="Informações adicionais sobre a sessão..."
            rows={4}
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* Realizada */}
        <div className="space-y-2 md:col-span-2">
          <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
            <input
              name="realizada"
              type="checkbox"
              checked={sessao.realizada}
              onChange={(e) => handlerRealizada(e.target.checked)}
              className="h-5 w-5 rounded border-gray-300 text-purple-700 focus:ring-purple-500"
            />

            Sessão realizada
          </label>
        </div>

      </div>

      {/* Botões */}
      <div className="flex items-center justify-end gap-4 border-t border-purple-100 pt-4">

        <Link
          href="/home/sessoes"
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