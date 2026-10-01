'use client'

/*
  Importa a classe Paciente, que define
  a estrutura dos dados de um paciente,
  e PacienteFormProps, que define as props
  que este formulário pode receber.
*/
import { Paciente, PacienteFormProps } from "@/app/types/paciente";

/*
  Axios é utilizado para realizar requisições HTTP
  entre o frontend e o backend Spring Boot.
*/
import axios from "@/node_modules/axios/index";

/*
  Link permite navegar entre páginas
  utilizando o sistema de rotas do Next.js.
*/
import Link from "@/node_modules/next/link";

/*
  useRouter permite realizar navegação
  programaticamente pelo código.
*/
import { useRouter } from "@/node_modules/next/navigation";

/*
  useState permite armazenar e atualizar
  os dados do paciente dentro do componente.
*/
import { useState } from "react";


/*
  Formulário utilizado tanto para:
  - cadastrar um novo paciente
  - editar um paciente existente
*/
export default function PacienteForm({
  pacienteExistente
}: PacienteFormProps) {

  /*
    Inicializa o sistema de navegação
    do Next.js.
  */
  const router = useRouter();


  /*
    ESTADO DO PACIENTE

    Se pacienteExistente for recebido,
    significa que estamos editando.

    Caso contrário, cria um novo paciente
    com os campos vazios e status ATIVO.
  */
  const [paciente, setPaciente] = useState<Paciente>(
    pacienteExistente ||
    new Paciente(
      null,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "ATIVO"
    )
  );


  /*
    ATUALIZAÇÃO DOS CAMPOS

    handlerChange recebe:
    - campo: qual propriedade foi alterada
    - valor: novo valor digitado

    O TypeScript restringe quais campos
    podem ser alterados por essa função.
  */
  const handlerChange = (
    campo:
      | "nome"
      | "cpf"
      | "telefone"
      | "email"
      | "dataNascimento"
      | "endereco"
      | "observacoes",
    valor: string
  ) => {

    /*
      Atualiza o estado do paciente.

      valorAnterior representa os dados
      antes da alteração.

      Criamos um novo objeto Paciente,
      alterando somente o campo selecionado.
    */
    setPaciente(
      valorAnterior =>
        new Paciente(

          // Mantém o ID atual.
          valorAnterior.id,

          // Altera o nome somente se o campo for "nome".
          campo === "nome" ? valor : valorAnterior.nome,

          // Altera o CPF somente se o campo for "cpf".
          campo === "cpf" ? valor : valorAnterior.cpf,

          // Altera o telefone somente se o campo for "telefone".
          campo === "telefone" ? valor : valorAnterior.telefone,

          // Altera o e-mail somente se o campo for "email".
          campo === "email" ? valor : valorAnterior.email,

          // Altera a data de nascimento quando necessário.
          campo === "dataNascimento"
            ? valor
            : valorAnterior.dataNascimento,

          // Altera o endereço quando necessário.
          campo === "endereco" ? valor : valorAnterior.endereco,

          // Altera as observações quando necessário.
          campo === "observacoes"
            ? valor
            : valorAnterior.observacoes,

          // Mantém o status atual do paciente.
          valorAnterior.status
        )
    );
  };


  /*
    SALVAR PACIENTE

    Esta função é executada quando
    o formulário é enviado.

    Ela é usada para:
    - editar com PUT
    - cadastrar com POST
  */
  const handlerSalvar = async (formData: FormData) => {

    try {

      /*
        Recupera o token armazenado
        no navegador.
      */
      const token = localStorage.getItem("token");


      /* ==================== EDITAR ==================== */

      /*
        Se pacienteExistente tiver valor,
        significa que estamos editando
        um paciente já cadastrado.
      */
      if (pacienteExistente) {


        /*
          AXIOS PUT

          Atualiza o paciente no backend.

          O ID é colocado na URL para identificar
          qual paciente deve ser alterado.

          Exemplo:
          PUT http://localhost:8080/pacientes/3

          O objeto paciente é enviado
          no corpo da requisição.
        */
        const dadosRetorno = await axios.put(
          "http://localhost:8080/pacientes/" + paciente.id,
          paciente,
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
          HTTP 200 indica que a atualização
          foi realizada com sucesso.
        */
        if (dadosRetorno.status == 200) {

          alert("Paciente foi atualizado com sucesso!");

        } else {

          alert(dadosRetorno.data);

          return;
        }


        /* ==================== CADASTRAR ==================== */

      } else {


        /*
          AXIOS POST

          Cria um novo paciente no backend.

          POST:
          http://localhost:8080/pacientes
        */
        const dadosRetorno = await axios.post(
          "http://localhost:8080/pacientes",
          paciente,
          {
            headers: {

              // Envia o token para autenticação.
              Authorization: "Bearer " + token,

            },
          }
        );


        /*
          Considera sucesso caso a API
          retorne HTTP 200 ou 201.
        */
        if (
          dadosRetorno.status == 200 ||
          dadosRetorno.status == 201
        ) {

          alert("Paciente foi salvo com sucesso!");

        } else {

          alert(dadosRetorno.data);

          return;
        }
      }


      /*
        Depois de cadastrar ou editar,
        redireciona para a nova rota da listagem.

        Como pacientes agora está diretamente
        dentro de (sistema), a rota correta é:
        /pacientes
      */
      router.push("/pacientes");


      /*
        Solicita uma atualização da rota.
      */
      router.refresh();


    } catch (error) {

      // Mostra o erro no console.
      console.error(error);

      // Informa o usuário caso aconteça algum erro.
      alert("Erro ao salvar paciente!");

    }
  };


  return (

    /*
      Quando o formulário é enviado,
      handlerSalvar é executado.
    */
    <form action={handlerSalvar} className="space-y-6">

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">


        {/* ==================== NOME ==================== */}

        <div className="space-y-2">

          <label className="block text-sm font-semibold text-gray-700">
            Nome completo
          </label>

          <input
            name="nome"

            // O valor exibido vem do estado.
            value={paciente.nome}

            // Atualiza somente o nome.
            onChange={(e) =>
              handlerChange("nome", e.target.value)
            }

            required
            type="text"
            placeholder="Digite o nome do paciente"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />

        </div>


        {/* ==================== CPF ==================== */}

        <div className="space-y-2">

          <label className="block text-sm font-semibold text-gray-700">
            CPF
          </label>

          <input
            name="cpf"
            value={paciente.cpf}

            onChange={(e) =>
              handlerChange("cpf", e.target.value)
            }

            required
            type="text"
            placeholder="000.000.000-00"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />

        </div>


        {/* ==================== TELEFONE ==================== */}

        <div className="space-y-2">

          <label className="block text-sm font-semibold text-gray-700">
            Telefone
          </label>

          <input
            name="telefone"
            value={paciente.telefone}

            onChange={(e) =>
              handlerChange("telefone", e.target.value)
            }

            required
            type="text"
            placeholder="(00) 00000-0000"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />

        </div>


        {/* ==================== E-MAIL ==================== */}

        <div className="space-y-2">

          <label className="block text-sm font-semibold text-gray-700">
            E-mail
          </label>

          <input
            name="email"
            value={paciente.email}

            onChange={(e) =>
              handlerChange("email", e.target.value)
            }

            required
            type="email"
            placeholder="paciente@email.com"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />

        </div>


        {/* ==================== DATA DE NASCIMENTO ==================== */}

        <div className="space-y-2">

          <label className="block text-sm font-semibold text-gray-700">
            Data de nascimento
          </label>

          <input
            name="dataNascimento"
            value={paciente.dataNascimento}

            onChange={(e) =>
              handlerChange(
                "dataNascimento",
                e.target.value
              )
            }

            required
            type="date"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />

        </div>


        {/* ==================== ENDEREÇO ==================== */}

        <div className="space-y-2">

          <label className="block text-sm font-semibold text-gray-700">
            Endereço
          </label>

          <input
            name="endereco"
            value={paciente.endereco}

            onChange={(e) =>
              handlerChange(
                "endereco",
                e.target.value
              )
            }

            type="text"
            placeholder="Digite o endereço do paciente"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />

        </div>


        {/* ==================== OBSERVAÇÕES ==================== */}

        <div className="space-y-2 md:col-span-2">

          <label className="block text-sm font-semibold text-gray-700">
            Observações
          </label>

          <textarea
            name="observacoes"
            value={paciente.observacoes}

            onChange={(e) =>
              handlerChange(
                "observacoes",
                e.target.value
              )
            }

            placeholder="Informações adicionais sobre o paciente..."
            rows={4}
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />

        </div>

      </div>


      {/* ==================== BOTÕES ==================== */}

      <div className="flex items-center justify-end gap-4 border-t border-purple-100 pt-4">


        {/*
          CANCELAR

          Como a pasta pacientes foi movida
          para diretamente dentro de (sistema),
          a rota correta agora é /pacientes.
        */}
        <Link
          href="/pacientes"
          className="rounded-xl border border-purple-200 px-5 py-3 text-center font-semibold text-purple-700 transition hover:bg-purple-50"
        >
          Cancelar
        </Link>


        {/*
          SALVAR

          type="submit" envia o formulário
          e executa handlerSalvar.
        */}
        <button
          type="submit"
          className="rounded-xl bg-purple-700 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-purple-800"
        >
          Salvar
        </button>


      </div>

    </form>
  );
}