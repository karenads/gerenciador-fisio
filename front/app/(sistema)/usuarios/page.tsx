"use client";

import { Usuario } from "@/app/types/usuario";
import axios from "@/node_modules/axios/index";
import Link from "@/node_modules/next/link";
import { useEffect, useState } from "react";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const token = localStorage.getItem("token");

      const dados = await axios.get<Usuario[]>(
        "http://localhost:8080/usuarios",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsuarios(dados.data);
    } catch (error) {
      alert("Erro ao carregar dados!");
    }
  };

  const handleDeletarUsuario = async (usuario: Usuario) => {
    var dadosRetorno = await axios.delete(
      "http://localhost:8080/usuarios/" + usuario.id + "/excluir"
    );

    if (dadosRetorno.status == 200) {
      alert("Excluido com sucesso!");
    } else {
      alert(dadosRetorno.data);
      return;
    }

    carregarDados();
  };

  const handleAlterarStatusUsuario = async (usuario: Usuario) => {
    var novoStatus = {};

    if (usuario.status === "ATIVO") {
      novoStatus = { status: "BLOQUEADO" };
    } else {
      novoStatus = { status: "ATIVO" };
    }

    var dadosRetorno = await axios.patch(
      "http://localhost:8080/usuarios/" + usuario.id + "/status",
      novoStatus
    );

    if (dadosRetorno.status == 200) {
      alert("Atulizado status com sucesso!");
    } else {
      alert(dadosRetorno.data);
      return;
    }

    carregarDados();
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-10 md:px-10">
      <div className="mx-auto w-full max-w-7xl">

        {/* Cabeçalho */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-purple-600">
              FisioCare
            </p>

            <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
              Gestão de usuários
            </h1>

            <p className="mt-2 text-gray-600">
              Usuários cadastrados no sistema.
            </p>
          </div>

          <Link
            href="/usuarios/novo"
            className="w-fit rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-purple-800"
          >
            + Novo usuário
          </Link>
        </div>

        {/* Tabela */}
        <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm">

          <div className="border-b border-purple-100 bg-purple-50 px-6 py-4">
            <h2 className="text-lg font-semibold text-purple-800">
              Lista de usuários
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
                    E-mail
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

                {usuarios.map((usuario) => (
                  <tr
                    key={usuario.id}
                    className="border-b border-gray-100 transition hover:bg-purple-50/50"
                  >

                    {/* Código */}
                    <td className="px-6 py-5 text-gray-600">
                      {usuario.id}
                    </td>

                    {/* Nome */}
                    <td className="px-6 py-5 font-semibold text-gray-800">
                      {usuario.nome}
                    </td>

                    {/* CPF */}
                    <td className="px-6 py-5 text-gray-600">
                      {usuario.cpf}
                    </td>

                    {/* E-mail */}
                    <td className="px-6 py-5 text-gray-600">
                      {usuario.email}
                    </td>

                    {/* Status atual */}
                    <td className="px-6 py-5">
                      <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
                        {usuario.status}
                      </span>
                    </td>

                    {/* Ações */}
                    <td className="px-6 py-5">
                      <div className="flex flex-wrap items-center gap-2">

                        {/* Editar */}
                        <Link
                          href={`/usuarios/${usuario.id}/editar`}
                          className="rounded-lg border border-purple-200 bg-purple-50 px-3 py-2 text-sm font-semibold text-purple-700 transition hover:border-purple-300 hover:bg-purple-100"
                        >
                          Editar
                        </Link>

                        {/* Excluir */}
                        <button
                          onClick={() => handleDeletarUsuario(usuario)}
                          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-100"
                        >
                          Excluir
                        </button>

                        {/* Alterar status */}
                        <button
                          onClick={() => handleAlterarStatusUsuario(usuario)}
                          className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                            usuario.status === "BLOQUEADO"
                              ? "border-green-200 bg-green-50 text-green-700 hover:border-green-300 hover:bg-green-100"
                              : "border-orange-200 bg-orange-50 text-orange-700 hover:border-orange-300 hover:bg-orange-100"
                          }`}
                        >
                          {usuario.status === "BLOQUEADO"
                            ? "Ativar"
                            : "Bloquear"}
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}

                {/* Nenhum usuário */}
                {usuarios.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      Nenhum usuário encontrado!
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}