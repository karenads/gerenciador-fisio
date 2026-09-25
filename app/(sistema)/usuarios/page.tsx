"use client";

import axios from "axios";

import Link from "next/link";

import { useEffect, useState } from "react";

import { Usuario } from "../../types/usuario";

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
    <div className=" bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-10 md:px-10">
      <div className="mx-auto w-full max-w-7xl">
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
                  <th className="px-6 py-4 font-semibold">Código</th>

                  <th className="px-6 py-4 font-semibold">Nome</th>

                  <th className="px-6 py-4 font-semibold">CPF</th>

                  <th className="px-6 py-4 font-semibold">E-mail</th>

                  <th className="px-6 py-4 font-semibold">Status</th>

                  <th className="px-6 py-4 font-semibold">Editar</th>
                </tr>
              </thead>

              <tbody>
                {usuarios.map((usuario) => (
                  <tr
                    key={usuario.id}
                    className="border-b border-gray-100 transition hover:bg-purple-50/50"
                  >
                    <td className="px-6 py-5 text-gray-600">{usuario.id}</td>

                    <td className="px-6 py-5 font-semibold text-gray-800">
                      {usuario.nome}
                    </td>

                    <td className="px-6 py-5 text-gray-600">{usuario.cpf}</td>

                    <td className="px-6 py-5 text-gray-600">{usuario.email}</td>

                    <td className="px-6 py-5">
                      <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
                        {usuario.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <Link
                        href={`/usuarios/${usuario.id}/editar`}
                        className="font-semibold text-purple-700 transition hover:text-purple-900"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDeletarUsuario(usuario)}
                        className="font-medium transition-colors text-red-600 hover:text-red-800"
                      >
                        DELETAR
                      </button>
                      <button
                        onClick={() => handleAlterarStatusUsuario(usuario)}
                        className={`font-medium transition-colors ${
                          usuario.status === "BLOQUEADO"
                            ? "text-orange-600 hover:text-orange-800"
                            : "text-green-600 hover:text-green-800"
                        }`}
                      >
                        {usuario.status}
                      </button>
                    </td>
                  </tr>
                ))}

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
