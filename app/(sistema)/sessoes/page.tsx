"use client";

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
  a lista de sessões.
*/
import { useEffect, useState } from "react";

/*
  Importa a classe Sessao, utilizada
  para tipar os dados recebidos do backend.
*/
import { Sessao } from "@/app/types/sessao";


/*
  Página responsável pela listagem
  e gerenciamento das sessões.
*/
export default function Sessoes() {

  /*
    ESTADO DAS SESSÕES

    sessoes = lista atual de sessões.

    setSessoes = função responsável
    por atualizar essa lista.

    Sessao[] indica que o estado recebe
    um array de objetos do tipo Sessao.
  */
  const [sessoes, setSessoes] = useState<Sessao[]>([]);


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
    CARREGAR SESSÕES

    Função responsável por buscar
    as sessões cadastradas no backend.
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
        para buscar a lista de sessões.

        GET:
        http://localhost:8080/sessoes

        <Sessao[]> indica que esperamos
        receber uma lista de sessões.
      */
      const dados = await axios.get<Sessao[]>(
        "http://localhost:8080/sessoes",
        {
          headers: {

            /*
              Envia o token no cabeçalho
              Authorization utilizando Bearer.
            */
            Authorization: `Bearer ${token}`,

          },
        }
      );


      /*
        dados.data contém as sessões
        retornadas pelo backend.

        setSessoes atualiza o estado.
      */
      setSessoes(dados.data);


    } catch (error) {

      // Mostra o erro no console.
      console.error(error);

      // Informa o usuário.
      alert("Erro ao carregar dados!");

    }
  };


  /*
    EXCLUSÃO DA SESSÃO

    Recebe como parâmetro a sessão
    selecionada na tabela.
  */
  const handleDeletarSessao = async (sessao: Sessao) => {

    try {

      // Recupera o token armazenado no navegador.
      const token = localStorage.getItem("token");


      /*
        AXIOS DELETE

        Envia uma requisição DELETE
        utilizando o ID da sessão.

        Exemplo:
        sessao.id = 4

        DELETE:
        http://localhost:8080/sessoes/4/excluir
      */
      const dadosRetorno = await axios.delete(
        "http://localhost:8080/sessoes/" + sessao.id + "/excluir",
        {
          headers: {

            // Envia o token para autenticação.
            Authorization: `Bearer ${token}`,

          },
        }
      );


      /*
        HTTP 200 indica que a operação
        foi realizada com sucesso.
      */
      if (dadosRetorno.status == 200) {

        alert("Excluído com sucesso!");


        /*
          Após excluir, busca novamente
          as sessões para atualizar a tabela.
        */
        carregarDados();

      } else {

        alert(dadosRetorno.data);

        return;
      }


    } catch (error) {

      console.error(error);

      alert("Erro ao excluir sessão!");

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
              Sessões
            </h1>

            <p className="mt-2 text-gray-600">
              Organize e acompanhe as sessões de fisioterapia.
            </p>

          </div>


          {/*
            LINK PARA CADASTRO

            Como a pasta sessoes agora está
            diretamente dentro de (sistema),
            a rota correta é:

            /sessoes/nova
          */}
          <Link
            href="/sessoes/nova"
            className="w-fit rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-purple-800"
          >
            + Nova sessão
          </Link>

        </div>


        {/* ==================== LISTA ==================== */}

        <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm">

          <div className="border-b border-purple-100 bg-purple-50 px-6 py-4">

            <h2 className="text-lg font-semibold text-purple-800">
              Sessões cadastradas
            </h2>

          </div>


          <div className="overflow-x-auto">

            <table className="w-full text-left">


              {/* Cabeçalho da tabela */}
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
                    Realização
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


                {/*
                  MAP

                  Percorre o array sessoes.

                  Para cada sessão encontrada,
                  cria uma linha na tabela.
                */}
                {sessoes.map((sessao) => (

                  <tr
                    /*
                      key identifica cada elemento
                      da lista para o React.
                    */
                    key={sessao.id}

                    className="border-b border-gray-100 transition hover:bg-purple-50/50"
                  >


                    {/* ==================== CÓDIGO ==================== */}

                    <td className="px-6 py-5 text-gray-600">

                      {sessao.id}

                    </td>


                    {/* ==================== DATA ==================== */}

                    <td className="px-6 py-5 text-gray-600">

                      {sessao.data}

                    </td>


                    {/* ==================== HORÁRIO ==================== */}

                    <td className="px-6 py-5 text-gray-600">

                      {sessao.horario}

                    </td>


                    {/* ==================== DESCRIÇÃO ==================== */}

                    <td className="px-6 py-5 text-gray-600">

                      {sessao.descricao}

                    </td>


                    {/* ==================== REALIZAÇÃO ==================== */}

                    <td className="px-6 py-5">

                      {/*
                        Renderização condicional.

                        Se sessao.realizada for true,
                        mostra "Realizada".

                        Se for false,
                        mostra "Pendente".
                      */}
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


                    {/* ==================== STATUS ==================== */}

                    <td className="px-6 py-5">

                      {/*
                        Se o status for EXCLUIDO,
                        mostra vermelho.

                        Caso contrário,
                        mostra ATIVO em roxo.
                      */}
                      {sessao.status === "EXCLUIDO" ? (

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

                          O ID da sessão é colocado
                          dinamicamente na URL.

                          Exemplo:
                          sessao.id = 7

                          /sessoes/7/editar
                        */}
                        <Link
                          href={`/sessoes/${sessao.id}/editar`}
                          className="rounded-lg border border-purple-200 bg-purple-50 px-3 py-2 text-sm font-semibold text-purple-700 transition hover:border-purple-300 hover:bg-purple-100"
                        >

                          Editar

                        </Link>


                        {/*
                          Ao clicar, chama
                          handleDeletarSessao passando
                          a sessão selecionada.
                        */}
                        <button
                          onClick={() =>
                            handleDeletarSessao(sessao)
                          }
                          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-100"
                        >

                          Excluir

                        </button>


                      </div>


                    </td>


                  </tr>

                ))}


                {/* ==================== NENHUMA SESSÃO ==================== */}

                {/*
                  Se a lista estiver vazia,
                  mostra uma mensagem na tabela.
                */}
                {sessoes.length === 0 && (

                  <tr>

                    <td
                      colSpan={7}
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


        {/* ==================== INFORMAÇÃO COMPLEMENTAR ==================== */}

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