import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

/*
  Layout utilizado nas páginas internas do sistema.

  Tudo que estiver dentro da pasta (sistema)
  será exibido dentro desta estrutura.

  Exemplo:
  /home
  /pacientes
  /tratamentos
  /sessoes
  /usuarios
*/
export default function SistemaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-purple-50">

      {/*
        SIDEBAR

        Menu lateral compartilhado entre
        todas as páginas internas do sistema.
      */}
      <Sidebar />


      {/*
        Área principal localizada
        ao lado do menu lateral.
      */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">


        {/*
          HEADER

          Cabeçalho compartilhado
          entre as páginas do sistema.
        */}
        <Header />


        {/*
          CHILDREN

          children representa o conteúdo
          da página que está sendo acessada.

          Exemplo:

          Se o usuário acessar:
          /pacientes

          o conteúdo da página de pacientes
          será renderizado neste local.

          O layout permanece o mesmo,
          alterando apenas o conteúdo interno.
        */}
        <main className="flex-1 overflow-y-auto bg-purple-50">
          {children}
        </main>


        {/*
          FOOTER

          Rodapé compartilhado entre
          todas as páginas internas.
        */}
        <Footer />


      </div>

    </div>
  );
}