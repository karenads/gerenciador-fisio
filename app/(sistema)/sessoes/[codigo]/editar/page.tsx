"use client";

/*
  Link permite navegar entre páginas
  utilizando o sistema de rotas do Next.js.
*/
import Link from "@/node_modules/next/link";

/*
  Importa o formulário de sessão.

  Como a pasta sessoes agora está diretamente
  dentro de (sistema), o caminho correto foi atualizado.
*/
import SessaoForm from "@/app/(sistema)/sessoes/components/SessaoForm";

/*
  useParams recupera parâmetros da URL.

  useRouter permite realizar navegação
  programaticamente através do código.
*/
import { useParams, useRouter } from "@/node_modules/next/navigation";

/*
  useEffect executa ações quando o componente é carregado.

  useState permite armazenar e atualizar
  os dados da sessão.
*/
import { useEffect, useState } from "react";

/*
  Importa a classe Sessao utilizada
  para tipar os dados recebidos do backend.
*/
import { Sessao } from "@/app/types/sessao";

/*
  Axios realiza requisições HTTP
  para o backend Spring Boot.
*/
import axios from "@/node_modules/axios/index";


/*
  Página responsável pela edição de sessões.

  Ela:
  1. Recupera o código pela URL.
  2. Busca a sessão no backend.
  3. Armazena os dados encontrados.
  4. Envia a sessão para o formulário de edição.
*/
export default function EditarSessao() {

  /*
    ROTA DINÂMICA

    Exemplo de URL:
    /sessoes/5/editar

    useParams recupera o parâmetro [codigo].
  */
  const parametro = useParams();


  /*
    Converte o código recebido pela URL
    para number.

    Exemplo:
    "5" -> 5
  */
  const codigo = Number(parametro.codigo);


  /*
    ESTADO DA SESSÃO

    Inicialmente é null porque os dados
    ainda não foram buscados no backend.

    Depois do GET, setSessao atualiza
    esse estado.
  */
  const [sessao, setSessao] = useState<Sessao | null>(null);


  /*
    Inicializa o sistema de navegação
    do Next.js.
  */
  const router = useRouter();


  /*
    Executa buscarDados quando
    o componente é carregado.

    O array vazio indica que esse efeito
    não possui dependências.
  */
  useEffect(() => {
    buscarDados();
  }, []);


  /*
    BUSCAR SESSÃO

    Função responsável por consultar
    uma sessão específica no backend.
  */
  const buscarDados = async () => {

    try {

      /*
        Recupera o token armazenado
        no navegador.
      */
      const token = localStorage.getItem("token");


      /*
        AXIOS GET

        Busca uma sessão pelo código.

        Exemplo:
        codigo = 5

        GET:
        http://localhost:8080/sessoes/5

        <Sessao> indica o tipo esperado
        na resposta.
      */
      const valorSessaoBack = await axios.get<Sessao>(
        "http://localhost:8080/sessoes/" + codigo,
        {
          headers: {

            /*
              Envia o token no cabeçalho
              Authorization.
            */
            Authorization: "Bearer " + token,

          },
        }
      );


      /*
        HTTP 200 indica que a busca
        foi realizada com sucesso.
      */
      if (valorSessaoBack.status == 200) {

        /*
          Armazena no estado os dados
          recebidos do backend.
        */
        setSessao(valorSessaoBack.data);

      } else {

        /*
          Caso a resposta não seja a esperada,
          retorna para a nova rota da listagem.
        */
        router.push("/sessoes");

      }


    } catch (error) {

      /*
        Caso aconteça algum erro
        durante a busca, informa o usuário.
      */
      alert("Erro ao carregar dados da sessão!");


      /*
        Em caso de erro, volta para
        a listagem de sessões.
      */
      router.push("/sessoes");

    }
  };


  /*
    Enquanto a sessão ainda não foi carregada,
    mostra uma mensagem de carregamento.
  */
  if (!sessao) {

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-8">

        <p className="text-gray-600">
          Carregando dados...
        </p>

      </div>
    );
  }


  /*
    Depois que a sessão é carregada,
    exibe a página de edição.
  */
  return (

    <div className="w-full bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-10 md:px-10">

      <div className="mx-auto max-w-4xl">


        {/* ==================== CABEÇALHO ==================== */}

        <div className="mb-10">


          {/*
            Link utilizado para voltar
            para a listagem de sessões.

            Como a pasta sessoes foi movida
            para diretamente dentro de (sistema),
            a rota correta agora é /sessoes.
          */}
          <Link
            href="/sessoes"
            className="inline-flex items-center gap-2 text-sm font-medium text-purple-700 transition hover:text-purple-900"
          >

            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-purple-200 bg-white transition hover:border-purple-400">
              ←
            </span>

            Voltar para Listagem

          </Link>


          <div className="mt-6">


            <p className="mb-2 text-sm font-bold tracking-[3px] text-purple-600">
              FISIOCARE
            </p>


            {/*
              Exibe o código recebido
              pela rota dinâmica.
            */}
            <h1 className="text-4xl font-black text-gray-800 md:text-5xl">
              Editar Sessão {codigo}
            </h1>


            <p className="mt-3 text-gray-600">
              Preencha os dados para editar a sessão.
            </p>


          </div>


        </div>


        {/* ==================== FORMULÁRIO ==================== */}

        <div>


          {/*
            Reutiliza SessaoForm.

            sessaoExistente recebe
            a sessão carregada do backend.

            Como SessaoForm recebe uma sessão existente,
            ele identifica que está em modo de edição
            e utiliza PUT ao salvar.
          */}
          <SessaoForm sessaoExistente={sessao} />


        </div>


      </div>


    </div>
  );
}