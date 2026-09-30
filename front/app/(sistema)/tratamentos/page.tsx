'use client'

import { Tratamento } from "@/app/types/tratamento";
import axios from "@/node_modules/axios/index";
import Link from "@/node_modules/next/link";
import { useEffect, useState } from "react";

export default function Tratamentos() {

  const [tratamentos, setTratamentos] = useState<Tratamento[]>([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {

      const token = localStorage.getItem("token");

      const dados = await axios.get<Tratamento[]>(
        "http://localhost:8080/tratamentos",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTratamentos(dados.data);

    } catch (error) {
      console.error(error);
      alert("Erro ao carregar tratamentos!");
    }
  };

  const handleDeletarTratamento = async (tratamento: Tratamento) => {
    try {

      const token = localStorage.getItem("token");

      const dadosRetorno = await axios.delete(
        "http://localhost:8080/tratamentos/" + tratamento.id + "/excluir",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (dadosRetorno.status == 200) {
        alert("Excluído com sucesso!");
        carregarDados();
      } else {
        alert(dadosRetorno.data);
        return;
      }

    } catch (error) {
      console.error(error);
      alert("Erro ao excluir tratamento!");
    }
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
              Tratamentos
            </h1>

            <p className="mt-2 text-gray-600">
              Acompanhe e organize os tratamentos cadastrados.
            </p>
          </div>

          <Link
            href="/home/tratamentos/novo"
            className="w-fit rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-purple-800"
          >
            + Novo tratamento
          </Link>

        </div>

        {/* Lista */}
        <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm">

          <div className="border-b border-purple-100 bg-purple-50 px-6 py-4">
            <h2 className="text-lg font-semibold text-purple-800">
              Tratamentos cadastrados
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
                    Tratamento
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Período
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Sessões
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

                {tratamentos.map((tratamento) => (

                  <tr
                    key={tratamento.id}
                    className="border-b border-gray-100 transition hover:bg-purple-50/50"
                  >

                    {/* Código */}
                    <td className="px-6 py-5 text-gray-600">
                      {tratamento.id}
                    </td>

                    {/* Nome e descrição */}
                    <td className="px-6 py-5">
                      <div>

                        <p className="font-semibold text-gray-800">
                          {tratamento.nome}
                        </p>

                        <p className="text-sm text-gray-500">
                          {tratamento.descricao}
                        </p>

                      </div>
                    </td>

                    {/* Período */}
                    <td className="px-6 py-5 text-gray-600">

                      <div>
                        <p>
                          Início: {tratamento.dataInicio}
                        </p>

                        <p className="text-sm text-gray-500">
                          Final: {tratamento.dataFinal}
                        </p>
                      </div>

                    </td>

                    {/* Sessões */}
                    <td className="px-6 py-5 text-gray-600">
                      {tratamento.sessoesRealizadas} de{" "}
                      {tratamento.totalSessoes}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">

                      {tratamento.status === "EXCLUIDO" ? (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                          {tratamento.status}
                        </span>
                      ) : (
                        <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
                          {tratamento.status}
                        </span>
                      )}

                    </td>

                    {/* Ações */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">

                        <Link
                          href={`/home/tratamentos/${tratamento.id}/editar`}
                          className="font-semibold text-purple-700 transition hover:text-purple-900"
                        >
                          Editar
                        </Link>

                        <button
                          onClick={() => handleDeletarTratamento(tratamento)}
                          className="font-medium text-red-600 transition-colors hover:text-red-800"
                        >
                          DELETAR
                        </button>

                      </div>
                    </td>

                  </tr>

                ))}

                {/* Caso não existam tratamentos */}
                {tratamentos.length === 0 && (

                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      Nenhum tratamento encontrado!
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
            Evolução do paciente
          </p>

          <h3 className="mt-2 text-xl font-bold text-gray-800">
            Acompanhamento do tratamento
          </h3>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
            Organize o período do tratamento, acompanhe o número de sessões
            realizadas e mantenha as informações clínicas centralizadas.
          </p>

        </div>

      </div>
    </div>
  );
}