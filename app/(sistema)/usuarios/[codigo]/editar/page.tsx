"use client";

/*
  Link permite navegar entre as páginas do Next.js
  sem precisar recarregar a página inteira.
*/
import Link from "@/node_modules/next/link";

/*
  Importa o formulário de usuários.

  O mesmo componente é utilizado tanto para
  cadastrar quanto para editar usuários.
*/
import UsuarioForm from "@/app/(sistema)/usuarios/components/UsuarioForm";

/*
  useParams: recupera os parâmetros da URL.

  useRouter: permite realizar navegação
  através do código.
*/
import { useParams, useRouter } from "@/node_modules/next/navigation";

/*
  useEffect: executa ações relacionadas
  ao ciclo de vida do componente.

  useState: armazena os dados do usuário
  dentro do estado do React.
*/
import { useEffect, useState } from "react";

// Importa a classe Usuario para tipar os dados.
import { Usuario } from "@/app/types/usuario";

// Axios realiza as requisições HTTP para o backend.
import axios from "@/node_modules/axios/index";


/*
  COMPONENTE EDITAR USUÁRIO

  Esta página é responsável por:
  1. Recuperar o código do usuário pela URL.
  2. Buscar os dados desse usuário no backend.
  3. Armazenar os dados recebidos.
  4. Enviar o usuário para o formulário de edição.
*/
export default function EditarUsuario() {

  /*
    ROTA DINÂMICA

    useParams recupera os parâmetros presentes na URL.

    Exemplo:
    /usuarios/5/editar

    Nesse caso, parametro.codigo representa o valor "5".
  */
  const parametro = useParams();

  /*
    Converte o código recebido pela URL
    para o tipo number.

    Exemplo:
    "5" -> 5
  */
  const codigo = Number(parametro.codigo);


  /*
    ESTADO DO USUÁRIO

    Inicialmente, usuario recebe null porque
    ainda não buscamos seus dados no backend.

    Usuario | null significa que o estado pode
    armazenar um objeto Usuario ou null.

    setUsuario será utilizado para atualizar
    o estado depois da requisição.
  */
  const [usuario, setUsuario] = useState<Usuario | null>(null);


  /*
    Inicializa o sistema de navegação do Next.js.

    Será utilizado para redirecionar o usuário
    caso a busca não retorne o resultado esperado.
  */
  const router = useRouter();


  /*
    CARREGAMENTO INICIAL

    useEffect chama buscarDados quando
    o componente é montado.

    O array vazio indica que o efeito
    não possui dependências.

    Em ambiente de desenvolvimento, o React
    pode executar o efeito novamente devido
    ao Strict Mode.
  */
  useEffect(() => {
    buscarDados();
  }, []);


  /*
    BUSCAR DADOS DO USUÁRIO

    Função assíncrona responsável por consultar
    o backend e recuperar as informações do
    usuário que será editado.
  */
  const buscarDados = async () => {

    /*
      AXIOS GET

      Realiza uma requisição GET para buscar
      um usuário específico pelo código.

      O código foi recuperado da URL.

      Exemplo:
      codigo = 5

      GET http://localhost:8080/usuarios/5

      <Usuario> informa ao TypeScript que
      esperamos receber um objeto Usuario.
    */
    const valorUsuarioBack = await axios.get<Usuario>(
      "http://localhost:8080/usuarios/" + codigo
    );


    /*
      Verifica o status HTTP da resposta.

      HTTP 200 significa que a requisição
      foi realizada com sucesso.
    */
    if (valorUsuarioBack.status == 200) {

      /*
        valorUsuarioBack.data contém os dados
        do usuário retornados pelo backend.

        setUsuario armazena esses dados no estado.

        Quando o estado é atualizado,
        o React renderiza novamente o componente.
      */
      setUsuario(valorUsuarioBack.data);

    } else {

      /*
        Caso a resposta não tenha o status
        esperado, redireciona para a listagem.
      */
      router.push("/usuarios");

    }
  };


  /*
    RENDERIZAÇÃO CONDICIONAL

    Enquanto os dados ainda não chegaram,
    usuario permanece com o valor null.

    Nesse período, mostramos uma mensagem
    de carregamento.
  */
  if (!usuario) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-8">

        <p className="text-gray-600">
          Carregando dados...
        </p>

      </div>
    );
  }


  /*
    Quando os dados do usuário são carregados,
    esta parte da página é renderizada.
  */
  return (
    <div className="w-full bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-10 md:px-10">

      <div className="mx-auto max-w-4xl">


        {/* ==================== CABEÇALHO ==================== */}

        <div className="mb-10">

          {/*
            Link utilizado para voltar
            à página de listagem dos usuários.
          */}
          <Link
            href="/usuarios"
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
              Exibe o título da página juntamente
              com o código recuperado da URL.

              Exemplo:
              Editar Usuário 5
            */}
            <h1 className="text-4xl font-black text-gray-800 md:text-5xl">
              Editar Usuário {codigo}
            </h1>


            <p className="mt-3 text-gray-600">
              Preencha os dados para editar o usuário.
            </p>

          </div>
        </div>


        {/* ==================== FORMULÁRIO ==================== */}

        <div>

          {/*
            REUTILIZAÇÃO DO COMPONENTE

            Envia os dados do usuário encontrado
            para o componente UsuarioForm.

            A propriedade usuarioExistente informa
            ao formulário que estamos editando
            um usuário já cadastrado.

            Por isso, ao salvar, o UsuarioForm
            utiliza PUT em vez de POST.
          */}
          <UsuarioForm usuarioExistente={usuario} />

        </div>


      </div>
    </div>
  );
}