"use client";

/*
  useRouter permite fazer redirecionamento
  utilizando o sistema de rotas do Next.js.
*/
import { useRouter } from "next/navigation";


/*
  HEADER

  Componente responsável pelo cabeçalho
  das páginas internas do sistema.
*/
export default function Header() {

  /*
    Inicializa o sistema de navegação
    do Next.js.
  */
  const router = useRouter();


  /*
    LOGOUT

    Remove o token armazenado no navegador
    e redireciona o usuário para a tela de login.
  */
  const handleSair = () => {

    /*
      Remove o token utilizado
      para autenticação das requisições.
    */
    localStorage.removeItem("token");


    /*
      Redireciona o usuário
      para a página de login.
    */
    router.push("/login");

  };


  return (
    <header className="w-full border-b border-purple-100 bg-white shadow-sm">

      <div className="flex h-16 items-center justify-between px-6 md:px-8">


        {/* ==================== IDENTIFICAÇÃO ==================== */}

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 font-bold text-purple-700">
            F
          </div>


          <div>

            <p className="text-sm font-semibold text-gray-800">
              FisioCare
            </p>

            <p className="text-xs text-gray-500">
              Sistema de gestão
            </p>

          </div>

        </div>


        {/* ==================== BOTÃO SAIR ==================== */}

        {/*
          Ao clicar, executa handleSair.

          A função remove o token do localStorage
          e redireciona para /login.
        */}
        <button
          onClick={handleSair}
          className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
        >
          Sair
        </button>


      </div>

    </header>
  );
}