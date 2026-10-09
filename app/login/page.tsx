'use client'

/*
  Axios é utilizado para realizar
  requisições HTTP para o backend.
*/
import axios from "axios";

/*
  useRouter permite fazer navegação
  programaticamente utilizando o Next.js.
*/
import { useRouter } from "next/navigation";

/*
  Link permite navegar entre páginas
  utilizando o sistema de rotas do Next.js.
*/
import Link from "next/link";

/*
  Importa o tipo da resposta esperada
  quando o login é realizado com sucesso.

  Essa resposta contém o token
  retornado pelo backend.
*/
import { LoginResponse } from "../types/auth";


/*
  Página responsável pelo login
  do usuário no sistema.
*/
export default function Login() {

    /*
      Inicializa o roteador do Next.js.

      Ele será utilizado para redirecionar
      o usuário após o login.
    */
    const router = useRouter();


    /*
      FUNÇÃO DE LOGIN

      Esta função é executada quando
      o formulário é enviado.
    */
    const handlerLogin = async (formData: FormData) => {

        try {

            /*
              Recupera o e-mail informado
              no formulário.

              formData.get busca o valor
              através do atributo name="email".
            */
            const emailTela = formData.get("email")?.toString() ?? "";


            /*
              Recupera a senha informada
              no formulário.

              Caso não exista valor,
              utiliza uma string vazia.
            */
            const senhaTela = formData.get("senha")?.toString() ?? "";


            /*
              AXIOS POST

              Envia uma requisição POST
              para o endpoint de autenticação.

              POST:
              http://localhost:8080/auth/login

              No corpo da requisição são enviados:
              - email
              - senha
            */
            const loginResposta = await axios.post<LoginResponse>(
                "http://localhost:8080/auth/login",
                {
                    email: emailTela,
                    senha: senhaTela
                }
            );


            /*
              HTTP 200 indica que
              o login foi realizado com sucesso.
            */
            if (loginResposta.status === 200) {


                /*
                  LOCAL STORAGE

                  Armazena o token retornado
                  pelo backend no navegador.

                  Esse token poderá ser utilizado
                  depois nas requisições autenticadas.
                */
                localStorage.setItem(
                    "token",
                    loginResposta.data.token
                );


                /*
                  Após o login,
                  redireciona o usuário
                  para a página inicial do sistema.
                */
                router.push("/home");
            }


        } catch (error) {

            /*
              Caso o backend rejeite o login
              ou ocorra algum erro na requisição,
              mostra uma mensagem ao usuário.
            */
            alert("E-mail ou senha inválidos!");

        }
    }


    return (

        /*
          Container principal da página de login.
        */
        <div className="min-h-screen flex items-center justify-center bg-purple-50 px-4">


            {/* Card central do formulário */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">


                {/* ==================== CABEÇALHO ==================== */}

                <div className="text-center mb-8">


                    <h1 className="text-3xl font-bold text-purple-700">
                        Entrar no sistema
                    </h1>


                    <p className="mt-2 text-sm text-gray-500">
                        Acesse sua conta para continuar no sistema.
                    </p>


                </div>


                {/* ==================== FORMULÁRIO ==================== */}

                {/*
                  Quando o formulário é enviado,
                  handlerLogin é executado.

                  Os dados são recebidos
                  através de FormData.
                */}
                <form action={handlerLogin} className="space-y-6">


                    {/* ==================== E-MAIL ==================== */}

                    <div className="flex flex-col gap-2">


                        <label className="text-sm font-medium text-purple-900">
                            E-mail
                        </label>


                        <input
                            type="email"
                            name="email"
                            placeholder="Digite seu e-mail"
                            className="w-full rounded-lg border border-purple-200 px-4 py-3 text-gray-700 outline-none transition duration-200 placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                        />


                    </div>


                    {/* ==================== SENHA ==================== */}

                    <div className="flex flex-col gap-2">


                        <label className="text-sm font-medium text-purple-900">
                            Senha
                        </label>


                        <input
                            type="password"
                            name="senha"
                            placeholder="Digite sua senha"
                            className="w-full rounded-lg border border-purple-200 px-4 py-3 text-gray-700 outline-none transition duration-200 placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                        />


                    </div>


                    {/* ==================== RECUPERAÇÃO DE SENHA ==================== */}

                    <div className="flex justify-end">


                        {/*
                          Link para a página
                          de recuperação de senha.

                          Esta funcionalidade é adicional
                          ao fluxo principal de login.
                        */}
                        <Link
                            href="/recuperar-senha"
                            className="text-sm font-semibold text-purple-600 transition hover:text-purple-800"
                        >
                            Esqueci minha senha
                        </Link>


                    </div>


                    {/* ==================== BOTÃO ENTRAR ==================== */}

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white transition duration-200 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    >
                        Entrar
                    </button>


                </form>


            </div>


        </div>
    );
}