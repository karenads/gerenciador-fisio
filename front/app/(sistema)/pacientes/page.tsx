"use client";

/*
  Axios é utilizado para realizar requisições HTTP
  entre o frontend e o backend Spring Boot.
*/
import axios from "@/node_modules/axios/index";

/*
  Link permite navegar entre as páginas
  utilizando o sistema de rotas do Next.js.
*/
import Link from "@/node_modules/next/link";

/*
  useEffect permite executar ações quando
  o componente é carregado.

  useState permite armazenar e atualizar
  a lista de pacientes.
*/
import { useEffect, useState } from "react";

/*
  Importa a classe Paciente, utilizada
  para tipar os dados recebidos do backend.
*/
import { Paciente } from "@/app/types/paciente";

/*
  Página responsável pela listagem
  e gerenciamento dos pacientes.
*/
export default function Pacientes() {
  /*
    ESTADO DOS PACIENTES

    pacientes = lista atual de pacientes.

    setPacientes = função responsável
    por atualizar essa lista.

    Paciente[] indica que o estado recebe
    um array de objetos do tipo Paciente.
  */
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  /*
    Executa carregarDados quando
    o componente é carregado.

    O array vazio indica que o efeito
    não possui dependências.
  */
  useEffect(() => {
    carregarDados();
  }, []);

  /*
    CARREGAR PACIENTES

    Função responsável por buscar
    os pacientes cadastrados no backend.
  */
  const carregarDados = async () => {
    try {
      /*
        Recupera o token armazenado
        no localStorage do navegador.
      */
      const token = localStorage.getItem("token");

      /*
        AXIOS GET

        Realiza uma requisição GET
        para buscar a lista de pacientes.

        GET http://localhost:8080/pacientes

        <Paciente[]> indica que esperamos
        receber uma lista de pacientes.
      */
      const dados = await axios.get<Paciente[]>(
        "http://localhost:8080/pacientes",
        {
          headers: {
            /*
              Envia o token no cabeçalho
              Authorization utilizando Bearer.
            */
            Authorization: `Bearer ${token}`,
          },
        },
      );

      /*
        dados.data contém a resposta
        enviada pelo backend.

        setPacientes atualiza o estado
        com a lista recebida.
      */
      setPacientes(dados.data);
    } catch (error) {
      // Mostra o erro no console.
      console.error(error);

      // Informa o usuário caso aconteça algum problema.
      alert("Erro ao carregar dados!");
    }
  };

  /*
    EXCLUSÃO DO PACIENTE

    Recebe como parâmetro o paciente
    selecionado na tabela.
  */
  const handleDeletarPaciente = async (paciente: Paciente) => {
    try {
      // Recupera o token armazenado no navegador.
      const token = localStorage.getItem("token");

      /*
        AXIOS DELETE

        Envia uma requisição DELETE
        para o backend utilizando o ID do paciente.

        Exemplo:
        paciente.id = 3

        DELETE:
        http://localhost:8080/pacientes/3/excluir
      */
      const dadosRetorno = await axios.delete(
        "http://localhost:8080/pacientes/" + paciente.id + "/excluir",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      /*
        HTTP 200 indica que a operação
        foi realizada com sucesso.
      */
      if (dadosRetorno.status == 200) {
        alert("Excluído com sucesso!");

        /*
          Após a exclusão, busca novamente
          os pacientes para atualizar a tabela.
        */
        carregarDados();
      } else {
        alert(dadosRetorno.data);

        return;
      }
    } catch (error) {
      console.error(error);

      alert("Erro ao excluir paciente!");
    }
  };

  return (
    /*
      Container principal da página.

      As classes utilizadas são do Tailwind CSS.
    */
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-10 md:px-10">
      <div className="mx-auto w-full max-w-7xl">
        {/* ==================== CABEÇALHO ==================== */}

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

          {/*
            LINK PARA CADASTRO

            Como a pasta pacientes agora está diretamente
            dentro de (sistema), a rota correta é:

            /pacientes/novo
          */}
          <Link
            href="/pacientes/novo"
            className="w-fit rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-purple-800"
          >
            + Novo paciente
          </Link>
        </div>

        {/* ==================== LISTA DE PACIENTES ==================== */}

        <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm">
          <div className="border-b border-purple-100 bg-purple-50 px-6 py-4">
            <h2 className="text-lg font-semibold text-purple-800">
              Lista de pacientes
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              {/* Cabeçalho da tabela */}
              <thead>
                <tr className="border-b border-gray-100 text-sm text-gray-500">
                  <th className="px-6 py-4 font-semibold">Código</th>

                  <th className="px-6 py-4 font-semibold">Nome</th>

                  <th className="px-6 py-4 font-semibold">CPF</th>

                  <th className="px-6 py-4 font-semibold">Telefone</th>

                  <th className="px-6 py-4 font-semibold">E-mail</th>

                  <th className="px-6 py-4 font-semibold">Status</th>

                  <th className="px-6 py-4 font-semibold">Ações</th>
                </tr>
              </thead>

              <tbody>
                {/*
                  MAP

                  Percorre o array pacientes.

                  Para cada paciente encontrado,
                  cria uma linha na tabela.
                */}
                {pacientes.map((paciente) => (
                  <tr
                    /*
                      key identifica cada elemento
                      da lista para o React.
                    */
                    key={paciente.id}
                    className="border-b border-gray-100 transition hover:bg-purple-50/50"
                  >
                    {/* Código */}
                    <td className="px-6 py-5 text-gray-600">
                      {paciente.id}
                    </td>

                    {/* Nome */}
                    <td className="px-6 py-5 font-semibold text-gray-800">
                      {paciente.nome}
                    </td>

                    {/* CPF */}
                    <td className="px-6 py-5 text-gray-600">
                      {paciente.cpf}
                    </td>

                    {/* Telefone */}
                    <td className="px-6 py-5 text-gray-600">
                      {paciente.telefone}
                    </td>

                    {/* E-mail */}
                    <td className="px-6 py-5 text-gray-600">
                      {paciente.email}
                    </td>

                    {/* ==================== STATUS ==================== */}

                    <td className="px-6 py-5">
                      {/*
                        Renderização condicional.

                        Se o status for EXCLUIDO,
                        mostra um indicador vermelho.

                        Caso contrário,
                        mostra ATIVO em roxo.
                      */}
                      {paciente.status === "EXCLUIDO" ? (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                          EXCLUIDO
                        </span>
                      ) : (
                        <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
                          ATIVO
                        </span>
                      )}
                    </td>

                    {/* ==================== AÇÕES ==================== */}

                    <td className="px-6 py-5">
                      {/*
                        Os botões seguem o mesmo padrão
                        visual utilizado nas outras telas.

                        flex-wrap permite quebrar a linha
                        caso não exista espaço suficiente.
                      */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/*
                          ROTA DINÂMICA DE EDIÇÃO

                          O ID do paciente é colocado na URL.

                          Exemplo:
                          paciente.id = 4

                          /pacientes/4/editar

                          A pasta [codigo] permite receber
                          esse valor dinamicamente.
                        */}
                        <Link
                          href={`/pacientes/${paciente.id}/editar`}
                          className="rounded-lg border border-purple-200 bg-purple-50 px-3 py-2 text-sm font-semibold text-purple-700 transition hover:border-purple-300 hover:bg-purple-100"
                        >
                          Editar
                        </Link>

                        {/*
                          Quando o usuário clica em Excluir,
                          chama handleDeletarPaciente
                          passando o paciente selecionado.
                        */}
                        <button
                          onClick={() => handleDeletarPaciente(paciente)}
                          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-100"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {/*
                  LISTA VAZIA

                  Se pacientes.length for 0,
                  mostra uma mensagem informando
                  que nenhum paciente foi encontrado.
                */}
                {pacientes.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
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

        {/* ==================== INFORMAÇÕES INFERIORES ==================== */}

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
              Organização
            </p>

            <h3 className="mt-2 text-xl font-bold text-gray-800">
              Dados centralizados
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Mantenha as informações dos pacientes organizadas para facilitar o
              acompanhamento durante todo o tratamento.
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
              Acompanhe cada paciente de forma próxima, organizada e humanizada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}