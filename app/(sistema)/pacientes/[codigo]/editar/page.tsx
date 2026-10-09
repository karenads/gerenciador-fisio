"use client";

/*
  Link permite navegar entre páginas
  utilizando o sistema de rotas do Next.js.
*/
import Link from "@/node_modules/next/link";

/*
  Importa o formulário de paciente.

  Como a pasta pacientes agora está diretamente
  dentro de (sistema), o caminho correto do import é:
  /app/(sistema)/pacientes/components/PacienteForm
*/
import PacienteForm from "@/app/(sistema)/pacientes/components/PacienteForm";

/*
  useParams recupera parâmetros da URL.

  useRouter permite realizar navegação
  através do código.
*/
import { useParams, useRouter } from "@/node_modules/next/navigation";

/*
  useEffect executa ações quando o componente é carregado.

  useState armazena e atualiza os dados do paciente.
*/
import { useEffect, useState } from "react";

/*
  Importa a classe Paciente utilizada
  para tipar os dados recebidos do backend.
*/
import { Paciente } from "@/app/types/paciente";

/*
  Axios realiza requisições HTTP
  para o backend Spring Boot.
*/
import axios from "@/node_modules/axios/index";


/*
  Página responsável pela edição de pacientes.

  Ela:
  1. Recupera o código pela URL.
  2. Busca o paciente no backend.
  3. Armazena os dados encontrados.
  4. Envia os dados para PacienteForm.
*/
export default function EditarPaciente() {

  /*
    ROTA DINÂMICA

    Exemplo de URL:
    /pacientes/5/editar

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
    ESTADO DO PACIENTE

    Inicialmente é null porque os dados
    ainda não foram buscados no backend.

    Depois do GET, setPaciente atualiza
    esse estado.
  */
  const [paciente, setPaciente] = useState<Paciente | null>(null);


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
    BUSCAR PACIENTE

    Função responsável por consultar
    um paciente específico no backend.
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

        Busca um paciente pelo código.

        Exemplo:
        codigo = 5

        GET:
        http://localhost:8080/pacientes/5

        <Paciente> indica o tipo esperado
        na resposta.
      */
      const valorPacienteBack = await axios.get<Paciente>(
        "http://localhost:8080/pacientes/" + codigo,
        {
          headers: {

            /*
              Envia o token no cabeçalho
              Authorization.
            */
            Authorization: `Bearer ${token}`,

          },
        }
      );


      /*
        HTTP 200 indica que a busca
        foi realizada com sucesso.
      */
      if (valorPacienteBack.status == 200) {

        /*
          Armazena no estado os dados
          recebidos do backend.
        */
        setPaciente(valorPacienteBack.data);

      } else {

        /*
          Caso a resposta não seja a esperada,
          retorna para a nova rota da listagem.
        */
        router.push("/pacientes");

      }


    } catch (error) {

      // Mostra o erro no console.
      console.error(error);

      // Informa o usuário.
      alert("Erro ao buscar paciente!");


      /*
        Em caso de erro, volta para
        a listagem de pacientes.
      */
      router.push("/pacientes");

    }
  };


  /*
    Enquanto o paciente ainda não foi carregado,
    mostra uma mensagem de carregamento.
  */
  if (!paciente) {

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-8">

        <p className="text-gray-600">
          Carregando dados...
        </p>

      </div>
    );
  }


  /*
    Depois que o paciente é carregado,
    exibe a página de edição.
  */
  return (

    <div className="w-full bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-10 md:px-10">

      <div className="mx-auto max-w-4xl">


        {/* ==================== CABEÇALHO ==================== */}

        <div className="mb-10">


          {/*
            Link utilizado para voltar
            para a listagem de pacientes.

            Como a pasta pacientes foi movida
            para diretamente dentro de (sistema),
            a rota correta agora é /pacientes.
          */}
          <Link
            href="/pacientes"
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
              Exibe também o código recebido
              pela rota dinâmica.
            */}
            <h1 className="text-4xl font-black text-gray-800 md:text-5xl">
              Editar Paciente {codigo}
            </h1>


            <p className="mt-3 text-gray-600">
              Preencha os dados para editar o paciente.
            </p>

          </div>

        </div>


        {/* ==================== FORMULÁRIO ==================== */}

        <div>


          {/*
            Reutiliza PacienteForm.

            pacienteExistente recebe o paciente
            carregado do backend.

            Como PacienteForm recebe um paciente existente,
            ele identifica que está em modo de edição
            e utiliza PUT ao salvar.
          */}
          <PacienteForm pacienteExistente={paciente} />


        </div>


      </div>

    </div>
  );
}