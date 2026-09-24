import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function SistemaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-purple-50">

      {/* Menu lateral */}
      <Sidebar />

      {/* Conteúdo da direita */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        {/* Cabeçalho */}
        <Header />

        {/* Página atual */}
        <main className="flex-1 overflow-y-auto bg-purple-50">
          {children}
        </main>

        {/* Rodapé */}
        <Footer />

      </div>

    </div>
  );
}