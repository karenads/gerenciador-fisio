"use client";

/*
  Importa a classe Tratamento, utilizada
  para tipar os dados recebidos do backend.
*/
import { Tratamento } from "@/app/types/tratamento";

/*
  Axios é utilizado para realizar requisições HTTP
  entre o frontend e o backend Spring Boot.
*/
import axios from "@/node_modules/axios/index";

/*
  Link permite navegar entre páginas
  utilizando o sistema de rotas do Next.js.
*/
import Link from "@/node_modules/next/link";

/*
  useEffect permite executar uma ação
  quando o componente é carregado.

  useState permite armazenar e atualizar
  a lista de tratamentos.
*/
import { useEffect, useState } from "react";

/*
  Página responsável pela listagem
  e gerenciamento dos tratamentos.
*/
export default function Tratamentos() {
  /*
    ESTADO DOS TRATAMENTOS

    tratamentos = lista atual de tratamentos.

    setTratamentos = função responsável
    por atualizar essa lista.

    Tratamento[] indica que o estado
    recebe um array de objetos Tratamento.
  */
  const [tratamentos, setTratamentos] = useState<Tratamento[]>([]);

  /*
    Executa carregarDados quando
    o componente é carregado.

    O array vazio indica que esse efeito
    não possui dependências.
  */
  useEffect(() => {
    carregarDados();
  }, []);

  /*
    CARREGAR TRATAMENTOS

    Função responsável por buscar
    a lista de tratamentos no backend.
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
        para buscar os tratamentos.

        GET:
        http://localhost:8080/tratamentos

        <Tratamento[]> indica que esperamos
        receber uma lista de tratamentos.
      */
      const dados = await axios.get<Tratamento[]>(
        "http://localhost:8080/tratamentos",
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
        dados.data contém os tratamentos
        retornados pelo backend.

        setTratamentos atualiza o estado.
      */
      setTratamentos(dados.data);
    } catch (error) {
      // Mostra o erro no console.
      console.error(error);

      // Informa o usuário.
      alert("Erro ao carregar tratamentos!");
    }
  };

  /*
    EXCLUSÃO DO TRATAMENTO

    Recebe como parâmetro o tratamento
    selecionado na tabela.
  */
  const handleDeletarTratamento = async (tratamento: Tratamento) => {
    try {
      // Recupera o token armazenado no navegador.
      const token = localStorage.getItem("token");

      /*
        AXIOS DELETE

        Envia uma requisição DELETE
        utilizando o ID do tratamento.

        Exemplo:
        tratamento.id = 4

        DELETE:
        http://localhost:8080/tratamentos/4/excluir
      */
      const dadosRetorno = await axios.delete(
        "http://localhost:8080/tratamentos/" + tratamento.id + "/excluir",
        {
          headers: {
            // Envia o token para autenticação.
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
          Após excluir, busca novamente
          os tratamentos para atualizar
          a tabela.
        */
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
              Tratamentos
            </h1>

            <p className="mt-2 text-gray-600">
              Acompanhe e organize os tratamentos cadastrados.
            </p>
          </div>

          {/*
            LINK PARA CADASTRO

            Como a pasta tratamentos agora está
            diretamente dentro de (sistema),
            a rota correta é:

            /tratamentos/novo
          */}
          <Link
            href="/tratamentos/novo"
            className="w-fit rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-purple-800"
          >
            + Novo tratamento
          </Link>
        </div>

        {/* ==================== LISTA ==================== */}

        <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm">
          <div className="border-b border-purple-100 bg-purple-50 px-6 py-4">
            <h2 className="text-lg font-semibold text-purple-800">
              Tratamentos cadastrados
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              {/* Cabeçalho da tabela */}
              <thead>
                <tr className="border-b border-gray-100 text-sm text-gray-500">
                  <th className="px-6 py-4 font-semibold">Código</th>

                  <th className="px-6 py-4 font-semibold">Tratamento</th>

                  <th className="px-6 py-4 font-semibold">Período</th>

                  <th className="px-6 py-4 font-semibold">Sessões</th>

                  <th className="px-6 py-4 font-semibold">Status</th>

                  <th className="px-6 py-4 font-semibold">Ações</th>
                </tr>
              </thead>

              <tbody>
                {/*
                  MAP

                  Percorre o array tratamentos.

                  Para cada tratamento encontrado,
                  cria uma linha na tabela.
                */}
                {tratamentos.map((tratamento) => (
                  <tr
                    /*
                      key identifica cada elemento
                      da lista para o React.
                    */
                    key={tratamento.id}
                    className="border-b border-gray-100 transition hover:bg-purple-50/50"
                  >
                    {/* ==================== CÓDIGO ==================== */}

                    <td className="px-6 py-5 text-gray-600">{tratamento.id}</td>

                    {/* ==================== NOME E DESCRIÇÃO ==================== */}

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

                    {/* ==================== PERÍODO ==================== */}

                    <td className="px-6 py-5 text-gray-600">
                      <div>
                        <p>Início: {tratamento.dataInicio}</p>

                        <p className="text-sm text-gray-500">
                          Final: {tratamento.dataFinal}
                        </p>
                      </div>
                    </td>

                    {/* ==================== SESSÕES ==================== */}

                    <td className="px-6 py-5 text-gray-600">
                      {/*
                        Exibe quantas sessões foram realizadas
                        em relação ao total contratado.

                        Exemplo:
                        3 de 10
                      */}
                      {tratamento.sessoesRealizadas} de{" "}
                      {tratamento.totalSessoes}
                    </td>

                    {/* ==================== STATUS ==================== */}

                    <td className="px-6 py-5">
                      {/*
                        Renderização condicional.

                        Se o status for EXCLUIDO,
                        mostra vermelho.

                        Caso contrário,
                        mostra roxo.
                      */}
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

                    {/* ==================== AÇÕES ==================== */}

                    <td className="px-6 py-5">
                      {/*
                        Os botões utilizam flex-wrap para que possam
                        quebrar de linha caso não exista espaço suficiente.

                        A estilização segue o mesmo padrão utilizado
                        na tela de usuários.
                      */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/*
                          ROTA DINÂMICA DE EDIÇÃO

                          O ID do tratamento é colocado
                          dinamicamente na URL.

                          Exemplo:
                          tratamento.id = 7

                          /tratamentos/7/editar
                        */}
                        <Link
                          href={`/tratamentos/${tratamento.id}/editar`}
                          className="rounded-lg border border-purple-200 bg-purple-50 px-3 py-2 text-sm font-semibold text-purple-700 transition hover:border-purple-300 hover:bg-purple-100"
                        >
                          Editar
                        </Link>

                        {/*
                          Ao clicar, chama a função
                          handleDeletarTratamento
                          passando o tratamento selecionado.
                        */}
                        <button
                          onClick={() => handleDeletarTratamento(tratamento)}
                          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-100"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {/* ==================== LISTA VAZIA ==================== */}

                {/*
                  Se o array estiver vazio,
                  mostra uma mensagem na tabela.
                */}
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

        {/* ==================== INFORMAÇÃO COMPLEMENTAR ==================== */}

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
