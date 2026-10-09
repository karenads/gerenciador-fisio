/*
  Link é um componente do Next.js
  utilizado para navegar entre páginas
  da aplicação.
*/
import Link from "next/link";


/*
  SIDEBAR

  Componente responsável pelo menu lateral
  utilizado nas páginas internas do sistema.

  Ele é reutilizado dentro do SistemaLayout.
*/
export default function Sidebar() {
  return (

    /*
      aside representa uma área lateral
      da interface.

      Aqui ela funciona como o menu
      de navegação principal do sistema.
    */
    <aside className="min-h-screen w-64 border-r border-purple-200 bg-purple-900 p-6 shadow-lg">


      {/* ==================== NOME DO SISTEMA ==================== */}

      <div className="mb-8 flex items-center gap-2 px-2">

        {/*
          Elemento visual utilizado
          como detalhe ao lado do nome.
        */}
        <span className="inline-block h-3 w-3 rounded-full bg-purple-400"></span>


        <span className="text-xl font-bold tracking-wide text-purple-100">
          FisioCare
        </span>

      </div>


      {/* ==================== NAVEGAÇÃO ==================== */}

      {/*
        nav agrupa os links utilizados
        para navegar entre as principais
        áreas do sistema.
      */}
      <nav className="flex flex-col gap-2">


        {/*
          Link para a página inicial
          do sistema.
        */}
        <Link
          href="/home"
          className="rounded-xl px-4 py-3 font-medium text-purple-200 transition-all duration-200 hover:bg-purple-800 hover:text-white"
        >
          Home
        </Link>


        {/*
          Link para a listagem
          de pacientes.
        */}
        <Link
          href="/pacientes"
          className="rounded-xl px-4 py-3 font-medium text-purple-200 transition-all duration-200 hover:bg-purple-800 hover:text-white"
        >
          Pacientes
        </Link>


        {/*
          Link para a listagem
          de tratamentos.
        */}
        <Link
          href="/tratamentos"
          className="rounded-xl px-4 py-3 font-medium text-purple-200 transition-all duration-200 hover:bg-purple-800 hover:text-white"
        >
          Tratamentos
        </Link>


        {/*
          Link para a listagem
          de sessões.
        */}
        <Link
          href="/sessoes"
          className="rounded-xl px-4 py-3 font-medium text-purple-200 transition-all duration-200 hover:bg-purple-800 hover:text-white"
        >
          Sessões
        </Link>


        {/*
          Link para a listagem
          de usuários.
        */}
        <Link
          href="/usuarios"
          className="rounded-xl px-4 py-3 font-medium text-purple-200 transition-all duration-200 hover:bg-purple-800 hover:text-white"
        >
          Usuários
        </Link>


      </nav>


    </aside>
  );
}