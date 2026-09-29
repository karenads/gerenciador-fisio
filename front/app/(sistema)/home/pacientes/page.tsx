"use client";

import axios from "@/node_modules/axios/index";
import Link from "@/node_modules/next/link";
import { useEffect, useState } from "react";
import { Paciente } from "@/app/types/paciente";

export default function Pacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const token = localStorage.getItem("token");

      // COLOCAR A URL DO GET DE PACIENTES DO SWAGGER AQUI
      const dados = await axios.get<Paciente[]>(
        "",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPacientes(dados.data);
    } catch (error) {
      alert("Erro ao carregar dados!");
    }
  };

  const handleDeletarPaciente = async (paciente: Paciente) => {

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
              Pacientes
            </h1>

            <p className="mt-2 text-gray-600">
              Gerencie os pacientes cadastrados no sistema.
            </p>
          </div>

          <Link
            href="/home/pacientes/novo"
            className="w-fit rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-purple-800"
          >
            + Novo paciente
          </Link>
        </div>

        {/* Lista de pacientes */}
        <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm">

          <div className="border-b border-purple-100 bg-purple-50 px-6 py-4">
            <h2 className="text-lg font-semibold text-purple-800">
              Lista de pacientes
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
                    Nome
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    CPF
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Telefone
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    E-mail
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Ações
                  </th>

                </tr>
              </thead>

              <tbody>

                {pacientes.map((paciente) => (
                  <tr
                    key={paciente.id}
                    className="border-b border-gray-100 transition hover:bg-purple-50/50"
                  >

                    <td className="px-6 py-5 text-gray-600">
                      {paciente.id}
                    </td>

                    <td className="px-6 py-5 font-semibold text-gray-800">
                      {paciente.nome}
                    </td>

                    <td className="px-6 py-5 text-gray-600">
                      {paciente.cpf}
                    </td>

                    <td className="px-6 py-5 text-gray-600">
                      {paciente.telefone}
                    </td>

                    <td className="px-6 py-5 text-gray-600">
                      {paciente.email}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">

                        <Link
                          href={`/home/pacientes/${paciente.id}/editar`}
                          className="font-semibold text-purple-700 transition hover:text-purple-900"
                        >
                          Editar
                        </Link>

                        <button
                          onClick={() => handleDeletarPaciente(paciente)}
                          className="font-medium text-red-600 transition-colors hover:text-red-800"
                        >
                          DELETAR
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}

                {pacientes.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      Nenhum paciente encontrado!
                    </td>
                  </tr>
                )}

              </tbody>

            </table>
          </div>
        </div>

        {/* Informações inferiores */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
              Organização
            </p>

            <h3 className="mt-2 text-xl font-bold text-gray-800">
              Dados centralizados
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Mantenha as informações dos pacientes organizadas para
              facilitar o acompanhamento durante todo o tratamento.
            </p>
          </div>

          <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
              FisioCare
            </p>

            <h3 className="mt-2 text-xl font-bold text-gray-800">
              Cuidado individualizado
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Acompanhe cada paciente de forma próxima, organizada e
              humanizada.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}