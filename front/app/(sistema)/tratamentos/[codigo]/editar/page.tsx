"use client";

/*
  Link permite navegar entre páginas
  utilizando o sistema de rotas do Next.js.
*/
import Link from "@/node_modules/next/link";

/*
  useParams recupera parâmetros da URL.

  useRouter permite realizar navegação
  programaticamente através do código.
*/
import { useParams, useRouter } from "@/node_modules/next/navigation";

/*
  useEffect executa ações quando o componente é carregado.

  useState permite armazenar e atualizar
  os dados do tratamento.
*/
import { useEffect, useState } from "react";

/*
  Axios realiza requisições HTTP
  para o backend Spring Boot.
*/
import axios from "@/node_modules/axios/index";

/*
  Importa o formulário de tratamento.

  Como a pasta tratamentos agora está diretamente
  dentro de (sistema), o caminho correto foi atualizado.
*/
import TratamentoForm from "@/app/(sistema)/tratamentos/components/TratamentoForm";

/*
  Importa a classe Tratamento utilizada
  para tipar os dados recebidos do backend.
*/
import { Tratamento } from "@/app/types/tratamento";

/*
  Página responsável pela edição de tratamentos.

  Ela:
  1. Recupera o código pela URL.
  2. Busca o tratamento no backend.
  3. Armazena os dados encontrados.
  4. Envia o tratamento para o formulário de edição.
*/
export default function EditarTratamento() {
  /*
    ROTA DINÂMICA

    Exemplo de URL:
    /tratamentos/5/editar

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
    Inicializa o sistema de navegação
    do Next.js.
  */
  const router = useRouter();

  /*
    ESTADO DO TRATAMENTO

    Inicialmente é null porque os dados
    ainda não foram buscados no backend.

    Depois do GET, setTratamento atualiza
    esse estado.
  */
  const [tratamento, setTratamento] = useState<Tratamento | null>(null);

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
    BUSCAR TRATAMENTO

    Função responsável por consultar
    um tratamento específico no backend.
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

        Busca um tratamento pelo código.

        Exemplo:
        codigo = 5

        GET:
        http://localhost:8080/tratamentos/5

        <Tratamento> indica o tipo esperado
        na resposta.
      */
      const valorTratamentoBack = await axios.get<Tratamento>(
        "http://localhost:8080/tratamentos/" + codigo,
        {
          headers: {
            /*
              Envia o token no cabeçalho
              Authorization.
            */
            Authorization: `Bearer ${token}`,
          },
        },
      );

      /*
        HTTP 200 indica que a busca
        foi realizada com sucesso.
      */
      if (valorTratamentoBack.status == 200) {
        /*
          Armazena no estado os dados
          recebidos do backend.
        */
        setTratamento(valorTratamentoBack.data);
      } else {
        /*
          Caso a resposta não seja a esperada,
          retorna para a nova rota da listagem.
        */
        router.push("/tratamentos");
      }
    } catch (error) {
      // Mostra o erro no console.
      console.error(error);

      // Informa o usuário.
      alert("Erro ao buscar tratamento!");

      /*
        Em caso de erro, volta para
        a listagem de tratamentos.
      */
      router.push("/tratamentos");
    }
  };

  /*
    Enquanto o tratamento ainda não foi carregado,
    mostra uma mensagem de carregamento.
  */
  if (!tratamento) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-8">
        <p className="text-gray-600">Carregando dados do tratamento...</p>
      </div>
    );
  }

  /*
    Depois que o tratamento é carregado,
    exibe a página de edição.
  */
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-10 md:px-10">
      <div className="mx-auto w-full max-w-4xl">
        {/* ==================== CABEÇALHO ==================== */}

        <div className="mb-8">
          {/*
            Link utilizado para voltar
            para a listagem de tratamentos.

            Como a pasta tratamentos foi movida
            para diretamente dentro de (sistema),
            a rota correta agora é /tratamentos.
          */}
          <Link
            href="/tratamentos"
            className="inline-flex items-center gap-2 text-sm font-medium text-purple-700 transition hover:text-purple-900"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-purple-200 bg-white transition hover:border-purple-400">
              ←
            </span>
            Voltar para tratamentos
          </Link>

          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-purple-600">
            FisioCare
          </p>

          {/*
            Exibe o código recebido
            pela rota dinâmica.
          */}
          <h1 className="mt-2 text-3xl font-bold text-gray-800 md:text-4xl">
            Editar tratamento {codigo}
          </h1>

          <p className="mt-2 text-gray-600">Atualize os dados do tratamento.</p>
        </div>

        {/* ==================== FORMULÁRIO ==================== */}

        <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm md:p-8">
          {/*
            Reutiliza TratamentoForm.

            tratamentoExistente recebe
            o tratamento carregado do backend.

            Como TratamentoForm recebe um
            tratamento existente, ele identifica
            que está em modo de edição e utiliza PUT.
          */}
          <TratamentoForm tratamentoExistente={tratamento} />
        </div>
      </div>
    </div>
  );
}
