'use client'

/*
  Importa a classe Sessao, que representa
  a estrutura dos dados de uma sessão.

  SessaoFormProps define as propriedades
  que este formulário pode receber.
*/
import { Sessao, SessaoFormProps } from "@/app/types/sessao";

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
  programaticamente através do código.
*/
import { useRouter } from "@/node_modules/next/navigation";

/*
  useState permite armazenar e atualizar
  os dados da sessão dentro do componente.
*/
import { useState } from "react";


/*
  Formulário utilizado tanto para:
  - cadastrar uma nova sessão
  - editar uma sessão existente
*/
export default function SessaoForm({ sessaoExistente }: SessaoFormProps) {

  /*
    Inicializa o sistema de navegação
    do Next.js.
  */
  const router = useRouter();


  /*
    ESTADO DA SESSÃO

    Se sessaoExistente tiver sido recebida,
    significa que estamos editando uma sessão.

    Caso contrário, cria uma nova sessão
    com os campos vazios, realizada = false
    e status ATIVO.
  */
  const [sessao, setSessao] = useState<Sessao>(
    sessaoExistente ||
    new Sessao(null, "", "", "", "", false, "ATIVO")
  );


  /*
    ALTERAÇÃO DOS CAMPOS DE TEXTO

    campo informa qual propriedade
    deverá ser alterada.

    valor contém o novo valor digitado.
  */
  const handlerChange = (
    campo: "data" | "horario" | "descricao" | "observacoes",
    valor: string
  ) => {

    /*
      Atualiza o estado criando
      um novo objeto Sessao.

      valorAnterior representa os dados
      antes da alteração.
    */
    setSessao(
      valorAnterior =>
        new Sessao(

          // Mantém o ID atual.
          valorAnterior.id,

          // Altera a data quando necessário.
          campo === "data"
            ? valor
            : valorAnterior.data,

          // Altera o horário quando necessário.
          campo === "horario"
            ? valor
            : valorAnterior.horario,

          // Altera a descrição quando necessário.
          campo === "descricao"
            ? valor
            : valorAnterior.descricao,

          // Altera as observações quando necessário.
          campo === "observacoes"
            ? valor
            : valorAnterior.observacoes,

          // Mantém o valor de realizada.
          valorAnterior.realizada,

          // Mantém o status atual.
          valorAnterior.status
        )
    );
  };


  /*
    ALTERAÇÃO DO CAMPO REALIZADA

    Esta função é separada porque realizada
    é do tipo boolean.

    true = realizada
    false = não realizada
  */
  const handlerRealizada = (valor: boolean) => {

    setSessao(
      valorAnterior =>
        new Sessao(

          // Mantém os demais dados.
          valorAnterior.id,
          valorAnterior.data,
          valorAnterior.horario,
          valorAnterior.descricao,
          valorAnterior.observacoes,

          // Atualiza somente o campo realizada.
          valor,

          // Mantém o status atual.
          valorAnterior.status
        )
    );
  };


  /*
    SALVAR SESSÃO

    Esta função é executada quando
    o formulário é enviado.

    Ela decide entre:
    - PUT para edição
    - POST para cadastro
  */
  const handlerSalvar = async (formData: FormData) => {

    try {

      /*
        Recupera o token armazenado
        no localStorage do navegador.
      */
      const token = localStorage.getItem("token");


      /* ==================== EDITAR ==================== */

      /*
        Se sessaoExistente tiver valor,
        significa que estamos editando
        uma sessão já cadastrada.
      */
      if (sessaoExistente) {


        /*
          AXIOS PUT

          Atualiza uma sessão existente.

          O ID é colocado na URL
          para identificar o registro.

          Exemplo:
          PUT http://localhost:8080/sessoes/5

          O objeto sessao é enviado
          no corpo da requisição.
        */
        var dadosRetorno = await axios.put(
          "http://localhost:8080/sessoes/" + sessao.id,
          sessao,
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

          alert("Sessão foi atualizada com sucesso!");

        } else {

          alert(dadosRetorno.data);

          return;
        }


      /* ==================== CADASTRAR ==================== */

      } else {


        /*
          AXIOS POST

          Cria uma nova sessão no backend.

          POST:
          http://localhost:8080/sessoes
        */
        var dadosRetorno = await axios.post(
          "http://localhost:8080/sessoes",
          sessao,
          {
            headers: {

              // Envia o token para autenticação.
              Authorization: "Bearer " + token,

            },
          }
        );


        /*
          Considera sucesso caso o backend
          retorne HTTP 200 ou 201.
        */
        if (
          dadosRetorno.status == 200 ||
          dadosRetorno.status == 201
        ) {

          alert("Sessão foi salva com sucesso!");

        } else {

          alert(dadosRetorno.data);

          return;
        }
      }


      /*
        Depois de cadastrar ou editar,
        redireciona para a nova rota
        da listagem de sessões.

        Como sessoes agora está diretamente
        dentro de (sistema), a rota correta
        é /sessoes.
      */
      router.push("/sessoes");


      /*
        Solicita uma atualização da rota.
      */
      router.refresh();


    } catch (error) {

      // Mostra o erro no console.
      console.error("Erro ao salvar sessão:", error);

      // Informa o usuário.
      alert("Erro ao salvar sessão!");

    }
  };


  return (

    /*
      Quando o formulário é enviado,
      handlerSalvar é executado.
    */
    <form action={handlerSalvar} className="space-y-6">


      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">


        {/* ==================== DATA ==================== */}

        <div className="space-y-2">

          <label className="block text-sm font-semibold text-gray-700">
            Data
          </label>

          <input
            name="data"
            value={sessao.data}

            onChange={(e) =>
              handlerChange("data", e.target.value)
            }

            required
            type="date"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />

        </div>


        {/* ==================== HORÁRIO ==================== */}

        <div className="space-y-2">

          <label className="block text-sm font-semibold text-gray-700">
            Horário
          </label>

          <input
            name="horario"
            value={sessao.horario}

            onChange={(e) =>
              handlerChange("horario", e.target.value)
            }

            required
            type="time"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />

        </div>


        {/* ==================== DESCRIÇÃO ==================== */}

        <div className="space-y-2 md:col-span-2">

          <label className="block text-sm font-semibold text-gray-700">
            Descrição
          </label>

          <input
            name="descricao"
            value={sessao.descricao}

            onChange={(e) =>
              handlerChange("descricao", e.target.value)
            }

            required
            type="text"
            placeholder="Digite a descrição da sessão"
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
            value={sessao.observacoes}

            onChange={(e) =>
              handlerChange("observacoes", e.target.value)
            }

            placeholder="Informações adicionais sobre a sessão..."
            rows={4}
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />

        </div>


        {/* ==================== REALIZADA ==================== */}

        <div className="space-y-2 md:col-span-2">

          <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">

            <input
              name="realizada"
              type="checkbox"

              /*
                checked utiliza boolean.

                true = marcado
                false = desmarcado
              */
              checked={sessao.realizada}

              /*
                e.target.checked também retorna
                um valor boolean.
              */
              onChange={(e) =>
                handlerRealizada(e.target.checked)
              }

              className="h-5 w-5 rounded border-gray-300 text-purple-700 focus:ring-purple-500"
            />

            Sessão realizada

          </label>

        </div>


      </div>


      {/* ==================== BOTÕES ==================== */}

      <div className="flex items-center justify-end gap-4 border-t border-purple-100 pt-4">


        {/*
          CANCELAR

          Como a pasta sessoes foi movida
          para diretamente dentro de (sistema),
          a rota correta agora é /sessoes.
        */}
        <Link
          href="/sessoes"
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