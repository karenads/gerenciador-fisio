"use client";

import axios from "@/node_modules/axios/index";
import Link from "@/node_modules/next/link";
import { useEffect, useState } from "react";
import { Sessao } from "@/app/types/sessao";

export default function Sessoes() {
  const [sessoes, setSessoes] = useState<Sessao[]>([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const token = localStorage.getItem("token");

      // COLOCAR A URL DO GET DE SESSÕES DO SWAGGER AQUI
      const dados = await axios.get<Sessao[]>(
        "",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSessoes(dados.data);
    } catch (error) {
      alert("Erro ao carregar dados!");
    }
  };

  const handleDeletarSessao = async (sessao: Sessao) => {

    // COLOCAR A URL DO DELETE DO SWAGGER AQUI
    var dadosRetorno = await axios.delete(
      ""
    );

    if (dadosRetorno.status == 200) {
      alert("Excluído com sucesso!");
    } else {
      alert(dadosRetorno.data);

      return;
    }

    carregarDados();
  };

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
              Sessões
            </h1>

            <p className="mt-2 text-gray-600">
              Organize e acompanhe as sessões de fisioterapia.
            </p>
          </div>

          <Link
            href="/home/sessoes/nova"
            className="w-fit rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-purple-800"
          >
            + Nova sessão
          </Link>
        </div>

        {/* Lista */}
        <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm">

          <div className="border-b border-purple-100 bg-purple-50 px-6 py-4">
            <h2 className="text-lg font-semibold text-purple-800">
              Sessões cadastradas
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">

              <thead>
                <tr className="border-b border-gray-100 text-sm text-gray-500">

                  <th className="px-6 py-4 font-semibold">
                    Código
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Data
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Horário
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Descrição
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

                {sessoes.map((sessao) => (
                  <tr
                    key={sessao.id}
                    className="border-b border-gray-100 transition hover:bg-purple-50/50"
                  >

                    {/* Código */}
                    <td className="px-6 py-5 text-gray-600">
                      {sessao.id}
                    </td>

                    {/* Data */}
                    <td className="px-6 py-5 text-gray-600">
                      {sessao.data}
                    </td>

                    {/* Horário */}
                    <td className="px-6 py-5 text-gray-600">
                      {sessao.horario}
                    </td>

                    {/* Descrição */}
                    <td className="px-6 py-5 text-gray-600">
                      {sessao.descricao}
                    </td>

                    {/* Realizada */}
                    <td className="px-6 py-5">

                      {sessao.realizada ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                          Realizada
                        </span>
                      ) : (
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                          Pendente
                        </span>
                      )}

                    </td>

                    {/* Ações */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">

                        <Link
                          href={`/home/sessoes/${sessao.id}/editar`}
                          className="font-semibold text-purple-700 transition hover:text-purple-900"
                        >
                          Editar
                        </Link>

                        <button
                          onClick={() => handleDeletarSessao(sessao)}
                          className="font-medium text-red-600 transition-colors hover:text-red-800"
                        >
                          DELETAR
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}

                {/* Nenhuma sessão */}
                {sessoes.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      Nenhuma sessão encontrada!
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>
        </div>

        {/* Informação complementar */}
        <div className="mt-8 rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
            Acompanhamento
          </p>

          <h3 className="mt-2 text-xl font-bold text-gray-800">
            Evolução por sessão
          </h3>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
            Cada sessão permite registrar informações e observações,
            mantendo o histórico dos atendimentos organizado.
          </p>
        </div>

      </div>
    </div>
  );
}