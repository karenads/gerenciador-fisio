"use client";

/*
  "use client" informa ao Next.js que este é um Client Component.

  É necessário porque utilizamos hooks do React,
  como useState e useEffect, além do localStorage,
  que está disponível no navegador.
*/

// Importa a classe Usuario, que define a estrutura dos usuários.
import { Usuario } from "@/app/types/usuario";

// Axios é utilizado para realizar requisições HTTP para o backend.
import axios from "@/node_modules/axios/index";

// Link é o componente de navegação do Next.js.
import Link from "@/node_modules/next/link";

// Hooks utilizados para armazenar dados e controlar efeitos.
import { useEffect, useState } from "react";


/*
  COMPONENTE USUARIOS

  Esta função representa a página de gerenciamento
  de usuários do sistema FisioCare.
*/
export default function Usuarios() {

  /*
    ESTADO DOS USUÁRIOS

    useState armazena a lista de usuários recebida do backend.

    usuarios = lista atual de usuários.

    setUsuarios = função responsável por atualizar essa lista.

    Usuario[] indica que o estado recebe um array
    de objetos do tipo Usuario.

    A lista começa vazia.
  */
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);


  /*
    CARREGAMENTO INICIAL

    useEffect executa carregarDados quando
    o componente é montado.

    O array vazio [] indica que o efeito não depende
    de nenhuma variável que provoque uma nova execução.
  */
  useEffect(() => {
    carregarDados();
  }, []);


  /*
    FUNÇÃO CARREGARDADOS

    Responsável por buscar todos os usuários
    cadastrados através da API Spring Boot.

    É uma função assíncrona porque utiliza await
    para aguardar a resposta do backend.
  */
  const carregarDados = async () => {

    try {

      /*
        Recupera o token de autenticação
        armazenado no navegador.
      */
      const token = localStorage.getItem("token");


      /*
        AXIOS GET

        Realiza uma requisição HTTP GET
        para o endpoint de usuários.

        Usuario[] informa ao TypeScript
        que esperamos receber uma lista de usuários.
      */
      const dados = await axios.get<Usuario[]>(
        "http://localhost:8080/usuarios",
        {
          headers: {

            /*
              Envia o token no cabeçalho Authorization
              utilizando o formato Bearer.
            */
            Authorization: `Bearer ${token}`,

          },
        }
      );


      /*
        dados.data contém o corpo da resposta da API.

        setUsuarios atualiza o estado com os dados recebidos.

        Quando o estado é atualizado, o React
        renderiza novamente o componente.
      */
      setUsuarios(dados.data);


    } catch (error) {

      /*
        Caso aconteça algum erro durante
        a requisição, esta mensagem é exibida.
      */
      alert("Erro ao carregar dados!");

    }
  };


  /*
    FUNÇÃO HANDLEDELETARUSUARIO

    Responsável por solicitar a exclusão
    de um usuário selecionado na tabela.

    Recebe um objeto Usuario como parâmetro.

    O ID é utilizado para identificar
    qual registro deve ser excluído.
  */
  const handleDeletarUsuario = async (usuario: Usuario) => {

    /*
      AXIOS DELETE

      Realiza uma requisição HTTP DELETE.

      O ID é inserido dinamicamente na URL.

      Exemplo:

      usuario.id = 2

      DELETE /usuarios/2/excluir
    */
    var dadosRetorno = await axios.delete(
      "http://localhost:8080/usuarios/" + usuario.id + "/excluir"
    );


    /*
      Verifica o código HTTP retornado pelo backend.

      HTTP 200 indica que a operação
      foi concluída com sucesso.
    */
    if (dadosRetorno.status == 200) {

      alert("Excluido com sucesso!");

    } else {

      /*
        Exibe os dados retornados caso
        a resposta não seja a esperada.
      */
      alert(dadosRetorno.data);

      return;
    }


    /*
      Busca novamente os usuários após
      a operação para atualizar a tabela.
    */
    carregarDados();
  };


  /*
    FUNÇÃO HANDLEALTERARSTATUSUSUARIO

    Responsável por alternar o status
    de um usuário entre ATIVO e BLOQUEADO.

    Recebe como parâmetro o usuário
    selecionado na tabela.
  */
  const handleAlterarStatusUsuario = async (usuario: Usuario) => {

    /*
      Objeto que armazenará o novo status
      que será enviado ao backend.
    */
    var novoStatus = {};


    /*
      Verifica o status atual.

      Se o usuário estiver ATIVO,
      o novo status será BLOQUEADO.

      Caso contrário, será ATIVO.
    */
    if (usuario.status === "ATIVO") {

      novoStatus = { status: "BLOQUEADO" };

    } else {

      novoStatus = { status: "ATIVO" };

    }


    /*
      AXIOS PATCH

      PATCH é utilizado para atualizar
      apenas uma parte de um recurso.

      Neste caso, estamos alterando
      somente o status do usuário.

      O ID identifica qual usuário
      deverá receber a alteração.
    */
    var dadosRetorno = await axios.patch(
      "http://localhost:8080/usuarios/" + usuario.id + "/status",
      novoStatus
    );


    /*
      Verifica se a atualização foi realizada
      com sucesso pelo backend.
    */
    if (dadosRetorno.status == 200) {

      alert("Atulizado status com sucesso!");

    } else {

      alert(dadosRetorno.data);

      return;
    }


    /*
      Recarrega a lista após a alteração
      para exibir o novo status na tabela.
    */
    carregarDados();
  };


  /*
    RETURN

    Define a interface que será
    renderizada no navegador.

    As classes utilizadas são do Tailwind CSS.
  */
  return (

    <div className="bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-10 md:px-10">

      <div className="mx-auto w-full max-w-7xl">


        {/* ==================== CABEÇALHO ==================== */}

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


          {/*
            LINK PARA CADASTRO

            Link é utilizado para navegar
            para a página de cadastro de usuários.
          */}
          <Link
            href="/usuarios/novo"
            className="w-fit rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-purple-800"
          >
            + Novo usuário
          </Link>

        </div>


        {/* ==================== TABELA ==================== */}

        <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm">

          <div className="border-b border-purple-100 bg-purple-50 px-6 py-4">

            <h2 className="text-lg font-semibold text-purple-800">
              Lista de usuários
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


                {/*
                  MAP

                  Percorre o array de usuários.

                  Para cada usuário encontrado,
                  cria uma linha na tabela.
                */}
                {usuarios.map((usuario) => (

                  <tr
                    /*
                      key permite que o React identifique
                      cada elemento da lista.
                    */
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


                    {/* ==================== STATUS ==================== */}

                    <td className="px-6 py-5">

                      {/*
                        Exibe o status atual do usuário,
                        que foi recebido do backend.
                      */}
                      <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
                        {usuario.status}
                      </span>

                    </td>


                    {/* ==================== AÇÕES ==================== */}

                    <td className="px-6 py-5">

                      {/*
                        flex organiza os botões.
                        gap-2 define o espaçamento entre eles.
                        flex-wrap permite quebrar a linha
                        caso não exista espaço suficiente.
                      */}
                      <div className="flex flex-wrap items-center gap-2">


                        {/*
                          EDITAR

                          Cria uma URL dinâmica utilizando
                          o ID do usuário.

                          Exemplo:

                          usuario.id = 3

                          /usuarios/3/editar
                        */}
                        <Link
                          href={`/usuarios/${usuario.id}/editar`}
                          className="rounded-lg border border-purple-200 bg-purple-50 px-3 py-2 text-sm font-semibold text-purple-700 transition hover:border-purple-300 hover:bg-purple-100"
                        >
                          Editar
                        </Link>


                        {/*
                          EXCLUIR

                          Ao clicar, executa a função
                          handleDeletarUsuario, passando
                          o usuário selecionado.
                        */}
                        <button
                          onClick={() => handleDeletarUsuario(usuario)}
                          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-100"
                        >
                          Excluir
                        </button>


                        {/*
                          ALTERAR STATUS

                          O botão chama a função
                          handleAlterarStatusUsuario.

                          Sua cor e seu texto dependem
                          do status atual do usuário.
                        */}
                        <button
                          onClick={() => handleAlterarStatusUsuario(usuario)}
                          className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                            usuario.status === "BLOQUEADO"
                              ? "border-green-200 bg-green-50 text-green-700 hover:border-green-300 hover:bg-green-100"
                              : "border-orange-200 bg-orange-50 text-orange-700 hover:border-orange-300 hover:bg-orange-100"
                          }`}
                        >

                          {/*
                            OPERADOR TERNÁRIO

                            Se o usuário estiver BLOQUEADO,
                            mostra o texto "Ativar".

                            Caso contrário, mostra "Bloquear".
                          */}
                          {usuario.status === "BLOQUEADO"
                            ? "Ativar"
                            : "Bloquear"}

                        </button>

                      </div>

                    </td>

                  </tr>

                ))}


                {/*
                  RENDERIZAÇÃO CONDICIONAL

                  Se o array estiver vazio,
                  mostra uma mensagem na tabela.
                */}
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